import { useState } from "react";

// === Screen Imports ===
import {
  ScreenSplash, ScreenIntro1, ScreenIntro2, ScreenIntro3,
  ScreenLogin, ScreenPhoneLogin, ScreenFirstLeaf,
} from "./onboarding/OnboardingScreens";

import { ScreenHome, ScreenSearch } from "./home/HomeScreens";

import {
  ScreenDetail, ScreenDetailNoLeaf, ScreenDetailMine, ScreenSellerProfile,
  ScreenRegisterStep0, ScreenRegisterStep1, ScreenRegisterStep2,
  ScreenRegisterStep3, ScreenRegisterStep4, ScreenEditItem,
} from "./detail/DetailScreens";

import {
  ScreenChatList, ScreenChatRoom, ScreenChatReserved,
  ScreenChatDone, ScreenChatAppointment,
} from "./chat/ChatScreens";

import {
  ScreenMyPage, ScreenExchanged, ScreenWishlist,
  ScreenDonate, ScreenCloset, ScreenProfileEdit, ScreenSettings,
  ScreenBlockedUsers, ScreenInviteCode, ScreenNotifications,
} from "./mypage/MyPageScreens";

// === Flow definitions ===
const flows = [
  { id: "auth", label: "온보딩/인증", icon: "🚀" },
  { id: "home", label: "홈 / 검색", icon: "🏠" },
  { id: "item", label: "아이템", icon: "👕" },
  { id: "chat", label: "채팅", icon: "💬" },
  { id: "profile", label: "MY/프로필", icon: "👤" },
  { id: "notification", label: "알림", icon: "🔔" },
];

const flowDescriptions = {
  auth: "스플래시 → 서비스 소개(3장) → 카카오/애플/전화번호 로그인 + 둘러보기(Anonymous) → 첫 리프 지급. \"Electric Garden\" 다크↔라이트 전환.",
  home: "LEAFIT 로고 + 알림 + 리프 잔액 헤더. 카테고리 필터 10개(전체/상의/하의/아우터/원피스/가방/모자/신발/악세서리/기타) + 정렬(최신순/조회순). 2열 그리드 + 스폰서드 아이템. FAB로 옷 등록 진입.",
  item: "상품 상세 + 옷 등록(업로드→미리보기→AI검수) + 수정. 6개 화면 통합. 리프 부족 시 등록 유도, 내 아이템이면 수정/삭제. review_result_screen에서 상태별 분기.",
  chat: "채팅 목록 + 채팅방. 약속/예약/완료는 채팅방 내 위젯으로 통합. pinned_item_card, quick_replies, chat_input_bar, trade_action_bar, reservation_bubble, report_bottom_sheet.",
  profile: "프로필(이모지) + 뱃지 + 리프 지갑 + 내 옷장/교환/찜/기부 + 설정/차단유저/초대코드. 9개 화면.",
  notification: "알림 목록. 검수/채팅/예약/거래/초대/기부 알림. 읽지않은 알림 초록 점.",
};

// === Phone frame ===
function Phone({ title, screenId, children, annotation, dark }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <div style={{
        fontSize: 10, fontWeight: 700, color: "#BEFF0A", letterSpacing: 1.5,
        textTransform: "uppercase", fontFamily: "'Outfit', sans-serif",
        background: "#1A3C20", padding: "3px 10px", borderRadius: 10,
      }}>{screenId}</div>
      <div className="phone-frame" style={{
        border: "3px solid #1A3C20",
        boxShadow: "0 8px 32px rgba(26,60,32,0.15)",
      }}>
        {/* Status bar — fixed height */}
        <div style={{
          height: 36, flexShrink: 0,
          background: dark ? "#1A3C20" : "#111111",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 20px", fontSize: 10, color: "#FFF",
        }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>9:41</span>
          <span style={{ fontSize: 8 }}>●●●● WiFi 🔋</span>
        </div>
        {/* Screen title bar — fixed height, conditional */}
        {title && (
          <div style={{
            height: 44, flexShrink: 0,
            background: dark ? "#1A3C20" : "#FAFAF5",
            display: "flex", alignItems: "center", justifyContent: "center",
            borderBottom: dark ? "1px solid #2D5A27" : "1px solid #E8E5DD",
            fontSize: 14, fontWeight: 700,
            color: dark ? "#FFF" : "#111111",
          }}>{title}</div>
        )}
        {/* Content — fills remaining space, scrolls internally */}
        <div className="phone-content">{children}</div>
        {/* Home indicator — fixed */}
        <div style={{
          height: 28, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 100, height: 4, borderRadius: 2, background: dark ? "#2D5A27" : "#DDD" }} />
        </div>
      </div>
      {annotation && <div className="phone-annotation">{annotation}</div>}
    </div>
  );
}

function Arrow() {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      width: 40, flexShrink: 0, alignSelf: "center", marginTop: -40,
    }}>
      <svg width="32" height="24" viewBox="0 0 32 24">
        <path d="M0 12 L24 12 M18 6 L24 12 L18 18" stroke="#BEFF0A" strokeWidth="2.5" fill="none" />
      </svg>
    </div>
  );
}

// === Flow screen definitions ===
function getFlowScreens() {
  return {
    auth: [
      { comp: <ScreenSplash />, id: "OB-01", title: null, dark: true, annotation: "스플래시. Forest 배경 + LEAFIT 로고 + Leaf 아이콘 + 'SWAP IS THE NEW SHOP' 태그라인. 1.5초 후 자동 전환." },
      { comp: <ScreenIntro1 />, id: "OB-02", title: null, dark: true, annotation: "서비스 소개 1/3. '올리고. 받고. 스왑하고.' 옷→리프 교환 설명." },
      { comp: <ScreenIntro2 />, id: "OB-03", title: null, dark: true, annotation: "서비스 소개 2/3. '가격 따윈 없어.' 모든 옷 = 리프 1개 통일." },
      { comp: <ScreenIntro3 />, id: "OB-04", title: null, dark: true, annotation: "서비스 소개 3/3. '스왑할수록 레벨업.' 🌱→🪐 뱃지 시스템 소개." },
      { comp: <ScreenLogin />, id: "OB-05", title: null, annotation: "회원가입/로그인. 다크→라이트 전환. 카카오 + Apple + 전화번호 로그인 + 둘러보기(Anonymous)." },
      { comp: <ScreenPhoneLogin />, id: "OB-06", title: null, annotation: "전화번호 로그인. 전화번호 입력 + OTP 6자리 인증. 2:59 타이머 + 재전송." },
      { comp: <ScreenFirstLeaf />, id: "OB-07", title: null, dark: true, annotation: "첫 리프 지급. 🍃 1 LEAF GET! signup_bonus. 파티클 애니메이션 + 홈 유도." },
    ],
    home: [
      { comp: <ScreenHome />, id: "H-01", title: null, annotation: "메인 홈. LEAFIT 헤더(로고+검색+알림+리프). 카테고리 칩 10개 + 정렬(최신순/조회순). 2열 그리드 + 스폰서드 아이템. Lime FAB." },
      { comp: <ScreenSearch />, id: "H-02", title: null, annotation: "검색 화면. 최근 검색어(개별/전체 삭제) + 인기 검색어 칩. 실시간 결과 매칭." },
    ],
    item: [
      { comp: <ScreenDetail />, id: "I-01", title: "← 상세", annotation: "상품 상세. 사진 갤러리(스와이프) + 상품 정보 + 판매자(뱃지) + 거래 방법 태그. [채팅하기] CTA. 아이템 상태: reviewing/active/reserved/swapped/donated/rejected/deleted." },
      { comp: <ScreenDetailNoLeaf />, id: "I-02", title: "← 상세", annotation: "리프 부족 시. Smoke 카드로 '리프 없음 — 올려서 벌어 💪' 안내. [옷 올리러 가기] 유도." },
      { comp: <ScreenDetailMine />, id: "I-03", title: "← 상세", annotation: "내 아이템. '이건 네 옷이야 ✌️' Forest 카드 + [수정하기] [삭제하기] 버튼." },
      { comp: <ScreenSellerProfile />, id: "I-04", title: null, annotation: "판매자 프로필. 프로필 이모지 + 뱃지 + 순환 횟수 + 등록 옷 3열 그리드." },
      { comp: <ScreenRegisterStep0 />, id: "I-05", title: "옷 등록", annotation: "정보 입력. 사진(최소2장) + 카테고리 9개 + 사이즈(XS~FREE) + 상태(거의 새거/양호/사용감있음/해짐) + 설명 + 거래 방법(복수)." },
      { comp: <ScreenRegisterStep1 />, id: "I-06", title: "미리보기", annotation: "등록 전 미리보기. 상세 페이지와 동일 레이아웃으로 확인. 수정 링크." },
      { comp: <ScreenRegisterStep2 />, id: "I-07", title: "AI 검수", annotation: "AI 검수 중(Gemini 2.5 Flash). Lime 스피너 + '잠깐만, 확인하는 중 🔍'. review_result_screen에서 상태별 분기." },
      { comp: <ScreenRegisterStep3 />, id: "I-08", title: null, dark: true, annotation: "합격! '통과 ✅ LEAF GET!' Forest 다크 + 리프 카드(Smoke) + upload 트랜잭션." },
      { comp: <ScreenRegisterStep4 />, id: "I-09", title: "검수 결과", annotation: "불합격. rejection_reason 카드 + 검수 기준(Smoke 카드) + [다시 올리기]. 5회 연속 실패 시 계정 정지." },
      { comp: <ScreenEditItem />, id: "I-10", title: "← 수정", annotation: "아이템 수정. 기존 데이터 pre-filled. 사진/카테고리/사이즈/상태/설명/거래방법 변경 가능." },
    ],
    chat: [
      { comp: <ScreenChatList />, id: "C-01", title: null, annotation: "채팅 목록. 아이템 썸네일 + 닉네임 + 마지막 메시지 + 상태 뱃지(채팅중/예약중/DONE) + 읽지않은 배지. 거래 상태 6가지: chatting/reserved/completed/cancelled/reported/refunded." },
      { comp: <ScreenChatRoom />, id: "C-02", title: "초록옷장", annotation: "채팅방 (채팅중). pinned_item_card + 안전 거래 안내(safety 메시지) + 메시지 버블(5유형: text/image/system/appointment/safety) + quick_replies + chat_input_bar + [예약하기]." },
      { comp: <ScreenChatAppointment />, id: "C-03", title: "빈티지러버", annotation: "직거래 약속. 채팅방 내 system 메시지로 표시. 📍 장소 + '안전한 장소에서 만나 🤝'." },
      { comp: <ScreenChatReserved />, id: "C-04", title: "초록옷장", annotation: "예약중 상태. 채팅방 내 trade_action_bar 상태로 표시. 📌 '예약 잠김' Butter 카드 + [거래 완료] + [거래 취소]." },
      { comp: <ScreenChatDone />, id: "C-05", title: "초록옷장", annotation: "거래 완료. 채팅방 내 reservation_bubble로 표시. 'SWAP DONE 🤝' + 평가(👍/👎) + 48시간 신고 + report_bottom_sheet." },
    ],
    profile: [
      { comp: <ScreenMyPage />, id: "P-01", title: null, annotation: "MY 페이지. 프로필 이모지(24종 동물) + 뱃지 프로그레스(🌱→🪐) + 리프 지갑(Smoke/Neon Mint) + 4개 서브탭(내 옷장/교환한 옷/찜/기부) + 리프 내역 + 친구 초대." },
      { comp: <ScreenExchanged />, id: "P-02", title: null, annotation: "교환한 옷 탭. 가져온 옷 리스트 + 원래 판매자 + 교환일." },
      { comp: <ScreenWishlist />, id: "P-03", title: null, annotation: "찜 목록 탭. ♥ 누른 아이템 + 사이즈 + 판매자 동네. 탭→상세." },
      { comp: <ScreenDonate />, id: "P-04", title: null, annotation: "기부하기 탭. 🎁 '새 생명 ON' + [기부] 버튼 + 기부 현황. donate 트랜잭션." },
      { comp: <ScreenCloset />, id: "P-05", title: "← 내 옷장", annotation: "내 등록 아이템 그리드. 상태별 필터: active(판매중) / reserved(예약중) / swapped(교환완료)." },
      { comp: <ScreenProfileEdit />, id: "P-06", title: "← 프로필 편집", annotation: "프로필 편집. 프로필 이모지 선택(24종) + 닉네임 변경 + 동네 변경 + [저장] CTA." },
      { comp: <ScreenSettings />, id: "P-07", title: "← 설정", annotation: "설정. 알림 토글(채팅/거래/신상품) + 차단 유저 관리 + 계정(로그아웃/탈퇴) + 고객센터 + 앱 정보." },
      { comp: <ScreenBlockedUsers />, id: "P-08", title: "← 차단 유저", annotation: "차단 유저 목록. 차단 해제 버튼. blocks 테이블 기반." },
      { comp: <ScreenInviteCode />, id: "P-09", title: "← 초대 코드", annotation: "초대 코드 + QR 코드 + 공유. invite_bonus 트랜잭션 (둘 다 🍃 +1)." },
    ],
    notification: [
      { comp: <ScreenNotifications />, id: "N-01", title: "← 알림", annotation: "알림 목록. ✅검수 / 💬채팅 / 📌예약 / 🤝거래 / 🎉초대(invite_reward) / 🎁기부. 읽지않은 알림 초록 점." },
    ],
  };
}

// === MAIN COMPONENT ===
export default function ScreenDesign() {
  const [activeFlow, setActiveFlow] = useState("auth");
  const flowScreens = getFlowScreens();
  const screens = flowScreens[activeFlow] || [];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7F5F0",
      fontFamily: "'Pretendard Variable', 'Pretendard', 'Noto Sans KR', -apple-system, sans-serif",
      color: "#111111",
    }}>
      {/* Header */}
      <div className="screen-header" style={{ background: "#1A3C20" }}>
        <div style={{
          fontSize: 10, letterSpacing: 3, color: "#BEFF0A", textTransform: "uppercase",
          marginBottom: 8, fontFamily: "'Outfit', sans-serif", fontWeight: 600,
        }}>Screen Design v2.2 — Electric Garden</div>
        <h1 style={{ color: "#FFF" }}>
          <span style={{ color: "#BEFF0A" }}>LEAF</span><span style={{ color: "#4DFFA6" }}>I</span><span style={{ color: "#FFF" }}>T</span> 화면설계서
        </h1>
        <p style={{ color: "#A8D5A0", fontSize: 13, margin: 0 }}>SWAP IS THE NEW SHOP — 전체 화면 구조 및 유저 플로우</p>
      </div>

      {/* Flow navigation */}
      <div style={{
        display: "flex", gap: 0, background: "#2A2A2A", overflowX: "auto",
        position: "sticky", top: 52, zIndex: 90,
      }}>
        {flows.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFlow(f.id)}
            style={{
              flex: "0 0 auto", padding: "12px 16px", border: "none",
              background: activeFlow === f.id ? "#1A3C20" : "transparent",
              color: activeFlow === f.id ? "#BEFF0A" : "#888",
              fontSize: 12, fontWeight: activeFlow === f.id ? 700 : 400,
              cursor: "pointer",
              borderBottom: activeFlow === f.id ? "3px solid #BEFF0A" : "3px solid transparent",
              whiteSpace: "nowrap", transition: "all 0.2s ease",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <span style={{ fontSize: 13 }}>{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>

      {/* Flow description */}
      <div className="screen-flow-desc">
        <div style={{
          fontSize: 11, color: "#1A3C20", fontWeight: 700, letterSpacing: 1,
          marginBottom: 4, fontFamily: "'Outfit', sans-serif",
        }}>
          FLOW: {flows.find(f => f.id === activeFlow)?.label}
        </div>
        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>
          {flowDescriptions[activeFlow]}
        </div>
      </div>

      {/* Screens */}
      <div className="screen-phones-wrapper">
        {screens.map((s, i) => (
          <div key={`${activeFlow}-${i}`} style={{ display: "flex", alignItems: "flex-start" }}>
            <Phone title={s.title} screenId={s.id} annotation={s.annotation} dark={s.dark}>
              {s.comp}
            </Phone>
            {i < screens.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
    </div>
  );
}
