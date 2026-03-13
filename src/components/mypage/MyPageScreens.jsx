import { useState } from "react";

// ── Design System Colors ──
const C = {
  lime: "#BEFF0A",
  forest: "#1A3C20",
  chalk: "#F7F5F0",
  offBlack: "#111111",
  neonMint: "#4DFFA6",
  hotCoral: "#FF6B6B",
  butter: "#FFE566",
  smoke: "#2A2A2A",
  mist: "#E8E5DD",
};

const fonts = {
  logo: "'DM Serif Display', serif",
  body: "'Pretendard', 'Noto Sans KR', -apple-system, sans-serif",
  accent: "'Outfit', 'Pretendard', sans-serif",
};

// ── Sample Data ──
const USER = {
  nickname: "리웨어러_민지",
  neighborhood: "마포구 연남동",
  badgeLevel: "green", // sprout, green, tree, earth, universe
  badgeName: "그린",
  badgeEmoji: "🌿",
  circulationCount: 12,
  registered: 5,
  exchanged: 3,
  donated: 2,
  leafBalance: 5,
};

const BADGES = [
  { emoji: "🌱", name: "새싹", threshold: 3, color: C.neonMint },
  { emoji: "🌿", name: "그린", threshold: 10, color: "#66FF99" },
  { emoji: "🌳", name: "트리", threshold: 30, color: C.lime },
  { emoji: "🌍", name: "어스", threshold: 100, color: C.butter },
  { emoji: "🪐", name: "유니버스", threshold: 1000, color: C.hotCoral },
];

const MY_CLOSET_ITEMS = [
  { id: 1, emoji: "👕", name: "유니클로 린넨 셔츠", size: "M", condition: "새것같음", status: "등록중" },
  { id: 2, emoji: "👖", name: "자라 와이드 팬츠", size: "S", condition: "거의 안입음", status: "등록중" },
  { id: 3, emoji: "🧥", name: "COS 울 블렌드 코트", size: "M", condition: "살짝 사용감", status: "등록중" },
  { id: 4, emoji: "👗", name: "H&M 플로럴 원피스", size: "S", condition: "새것같음", status: "검수중" },
];

const EXCHANGED_ITEMS = [
  { id: 10, emoji: "👚", name: "무인양품 코튼 블라우스", seller: "초록옷장", date: "3일 전" },
  { id: 11, emoji: "👖", name: "리바이스 501 데님", seller: "빈티지러버", date: "1주 전" },
  { id: 12, emoji: "🧥", name: "GAP 데님 자켓", seller: "에코러버", date: "2주 전" },
];

const WISHLIST_ITEMS = [
  { id: 20, emoji: "👗", name: "COS 니트 원피스", size: "S", neighborhood: "강남구" },
  { id: 21, emoji: "🧥", name: "아르켓 울 코트", size: "M", neighborhood: "서초구" },
];

const DONATE_ITEMS = [
  { id: 30, emoji: "👕", name: "H&M 스트라이프 티", size: "M", days: "등록 45일째" },
  { id: 31, emoji: "👖", name: "자라 슬랙스", size: "S", days: "등록 38일째" },
  { id: 32, emoji: "👚", name: "유니클로 블라우스", size: "M", days: "등록 52일째" },
];

const LEAF_HISTORY = [
  { type: "등록", icon: "📤", item: "유니클로 린넨 셔츠", time: "오늘", change: "+1", positive: true },
  { type: "교환", icon: "🔄", item: "무인양품 코튼 블라우스", time: "3일 전", change: "-1", positive: false },
  { type: "등록", icon: "📤", item: "자라 와이드 팬츠", time: "5일 전", change: "+1", positive: true },
  { type: "가입", icon: "🎉", item: "첫 리프 지급", time: "2주 전", change: "+1", positive: true },
];

const NOTIFICATIONS = [
  { id: 1, icon: "✅", text: '"유니클로 린넨셔츠" 통과! 🍃 리프 GET', time: "방금", unread: true },
  { id: 2, icon: "💬", text: "초록옷장이 메시지 보냈어", time: "10분 전", unread: true },
  { id: 3, icon: "📌", text: '"COS 울코트" 예약 잠김!', time: "1시간 전", unread: true },
  { id: 4, icon: "🤝", text: '"자라 와이드팬츠" SWAP DONE!', time: "어제", unread: false },
  { id: 5, icon: "🔥", text: '"H&M 티셔츠" 새 생명 ON', time: "3일 전", unread: false },
];

// ── Shared Sub Components ──

function MyTabBar({ active }) {
  const tabs = [
    { icon: "\u{1F3E0}", label: "홈", id: 0 },
    { icon: "\u{1F4AC}", label: "채팅", id: 1 },
    { icon: "\u{1F464}", label: "MY", id: 2 },
  ];

  return (
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "50px",
      background: C.chalk,
      borderTop: `1px solid ${C.mist}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    }}>
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <div key={t.id} style={{
            textAlign: "center",
            position: "relative",
            cursor: "default",
          }}>
            <div style={{
              fontSize: "18px",
              lineHeight: 1,
              filter: isActive ? "none" : "grayscale(1)",
              opacity: isActive ? 1 : 0.4,
            }}>
              {t.icon}
            </div>
            <div style={{
              fontSize: "8px",
              fontWeight: isActive ? 700 : 400,
              color: isActive ? C.forest : C.mist,
              marginTop: "2px",
            }}>
              {t.label}
            </div>
            {isActive && (
              <div style={{
                position: "absolute",
                bottom: "-4px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "4px",
                height: "4px",
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

function BackHeader({ title }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px 14px",
      background: C.chalk,
      borderBottom: `1px solid ${C.mist}`,
      flexShrink: 0,
    }}>
      <span style={{ fontSize: "16px", cursor: "default" }}>←</span>
      <span style={{
        fontSize: "15px",
        fontWeight: 700,
        color: C.offBlack,
      }}>{title}</span>
    </div>
  );
}

function ProfileArea() {
  const badgeBorderColor =
    USER.badgeLevel === "universe" ? C.butter :
    USER.badgeLevel === "earth" ? C.butter :
    USER.badgeLevel === "tree" ? C.lime :
    USER.badgeLevel === "green" ? "#66FF99" :
    C.neonMint;

  return (
    <div style={{
      padding: "14px 14px 10px",
      background: C.chalk,
      display: "flex",
      alignItems: "center",
      gap: "10px",
    }}>
      {/* Profile icon */}
      <div style={{
        width: "52px",
        height: "52px",
        borderRadius: "50%",
        background: `${badgeBorderColor}20`,
        border: `2.5px solid ${badgeBorderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        flexShrink: 0,
      }}>
        {USER.badgeEmoji}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginBottom: "3px",
        }}>
          <span style={{
            fontSize: "17px",
            fontWeight: 700,
            color: C.offBlack,
          }}>{USER.nickname}</span>
          {/* Badge chip */}
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "2px",
            background: `${badgeBorderColor}18`,
            color: C.forest,
            fontSize: "9px",
            fontWeight: 700,
            padding: "2px 8px",
            borderRadius: "10px",
            border: `1px solid ${badgeBorderColor}40`,
          }}>
            {USER.badgeEmoji} {USER.badgeName}
          </span>
        </div>
        <div style={{
          fontSize: "10px",
          color: "#999",
          marginBottom: "2px",
        }}>
          등록 {USER.registered}벌 · 교환 {USER.exchanged}벌 · 기부 {USER.donated}벌
        </div>
        <div style={{
          fontSize: "9px",
          color: "#BBB",
        }}>
          {USER.neighborhood}
        </div>
      </div>

      {/* Edit + Settings icons */}
      <div style={{
        display: "flex",
        gap: "8px",
        alignSelf: "flex-start",
        marginTop: "2px",
      }}>
        <span style={{ fontSize: "14px", cursor: "default" }}>✏️</span>
        <span style={{ fontSize: "14px", cursor: "default" }}>⚙️</span>
      </div>
    </div>
  );
}

function BadgeProgressCard() {
  // Current badge is green (index 1), next is tree (index 2)
  const currentIndex = 1;
  const nextBadge = BADGES[currentIndex + 1];
  const progress = USER.circulationCount / nextBadge.threshold;

  return (
    <div style={{
      margin: "0 10px 8px",
      background: "#FFF",
      borderRadius: "14px",
      border: `1px solid ${C.mist}`,
      padding: "12px 14px",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
      }}>
        <span style={{
          fontSize: "12px",
          fontWeight: 700,
          color: C.offBlack,
        }}>순환 뱃지</span>
        <span style={{
          fontSize: "10px",
          color: "#999",
        }}>순환 {USER.circulationCount}회</span>
      </div>

      {/* Badge icons */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
        padding: "0 4px",
      }}>
        {BADGES.map((b, i) => {
          const achieved = i <= currentIndex;
          return (
            <div key={i} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "3px",
              opacity: achieved ? 1 : 0.3,
            }}>
              <span style={{ fontSize: "18px" }}>{b.emoji}</span>
              <span style={{
                fontSize: "7px",
                fontWeight: 600,
                color: achieved ? C.offBlack : "#BBB",
              }}>
                {b.threshold}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{
        background: `${C.mist}`,
        borderRadius: "4px",
        height: "6px",
        overflow: "hidden",
        marginBottom: "6px",
      }}>
        <div style={{
          width: `${Math.min(progress * 100, 100)}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${C.neonMint}, ${C.lime})`,
          borderRadius: "4px",
        }} />
      </div>

      {/* Text */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{
          fontSize: "9px",
          color: "#888",
        }}>
          다음 뱃지: {nextBadge.name} {nextBadge.emoji}
        </span>
        <span style={{
          fontSize: "9px",
          fontWeight: 700,
          color: C.forest,
        }}>
          {USER.circulationCount}/{nextBadge.threshold}
        </span>
      </div>
    </div>
  );
}

function LeafWalletCard() {
  return (
    <div style={{
      margin: "0 10px 8px",
      background: C.smoke,
      borderRadius: "18px",
      padding: "16px 18px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
    }}>
      {/* Label */}
      <div style={{
        fontSize: "9px",
        fontWeight: 700,
        color: C.mist,
        letterSpacing: "3px",
        textTransform: "uppercase",
        marginBottom: "6px",
      }}>
        MY LEAF
      </div>

      {/* Balance */}
      <div style={{
        fontFamily: fonts.accent,
        fontSize: "44px",
        fontWeight: 800,
        color: C.neonMint,
        lineHeight: 1.1,
        marginBottom: "4px",
      }}>
        {USER.leafBalance}
      </div>

      {/* Hint */}
      <div style={{
        fontSize: "10px",
        color: C.mist,
        opacity: 0.7,
      }}>
        올려서 벌어. 스왑해서 써.
      </div>
    </div>
  );
}

function SubTabs({ activeTab }) {
  const tabs = ["내 옷장", "교환한 옷", "찜 목록", "기부하기"];
  return (
    <div style={{
      display: "flex",
      overflowX: "auto",
      borderBottom: `1px solid ${C.mist}`,
      margin: "0 10px",
      gap: "0",
    }}>
      {tabs.map((t, i) => {
        const isActive = activeTab === i;
        return (
          <div key={i} style={{
            flex: "0 0 auto",
            padding: "8px 12px",
            fontSize: "11px",
            fontWeight: isActive ? 700 : 400,
            color: isActive ? C.forest : "#999",
            borderBottom: isActive ? `2.5px solid ${C.neonMint}` : "2.5px solid transparent",
            cursor: "default",
            whiteSpace: "nowrap",
          }}>
            {t}
          </div>
        );
      })}
    </div>
  );
}

function LeafHistorySection() {
  return (
    <div style={{
      margin: "8px 10px 0",
      padding: "0",
    }}>
      <div style={{
        fontSize: "11px",
        fontWeight: 700,
        color: C.offBlack,
        marginBottom: "6px",
        padding: "0 4px",
      }}>
        리프 내역
      </div>
      {LEAF_HISTORY.map((h, i) => (
        <div key={i} style={{
          display: "flex",
          alignItems: "center",
          padding: "7px 4px",
          borderBottom: i < LEAF_HISTORY.length - 1 ? `1px solid ${C.mist}50` : "none",
        }}>
          <span style={{ fontSize: "13px", marginRight: "8px" }}>{h.icon}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: "10px",
              fontWeight: 600,
              color: C.offBlack,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {h.item}
            </div>
            <div style={{
              fontSize: "8px",
              color: "#BBB",
            }}>
              {h.type} · {h.time}
            </div>
          </div>
          <span style={{
            fontSize: "12px",
            fontWeight: 700,
            color: h.positive ? C.neonMint : C.hotCoral,
            flexShrink: 0,
            marginLeft: "8px",
          }}>
            {h.change}
          </span>
        </div>
      ))}
    </div>
  );
}

function FriendInviteCard() {
  return (
    <div style={{
      margin: "10px 10px 0",
      background: `linear-gradient(135deg, ${C.forest}, #0D2812)`,
      borderRadius: "14px",
      padding: "16px",
    }}>
      <div style={{
        fontSize: "14px",
        fontWeight: 700,
        color: C.lime,
        marginBottom: "4px",
      }}>
        친구 데려오면 둘 다 🍃 +1
      </div>
      <div style={{
        fontSize: "10px",
        color: "#FFF",
        opacity: 0.8,
        marginBottom: "12px",
      }}>
        링크 공유하고 같이 스왑하자
      </div>
      <div style={{
        background: C.lime,
        color: C.forest,
        padding: "10px 16px",
        borderRadius: "10px",
        fontSize: "12px",
        fontWeight: 700,
        textAlign: "center",
        cursor: "default",
      }}>
        초대 링크 보내기
      </div>
    </div>
  );
}

function ClosetItemRow({ item }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "8px 4px",
      borderBottom: `1px solid ${C.mist}50`,
    }}>
      <div style={{
        width: "44px",
        height: "44px",
        borderRadius: "8px",
        background: "#F0EDE5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        flexShrink: 0,
      }}>
        {item.emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: "11px",
          fontWeight: 600,
          color: C.offBlack,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {item.name}
        </div>
        <div style={{
          fontSize: "9px",
          color: "#999",
        }}>
          {item.size} · {item.condition}
        </div>
      </div>
      <span style={{
        fontSize: "9px",
        fontWeight: 600,
        color: C.forest,
        background: `${C.neonMint}18`,
        padding: "3px 8px",
        borderRadius: "8px",
        flexShrink: 0,
      }}>
        {item.status}
      </span>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "120px",
      gap: "4px",
    }}>
      <div style={{
        fontSize: "14px",
        fontWeight: 700,
        color: C.offBlack,
        textAlign: "center",
        lineHeight: 1.5,
      }}>
        {message}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 1. ScreenMyPage — Full MY Page
// ════════════════════════════════════════════════════════════
export function ScreenMyPage() {
  return (
    <div style={{
      background: C.chalk,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      fontFamily: fonts.body,
    }}>
      {/* Profile Area */}
      <ProfileArea />

      {/* Scrollable content */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        paddingBottom: "60px",
      }}>
        {/* Badge Progress Card */}
        <BadgeProgressCard />

        {/* Leaf Wallet Card */}
        <LeafWalletCard />

        {/* Sub Tabs */}
        <SubTabs activeTab={0} />

        {/* My closet content */}
        <div style={{ padding: "6px 14px 0" }}>
          {MY_CLOSET_ITEMS.map((item) => (
            <ClosetItemRow key={item.id} item={item} />
          ))}
        </div>

        {/* Leaf History */}
        <LeafHistorySection />

        {/* Friend Invite Card */}
        <FriendInviteCard />

        {/* Bottom spacer */}
        <div style={{ height: "12px" }} />
      </div>

      {/* Tab Bar */}
      <MyTabBar active={2} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 2. ScreenMyCloset — 내 옷장 Tab (active)
// ════════════════════════════════════════════════════════════
export function ScreenMyCloset() {
  return (
    <div style={{
      background: C.chalk,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      fontFamily: fonts.body,
    }}>
      <ProfileArea />

      <div style={{
        flex: 1,
        overflowY: "auto",
        paddingBottom: "60px",
      }}>
        <BadgeProgressCard />
        <LeafWalletCard />
        <SubTabs activeTab={0} />

        {/* My closet items */}
        <div style={{ padding: "6px 14px 0" }}>
          {MY_CLOSET_ITEMS.length > 0 ? (
            MY_CLOSET_ITEMS.map((item) => (
              <ClosetItemRow key={item.id} item={item} />
            ))
          ) : (
            <EmptyState message={"아직 텅 비었어 —\n옷장을 털어봐"} />
          )}
        </div>

        <LeafHistorySection />
        <FriendInviteCard />
        <div style={{ height: "12px" }} />
      </div>

      <MyTabBar active={2} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 3. ScreenExchanged — 교환한 옷 Tab
// ════════════════════════════════════════════════════════════
export function ScreenExchanged() {
  return (
    <div style={{
      background: C.chalk,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      fontFamily: fonts.body,
    }}>
      <ProfileArea />

      <div style={{
        flex: 1,
        overflowY: "auto",
        paddingBottom: "60px",
      }}>
        <BadgeProgressCard />
        <LeafWalletCard />
        <SubTabs activeTab={1} />

        {/* Exchanged items */}
        <div style={{ padding: "6px 14px 0" }}>
          {EXCHANGED_ITEMS.length > 0 ? (
            EXCHANGED_ITEMS.map((item) => (
              <div key={item.id} style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 4px",
                borderBottom: `1px solid ${C.mist}50`,
              }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  background: "#F0EDE5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}>
                  {item.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: C.offBlack,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontSize: "9px",
                    color: "#999",
                  }}>
                    {item.seller} · {item.date}
                  </div>
                </div>
                <span style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  color: "#888",
                  background: `${C.mist}`,
                  padding: "3px 8px",
                  borderRadius: "8px",
                  flexShrink: 0,
                }}>
                  교환 완료
                </span>
              </div>
            ))
          ) : (
            <EmptyState message={"아직 스왑 전 —\n마음에 드는 거 찾아봐!"} />
          )}
        </div>

        <LeafHistorySection />
        <FriendInviteCard />
        <div style={{ height: "12px" }} />
      </div>

      <MyTabBar active={2} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 4. ScreenWishlist — 찜 목록 Tab
// ════════════════════════════════════════════════════════════
export function ScreenWishlist() {
  return (
    <div style={{
      background: C.chalk,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      fontFamily: fonts.body,
    }}>
      <ProfileArea />

      <div style={{
        flex: 1,
        overflowY: "auto",
        paddingBottom: "60px",
      }}>
        <BadgeProgressCard />
        <LeafWalletCard />
        <SubTabs activeTab={2} />

        {/* Wishlist items */}
        <div style={{ padding: "6px 14px 0" }}>
          {WISHLIST_ITEMS.length > 0 ? (
            WISHLIST_ITEMS.map((item) => (
              <div key={item.id} style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 4px",
                borderBottom: `1px solid ${C.mist}50`,
              }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  background: "#F0EDE5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}>
                  {item.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: C.offBlack,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontSize: "9px",
                    color: "#999",
                  }}>
                    {item.size} · {item.neighborhood}
                  </div>
                </div>
                <span style={{
                  fontSize: "16px",
                  color: C.hotCoral,
                  cursor: "default",
                  flexShrink: 0,
                }}>
                  ♥
                </span>
              </div>
            ))
          ) : (
            <EmptyState message={"찜한 거 없음 —\n♡ 눌러서 킵해둬"} />
          )}
        </div>

        <LeafHistorySection />
        <FriendInviteCard />
        <div style={{ height: "12px" }} />
      </div>

      <MyTabBar active={2} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 5. ScreenDonate — 기부하기 Tab
// ════════════════════════════════════════════════════════════
export function ScreenDonate() {
  return (
    <div style={{
      background: C.chalk,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      fontFamily: fonts.body,
    }}>
      <ProfileArea />

      <div style={{
        flex: 1,
        overflowY: "auto",
        paddingBottom: "60px",
      }}>
        <BadgeProgressCard />
        <LeafWalletCard />
        <SubTabs activeTab={3} />

        {/* Donate header */}
        <div style={{
          textAlign: "center",
          padding: "12px 14px 4px",
        }}>
          <div style={{ fontSize: "28px", marginBottom: "4px" }}>🎁</div>
          <div style={{
            fontSize: "14px",
            fontWeight: 700,
            color: C.offBlack,
            marginBottom: "2px",
          }}>
            안 입는 옷, 새 생명 ON
          </div>
          <div style={{
            fontSize: "10px",
            color: "#999",
          }}>
            기부한 옷은 리폼돼서 돌아와
          </div>
        </div>

        {/* Donate items */}
        <div style={{ padding: "6px 14px 0" }}>
          {DONATE_ITEMS.length > 0 ? (
            DONATE_ITEMS.map((item) => (
              <div key={item.id} style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 4px",
                borderBottom: `1px solid ${C.mist}50`,
              }}>
                <div style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  background: "#F0EDE5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}>
                  {item.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: C.offBlack,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontSize: "9px",
                    color: "#999",
                  }}>
                    {item.size} · {item.days}
                  </div>
                </div>
                <div style={{
                  background: C.forest,
                  color: C.lime,
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "5px 12px",
                  borderRadius: "8px",
                  cursor: "default",
                  flexShrink: 0,
                }}>
                  기부
                </div>
              </div>
            ))
          ) : (
            <EmptyState message={"기부할 옷이 없어 —\n먼저 올려"} />
          )}
        </div>

        {/* Donation stats */}
        <div style={{
          textAlign: "center",
          padding: "12px 14px",
        }}>
          <span style={{
            fontSize: "12px",
            fontWeight: 700,
            color: C.neonMint,
          }}>
            총 {USER.donated}벌 보냈어 🔥
          </span>
        </div>

        <FriendInviteCard />
        <div style={{ height: "12px" }} />
      </div>

      <MyTabBar active={2} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 6. ScreenProfileEdit — Profile Edit
// ════════════════════════════════════════════════════════════
export function ScreenProfileEdit() {
  return (
    <div style={{
      background: C.chalk,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: fonts.body,
    }}>
      {/* Header */}
      <BackHeader title="프로필 편집" />

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px 16px",
      }}>
        {/* Profile image */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}>
          <div style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: `${"#66FF99"}20`,
            border: `2.5px solid ${"#66FF99"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            position: "relative",
          }}>
            {USER.badgeEmoji}
            <div style={{
              position: "absolute",
              bottom: "-2px",
              right: "-2px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: C.lime,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              border: `2px solid ${C.chalk}`,
            }}>
              📷
            </div>
          </div>
        </div>

        {/* Nickname input */}
        <div style={{ marginBottom: "18px" }}>
          <div style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "#666",
            marginBottom: "6px",
          }}>
            닉네임
          </div>
          <div style={{
            background: "#FFF",
            border: `1.5px solid ${C.forest}40`,
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "13px",
            color: C.offBlack,
            fontWeight: 500,
          }}>
            {USER.nickname}
          </div>
        </div>

        {/* Neighborhood */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{
            fontSize: "10px",
            fontWeight: 600,
            color: "#666",
            marginBottom: "6px",
          }}>
            동네
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <div style={{
              flex: 1,
              background: "#FFF",
              border: `1px solid ${C.mist}`,
              borderRadius: "10px",
              padding: "10px 14px",
              fontSize: "13px",
              color: C.offBlack,
            }}>
              {USER.neighborhood}
            </div>
            <div style={{
              background: "#F0EDE5",
              color: C.forest,
              padding: "10px 14px",
              borderRadius: "10px",
              fontSize: "11px",
              fontWeight: 600,
              cursor: "default",
              flexShrink: 0,
            }}>
              동네 변경
            </div>
          </div>
        </div>

        {/* Save button */}
        <div style={{
          background: C.lime,
          color: C.forest,
          padding: "14px 24px",
          borderRadius: "14px",
          fontSize: "14px",
          fontWeight: 700,
          textAlign: "center",
          cursor: "default",
        }}>
          저장
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 7. ScreenSettings — Settings
// ════════════════════════════════════════════════════════════
function ToggleSwitch({ on }) {
  return (
    <div style={{
      width: "36px",
      height: "20px",
      borderRadius: "10px",
      background: on ? C.neonMint : C.mist,
      position: "relative",
      cursor: "default",
      flexShrink: 0,
      transition: "background 0.2s",
    }}>
      <div style={{
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        background: "#FFF",
        position: "absolute",
        top: "2px",
        left: on ? "18px" : "2px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        transition: "left 0.2s",
      }} />
    </div>
  );
}

function SettingsRow({ label, rightContent, isLast }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: isLast ? "none" : `1px solid ${C.mist}50`,
    }}>
      <span style={{
        fontSize: "12px",
        color: C.offBlack,
      }}>
        {label}
      </span>
      {rightContent}
    </div>
  );
}

function SettingsSection({ title, children }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{
        fontSize: "10px",
        fontWeight: 700,
        color: "#999",
        letterSpacing: "1px",
        textTransform: "uppercase",
        marginBottom: "4px",
      }}>
        {title}
      </div>
      <div style={{
        background: "#FFF",
        borderRadius: "12px",
        padding: "0 14px",
        border: `1px solid ${C.mist}`,
      }}>
        {children}
      </div>
    </div>
  );
}

export function ScreenSettings() {
  return (
    <div style={{
      background: C.chalk,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: fonts.body,
    }}>
      {/* Header */}
      <BackHeader title="설정" />

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "14px 14px",
      }}>
        {/* Notification settings */}
        <SettingsSection title="알림">
          <SettingsRow
            label="채팅 알림"
            rightContent={<ToggleSwitch on={true} />}
          />
          <SettingsRow
            label="거래 상태 알림"
            rightContent={<ToggleSwitch on={true} />}
          />
          <SettingsRow
            label="관심 카테고리 신상품 알림"
            rightContent={<ToggleSwitch on={false} />}
            isLast
          />
        </SettingsSection>

        {/* Account */}
        <SettingsSection title="계정">
          <SettingsRow
            label="로그아웃"
            rightContent={<span style={{ fontSize: "12px", color: "#CCC" }}>›</span>}
          />
          <SettingsRow
            label="회원 탈퇴"
            rightContent={<span style={{ fontSize: "12px", color: C.hotCoral }}>›</span>}
            isLast
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection title="고객센터">
          <SettingsRow
            label="FAQ"
            rightContent={<span style={{ fontSize: "12px", color: "#CCC" }}>›</span>}
          />
          <SettingsRow
            label="1:1 문의"
            rightContent={<span style={{ fontSize: "12px", color: "#CCC" }}>›</span>}
            isLast
          />
        </SettingsSection>

        {/* Info */}
        <SettingsSection title="정보">
          <SettingsRow
            label="이용약관"
            rightContent={<span style={{ fontSize: "12px", color: "#CCC" }}>›</span>}
          />
          <SettingsRow
            label="개인정보처리방침"
            rightContent={<span style={{ fontSize: "12px", color: "#CCC" }}>›</span>}
          />
          <SettingsRow
            label="앱 버전"
            rightContent={
              <span style={{
                fontSize: "11px",
                color: "#BBB",
              }}>
                v1.0.0
              </span>
            }
            isLast
          />
        </SettingsSection>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// 8. ScreenNotifications — Notifications
// ════════════════════════════════════════════════════════════
export function ScreenNotifications() {
  return (
    <div style={{
      background: C.chalk,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      fontFamily: fonts.body,
    }}>
      {/* Header */}
      <BackHeader title="알림" />

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "8px 10px",
      }}>
        {NOTIFICATIONS.length > 0 ? (
          NOTIFICATIONS.map((n) => (
            <div key={n.id} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "10px 8px",
              background: n.unread ? `${C.neonMint}08` : "transparent",
              borderRadius: "10px",
              marginBottom: "4px",
              position: "relative",
            }}>
              {/* Unread dot */}
              {n.unread && (
                <div style={{
                  position: "absolute",
                  top: "14px",
                  left: "2px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: C.neonMint,
                }} />
              )}

              {/* Icon */}
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: n.unread ? `${C.neonMint}15` : "#F0EDE5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                flexShrink: 0,
                marginLeft: n.unread ? "8px" : "8px",
              }}>
                {n.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: "11px",
                  fontWeight: n.unread ? 600 : 400,
                  color: C.offBlack,
                  lineHeight: 1.5,
                  marginBottom: "2px",
                }}>
                  {n.text}
                </div>
                <div style={{
                  fontSize: "9px",
                  color: "#BBB",
                }}>
                  {n.time}
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyState message="알림 없음 — 조용하네 🤫" />
        )}
      </div>
    </div>
  );
}
