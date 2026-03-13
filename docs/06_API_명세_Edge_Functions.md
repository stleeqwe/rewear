# LEAFIT API 명세 — Edge Functions & Realtime

> **API Specification v1.0**
> Edge Functions 구현 · Realtime 구독 · 거래 상태 머신
> 최종 수정: 2026.03.11

---

## 1. Edge Functions 디렉토리 구조

```
supabase/functions/
├── ai-review/index.ts          # Gemini Flash AI 검수
├── push-notify/index.ts        # FCM 푸시 알림
├── process-image/index.ts      # Cloudinary 이미지 처리
├── verify-invite/index.ts      # 초대 코드 검증
├── check-report/index.ts       # 신고 누적/제재 처리
└── sponsor-serve/index.ts      # 스폰서드 광고 노출 기록
```

모든 Edge Function은 Deno 런타임에서 실행되며, `Deno.serve`로 HTTP 요청을 처리합니다.
환경 변수는 Supabase Dashboard > Edge Functions > Secrets에서 관리합니다.

### 공통 환경 변수

| 변수 | 용도 |
|------|------|
| `SUPABASE_URL` | Supabase 프로젝트 URL |
| `SUPABASE_SERVICE_ROLE_KEY` | 서비스 롤 키 (RLS 우회) |
| `GEMINI_API_KEY` | Google Gemini Flash API 키 |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary 클라우드 이름 |
| `CLOUDINARY_UPLOAD_PRESET` | Cloudinary 업로드 프리셋 |
| `FCM_PROJECT_ID` | Firebase 프로젝트 ID |
| `FCM_SERVICE_ACCOUNT` | Firebase 서비스 계정 JSON |

---

## 2. ai-review — AI 검수 (Gemini Flash)

### 스펙

| 항목 | 내용 |
|------|------|
| Endpoint | `POST /functions/v1/ai-review` |
| 인증 | `Authorization: Bearer <SUPABASE_ANON_KEY>` |
| Content-Type | `application/json` |
| 호출 시점 | 유저가 옷 사진 업로드 후 등록 버튼 탭 |
| 외부 의존 | Gemini 3 Flash API |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `photos` | `string[]` | O | Base64 인코딩된 JPEG 이미지 배열 (최소 2장, 최대 5장) |
| `item_id` | `string` | O | 검수 대상 아이템 UUID |
| `user_id` | `string` | O | 등록자 UUID |

### Response

**성공 (200)**

```json
{
  "pass": true,
  "reason": ""
}
```

```json
{
  "pass": false,
  "reason": "사진이 흐릿하여 옷의 상태를 확인할 수 없습니다."
}
```

### Error Codes

| 코드 | 상황 | 응답 |
|------|------|------|
| 400 | photos 누락 또는 빈 배열 | `{"error": "photos required (min 2)"}` |
| 400 | item_id 또는 user_id 누락 | `{"error": "item_id and user_id required"}` |
| 403 | 유저 정지 상태 | `{"error": "user is suspended"}` |
| 429 | 일일 검수 한도 초과 (10건) | `{"error": "daily review limit exceeded"}` |
| 500 | Gemini API 호출 실패 | `{"error": "AI review service unavailable"}` |
| 500 | JSON 파싱 실패 | `{"error": "invalid AI response format"}` |

### 구현

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const genAI = new GoogleGenerativeAI(Deno.env.get("GEMINI_API_KEY")!);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });

Deno.serve(async (req) => {
  const { photos, item_id, user_id } = await req.json();

  // --- 1. Gemini 멀티모달 검수 ---
  const imageParts = photos.map((base64: string) => ({
    inlineData: { mimeType: "image/jpeg", data: base64 },
  }));

  const result = await model.generateContent([
    ...imageParts,
    {
      text: `이 옷 사진을 보고 아래 기준으로 판단해.
      기준:
      1. 사진이 선명하고 옷이 잘 보이는가?
      2. 찢어짐이나 구멍이 보이는가?
      3. 심한 얼룩이나 변색이 있는가?
      4. 속옷이나 양말인가?
      5. 성의 있게 촬영했는가?

      다음 JSON만 반환:
      {"pass": boolean, "reason": "불합격 시 사유, 합격이면 빈문자열"}`,
    },
  ]);

  const text = result.response.text();
  const review = JSON.parse(text.replace(/```json|```/g, "").trim());

  // --- 2. 결과에 따른 DB 처리 ---
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  if (review.pass) {
    // 합격: 아이템 active + 리프 +1 지급 (트랜잭션)
    await supabase.rpc("grant_leaf_for_upload", {
      p_user_id: user_id,
      p_item_id: item_id,
    });
  } else {
    // 불합격: 아이템 rejected + 사유 기록 + 실패 카운트 증가
    await supabase
      .from("items")
      .update({ status: "rejected", rejection_reason: review.reason })
      .eq("id", item_id);

    await supabase.rpc("increment_fail_count", { p_user_id: user_id });
  }

  return new Response(JSON.stringify(review), {
    headers: { "Content-Type": "application/json" },
  });
});
```

### 검수 기준 상세

| 기준 | 합격 | 불합격 |
|------|------|--------|
| 사진 선명도 | 옷 전체가 선명하게 보임 | 흐릿, 어둡거나 옷이 일부만 보임 |
| 손상 여부 | 경미한 사용감 허용 | 찢어짐, 구멍, 심한 보풀 |
| 오염 | 경미한 사용감 허용 | 눈에 띄는 얼룩, 변색 |
| 카테고리 | 상의, 하의, 아우터, 원피스, 잡화 등 | 속옷, 양말, 수영복 |
| 촬영 성의 | 앞/뒤 2장 이상, 밝은 곳 | 스크린샷, 카탈로그 사진, 1장만 |

### 연관 DB Function

```sql
-- grant_leaf_for_upload: 합격 시 호출
CREATE OR REPLACE FUNCTION grant_leaf_for_upload(p_user_id UUID, p_item_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE items SET status = 'active' WHERE id = p_item_id;
  UPDATE users SET leaf_balance = leaf_balance + 1, total_uploads = total_uploads + 1 WHERE id = p_user_id;
  INSERT INTO leaf_transactions (user_id, amount, type, reference_id)
    VALUES (p_user_id, 1, 'upload', p_item_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- increment_fail_count: 불합격 시 호출 (3회 누적 시 경고)
CREATE OR REPLACE FUNCTION increment_fail_count(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  fail_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO fail_count
    FROM items WHERE user_id = p_user_id AND status = 'rejected';
  IF fail_count >= 3 THEN
    UPDATE users SET is_suspended = TRUE WHERE id = p_user_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 3. push-notify — FCM 푸시 알림

### 스펙

| 항목 | 내용 |
|------|------|
| Endpoint | `POST /functions/v1/push-notify` |
| 인증 | `Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>` (내부 호출 전용) |
| Content-Type | `application/json` |
| 호출 시점 | 서버 사이드에서 이벤트 발생 시 내부 호출 |
| 외부 의존 | Firebase Cloud Messaging v1 API |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `user_id` | `string` | O | 수신자 UUID |
| `title` | `string` | O | 푸시 제목 |
| `body` | `string` | O | 푸시 본문 |
| `data` | `object` | X | 추가 데이터 |
| `data.type` | `string` | X | 알림 유형: `new_chat`, `reserved`, `completed`, `review_pass`, `review_fail`, `invite_reward` |
| `data.ref_type` | `string` | X | 참조 타입: `trade`, `item`, `user` |
| `data.ref_id` | `string` | X | 참조 대상 UUID |

### Response

**성공 (200)**

```
OK
```

### Error Codes

| 코드 | 상황 | 응답 |
|------|------|------|
| 400 | user_id, title, body 누락 | `{"error": "user_id, title, body required"}` |
| 200 | 토큰 없음 (정상 종료) | `No token` |
| 200 | 알림 설정 off (정상 종료) | `Notification disabled` |
| 500 | FCM API 호출 실패 | `{"error": "FCM send failed"}` |

### 구현

```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const PROJECT_ID = Deno.env.get("FCM_PROJECT_ID")!;

// Google OAuth2 access token (서비스 계정 기반)
async function getAccessToken(): Promise<string> {
  const serviceAccount = JSON.parse(Deno.env.get("FCM_SERVICE_ACCOUNT")!);
  // JWT 생성 → Google OAuth2 토큰 교환
  // (google-auth-library 또는 직접 JWT 서명)
  const jwt = await createJWT(serviceAccount);
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const { access_token } = await tokenRes.json();
  return access_token;
}

Deno.serve(async (req) => {
  const { user_id, title, body, data } = await req.json();

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // --- 1. 유저 토큰 & 알림 설정 조회 ---
  const { data: user } = await supabase
    .from("users")
    .select("push_token, notification_chat, notification_trade")
    .eq("id", user_id)
    .single();

  if (!user?.push_token) return new Response("No token");

  // --- 2. 알림 유형별 설정 확인 ---
  if (data?.type === "new_chat" && !user.notification_chat) {
    return new Response("Notification disabled");
  }
  if (data?.type === "completed" && !user.notification_trade) {
    return new Response("Notification disabled");
  }

  // --- 3. FCM v1 API 호출 ---
  const fcmResponse = await fetch(
    `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          token: user.push_token,
          notification: { title, body },
          data: data || {},
        },
      }),
    }
  );

  // --- 4. 알림 이력 저장 ---
  await supabase.from("notifications").insert({
    user_id,
    type: data?.type,
    title,
    body,
    reference_type: data?.ref_type,
    reference_id: data?.ref_id,
  });

  return new Response("OK");
});
```

### 알림 유형별 메시지 템플릿

| type | title | body 예시 |
|------|-------|-----------|
| `review_pass` | 검수 합격! | 등록한 옷이 합격했어요. 리프 1개가 지급되었습니다. |
| `review_fail` | 검수 불합격 | {reason} 다시 촬영해서 등록해 주세요. |
| `new_chat` | 새 메시지 | {sender_nickname}: {message_preview} |
| `reserved` | 예약 확정 | {item_title} 예약이 확정되었어요. |
| `completed` | 거래 완료 | {item_title} 거래가 완료되었어요. 상대방을 평가해 주세요. |
| `invite_reward` | 친구 초대 보상 | {friend_nickname}님이 가입했어요! 리프 1개 지급 완료. |

---

## 4. process-image — Cloudinary 이미지 처리

### 스펙

| 항목 | 내용 |
|------|------|
| Endpoint | `POST /functions/v1/process-image` |
| 인증 | `Authorization: Bearer <SUPABASE_ANON_KEY>` |
| Content-Type | `application/json` |
| 호출 시점 | 옷 등록 시 각 사진마다 개별 호출 |
| 외부 의존 | Cloudinary Upload API |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `image_base64` | `string` | O | Base64 인코딩된 JPEG 이미지 |
| `item_id` | `string` | O | 아이템 UUID (폴더 분류용) |
| `sort_order` | `number` | O | 사진 순서 (0부터 시작, 0번이 대표 이미지) |

### Response

**성공 (200)**

```json
{
  "photoUrl": "https://res.cloudinary.com/leafit/image/upload/v1234/items/uuid/photo_0.jpg",
  "thumbnailUrl": "https://res.cloudinary.com/leafit/image/upload/c_fill,w_400,h_400,q_80/v1234/items/uuid/photo_0.jpg"
}
```

### Error Codes

| 코드 | 상황 | 응답 |
|------|------|------|
| 400 | image_base64 누락 | `{"error": "image_base64 required"}` |
| 400 | item_id 누락 | `{"error": "item_id required"}` |
| 413 | 이미지 크기 초과 (10MB) | `{"error": "image too large (max 10MB)"}` |
| 500 | Cloudinary 업로드 실패 | `{"error": "image upload failed"}` |

### 구현

```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CLOUD_NAME = Deno.env.get("CLOUDINARY_CLOUD_NAME")!;

Deno.serve(async (req) => {
  const { image_base64, item_id, sort_order } = await req.json();

  // --- 1. Cloudinary에 원본 업로드 ---
  const formData = new FormData();
  formData.append("file", `data:image/jpeg;base64,${image_base64}`);
  formData.append("upload_preset", "leafit_items");
  formData.append("folder", `items/${item_id}`);

  const cloudRes = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  const cloudData = await cloudRes.json();

  // --- 2. 원본 URL + 썸네일 URL 생성 ---
  const photoUrl = cloudData.secure_url;
  const thumbnailUrl = photoUrl.replace(
    "/upload/",
    "/upload/c_fill,w_400,h_400,q_80/"
  );

  // --- 3. item_photos 테이블에 저장 ---
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  await supabase.from("item_photos").insert({
    item_id,
    photo_url: photoUrl,
    thumbnail_url: thumbnailUrl,
    sort_order,
  });

  return new Response(JSON.stringify({ photoUrl, thumbnailUrl }), {
    headers: { "Content-Type": "application/json" },
  });
});
```

### Cloudinary 변환 규칙

| 용도 | 변환 파라미터 | 결과 |
|------|--------------|------|
| 피드 썸네일 | `c_fill,w_400,h_400,q_80` | 400x400px, 정사각형 crop, 80% 품질 |
| 상세 이미지 | 원본 URL 그대로 | 원본 해상도 유지 |
| 채팅 이미지 | `c_fill,w_600,h_600,q_75` | 600x600px, 75% 품질 |
| WebP 자동변환 | `f_auto` (Cloudinary 기본 설정) | 브라우저/앱 호환 최적 포맷 |

---

## 5. verify-invite — 초대 코드 검증

### 스펙

| 항목 | 내용 |
|------|------|
| Endpoint | `POST /functions/v1/verify-invite` |
| 인증 | `Authorization: Bearer <SUPABASE_ANON_KEY>` |
| Content-Type | `application/json` |
| 호출 시점 | 회원가입 시 초대 코드 입력 |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `invite_code` | `string` | O | 초대 코드 (6자리 영숫자) |
| `new_user_id` | `string` | O | 신규 가입자 UUID |

### Response

**성공 (200)**

```json
{
  "success": true,
  "inviter_nickname": "환경지킴이",
  "bonus_leaf": 1
}
```

### Error Codes

| 코드 | 상황 | 응답 |
|------|------|------|
| 400 | invite_code 누락 | `{"error": "invite_code required"}` |
| 404 | 존재하지 않는 초대 코드 | `{"error": "invalid invite code"}` |
| 409 | 이미 사용한 초대 코드 (본인) | `{"error": "already used"}` |
| 403 | 초대자가 정지 상태 | `{"error": "inviter is suspended"}` |

---

## 6. check-report — 신고 누적/제재 처리

### 스펙

| 항목 | 내용 |
|------|------|
| Endpoint | `POST /functions/v1/check-report` |
| 인증 | `Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>` (내부 호출 전용) |
| Content-Type | `application/json` |
| 호출 시점 | 신고 접수 시 DB Trigger에서 호출 |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `report_id` | `string` | O | 신고 UUID |
| `reported_user_id` | `string` | O | 피신고자 UUID |
| `reason` | `string` | O | 신고 사유: `fake_photo`, `no_show`, `harassment`, `inappropriate` |

### Response

**성공 (200)**

```json
{
  "total_reports": 3,
  "action": "suspended",
  "message": "누적 신고 3회로 계정이 정지되었습니다."
}
```

### Error Codes

| 코드 | 상황 | 응답 |
|------|------|------|
| 400 | 필수 필드 누락 | `{"error": "report_id, reported_user_id, reason required"}` |
| 404 | 존재하지 않는 유저 | `{"error": "user not found"}` |

### 제재 기준

| 누적 신고 | 조치 |
|-----------|------|
| 1회 | 경고 알림 발송 |
| 2회 | 7일 업로드 제한 |
| 3회 이상 | 계정 정지 (is_suspended = true) |

---

## 7. sponsor-serve — 스폰서드 광고 노출 기록

### 스펙

| 항목 | 내용 |
|------|------|
| Endpoint | `POST /functions/v1/sponsor-serve` |
| 인증 | `Authorization: Bearer <SUPABASE_ANON_KEY>` |
| Content-Type | `application/json` |
| 호출 시점 | 피드에서 스폰서드 카드가 뷰포트에 노출될 때 / 클릭 시 |

### Request Body

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `sponsor_id` | `string` | O | 스폰서드 아이템 UUID |
| `event` | `string` | O | `impression` 또는 `click` |
| `user_id` | `string` | X | 로그인 유저 UUID (비로그인 시 null) |

### Response

**성공 (200)**

```json
{ "recorded": true }
```

### Error Codes

| 코드 | 상황 | 응답 |
|------|------|------|
| 400 | sponsor_id 또는 event 누락 | `{"error": "sponsor_id and event required"}` |
| 400 | event 값 유효하지 않음 | `{"error": "event must be impression or click"}` |
| 404 | 존재하지 않는 광고 | `{"error": "sponsor not found"}` |

---

## 8. 거래 상태 다이어그램 (Trade State Machine)

### 상태 정의

| 상태 | 설명 | 진입 조건 |
|------|------|-----------|
| `chatting` | 채팅 진행 중 | 구매자가 아이템에서 "채팅하기" 탭 |
| `reserved` | 거래 예약 확정 | 양쪽 합의 후 예약 확정 |
| `completed` | 거래 완료 | 물건 수령 후 완료 확인 |
| `cancelled` | 거래 취소 | 어느 한쪽이 취소 |
| `reported` | 신고 접수 | 완료 후 48시간 이내 신고 |

### 상태 전이 다이어그램

```
                ┌─────────────┐
                │   chatting   │
                └──────┬──────┘
                       │
            ┌──────────┼──────────┐
            ▼                     ▼
     ┌─────────────┐      ┌─────────────┐
     │   reserved   │      │  cancelled   │
     └──────┬──────┘      └─────────────┘
            │                     ▲
            ├─────────────────────┘
            ▼
     ┌─────────────┐
     │  completed   │
     └──────┬──────┘
            │ (48시간 이내)
            ▼
     ┌─────────────┐
     │  reported    │
     └─────────────┘
```

### 전이 규칙

| From | To | 조건 | 트리거 |
|------|----|------|--------|
| `chatting` | `reserved` | 양쪽 합의 (거래 방법 선택) | 예약 버튼 탭 |
| `chatting` | `cancelled` | 어느 한쪽 취소 | 취소 버튼 탭 |
| `reserved` | `completed` | 물건 수령 확인 | 완료 버튼 탭 → `complete_swap` RPC |
| `reserved` | `cancelled` | 어느 한쪽 취소 | 취소 버튼 탭 |
| `completed` | `reported` | 48시간 이내 신고 | 신고 버튼 → `check-report` Edge Function |

### 상태별 리프 처리

| 전이 | 리프 변동 | DB Function |
|------|-----------|-------------|
| `chatting` → `reserved` | 변동 없음 | - |
| `reserved` → `completed` | 구매자 -1 리프 | `complete_swap` |
| `reserved` → `cancelled` | 변동 없음 (리프 차감 전) | - |
| `completed` → `reported` | 리프 동결 (관리자 판단 대기) | `freeze_transaction` |

### complete_swap DB Function

```sql
CREATE OR REPLACE FUNCTION complete_swap(
  p_trade_id UUID,
  p_buyer_id UUID
)
RETURNS VOID AS $$
DECLARE
  v_seller_id UUID;
  v_item_id UUID;
  v_buyer_balance INTEGER;
BEGIN
  -- 거래 정보 조회
  SELECT seller_id, item_id INTO v_seller_id, v_item_id
    FROM trades WHERE id = p_trade_id AND status = 'reserved';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Trade not found or not in reserved status';
  END IF;

  -- 구매자 잔액 확인
  SELECT leaf_balance INTO v_buyer_balance
    FROM users WHERE id = p_buyer_id;

  IF v_buyer_balance < 1 THEN
    RAISE EXCEPTION 'Insufficient leaf balance';
  END IF;

  -- 구매자 리프 -1
  UPDATE users SET leaf_balance = leaf_balance - 1, total_swaps = total_swaps + 1
    WHERE id = p_buyer_id;

  -- 거래 완료 처리
  UPDATE trades SET
    status = 'completed',
    completed_at = NOW(),
    report_deadline = NOW() + INTERVAL '48 hours'
    WHERE id = p_trade_id;

  -- 아이템 상태 변경
  UPDATE items SET status = 'swapped' WHERE id = v_item_id;

  -- 리프 거래 이력
  INSERT INTO leaf_transactions (user_id, amount, type, reference_id)
    VALUES (p_buyer_id, -1, 'swap', p_trade_id);

  -- 판매자 swap 카운트 증가
  UPDATE users SET total_swaps = total_swaps + 1 WHERE id = v_seller_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 9. Flutter Realtime 구독 코드

Supabase Realtime의 PostgreSQL CDC (Change Data Capture)를 활용하여 채팅 메시지와 거래 상태를 실시간으로 구독합니다.

### 9-1. 채팅 메시지 실시간 구독

```dart
import 'package:supabase_flutter/supabase_flutter.dart';

class ChatRealtimeService {
  final SupabaseClient _supabase = Supabase.instance.client;
  RealtimeChannel? _messageChannel;

  /// 특정 거래방의 메시지를 실시간으로 구독
  void subscribeToMessages({
    required String tradeId,
    required void Function(Map<String, dynamic> newMessage) onNewMessage,
  }) {
    _messageChannel = _supabase
        .channel('messages:trade_id=eq.$tradeId')
        .onPostgresChanges(
          event: PostgresChangeEvent.insert,
          schema: 'public',
          table: 'messages',
          filter: PostgresChangeFilter(
            type: PostgresChangeFilterType.eq,
            column: 'trade_id',
            value: tradeId,
          ),
          callback: (payload) {
            final newMessage = payload.newRecord;
            onNewMessage(newMessage);
          },
        )
        .subscribe();
  }

  /// 구독 해제 (채팅방 나갈 때)
  Future<void> unsubscribe() async {
    await _messageChannel?.unsubscribe();
    _messageChannel = null;
  }
}
```

### 9-2. 거래 상태 구독

```dart
class TradeRealtimeService {
  final SupabaseClient _supabase = Supabase.instance.client;
  RealtimeChannel? _tradeChannel;

  /// 특정 거래의 상태 변경을 실시간으로 구독
  void subscribeToTradeStatus({
    required String tradeId,
    required void Function(String newStatus) onStatusChanged,
  }) {
    _tradeChannel = _supabase
        .channel('trades:id=eq.$tradeId')
        .onPostgresChanges(
          event: PostgresChangeEvent.update,
          schema: 'public',
          table: 'trades',
          filter: PostgresChangeFilter(
            type: PostgresChangeFilterType.eq,
            column: 'id',
            value: tradeId,
          ),
          callback: (payload) {
            final newStatus = payload.newRecord['status'] as String;
            final oldStatus = payload.oldRecord['status'] as String;

            if (newStatus != oldStatus) {
              onStatusChanged(newStatus);
            }
          },
        )
        .subscribe();
  }

  /// 구독 해제
  Future<void> unsubscribe() async {
    await _tradeChannel?.unsubscribe();
    _tradeChannel = null;
  }
}
```

### 9-3. 읽음 처리

```dart
class ChatReadService {
  final SupabaseClient _supabase = Supabase.instance.client;

  /// 채팅방 진입 시 상대방의 읽지 않은 메시지를 일괄 읽음 처리
  Future<void> markAsRead({
    required String tradeId,
    required String currentUserId,
  }) async {
    await _supabase
        .from('messages')
        .update({'is_read': true})
        .eq('trade_id', tradeId)
        .neq('sender_id', currentUserId)
        .eq('is_read', false);
  }

  /// 읽지 않은 메시지 개수 조회 (채팅 목록 뱃지용)
  Future<int> getUnreadCount({
    required String tradeId,
    required String currentUserId,
  }) async {
    final response = await _supabase
        .from('messages')
        .select('id')
        .eq('trade_id', tradeId)
        .neq('sender_id', currentUserId)
        .eq('is_read', false);

    return (response as List).length;
  }

  /// 전체 읽지 않은 메시지 개수 (하단 탭 뱃지용)
  Future<int> getTotalUnreadCount({
    required String currentUserId,
  }) async {
    final trades = await _supabase
        .from('trades')
        .select('id')
        .or('seller_id.eq.$currentUserId,buyer_id.eq.$currentUserId')
        .inFilter('status', ['chatting', 'reserved']);

    int total = 0;
    for (final trade in trades as List) {
      total += await getUnreadCount(
        tradeId: trade['id'],
        currentUserId: currentUserId,
      );
    }
    return total;
  }
}
```

### 9-4. Riverpod Provider 통합 예시

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

/// 채팅 메시지 스트림 Provider
final chatMessagesProvider = StreamProvider.family<List<Message>, String>(
  (ref, tradeId) {
    final supabase = Supabase.instance.client;

    // 기존 메시지 로드 + 실시간 구독을 스트림으로 통합
    final controller = StreamController<List<Message>>();
    final messages = <Message>[];

    // 1. 기존 메시지 로드
    supabase
        .from('messages')
        .select()
        .eq('trade_id', tradeId)
        .order('created_at', ascending: true)
        .then((data) {
      messages.addAll((data as List).map((e) => Message.fromJson(e)));
      controller.add(List.from(messages));
    });

    // 2. 실시간 구독
    final channel = supabase
        .channel('messages:$tradeId')
        .onPostgresChanges(
          event: PostgresChangeEvent.insert,
          schema: 'public',
          table: 'messages',
          filter: PostgresChangeFilter(
            type: PostgresChangeFilterType.eq,
            column: 'trade_id',
            value: tradeId,
          ),
          callback: (payload) {
            messages.add(Message.fromJson(payload.newRecord));
            controller.add(List.from(messages));
          },
        )
        .subscribe();

    ref.onDispose(() {
      channel.unsubscribe();
      controller.close();
    });

    return controller.stream;
  },
);

/// 거래 상태 Provider
final tradeStatusProvider = StreamProvider.family<String, String>(
  (ref, tradeId) {
    final supabase = Supabase.instance.client;
    final controller = StreamController<String>();

    // 초기 상태 로드
    supabase
        .from('trades')
        .select('status')
        .eq('id', tradeId)
        .single()
        .then((data) {
      controller.add(data['status'] as String);
    });

    // 실시간 구독
    final channel = supabase
        .channel('trades:$tradeId')
        .onPostgresChanges(
          event: PostgresChangeEvent.update,
          schema: 'public',
          table: 'trades',
          filter: PostgresChangeFilter(
            type: PostgresChangeFilterType.eq,
            column: 'id',
            value: tradeId,
          ),
          callback: (payload) {
            controller.add(payload.newRecord['status'] as String);
          },
        )
        .subscribe();

    ref.onDispose(() {
      channel.unsubscribe();
      controller.close();
    });

    return controller.stream;
  },
);
```

---

## 10. Edge Function 호출 흐름 요약

### 옷 등록 플로우

```
Flutter App
  │
  ├─ 1. image_picker로 사진 촬영 (2~5장)
  │
  ├─ 2. items 테이블 INSERT (status: 'reviewing')
  │
  ├─ 3. 각 사진마다 process-image 호출 (병렬)
  │     └─ Cloudinary 업로드 → item_photos INSERT
  │
  ├─ 4. ai-review 호출
  │     ├─ 합격 → grant_leaf_for_upload RPC → 리프 +1
  │     │         └─ push-notify (review_pass)
  │     └─ 불합격 → items.status = 'rejected'
  │               └─ push-notify (review_fail)
  │
  └─ 5. 결과 화면 표시
```

### 거래 플로우

```
구매자                          판매자
  │                               │
  ├─ "채팅하기" 탭                 │
  │   └─ trades INSERT            │
  │      (status: chatting)       │
  │                               │
  ├─ messages INSERT ──────────── ├─ Realtime 수신
  │      └─ push-notify           │
  │                               │
  ├─ 예약 합의 ──────────────── ├─ 예약 합의
  │   └─ trades UPDATE            │
  │      (status: reserved)       │
  │      └─ push-notify           │
  │                               │
  ├─ 수령 확인                     │
  │   └─ complete_swap RPC        │
  │      (리프 -1, status:        │
  │       completed)              │
  │      └─ push-notify ───────── ├─ 거래 완료 알림
  │                               │
  └─ 48h 이내 신고 가능            └─ 48h 이내 신고 가능
        └─ check-report
```

---

## 11. API 호출 보안 가이드

### 인증 레벨

| 레벨 | 키 | 용도 |
|------|-----|------|
| Public | `SUPABASE_ANON_KEY` | 클라이언트에서 직접 호출 (ai-review, process-image, sponsor-serve) |
| Service | `SUPABASE_SERVICE_ROLE_KEY` | 서버 간 내부 호출 (push-notify, check-report) |

### 클라이언트 호출 예시 (Flutter)

```dart
final response = await Supabase.instance.client.functions.invoke(
  'ai-review',
  body: {
    'photos': base64Photos,
    'item_id': itemId,
    'user_id': currentUser.id,
  },
);

if (response.status == 200) {
  final review = jsonDecode(response.data);
  // review['pass'], review['reason'] 처리
}
```

### Rate Limiting 정책

| Function | 제한 | 기준 |
|----------|------|------|
| `ai-review` | 10회/일 | user_id 기준 |
| `process-image` | 50회/일 | user_id 기준 |
| `push-notify` | 100회/시간 | user_id 기준 |
| `sponsor-serve` | 제한 없음 | - |
| `verify-invite` | 5회/일 | IP 기준 |
| `check-report` | 내부 전용 | - |

The file `/Users/iseungtae/Desktop/rewear/docs/06_API_명세_Edge_Functions.md` has been created. Here is a summary of what it contains:

1. **Directory structure** for all 6 Edge Functions under `supabase/functions/`
2. **ai-review** -- Full TypeScript implementation with Gemini 3 Flash multimodal image review, including the review criteria table, related SQL functions (`grant_leaf_for_upload`, `increment_fail_count`), and the input/output/error spec table
3. **push-notify** -- Full TypeScript implementation with FCM v1 API integration, user notification preference checking, and a message template table by notification type
4. **process-image** -- Full TypeScript implementation with Cloudinary upload, thumbnail URL generation via URL transformation, and Cloudinary transformation rules table
5. **verify-invite** and **check-report** and **sponsor-serve** -- Spec tables with endpoint, request body, response, and error codes for each
6. **Trade State Machine** -- ASCII diagram showing all transitions (`chatting -> reserved -> completed`, cancellation paths, and `completed -> reported` within 48h), plus the `complete_swap` SQL function with full transactional logic
7. **Flutter Realtime code** (Dart) -- `ChatRealtimeService` for message subscription, `TradeRealtimeService` for trade status subscription, `ChatReadService` for read receipts, and Riverpod provider integration examples
8. **API call flow diagrams** for the upload and trade flows
9. **Security guide** with authentication levels and rate limiting policies