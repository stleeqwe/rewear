# LEAFIT Flutter 프로젝트 구조

> **Project Structure v1.0**
> Feature-first 아키텍처 · 디렉토리 설계 · 패키지 명세 · 화면-파일 매핑
> 최종 수정: 2026.03.11

---

## 1. 프로젝트 디렉토리 트리

```
leafit/
├── lib/
│   ├── main.dart                          # 앱 엔트리포인트 (ProviderScope, 환경 초기화)
│   ├── app.dart                           # MaterialApp.router (GoRouter, 테마 바인딩)
│   │
│   ├── core/
│   │   ├── theme/
│   │   │   ├── colors.dart                # Electric Garden 컬러 팔레트 상수
│   │   │   ├── typography.dart            # Outfit + Pretendard 텍스트 스타일
│   │   │   └── app_theme.dart             # ThemeData 통합 (라이트/다크)
│   │   ├── supabase_client.dart           # Supabase 초기화 & 싱글톤
│   │   ├── constants.dart                 # 앱 전역 상수 (뱃지 레벨, 카테고리 등)
│   │   └── router.dart                    # GoRouter 라우트 정의 & 가드
│   │
│   ├── models/
│   │   ├── user_model.dart                # 유저 프로필, 리프 잔액, 뱃지
│   │   ├── item_model.dart                # 옷 아이템 정보, 사진 URL
│   │   ├── trade_model.dart               # 거래 상태 머신 (chatting→completed)
│   │   ├── message_model.dart             # 채팅 메시지 (text/image/system)
│   │   ├── notification_model.dart        # 알림 유형 & 읽음 여부
│   │   └── leaf_transaction_model.dart    # 리프 입출금 이력 (+1/-1)
│   │
│   ├── services/
│   │   ├── auth_service.dart              # 카카오/Apple 소셜 로그인, JWT 관리
│   │   ├── item_service.dart              # 아이템 CRUD, 필터/정렬 쿼리
│   │   ├── trade_service.dart             # 거래 생성/예약/완료/취소 RPC
│   │   ├── chat_service.dart              # 메시지 전송, Realtime 구독
│   │   ├── leaf_service.dart              # 리프 잔액 조회, 트랜잭션 이력
│   │   ├── image_service.dart             # Storage 업로드, Cloudinary 처리
│   │   ├── push_service.dart              # FCM 토큰 등록, 알림 수신 핸들링
│   │   └── location_service.dart          # GPS 위치 감지, 역지오코딩
│   │
│   ├── providers/
│   │   ├── auth_provider.dart             # 인증 상태, 유저 세션
│   │   ├── items_provider.dart            # 홈 피드 아이템 목록, 필터 상태
│   │   ├── item_detail_provider.dart      # 단일 아이템 상세 + 판매자 정보
│   │   ├── trade_provider.dart            # 거래 상태, 예약/완료 액션
│   │   ├── chat_provider.dart             # 채팅 목록, 실시간 메시지 스트림
│   │   ├── leaf_provider.dart             # 리프 잔액, 트랜잭션 내역
│   │   ├── badge_provider.dart            # 뱃지 레벨 계산, 프로그레스
│   │   ├── wishlist_provider.dart         # 찜 목록 CRUD
│   │   ├── notification_provider.dart     # 알림 목록, 읽음 처리
│   │   └── profile_provider.dart          # 마이페이지 통합 데이터
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── screens/
│   │   │   │   ├── splash_screen.dart         # Forest 배경 + LEAFIT 로고 + 자동 전환
│   │   │   │   ├── onboarding_screen.dart     # 3장 스와이프 소개 (PageView)
│   │   │   │   ├── login_screen.dart          # 카카오 + Apple 소셜 로그인
│   │   │   │   ├── location_screen.dart       # GPS 동네 인증 + 수동 검색
│   │   │   │   └── first_leaf_screen.dart     # 첫 리프 지급 + 파티클 애니메이션
│   │   │   └── widgets/
│   │   │       └── (온보딩 전용 위젯)
│   │   │
│   │   ├── home/
│   │   │   ├── screens/
│   │   │   │   ├── home_screen.dart           # 헤더 + 카테고리 + 2열 그리드 + FAB
│   │   │   │   └── search_screen.dart         # 검색어 입력 + 최근/인기 + 실시간 결과
│   │   │   └── widgets/
│   │   │       ├── item_grid.dart             # 2열 아이템 그리드 (썸네일+제목+동네)
│   │   │       ├── category_chips.dart        # 전체/상의/하의/아우터/원피스 필터
│   │   │       ├── sort_bottom_sheet.dart     # 최신순/조회순/가까운순 정렬
│   │   │       └── sponsored_card.dart        # AD 태그 네이티브 광고 카드
│   │   │
│   │   ├── item/
│   │   │   ├── screens/
│   │   │   │   ├── item_detail_screen.dart    # 사진 갤러리 + 정보 + 채팅하기 CTA
│   │   │   │   ├── seller_profile_screen.dart # 판매자 뱃지 + 등록 옷 3열 그리드
│   │   │   │   ├── upload_screen.dart         # 사진 + 카테고리/사이즈/상태 입력
│   │   │   │   ├── preview_screen.dart        # 등록 전 미리보기 (상세와 동일 레이아웃)
│   │   │   │   └── review_result_screen.dart  # AI 검수 → 합격/불합격 결과
│   │   │   └── widgets/
│   │   │       ├── photo_gallery.dart         # 스와이프 사진 갤러리 + 인디케이터
│   │   │       ├── trade_method_tags.dart     # 반값택배/직거래/일반택배 태그
│   │   │       └── leaf_shortage_card.dart    # 리프 부족 시 등록 유도 Smoke 카드
│   │   │
│   │   ├── chat/
│   │   │   ├── screens/
│   │   │   │   ├── chat_list_screen.dart      # 채팅 목록 + 상태 뱃지 + 읽지않은 배지
│   │   │   │   └── chat_room_screen.dart      # 메시지 버블 + 입력창 + 거래 액션
│   │   │   └── widgets/
│   │   │       ├── chat_bubble.dart           # Forest(나)/White(상대) 메시지 버블
│   │   │       ├── pinned_item_card.dart      # 채팅방 상단 고정 아이템 카드
│   │   │       ├── quick_replies.dart         # 빠른 답장 칩 (시간/장소 등)
│   │   │       ├── appointment_card.dart      # 직거래 약속 장소 카드
│   │   │       ├── safety_notice.dart         # 안전 거래 안내 시스템 메시지
│   │   │       └── trade_action_bar.dart      # 예약하기/거래완료/취소 액션 바
│   │   │
│   │   ├── profile/
│   │   │   ├── screens/
│   │   │   │   ├── my_screen.dart             # 프로필 + 뱃지 + 리프 지갑 + 탭
│   │   │   │   ├── edit_profile_screen.dart   # 닉네임/동네 변경 + 저장
│   │   │   │   └── settings_screen.dart       # 알림 토글 + 계정 + 고객센터
│   │   │   └── widgets/
│   │   │       ├── badge_progress.dart        # 순환 뱃지 프로그레스 바
│   │   │       ├── leaf_wallet_card.dart      # Smoke 배경 리프 잔액 카드
│   │   │       ├── closet_tab.dart            # 내 옷장 탭 (등록한 옷 목록)
│   │   │       ├── exchanged_tab.dart         # 교환한 옷 탭 (가져온 옷 목록)
│   │   │       ├── wishlist_tab.dart          # 찜 목록 탭
│   │   │       ├── donate_tab.dart            # 기부하기 탭 + 기부 현황
│   │   │       ├── leaf_history.dart          # 리프 입출금 내역 리스트
│   │   │       └── invite_card.dart           # 친구 초대 공유 카드
│   │   │
│   │   └── notification/
│   │       └── screens/
│   │           └── notification_screen.dart   # 알림 목록 (검수/채팅/거래/기부)
│   │
│   └── shared/
│       └── widgets/
│           ├── leafit_button.dart             # Primary/Secondary CTA 버튼
│           ├── leafit_chip.dart               # 카테고리/사이즈 선택 칩
│           ├── leafit_toast.dart              # 하단 토스트 메시지 (pill 형태)
│           ├── leafit_bottom_sheet.dart       # 커스텀 바텀 시트
│           ├── leafit_modal.dart              # 확인/취소 모달 다이얼로그
│           ├── leaf_icon.dart                 # CustomPainter 리프 아이콘
│           ├── badge_icon.dart                # 뱃지 아이콘 + glow 효과
│           ├── status_badge.dart              # 거래 상태 뱃지 (채팅중/예약중/DONE)
│           └── tab_bar_layout.dart            # 3탭 하단 네비게이션 (홈/채팅/MY)
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_users_items.sql               # users, items, item_photos 테이블 + RLS
│   │   ├── 002_trades_messages.sql           # trades, messages 테이블 + Realtime 설정
│   │   ├── 003_leaf_wishlist_reports.sql      # leaf_transactions, wishlist, reports + RLS
│   │   └── 004_notifications_sponsors.sql    # notifications, sponsored_items + 인덱스
│   ├── functions/
│   │   ├── ai-review/index.ts                # Gemini Flash 이미지 검수
│   │   ├── push-notify/index.ts              # FCM 푸시 알림 발송
│   │   ├── process-image/index.ts            # Cloudinary 리사이징/WebP 변환
│   │   ├── verify-invite/index.ts            # 초대 코드 검증 + 양쪽 리프 지급
│   │   ├── check-report/index.ts             # 신고 누적 확인 + 제재 처리
│   │   └── sponsor-serve/index.ts            # 스폰서드 광고 노출/클릭 기록
│   └── seed.sql                              # 시드 데이터 (카테고리, 테스트 계정, 시드 재고)
│
├── assets/
│   ├── fonts/
│   │   ├── Outfit/                           # 로고, 영문 타이틀, 리프 숫자
│   │   │   ├── Outfit-Bold.ttf
│   │   │   ├── Outfit-ExtraBold.ttf
│   │   │   └── Outfit-Regular.ttf
│   │   └── Pretendard/                       # 한글 본문, 섹션 헤더
│   │       ├── Pretendard-Bold.ttf
│   │       ├── Pretendard-Regular.ttf
│   │       └── Pretendard-Medium.ttf
│   └── images/
│       ├── onboarding_1.png                  # 올리고. 받고. 스왑하고.
│       ├── onboarding_2.png                  # 가격 따윈 없어.
│       ├── onboarding_3.png                  # 스왑할수록 레벨업.
│       ├── leafit_logo.svg                   # LEAFIT 로고 벡터
│       └── leaf_icon.svg                     # 리프 화폐 아이콘 벡터
│
├── pubspec.yaml                              # 패키지 및 에셋 선언
├── analysis_options.yaml                     # Lint 규칙
└── README.md                                 # 프로젝트 소개 및 실행 방법
```

---

## 2. pubspec.yaml 전체 명세

```yaml
name: leafit
description: "LEAFIT - 옷으로 옷을 사는 순환 패션 플랫폼"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: ^3.5.0

dependencies:
  flutter:
    sdk: flutter

  # ── 상태 관리 ──
  flutter_riverpod: ^2.6.0
  riverpod_annotation: ^2.6.0

  # ── 라우팅 ──
  go_router: ^14.0.0

  # ── 백엔드 (Supabase) ──
  supabase_flutter: ^2.8.0

  # ── Firebase ──
  firebase_core: ^3.8.0
  firebase_messaging: ^15.2.0
  firebase_analytics: ^11.4.0

  # ── 이미지 ──
  cached_network_image: ^3.4.0
  image_picker: ^1.1.0
  photo_view: ^0.15.0

  # ── 위치 ──
  geolocator: ^13.0.0
  geocoding: ^3.0.0

  # ── UI / 애니메이션 ──
  smooth_page_indicator: ^1.2.0
  flutter_animate: ^4.5.0
  shimmer: ^3.0.0

  # ── 유틸리티 ──
  share_plus: ^10.1.0
  url_launcher: ^6.3.0
  intl: ^0.19.0
  uuid: ^4.5.0

  # ── 코드 생성 (어노테이션) ──
  freezed_annotation: ^2.4.0
  json_annotation: ^4.9.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^5.0.0

  # ── 코드 생성 (빌더) ──
  build_runner: ^2.4.0
  freezed: ^2.5.0
  json_serializable: ^6.8.0
  riverpod_generator: ^2.6.0

flutter:
  uses-material-design: true

  fonts:
    - family: Outfit
      fonts:
        - asset: assets/fonts/Outfit/Outfit-Regular.ttf
          weight: 400
        - asset: assets/fonts/Outfit/Outfit-Bold.ttf
          weight: 700
        - asset: assets/fonts/Outfit/Outfit-ExtraBold.ttf
          weight: 800
    - family: Pretendard
      fonts:
        - asset: assets/fonts/Pretendard/Pretendard-Regular.ttf
          weight: 400
        - asset: assets/fonts/Pretendard/Pretendard-Medium.ttf
          weight: 500
        - asset: assets/fonts/Pretendard/Pretendard-Bold.ttf
          weight: 700

  assets:
    - assets/images/
```

---

## 3. 디렉토리별 책임 정의

### 3.1 core/ — 앱 기반 인프라

| 파일 | 책임 |
|------|------|
| `theme/colors.dart` | Electric Garden 컬러 팔레트를 `Color` 상수로 정의. Lime, Forest, Chalk, Neon Mint 등 10색 |
| `theme/typography.dart` | Outfit(영문/숫자) + Pretendard(한글) TextStyle 세트. 로고, 타이틀, 본문, 서브 텍스트 |
| `theme/app_theme.dart` | `ThemeData`를 조합하여 라이트/다크 테마 반환. 버튼, 카드, 바텀시트 기본 스타일 포함 |
| `supabase_client.dart` | `Supabase.initialize()` 호출. URL/anonKey를 환경 변수에서 주입. 전역 `supabase` 인스턴스 제공 |
| `constants.dart` | 뱃지 레벨 임계값, 카테고리 목록, 사이즈 목록, 상태 열거형 등 앱 전역 상수 |
| `router.dart` | GoRouter 인스턴스. 인증 상태 기반 리디렉트 가드, 딥링크 경로, 하단 탭 ShellRoute 구성 |

### 3.2 models/ — 데이터 모델

Freezed 불변 객체로 정의. `fromJson`/`toJson` 자동 생성.

| 모델 | 매핑 테이블 | 핵심 필드 |
|------|-------------|-----------|
| `UserModel` | users | id, nickname, area, leafBalance, badgeLevel, totalUploads, totalSwaps |
| `ItemModel` | items + item_photos | id, userId, title, category, size, condition, tradeMethods, status, photos |
| `TradeModel` | trades | id, itemId, sellerId, buyerId, status, tradeMethod, buyerRating |
| `MessageModel` | messages | id, tradeId, senderId, type, content, imageUrl, isRead |
| `NotificationModel` | notifications | id, userId, type, title, body, referenceId, isRead |
| `LeafTransactionModel` | leaf_transactions | id, userId, amount(+1/-1), type, referenceId |

### 3.3 services/ — 외부 통신 레이어

Supabase, Firebase, Cloudinary 등 외부 서비스와의 통신을 캡슐화. Provider에서 호출.

| 서비스 | 책임 |
|--------|------|
| `AuthService` | 카카오 OAuth / Apple Sign-In 처리. Supabase Auth 세션 관리. 로그아웃/탈퇴 |
| `ItemService` | 아이템 등록(INSERT), 목록 조회(필터/정렬/페이지네이션), 상세 조회, 수정, 삭제 |
| `TradeService` | 거래 생성(chatting), 예약(reserved), 완료 RPC(`complete_swap`), 취소, 신고 |
| `ChatService` | 메시지 INSERT, Realtime 채널 구독(`messages` 테이블), 읽음 처리 일괄 UPDATE |
| `LeafService` | 리프 잔액 조회, 트랜잭션 내역 조회. 잔액 변경은 DB Function에서만 수행 |
| `ImageService` | Supabase Storage 업로드 → Edge Function(`process-image`) 호출 → Cloudinary URL 반환 |
| `PushService` | FCM 토큰 등록/갱신, 포그라운드/백그라운드 알림 수신 핸들링 |
| `LocationService` | Geolocator로 GPS 좌표 취득. Geocoding으로 역지오코딩(좌표 → 행정동) |

### 3.4 providers/ — 상태 관리 레이어

Riverpod Provider로 UI와 Service 사이를 연결. 비동기 상태, 캐싱, 자동 갱신 담당.

| Provider | 상태 | 주요 로직 |
|----------|------|-----------|
| `authProvider` | 인증 유저 / null | 로그인 상태 감시, 자동 리디렉트 트리거 |
| `itemsProvider` | `List<ItemModel>` | 홈 피드 목록. 카테고리/정렬 파라미터 기반 필터링, 무한 스크롤 |
| `itemDetailProvider` | `ItemModel` + `UserModel` | 아이템 ID 기반 상세 + 판매자 정보 결합 조회 |
| `tradeProvider` | `TradeModel` | 거래 상태 구독. 예약/완료/취소 액션 디스패치 |
| `chatProvider` | `List<Message>` stream | Realtime 메시지 스트림. 채팅 목록은 별도 FutureProvider |
| `leafProvider` | 잔액(int) + 내역 리스트 | 잔액 실시간 감시. 내역 페이지네이션 |
| `badgeProvider` | 현재 레벨 + 다음 레벨 진행률 | totalUploads + totalSwaps 기반 계산 |
| `wishlistProvider` | `List<ItemModel>` | 찜 추가/제거 토글. 낙관적 업데이트 |
| `notificationProvider` | `List<NotificationModel>` | 알림 목록 조회. 읽음 처리 |
| `profileProvider` | 통합 마이페이지 데이터 | 유저 + 내 아이템 + 교환 이력 + 찜 + 기부 통합 |

### 3.5 features/ — 화면 모듈

Feature-first 아키텍처로 기능별 독립 구성. 각 모듈은 `screens/`(화면)과 `widgets/`(모듈 전용 위젯)으로 분리.

| 모듈 | 화면 수 | 역할 |
|------|---------|------|
| `auth/` | 5 screens | 온보딩 전체 플로우: 스플래시 → 소개 → 로그인 → 동네 인증 → 첫 리프 |
| `home/` | 2 screens | 메인 홈 피드(2열 그리드 + 스폰서드) + 검색 화면 |
| `item/` | 5 screens | 상품 상세 + 판매자 프로필 + 옷 등록(4단계: 입력→미리보기→검수→결과) |
| `chat/` | 2 screens | 채팅 목록(상태 뱃지) + 채팅방(실시간 메시지 + 거래 액션) |
| `profile/` | 3 screens | MY 페이지(뱃지+리프지갑+4탭) + 프로필 편집 + 설정 |
| `notification/` | 1 screen | 알림 목록(검수/채팅/거래/기부 유형) |

### 3.6 shared/widgets/ — 공유 위젯

앱 전체에서 재사용되는 디자인 시스템 컴포넌트. Electric Garden 테마가 적용된 커스텀 위젯.

| 위젯 | 역할 |
|------|------|
| `leafit_button` | Primary(Lime+Forest), Secondary(Forest+White) CTA 버튼. 탭 시 scale 애니메이션 |
| `leafit_chip` | 카테고리/사이즈 선택 칩. 선택 시 Lime 배경 전환 |
| `leafit_toast` | 하단 pill 형태 토스트. slide-up + fade-in |
| `leafit_bottom_sheet` | 라운드 20px 커스텀 바텀 시트 |
| `leafit_modal` | 확인/취소 모달 다이얼로그 |
| `leaf_icon` | CustomPainter 기반 리프 아이콘. Neon Mint 색상. bounce 애니메이션 지원 |
| `badge_icon` | 뱃지 레벨별 아이콘 + glow 효과 |
| `status_badge` | 거래 상태 뱃지 — 채팅중(Mist), 예약중(Butter), DONE(Neon Mint) |
| `tab_bar_layout` | 하단 3탭 네비게이션 (홈/채팅/MY). GoRouter ShellRoute와 연동 |

### 3.7 supabase/ — 백엔드 인프라

| 디렉토리 | 내용 |
|----------|------|
| `migrations/` | 4개 SQL 마이그레이션. 테이블 생성, RLS 정책, DB Function, 인덱스, Realtime 설정 |
| `functions/` | 6개 Deno Edge Function. AI 검수, 푸시, 이미지 처리, 초대 검증, 신고 처리, 광고 기록 |
| `seed.sql` | 개발용 시드 데이터. 카테고리 목록, 테스트 유저, 시드 재고 아이템 |

### 3.8 assets/ — 정적 리소스

| 디렉토리 | 내용 |
|----------|------|
| `fonts/Outfit/` | 영문 전용 폰트. 로고(800), 타이틀(700), 리프 잔액 숫자(800) |
| `fonts/Pretendard/` | 한글 전용 폰트. 헤더(700), 본문(400), 중간(500) |
| `images/` | 온보딩 3장 이미지, LEAFIT 로고 SVG, 리프 아이콘 SVG |

---

## 4. 화면-파일 매핑 테이블

화면설계서의 Screen ID와 실제 Flutter 파일을 1:1 매핑합니다.

### FLOW 1: 온보딩

| Screen ID | 화면명 | 파일 경로 |
|-----------|--------|-----------|
| OB-01 | 스플래시 | `features/auth/screens/splash_screen.dart` |
| OB-02 ~ 04 | 서비스 소개 1~3/3 | `features/auth/screens/onboarding_screen.dart` (PageView 3페이지) |
| OB-05 | 회원가입/로그인 | `features/auth/screens/login_screen.dart` |
| OB-06 | 동네 인증 | `features/auth/screens/location_screen.dart` |
| OB-07 | 첫 리프 지급 | `features/auth/screens/first_leaf_screen.dart` |

### FLOW 2: 홈 / 검색

| Screen ID | 화면명 | 파일 경로 |
|-----------|--------|-----------|
| H-01 | 메인 홈 | `features/home/screens/home_screen.dart` |
| H-02 | 검색 화면 | `features/home/screens/search_screen.dart` |

### FLOW 3: 상세 페이지

| Screen ID | 화면명 | 파일 경로 |
|-----------|--------|-----------|
| D-01 | 상품 상세 | `features/item/screens/item_detail_screen.dart` |
| D-02 | 리프 부족 | `features/item/widgets/leaf_shortage_card.dart` (상세 내 조건부 렌더링) |
| D-03 | 내 아이템 | `features/item/screens/item_detail_screen.dart` (소유자 분기 UI) |
| D-04 | 판매자 프로필 | `features/item/screens/seller_profile_screen.dart` |

### FLOW 4: 옷 등록

| Screen ID | 화면명 | 파일 경로 |
|-----------|--------|-----------|
| R-01 | 정보 입력 | `features/item/screens/upload_screen.dart` |
| R-02 | 미리보기 | `features/item/screens/preview_screen.dart` |
| R-03 ~ 05 | AI 검수 → 합격/불합격 | `features/item/screens/review_result_screen.dart` (상태별 분기) |

### FLOW 5: 채팅

| Screen ID | 화면명 | 파일 경로 |
|-----------|--------|-----------|
| C-01 | 채팅 목록 | `features/chat/screens/chat_list_screen.dart` |
| C-02 | 채팅방 (채팅중) | `features/chat/screens/chat_room_screen.dart` |
| C-03 | 직거래 약속 카드 | `features/chat/widgets/appointment_card.dart` (채팅방 내 삽입) |
| C-04 | 예약중 상태 | `features/chat/widgets/trade_action_bar.dart` (상태 분기) |
| C-05 | 거래 완료 | `features/chat/widgets/trade_action_bar.dart` (완료 분기) |

### FLOW 6: MY 페이지

| Screen ID | 화면명 | 파일 경로 |
|-----------|--------|-----------|
| M-01 | MY 페이지 | `features/profile/screens/my_screen.dart` |
| M-02 | 교환한 옷 | `features/profile/widgets/exchanged_tab.dart` |
| M-03 | 찜 목록 | `features/profile/widgets/wishlist_tab.dart` |
| M-04 | 기부하기 | `features/profile/widgets/donate_tab.dart` |

### FLOW 7: 설정 / 알림

| Screen ID | 화면명 | 파일 경로 |
|-----------|--------|-----------|
| S-01 | 프로필 편집 | `features/profile/screens/edit_profile_screen.dart` |
| S-02 | 설정 | `features/profile/screens/settings_screen.dart` |
| S-03 | 알림 목록 | `features/notification/screens/notification_screen.dart` |

---

## 5. GoRouter 라우트 구조

```
/                           → SplashScreen (초기 진입)
/onboarding                 → OnboardingScreen
/login                      → LoginScreen
/location                   → LocationScreen
/first-leaf                 → FirstLeafScreen
/home                       → ShellRoute (TabBarLayout)
  /home                     → HomeScreen (탭 0)
  /home/search              → SearchScreen
  /chat                     → ChatListScreen (탭 1)
  /chat/:tradeId            → ChatRoomScreen
  /my                       → MyScreen (탭 2)
  /my/edit                  → EditProfileScreen
  /my/settings              → SettingsScreen
/item/:id                   → ItemDetailScreen
/item/:id/seller            → SellerProfileScreen
/upload                     → UploadScreen
/upload/preview             → PreviewScreen
/upload/review              → ReviewResultScreen
/notifications              → NotificationScreen
```

---

## 6. 코드 생성 명령어

Freezed 모델과 Riverpod Provider 코드 생성 시 아래 명령어를 사용합니다.

```bash
# 일회성 생성
dart run build_runner build --delete-conflicting-outputs

# 파일 변경 감시 (개발 중)
dart run build_runner watch --delete-conflicting-outputs
```

생성 대상 파일:
- `*.freezed.dart` — Freezed 불변 객체 (copyWith, ==, hashCode)
- `*.g.dart` — json_serializable (fromJson/toJson) + riverpod_generator (Provider)
