import { LeafitInline } from "../common/LeafitLogo";
/* ==========================================================================
   LEAFIT Chat Screens — Wireframe Components
   Design System: Electric Garden

   Exports:
     ScreenChatList        — Chat room list with sample data
     ScreenChatListEmpty   — Chat room list (empty state)
     ScreenChatRoom        — Active chat (채팅중)
     ScreenChatReserved    — Reserved state (예약중)
     ScreenChatDone        — Completed state (거래완료)
     ScreenChatAppointment — Chat with appointment card
   ========================================================================== */

// ---------------------------------------------------------------------------
// Design Tokens
// ---------------------------------------------------------------------------
const C = {
  lime: "#BEFF0A",
  forest: "#1A3C20",
  forestChat: "#2D5A27",      // my-message bubble bg
  chalk: "#F7F5F0",
  offBlack: "#111111",
  neonMint: "#4DFFA6",
  hotCoral: "#FF6B6B",
  butter: "#FFE566",
  smoke: "#2A2A2A",
  mist: "#E8E5DD",
  white: "#FFFFFF",
  chatBg: "#F5F3ED",          // chat room background
};

const FONT = {
  body: "'Pretendard Variable', 'Pretendard', 'Noto Sans KR', -apple-system, sans-serif",
  number: "'Outfit', sans-serif",
  logo: "'DM Serif Display', serif",
};

// ---------------------------------------------------------------------------
// Shared Sub-Components
// ---------------------------------------------------------------------------

/** LEAFIT logo header with notification bell & leaf balance */
function LogoHeader({ unreadTotal = 0 }) {
  return (
    <div style={{
      height: 44,
      background: C.chalk,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 14px",
      borderBottom: `1px solid ${C.mist}`,
      flexShrink: 0,
    }}>
      <LeafitInline fontSize={17} dark={false} />
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {/* Notification bell */}
        <span style={{ position: "relative", fontSize: 16, lineHeight: 1, cursor: "default" }}>
          🔔
          {unreadTotal > 0 && (
            <span style={{
              position: "absolute",
              top: -4,
              right: -6,
              minWidth: 14,
              height: 14,
              borderRadius: 7,
              background: C.hotCoral,
              color: C.white,
              fontSize: 8,
              fontWeight: 700,
              fontFamily: FONT.number,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 3px",
              lineHeight: 1,
            }}>
              {unreadTotal > 9 ? "9+" : unreadTotal}
            </span>
          )}
        </span>
        {/* Leaf balance */}
        <span style={{
          fontSize: 12,
          color: C.neonMint,
          fontWeight: 700,
          fontFamily: FONT.number,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}>
          🍃 3
        </span>
      </div>
    </div>
  );
}

/** Chat room header (back arrow, title, leaf balance) */
function ChatRoomHeader({ nickname, leafCount = 5 }) {
  return (
    <div style={{
      height: 44,
      background: C.chalk,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 14px",
      borderBottom: `1px solid ${C.mist}`,
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 18, cursor: "default", color: C.offBlack, lineHeight: 1 }}>←</span>
      <span style={{
        fontSize: 14,
        fontWeight: 700,
        color: C.offBlack,
        fontFamily: FONT.body,
      }}>
        {nickname}
      </span>
      <span style={{
        fontSize: 11,
        color: C.forestChat,
        fontWeight: 600,
        fontFamily: FONT.number,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}>
        🍃 {leafCount}
      </span>
    </div>
  );
}

/** Transaction status pill badge */
function StatusBadge({ status }) {
  const map = {
    chatting:  { bg: C.mist,                        color: "#888888", label: "채팅중" },
    reserved:  { bg: C.butter,                       color: C.forest,  label: "예약중" },
    done:      { bg: `rgba(77, 255, 166, 0.15)`,     color: C.forest,  label: "거래완료" },
  };
  const s = map[status] || map.chatting;
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "3px 8px",
      borderRadius: 10,
      fontSize: 9,
      fontWeight: 700,
      fontFamily: FONT.body,
      background: s.bg,
      color: s.color,
      whiteSpace: "nowrap",
      lineHeight: 1.2,
    }}>
      {s.label}
    </span>
  );
}

/** Unread count badge (Hot Coral) */
function UnreadBadge({ count }) {
  if (!count || count <= 0) return null;
  return (
    <span style={{
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      background: C.hotCoral,
      color: C.white,
      fontSize: 9,
      fontWeight: 700,
      fontFamily: FONT.number,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 5px",
      lineHeight: 1,
      flexShrink: 0,
    }}>
      {count > 99 ? "99+" : count}
    </span>
  );
}

/** 3-tab bottom bar (홈/채팅/MY), 채팅 always active */
function ChatTabBar({ chatBadge = 0 }) {
  const tabs = [
    { icon: "🏠", label: "홈",  id: "home" },
    { icon: "💬", label: "채팅", id: "chat" },
    { icon: "👤", label: "MY",  id: "my" },
  ];
  return (
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 54,
      background: C.white,
      borderTop: `1px solid ${C.mist}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      zIndex: 100,
    }}>
      {tabs.map((tab) => {
        const isActive = tab.id === "chat";
        return (
          <div key={tab.id} style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            padding: "6px 0 10px",
            position: "relative",
            cursor: "default",
          }}>
            <span style={{
              fontSize: 18,
              lineHeight: 1,
              filter: isActive ? "none" : "grayscale(1)",
              opacity: isActive ? 1 : 0.4,
              position: "relative",
            }}>
              {tab.icon}
              {tab.id === "chat" && chatBadge > 0 && (
                <span style={{
                  position: "absolute",
                  top: -3,
                  right: -8,
                  minWidth: 14,
                  height: 14,
                  borderRadius: 7,
                  background: C.hotCoral,
                  color: C.white,
                  fontSize: 8,
                  fontWeight: 700,
                  fontFamily: FONT.number,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 3px",
                  lineHeight: 1,
                }}>
                  {chatBadge > 99 ? "99+" : chatBadge}
                </span>
              )}
            </span>
            <span style={{
              fontSize: 9,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? C.forest : C.mist,
              fontFamily: FONT.body,
            }}>
              {tab.label}
            </span>
            {isActive && (
              <span style={{
                position: "absolute",
                bottom: 4,
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: C.lime,
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Pinned item card at the top of chat rooms */
function PinnedItemCard({ emoji = "🧥", itemName, subText, status }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 14px",
      background: C.white,
      borderBottom: `1px solid ${C.mist}`,
      cursor: "default",
      flexShrink: 0,
    }}>
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 10,
        background: "#F0EDE5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        flexShrink: 0,
      }}>
        {emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 12,
          fontWeight: 600,
          color: C.offBlack,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {itemName}
        </div>
        <div style={{ fontSize: 10, color: "#999", marginTop: 1 }}>
          {subText}
        </div>
      </div>
      <StatusBadge status={status} />
    </div>
  );
}

/** Safety notice banner */
function SafetyNotice() {
  return (
    <div style={{
      margin: "6px 12px 8px",
      padding: "8px 12px",
      background: "#FFF8E8",
      borderRadius: 12,
      fontSize: 10,
      color: "#8B6914",
      lineHeight: 1.5,
      textAlign: "center",
      fontWeight: 500,
    }}>
      🛡️ LEAFIT 안에서 대화해. 외부 메신저 유도는 주의 🛡️
    </div>
  );
}

/** My message bubble (right-aligned, forest bg, white text) */
function MyMsg({ text, time }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      padding: "3px 12px",
    }}>
      <div style={{
        maxWidth: "75%",
        background: C.forestChat,
        color: C.white,
        fontSize: 11,
        lineHeight: 1.5,
        padding: "8px 12px",
        borderRadius: "14px 14px 4px 14px",
        fontFamily: FONT.body,
        wordBreak: "break-word",
      }}>
        {text}
      </div>
      <div style={{ fontSize: 8, color: "#BBB", marginTop: 2, paddingRight: 2 }}>
        {time}
      </div>
    </div>
  );
}

/** Other-person message bubble (left-aligned, white bg, profile icon) */
function OtherMsg({ text, time, profileEmoji = "🌿" }) {
  return (
    <div style={{
      display: "flex",
      gap: 6,
      padding: "3px 12px",
      alignItems: "flex-start",
    }}>
      <div style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "#D4F0D0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        flexShrink: 0,
        marginTop: 2,
      }}>
        {profileEmoji}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", maxWidth: "75%" }}>
        <div style={{
          background: C.white,
          color: C.offBlack,
          fontSize: 11,
          lineHeight: 1.5,
          padding: "8px 12px",
          borderRadius: "14px 14px 14px 4px",
          fontFamily: FONT.body,
          wordBreak: "break-word",
          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
        }}>
          {text}
        </div>
        <div style={{ fontSize: 8, color: "#BBB", marginTop: 2, paddingLeft: 2 }}>
          {time}
        </div>
      </div>
    </div>
  );
}

/** System message (centered, light gray, no bubble) */
function SystemMsg({ text }) {
  return (
    <div style={{
      textAlign: "center",
      padding: "6px 12px",
      fontSize: 9,
      color: "#BBB",
      fontFamily: FONT.body,
    }}>
      {text}
    </div>
  );
}

/** Quick reply chips (horizontal scroll) */
function QuickChips({ chips }) {
  return (
    <div style={{
      display: "flex",
      gap: 6,
      padding: "6px 14px",
      overflowX: "auto",
      flexShrink: 0,
    }}>
      {chips.map((chip, i) => (
        <span key={i} style={{
          padding: "6px 10px",
          borderRadius: 20,
          border: `1px solid ${C.mist}`,
          background: C.white,
          fontSize: 10,
          color: "#666",
          fontWeight: 500,
          whiteSpace: "nowrap",
          cursor: "default",
          flexShrink: 0,
        }}>
          {chip}
        </span>
      ))}
    </div>
  );
}

/** Chat input bar with camera button, text field, and optional right button */
function ChatInputBar({ rightButton }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 14px 12px",
      borderTop: `1px solid ${C.mist}`,
      background: C.white,
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 18, cursor: "default", lineHeight: 1, flexShrink: 0 }}>📷</span>
      <div style={{
        flex: 1,
        height: 32,
        borderRadius: 16,
        background: "#F5F3ED",
        display: "flex",
        alignItems: "center",
        paddingLeft: 12,
        fontSize: 11,
        color: "#AAA",
      }}>
        메시지 입력...
      </div>
      {rightButton}
    </div>
  );
}

/** Reservation button used in active chat input bar */
function ReserveButton() {
  return (
    <div style={{
      background: "#8B6914",
      color: C.white,
      padding: "7px 12px",
      borderRadius: 10,
      fontSize: 11,
      fontWeight: 700,
      whiteSpace: "nowrap",
      cursor: "default",
      flexShrink: 0,
    }}>
      예약하기
    </div>
  );
}

/** Appointment card shown inside chat messages */
function AppointmentCard() {
  return (
    <div style={{
      margin: "6px 12px",
      padding: "12px 14px",
      background: "#F5F2EA",
      borderRadius: 14,
      cursor: "default",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: 14 }}>📍</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: C.offBlack }}>직거래 약속</span>
      </div>
      <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5, marginBottom: 2 }}>
        마포구 연남동 (채팅에서 협의)
      </div>
      <div style={{ fontSize: 10, color: "#999" }}>
        안전한 장소에서 만나 🤝
      </div>
    </div>
  );
}

// Quick-reply chip data reused across multiple screens
const QUICK_CHIPS = [
  "직거래 가능해요?",
  "반값택배로 보내줄 수 있어요?",
  "상태 더 알려줘요",
  "사진 더 보여줘요",
];


/* ==========================================================================
   1. ScreenChatList — Chat Room List
   ========================================================================== */

export function ScreenChatList() {
  const chats = [
    {
      id: 1,
      nickname: "초록옷장",
      badge: "🌿",
      emoji: "🧥",
      itemName: "COS 울코트",
      lastMessage: "사이즈 어때요?",
      time: "방금",
      status: "chatting",
      unread: 2,
    },
    {
      id: 2,
      nickname: "빈티지러버",
      badge: "🌱",
      emoji: "👖",
      itemName: "자라 와이드팬츠",
      lastMessage: "직거래 장소 어디로?",
      time: "10분 전",
      status: "reserved",
      unread: 0,
    },
    {
      id: 3,
      nickname: "미니멀리스트",
      badge: "🌿",
      emoji: "👗",
      itemName: "H&M 원피스",
      lastMessage: "SWAP DONE 🤝",
      time: "어제",
      status: "done",
      unread: 0,
    },
  ];

  const totalUnread = chats.reduce((sum, r) => sum + r.unread, 0);

  return (
    <div style={{ background: C.chalk, height: "100%", position: "relative" }}>
      <LogoHeader unreadTotal={totalUnread} />

      {/* Section title */}
      <div style={{
        padding: "10px 16px 4px",
        fontSize: 16,
        fontWeight: 700,
        color: C.offBlack,
        fontFamily: FONT.body,
      }}>
        채팅
      </div>

      {/* Chat room cards */}
      <div style={{ padding: "0 12px", paddingBottom: 62, overflowY: "auto" }}>
        {chats.map((chat) => (
          <div key={chat.id} style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 4px",
            borderBottom: `1px solid ${C.mist}40`,
            cursor: "default",
          }}>
            {/* Item thumbnail 48x48 */}
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#F0EDE5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              flexShrink: 0,
            }}>
              {chat.emoji}
            </div>

            {/* Middle content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Row 1: nickname + badge + time */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.offBlack }}>{chat.nickname}</span>
                <span style={{ fontSize: 10 }}>{chat.badge}</span>
                <span style={{
                  fontSize: 9,
                  color: "#BBB",
                  marginLeft: "auto",
                  flexShrink: 0,
                }}>
                  {chat.time}
                </span>
              </div>
              {/* Row 2: last message (1-line ellipsis) */}
              <div style={{
                fontSize: 11,
                color: C.offBlack,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginBottom: 2,
              }}>
                {chat.lastMessage}
              </div>
              {/* Row 3: item name (light gray) */}
              <div style={{ fontSize: 9, color: "#BBB" }}>
                {chat.itemName}
              </div>
            </div>

            {/* Right: status badge + unread */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 5,
              flexShrink: 0,
            }}>
              <StatusBadge status={chat.status} />
              <UnreadBadge count={chat.unread} />
            </div>
          </div>
        ))}
      </div>

      <ChatTabBar chatBadge={totalUnread} />
    </div>
  );
}


/* ==========================================================================
   1b. ScreenChatListEmpty — Chat Room List (Empty State)
   ========================================================================== */

export function ScreenChatListEmpty() {
  return (
    <div style={{ background: C.chalk, height: "100%", position: "relative" }}>
      <LogoHeader />

      {/* Section title */}
      <div style={{
        padding: "10px 16px 4px",
        fontSize: 16,
        fontWeight: 700,
        color: C.offBlack,
        fontFamily: FONT.body,
      }}>
        채팅
      </div>

      {/* Empty state */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "70px 24px 0",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>💬</div>
        <div style={{
          fontSize: 20,
          fontWeight: 700,
          color: C.offBlack,
          marginBottom: 6,
        }}>
          아직 채팅 없음
        </div>
        <div style={{
          fontSize: 13,
          color: C.mist,
          lineHeight: 1.5,
        }}>
          맘에 드는 거 찾으면 바로 채팅 GO
        </div>
      </div>

      <ChatTabBar chatBadge={0} />
    </div>
  );
}


/* ==========================================================================
   2. ScreenChatRoom — Active Chat (채팅중 state)
   ========================================================================== */

export function ScreenChatRoom() {
  return (
    <div style={{
      background: C.chatBg,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      <ChatRoomHeader nickname="초록옷장" leafCount={5} />

      <PinnedItemCard
        emoji="🧥"
        itemName="COS 울 블렌드 코트"
        subText="M · 거의 안입음"
        status="chatting"
      />

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 2, paddingBottom: 2 }}>
        <SafetyNotice />
        <SystemMsg text="채팅이 시작되었습니다" />

        <OtherMsg
          text="안녕하세요! 코트 상태 궁금해서요"
          time="오후 2:30"
        />
        <MyMsg
          text="네! 거의 새거예요 2번 입었습니다"
          time="오후 2:31"
        />
        <OtherMsg
          text="오 좋네요! 사이즈 어때요?"
          time="오후 2:32"
        />
        <MyMsg
          text="저 M 사이즈인데 약간 오버핏이에요. 편하게 입기 좋아요!"
          time="오후 2:33"
        />
      </div>

      {/* Quick reply chips */}
      <QuickChips chips={QUICK_CHIPS} />

      {/* Input bar with 예약하기 button */}
      <ChatInputBar rightButton={<ReserveButton />} />
    </div>
  );
}


/* ==========================================================================
   3. ScreenChatReserved — Reserved State (예약중)
   ========================================================================== */

export function ScreenChatReserved() {
  return (
    <div style={{
      background: C.chatBg,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      <ChatRoomHeader nickname="빈티지러버" leafCount={5} />

      <PinnedItemCard
        emoji="👖"
        itemName="자라 와이드팬츠"
        subText="S · 새것같음"
        status="reserved"
      />

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 2, paddingBottom: 2 }}>
        <SafetyNotice />
        <SystemMsg text="채팅이 시작되었습니다" />

        <OtherMsg
          text="연남동 카페 앞에서 만날까요?"
          time="오후 3:00"
          profileEmoji="🌱"
        />
        <MyMsg
          text="좋아요! 내일 오후 2시에요"
          time="오후 3:01"
        />
        <OtherMsg
          text="네 그때 봐요!"
          time="오후 3:02"
          profileEmoji="🌱"
        />
        <SystemMsg text="예약이 확정되었습니다" />
      </div>

      {/* Reserved bottom area */}
      <div style={{ flexShrink: 0, background: C.white, borderTop: `1px solid ${C.mist}` }}>
        {/* Info card (Butter bg) */}
        <div style={{
          margin: "10px 14px 8px",
          padding: "10px 12px",
          background: `${C.butter}30`,
          borderRadius: 12,
          fontSize: 10,
          color: "#8B6914",
          lineHeight: 1.5,
          textAlign: "center",
          fontWeight: 500,
        }}>
          📌 예약 잠김 — 거래 끝나면 아래 버튼 눌러. 리프는 완료 시 차감.
        </div>

        {/* [거래 완료] full-width button */}
        <div style={{ padding: "0 14px 4px" }}>
          <div style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: 14,
            background: C.lime,
            color: C.forest,
            fontSize: 13,
            fontWeight: 700,
            textAlign: "center",
            cursor: "default",
            fontFamily: FONT.body,
          }}>
            거래 완료
          </div>
        </div>

        {/* [거래 취소] link (Hot Coral) */}
        <div style={{
          textAlign: "center",
          padding: "6px 0 12px",
          fontSize: 11,
          color: C.hotCoral,
          fontWeight: 600,
          cursor: "default",
        }}>
          거래 취소
        </div>
      </div>
    </div>
  );
}


/* ==========================================================================
   4. ScreenChatDone — Completed (거래완료)
   ========================================================================== */

export function ScreenChatDone() {
  return (
    <div style={{
      background: C.chatBg,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      <ChatRoomHeader nickname="초록옷장" leafCount={4} />

      <PinnedItemCard
        emoji="🧥"
        itemName="COS 울 블렌드 코트"
        subText="M · 거의 안입음"
        status="done"
      />

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 2, paddingBottom: 2 }}>
        <SystemMsg text="채팅이 시작되었습니다" />

        <OtherMsg
          text="안녕하세요! 코트 교환 감사해요"
          time="오후 2:30"
        />
        <MyMsg
          text="네! 거의 새거예요. 잘 입으세요!"
          time="오후 2:31"
        />
        <MyMsg
          text="잘 받았습니다! 감사해요 😊"
          time="오후 4:00"
        />
        <SystemMsg text="🤝 거래가 완료되었습니다" />
      </div>

      {/* Done bottom area */}
      <div style={{ flexShrink: 0, padding: "0 14px 12px" }}>
        {/* Celebration card (Forest bg) */}
        <div style={{
          background: C.forest,
          borderRadius: 16,
          padding: "18px 16px",
          textAlign: "center",
          marginBottom: 8,
        }}>
          <div style={{
            fontSize: 22,
            fontWeight: 800,
            color: C.lime,
            fontFamily: FONT.number,
            letterSpacing: 1,
            marginBottom: 4,
          }}>
            SWAP DONE 🤝
          </div>
          <div style={{
            fontSize: 12,
            color: C.white,
            opacity: 0.9,
            lineHeight: 1.5,
          }}>
            (초록옷장)와의 거래 어땠어?
          </div>
        </div>

        {/* Rating buttons side by side */}
        <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <div style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 12,
            background: C.chalk,
            color: C.offBlack,
            fontSize: 13,
            fontWeight: 600,
            textAlign: "center",
            cursor: "default",
            border: `1px solid ${C.mist}`,
          }}>
            좋았어 👍
          </div>
          <div style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 12,
            background: C.chalk,
            color: C.offBlack,
            fontSize: 13,
            fontWeight: 600,
            textAlign: "center",
            cursor: "default",
            border: `1px solid ${C.mist}`,
          }}>
            별로야 👎
          </div>
        </div>

        {/* Report link */}
        <div style={{
          textAlign: "center",
          fontSize: 10,
          color: C.hotCoral,
          cursor: "default",
        }}>
          문제 있어? 48시간 내 신고 가능
        </div>
      </div>
    </div>
  );
}


/* ==========================================================================
   5. ScreenChatAppointment — With Appointment Card
   ========================================================================== */

export function ScreenChatAppointment() {
  return (
    <div style={{
      background: C.chatBg,
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      <ChatRoomHeader nickname="빈티지러버" leafCount={5} />

      <PinnedItemCard
        emoji="👖"
        itemName="자라 와이드팬츠"
        subText="S · 새것같음"
        status="chatting"
      />

      {/* Messages with appointment card */}
      <div style={{ flex: 1, overflowY: "auto", paddingTop: 2, paddingBottom: 2 }}>
        <SafetyNotice />
        <SystemMsg text="채팅이 시작되었습니다" />

        <OtherMsg
          text="안녕하세요~ 팬츠 상태 좋아요!"
          time="오후 3:00"
          profileEmoji="🌱"
        />
        <MyMsg
          text="직거래로 하고 싶어요! 연남동 어때요?"
          time="오후 3:02"
        />
        <OtherMsg
          text="좋아요! 토요일 2시에 연남동 카페에서 만나요!"
          time="오후 3:05"
          profileEmoji="🌱"
        />

        {/* Appointment card */}
        <AppointmentCard />

        <MyMsg
          text="확인했어요! 토요일에 봐요 😊"
          time="오후 3:08"
        />
      </div>

      {/* Quick reply chips */}
      <QuickChips chips={QUICK_CHIPS} />

      {/* Input bar with 예약하기 button */}
      <ChatInputBar rightButton={<ReserveButton />} />
    </div>
  );
}
