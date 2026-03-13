# 05. LEAFIT DB 스키마 & SQL 구현

> Supabase (PostgreSQL 15) 기반 전체 데이터베이스 정의

---

## 1. CREATE TABLE

### 1-1. users

```sql
CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id         UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  nickname        TEXT NOT NULL,
  area            TEXT,
  latitude        DOUBLE PRECISION,
  longitude       DOUBLE PRECISION,
  profile_emoji   TEXT DEFAULT '🌱',
  leaf_balance    INTEGER NOT NULL DEFAULT 0,
  total_uploads   INTEGER DEFAULT 0,
  total_swaps     INTEGER DEFAULT 0,
  total_donations INTEGER DEFAULT 0,
  badge_level     TEXT DEFAULT 'sprout',
  invite_code     TEXT UNIQUE,
  invited_by      UUID REFERENCES users (id),
  push_token      TEXT,
  notification_chat    BOOLEAN DEFAULT TRUE,
  notification_trade   BOOLEAN DEFAULT TRUE,
  notification_keyword BOOLEAN DEFAULT TRUE,
  is_suspended    BOOLEAN DEFAULT FALSE,
  consecutive_fails INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);
```

### 1-2. items

```sql
CREATE TABLE items (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID NOT NULL REFERENCES users (id),
  title            TEXT NOT NULL,
  description      TEXT,
  category         TEXT NOT NULL,
  size             TEXT NOT NULL,
  condition        TEXT NOT NULL,
  trade_methods    TEXT[] NOT NULL,
  status           TEXT NOT NULL DEFAULT 'reviewing',
  rejection_reason TEXT,
  view_count       INTEGER DEFAULT 0,
  area             TEXT,
  latitude         DOUBLE PRECISION,
  longitude        DOUBLE PRECISION,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);
```

### 1-3. item_photos

```sql
CREATE TABLE item_photos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id       UUID NOT NULL REFERENCES items (id) ON DELETE CASCADE,
  photo_url     TEXT NOT NULL,
  thumbnail_url TEXT,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

### 1-4. leaf_transactions

```sql
CREATE TABLE leaf_transactions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES users (id),
  amount       INTEGER NOT NULL,
  type         TEXT NOT NULL,  -- signup_bonus | upload | swap | invite_bonus
  reference_id UUID,
  created_at   TIMESTAMPTZ DEFAULT now()
);
```

### 1-5. trades

```sql
CREATE TABLE trades (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id          UUID NOT NULL REFERENCES items (id),
  seller_id        UUID NOT NULL REFERENCES users (id),
  buyer_id         UUID NOT NULL REFERENCES users (id),
  status           TEXT NOT NULL DEFAULT 'chatting',
  trade_method     TEXT,
  reserved_at      TIMESTAMPTZ,
  completed_at     TIMESTAMPTZ,
  cancelled_at     TIMESTAMPTZ,
  buyer_rating     TEXT,
  report_deadline  TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT now()
);
```

### 1-6. messages

```sql
CREATE TABLE messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trade_id   UUID NOT NULL REFERENCES trades (id),
  sender_id  UUID REFERENCES users (id),  -- NULL = system message
  type       TEXT DEFAULT 'text',
  content    TEXT NOT NULL,
  image_url  TEXT,
  is_read    BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### 1-7. wishlist

```sql
CREATE TABLE wishlist (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users (id),
  item_id    UUID NOT NULL REFERENCES items (id),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, item_id)
);
```

### 1-8. reports

```sql
CREATE TABLE reports (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES users (id),
  target_type TEXT NOT NULL,
  target_id   UUID NOT NULL,
  reason      TEXT NOT NULL,
  description TEXT,
  status      TEXT DEFAULT 'pending',
  created_at  TIMESTAMPTZ DEFAULT now()
);
```

### 1-9. notifications

```sql
CREATE TABLE notifications (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES users (id),
  type           TEXT NOT NULL,
  title          TEXT NOT NULL,
  body           TEXT,
  reference_type TEXT,
  reference_id   UUID,
  is_read        BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT now()
);
```

### 1-10. sponsored_items

```sql
CREATE TABLE sponsored_items (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name       TEXT NOT NULL,
  title            TEXT NOT NULL,
  description      TEXT,
  image_url        TEXT NOT NULL,
  external_url     TEXT NOT NULL,
  position_index   INTEGER DEFAULT 5,
  is_active        BOOLEAN DEFAULT TRUE,
  impression_count INTEGER DEFAULT 0,
  click_count      INTEGER DEFAULT 0,
  starts_at        TIMESTAMPTZ,
  ends_at          TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT now()
);
```

---

## 2. Indexes

```sql
-- items: 상태 필터
CREATE INDEX idx_items_status   ON items (status);

-- items: 카테고리 필터
CREATE INDEX idx_items_category ON items (category);

-- items: 사용자별 아이템 조회
CREATE INDEX idx_items_user     ON items (user_id);

-- items: 전문 검색 (GIN tsvector)
CREATE INDEX idx_items_search   ON items USING GIN (to_tsvector('korean', title || ' ' || COALESCE(description, '')));

-- messages: 거래별 메시지 시간순 조회
CREATE INDEX idx_messages_trade ON messages (trade_id, created_at);

-- notifications: 사용자별 최신순 조회
CREATE INDEX idx_notif_user     ON notifications (user_id, created_at DESC);
```

---

## 3. DB Functions

### 3-1. grant_leaf_for_upload

업로드 승인 시 리프 1개 지급 + 뱃지 재계산.

```sql
CREATE OR REPLACE FUNCTION grant_leaf_for_upload(p_user_id UUID, p_item_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE users
     SET leaf_balance  = leaf_balance + 1,
         total_uploads = total_uploads + 1,
         updated_at    = now()
   WHERE id = p_user_id;

  INSERT INTO leaf_transactions (user_id, amount, type, reference_id)
  VALUES (p_user_id, 1, 'upload', p_item_id);

  UPDATE items
     SET status     = 'active',
         updated_at = now()
   WHERE id = p_item_id;

  PERFORM recalculate_badge(p_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3-2. complete_swap

교환 완료 처리: 구매자 리프 차감, 거래/아이템 상태 갱신, 양측 뱃지 재계산.

```sql
CREATE OR REPLACE FUNCTION complete_swap(p_trade_id UUID, p_buyer_id UUID)
RETURNS void AS $$
DECLARE
  v_balance   INTEGER;
  v_item_id   UUID;
  v_seller_id UUID;
BEGIN
  SELECT leaf_balance INTO v_balance
    FROM users
   WHERE id = p_buyer_id
     FOR UPDATE;

  IF v_balance < 1 THEN
    RAISE EXCEPTION 'Insufficient leaf balance';
  END IF;

  SELECT item_id, seller_id
    INTO v_item_id, v_seller_id
    FROM trades
   WHERE id = p_trade_id;

  UPDATE users
     SET leaf_balance = leaf_balance - 1,
         total_swaps  = total_swaps + 1,
         updated_at   = now()
   WHERE id = p_buyer_id;

  INSERT INTO leaf_transactions (user_id, amount, type, reference_id)
  VALUES (p_buyer_id, -1, 'swap', p_trade_id);

  UPDATE trades
     SET status          = 'completed',
         completed_at    = now(),
         report_deadline = now() + INTERVAL '48 hours'
   WHERE id = p_trade_id;

  UPDATE items
     SET status     = 'swapped',
         updated_at = now()
   WHERE id = v_item_id;

  PERFORM recalculate_badge(p_buyer_id);
  PERFORM recalculate_badge(v_seller_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3-3. recalculate_badge

누적 순환 횟수에 따라 뱃지 등급 재계산.

| 누적 순환 | 뱃지 |
|-----------|------|
| 0 - 2 | sprout |
| 3 - 9 | sprout |
| 10 - 29 | green |
| 30 - 99 | tree |
| 100 - 999 | earth |
| 1000+ | universe |

```sql
CREATE OR REPLACE FUNCTION recalculate_badge(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_cycles   INTEGER;
  v_new_badge TEXT;
BEGIN
  SELECT (total_uploads + total_swaps + total_donations)
    INTO v_cycles
    FROM users
   WHERE id = p_user_id;

  v_new_badge := CASE
    WHEN v_cycles >= 1000 THEN 'universe'
    WHEN v_cycles >= 100  THEN 'earth'
    WHEN v_cycles >= 30   THEN 'tree'
    WHEN v_cycles >= 10   THEN 'green'
    WHEN v_cycles >= 3    THEN 'sprout'
    ELSE 'sprout'
  END;

  UPDATE users
     SET badge_level = v_new_badge,
         updated_at  = now()
   WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3-4. signup_bonus

회원가입 시 리프 1개 지급.

```sql
CREATE OR REPLACE FUNCTION signup_bonus(p_user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE users
     SET leaf_balance = 1,
         updated_at   = now()
   WHERE id = p_user_id;

  INSERT INTO leaf_transactions (user_id, amount, type)
  VALUES (p_user_id, 1, 'signup_bonus');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 3-5. process_invite

초대 코드 처리: 초대자/피초대자 모두 리프 1개 지급.

```sql
CREATE OR REPLACE FUNCTION process_invite(p_new_user_id UUID, p_invite_code TEXT)
RETURNS void AS $$
DECLARE
  v_inviter_id UUID;
BEGIN
  SELECT id INTO v_inviter_id
    FROM users
   WHERE invite_code = p_invite_code;

  IF v_inviter_id IS NULL THEN
    RAISE EXCEPTION 'Invalid invite code';
  END IF;

  -- 피초대자에 초대자 연결
  UPDATE users
     SET invited_by = v_inviter_id
   WHERE id = p_new_user_id;

  -- 초대자 리프 +1
  UPDATE users
     SET leaf_balance = leaf_balance + 1,
         updated_at   = now()
   WHERE id = v_inviter_id;

  INSERT INTO leaf_transactions (user_id, amount, type, reference_id)
  VALUES (v_inviter_id, 1, 'invite_bonus', p_new_user_id);

  -- 피초대자 리프 +1
  UPDATE users
     SET leaf_balance = leaf_balance + 1,
         updated_at   = now()
   WHERE id = p_new_user_id;

  INSERT INTO leaf_transactions (user_id, amount, type, reference_id)
  VALUES (p_new_user_id, 1, 'invite_bonus', v_inviter_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 4. Row Level Security (RLS) Policies

### 4-1. users

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 모든 사용자 프로필 읽기 허용
CREATE POLICY "users_read"
  ON users FOR SELECT
  USING (true);

-- 본인 프로필만 수정
CREATE POLICY "users_update_self"
  ON users FOR UPDATE
  USING (auth_id = auth.uid());
```

### 4-2. items

```sql
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- 활성 아이템 또는 본인 아이템만 조회
CREATE POLICY "items_read_active"
  ON items FOR SELECT
  USING (
    status = 'active'
    OR user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- 본인만 아이템 등록
CREATE POLICY "items_write_self"
  ON items FOR INSERT
  WITH CHECK (
    user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
  );

-- 본인 아이템만 수정
CREATE POLICY "items_update_self"
  ON items FOR UPDATE
  USING (
    user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
  );
```

### 4-3. messages

```sql
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 거래 당사자(판매자/구매자)만 메시지 접근
CREATE POLICY "messages_access"
  ON messages FOR ALL
  USING (
    trade_id IN (
      SELECT id FROM trades
       WHERE seller_id = (SELECT id FROM users WHERE auth_id = auth.uid())
          OR buyer_id  = (SELECT id FROM users WHERE auth_id = auth.uid())
    )
  );
```

### 4-4. leaf_transactions

```sql
ALTER TABLE leaf_transactions ENABLE ROW LEVEL SECURITY;

-- 본인 리프 거래 내역만 조회
CREATE POLICY "leaf_read_self"
  ON leaf_transactions FOR SELECT
  USING (
    user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
  );
```

### 4-5. wishlist

```sql
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

-- 본인 찜 목록만 접근
CREATE POLICY "wishlist_self"
  ON wishlist FOR ALL
  USING (
    user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
  );
```

### 4-6. notifications

```sql
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 본인 알림만 접근
CREATE POLICY "notif_self"
  ON notifications FOR ALL
  USING (
    user_id = (SELECT id FROM users WHERE auth_id = auth.uid())
  );
```

---

## 5. Supabase Migration 파일 구조

Supabase CLI(`supabase migration new`)로 생성되는 마이그레이션 파일은 `supabase/migrations/` 디렉터리에 타임스탬프 기반으로 저장됩니다.

```
supabase/
└── migrations/
    ├── 20260301000000_create_users.sql
    ├── 20260301000001_create_items.sql
    ├── 20260301000002_create_item_photos.sql
    ├── 20260301000003_create_leaf_transactions.sql
    ├── 20260301000004_create_trades.sql
    ├── 20260301000005_create_messages.sql
    ├── 20260301000006_create_wishlist.sql
    ├── 20260301000007_create_reports.sql
    ├── 20260301000008_create_notifications.sql
    ├── 20260301000009_create_sponsored_items.sql
    ├── 20260301000010_create_indexes.sql
    ├── 20260301000011_create_functions.sql
    └── 20260301000012_create_rls_policies.sql
```

### 마이그레이션 실행 명령어

```bash
# 새 마이그레이션 파일 생성
supabase migration new create_users

# 로컬 DB에 마이그레이션 적용
supabase db reset

# 원격 프로젝트에 마이그레이션 푸시
supabase db push
```

### 마이그레이션 파일 작성 규칙

| 규칙 | 설명 |
|------|------|
| 파일명 | 타임스탬프 접두사 + 설명 (예: `20260301000000_create_users.sql`) |
| 실행 순서 | 파일명 기준 오름차순 자동 정렬 |
| FK 의존성 | 참조 대상 테이블을 먼저 생성 (`users` -> `items` -> `trades` 순) |
| 롤백 | Supabase는 자동 롤백 미지원, 별도 `down.sql` 수동 관리 필요 |
| 멱등성 | `CREATE TABLE IF NOT EXISTS`, `CREATE OR REPLACE FUNCTION` 사용 권장 |

---

*LEAFIT -- 순환의 가치를 연결하다*
