import { useState } from "react";

const flows = [
  { id: "browse", label: "홈 / 탐색" },
  { id: "upload", label: "옷 등록" },
  { id: "detail", label: "교환하기" },
  { id: "shipping", label: "배송" },
  { id: "chat", label: "채팅" },
  { id: "donate", label: "기부" },
  { id: "mypage", label: "마이페이지" },
  { id: "popup", label: "팝업" },
];

// Phone frame component
function Phone({ title, screenId, children, annotation }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div style={{
        fontSize: "11px",
        fontWeight: 700,
        color: "#2D5A27",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
      }}>{screenId}</div>
      <div className="phone-frame">
        {/* Status bar */}
        <div style={{
          height: "36px",
          background: "#1A1A1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          fontSize: "10px",
          color: "#FFF",
        }}>
          <span>9:41</span>
          <span style={{ fontSize: "8px" }}>●●●● WiFi 🔋</span>
        </div>
        {/* Screen title bar */}
        <div style={{
          height: "44px",
          background: "#FAFAF5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #E8E5DD",
          fontSize: "14px",
          fontWeight: 700,
          color: "#1A1A1A",
        }}>{title}</div>
        {/* Content */}
        <div className="phone-content">
          {children}
        </div>
        {/* Home indicator */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            width: "100px",
            height: "4px",
            borderRadius: "2px",
            background: "#DDD",
          }} />
        </div>
      </div>
      {annotation && (
        <div className="phone-annotation">{annotation}</div>
      )}
    </div>
  );
}

// Flow arrow
function Arrow() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      flexShrink: 0,
      alignSelf: "center",
      marginTop: "-40px",
    }}>
      <svg width="32" height="24" viewBox="0 0 32 24">
        <path d="M0 12 L24 12 M18 6 L24 12 L18 18" stroke="#2D5A27" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}

// Wireframe elements
function WireBtn({ text, primary, full, small, danger }) {
  return (
    <div style={{
      background: danger ? "#E8E0D8" : primary ? "#2D5A27" : "#F0EDE5",
      color: danger ? "#8B4513" : primary ? "#FFF" : "#1A1A1A",
      padding: small ? "6px 12px" : "10px 16px",
      borderRadius: "8px",
      fontSize: small ? "10px" : "12px",
      fontWeight: 600,
      textAlign: "center",
      width: full ? "100%" : "auto",
      cursor: "default",
    }}>{text}</div>
  );
}

function WireInput({ placeholder, icon }) {
  return (
    <div style={{
      background: "#F5F3ED",
      border: "1px solid #E0DDD5",
      borderRadius: "8px",
      padding: "8px 12px",
      fontSize: "11px",
      color: "#AAA",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }}>
      {icon && <span>{icon}</span>}
      {placeholder}
    </div>
  );
}

function WireCard({ children, style }) {
  return (
    <div style={{
      background: "#FFF",
      border: "1px solid #EEEBE3",
      borderRadius: "10px",
      padding: "10px",
      ...style,
    }}>{children}</div>
  );
}

function TabBar({ active }) {
  const tabs = [
    { icon: "🏠", label: "홈" },
    { icon: "💬", label: "채팅" },
    { icon: "🍃", label: "리프" },
    { icon: "👤", label: "MY" },
  ];
  return (
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "50px",
      background: "#FAFAF5",
      borderTop: "1px solid #E8E5DD",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    }}>
      {tabs.map((t, i) => (
        <div key={i} style={{
          textAlign: "center",
          color: active === i ? "#2D5A27" : "#BBB",
          fontSize: "16px",
          lineHeight: 1,
        }}>
          <div>{t.icon}</div>
          <div style={{ fontSize: "8px", fontWeight: active === i ? 700 : 400, marginTop: "2px" }}>{t.label}</div>
        </div>
      ))}
    </div>
  );
}

function Badge({ text, color = "#2D5A27" }) {
  return (
    <span style={{
      background: `${color}18`,
      color: color,
      fontSize: "9px",
      fontWeight: 700,
      padding: "2px 8px",
      borderRadius: "10px",
      border: `1px solid ${color}30`,
    }}>{text}</span>
  );
}

// ===== SCREENS =====

function ScreenHome() {
  return (
    <div style={{ padding: "12px", height: "100%", background: "#FAFAF5" }}>
      <WireInput placeholder="브랜드, 카테고리 검색..." icon="🔍" />

      <div style={{ display: "flex", gap: "6px", marginTop: "10px", overflowX: "auto" }}>
        {["전체", "상의", "하의", "아우터", "원피스", "가방"].map((c, i) => (
          <div key={i} style={{
            padding: "5px 12px",
            borderRadius: "20px",
            background: i === 0 ? "#2D5A27" : "#F0EDE5",
            color: i === 0 ? "#FFF" : "#666",
            fontSize: "10px",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}>{c}</div>
        ))}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px",
        marginTop: "12px",
      }}>
        {[
          { emoji: "👕", name: "유니클로 린넨셔츠", tag: "M · 상의" },
          { emoji: "👖", name: "자라 와이드팬츠", tag: "S · 하의" },
        ].map((item, i) => (
          <WireCard key={i} style={{ padding: "8px" }}>
            <div style={{
              height: "80px",
              borderRadius: "6px",
              background: "#F0EDE5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              marginBottom: "6px",
            }}>{item.emoji}</div>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#1A1A1A", marginBottom: "2px" }}>{item.name}</div>
            <div style={{ fontSize: "9px", color: "#999" }}>{item.tag}</div>
          </WireCard>
        ))}
        {/* Ad card */}
        <WireCard style={{ padding: "8px", gridColumn: "1 / -1", border: "1px solid #D4E8D0" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #E8F5E2, #D4E8D0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              flexShrink: 0,
            }}>🌿</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "2px" }}>
                <span style={{ fontSize: "8px", color: "#999", background: "#F0EDE5", padding: "1px 5px", borderRadius: "3px", fontWeight: 600 }}>AD</span>
                <span style={{ fontSize: "10px", fontWeight: 600, color: "#1A1A1A" }}>플리츠마마 신상</span>
              </div>
              <div style={{ fontSize: "9px", color: "#666", lineHeight: 1.4 }}>버려진 페트병으로 만든 니트백</div>
              <div style={{ fontSize: "9px", color: "#2D5A27", fontWeight: 600, marginTop: "2px" }}>자세히 보기 →</div>
            </div>
          </div>
        </WireCard>
        {[
          { emoji: "🧥", name: "COS 울코트", tag: "M · 아우터" },
          { emoji: "👗", name: "H&M 플로럴 원피스", tag: "S · 원피스" },
        ].map((item, i) => (
          <WireCard key={`b${i}`} style={{ padding: "8px" }}>
            <div style={{
              height: "80px",
              borderRadius: "6px",
              background: "#F0EDE5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              marginBottom: "6px",
            }}>{item.emoji}</div>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#1A1A1A", marginBottom: "2px" }}>{item.name}</div>
            <div style={{ fontSize: "9px", color: "#999" }}>{item.tag}</div>
          </WireCard>
        ))}
      </div>

      {/* Floating + button */}
      <div style={{
        position: "absolute",
        bottom: "62px",
        right: "16px",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "#2D5A27",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(45,90,39,0.4)",
        zIndex: 10,
      }}>
        <span style={{ fontSize: "24px", color: "#FFF", lineHeight: 1 }}>+</span>
      </div>

      <TabBar active={0} />
    </div>
  );
}

function ScreenUpload1() {
  return (
    <div style={{ padding: "16px", background: "#FAFAF5", height: "100%" }}>
      <div style={{
        height: "140px",
        borderRadius: "12px",
        border: "2px dashed #CCC",
        background: "#F5F3ED",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}>
        <div style={{ fontSize: "36px" }}>📷</div>
        <div style={{ fontSize: "12px", color: "#888", fontWeight: 500 }}>앞면·뒷면 최소 2장 촬영</div>
        <div style={{ fontSize: "10px", color: "#BBB" }}>최대 5장</div>
      </div>

      <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
        {[1, 2, 3, 4, 5].map(n => (
          <div key={n} style={{
            width: "40px",
            height: "40px",
            borderRadius: "6px",
            border: n <= 2 ? "2px solid #2D5A27" : "1px dashed #DDD",
            background: n <= 2 ? "#E8F0E5" : "#FAFAF5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: n <= 2 ? "16px" : "12px",
            color: "#CCC",
          }}>{n === 1 ? "👕" : n === 2 ? "👕" : "+"}</div>
        ))}
      </div>

      <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div>
          <div style={{ fontSize: "10px", fontWeight: 600, color: "#666", marginBottom: "4px" }}>카테고리</div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {["상의", "하의", "아우터", "원피스", "가방", "기타"].map((c, i) => (
              <div key={i} style={{
                padding: "5px 12px",
                borderRadius: "6px",
                background: i === 0 ? "#2D5A27" : "#F0EDE5",
                color: i === 0 ? "#FFF" : "#888",
                fontSize: "10px",
                fontWeight: 500,
              }}>{c}</div>
            ))}
          </div>
        </div>
        <WireInput placeholder="브랜드명 (자동완성)" icon="🏷️" />
        <WireInput placeholder="사이즈 선택" icon="📐" />
        <div>
          <div style={{ fontSize: "10px", fontWeight: 600, color: "#666", marginBottom: "4px" }}>상태</div>
          <div style={{ display: "flex", gap: "6px" }}>
            {["새것같음", "거의 안입음", "살짝 사용감"].map((c, i) => (
              <div key={i} style={{
                padding: "5px 10px",
                borderRadius: "6px",
                background: i === 1 ? "#2D5A27" : "#F0EDE5",
                color: i === 1 ? "#FFF" : "#888",
                fontSize: "9px",
                fontWeight: 500,
              }}>{c}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <WireBtn text="등록하기" primary full />
      </div>
    </div>
  );
}

function ScreenUpload2() {
  return (
    <div style={{ padding: "16px", background: "#FAFAF5", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
        <div style={{ fontSize: "16px", fontWeight: 700, color: "#1A1A1A", marginBottom: "4px" }}>검수 완료!</div>
        <div style={{ fontSize: "12px", color: "#888" }}>리프가지급되었습니다</div>
      </div>

      <WireCard style={{ marginTop: "24px", padding: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "11px", color: "#888", marginBottom: "8px" }}>지급된 리프</div>
        <div style={{ fontSize: "36px", marginBottom: "4px" }}>🍃</div>
        <div style={{ fontSize: "22px", fontWeight: 800, color: "#2D5A27" }}>+1 리프</div>
        <div style={{ fontSize: "10px", color: "#AAA", marginTop: "8px" }}>유니클로 린넨셔츠 M</div>
      </WireCard>

      <WireCard style={{ marginTop: "12px", padding: "14px" }}>
        <div style={{ fontSize: "10px", color: "#888", marginBottom: "8px" }}>내 리프 현황</div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "#2D5A27" }}>3</div>
          <div style={{ fontSize: "13px", color: "#888" }}>리프 보유중</div>
        </div>
      </WireCard>

      <div style={{ marginTop: "auto", paddingBottom: "60px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <WireBtn text="쇼핑하러 가기 →" primary full />
        <WireBtn text="옷 더 등록하기" full />
      </div>
    </div>
  );
}

function ScreenDetail() {
  return (
    <div style={{ background: "#FAFAF5", height: "100%" }}>
      <div style={{
        height: "200px",
        background: "#F0EDE5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "64px",
      }}>🧥</div>

      <div style={{ padding: "14px" }}>
        <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
          <Badge text="아우터" />
          <Badge text="M 사이즈" color="#666" />
          <Badge text="거의 안입음" color="#8B6914" />
        </div>

        <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "2px" }}>COS 울 블렌드 코트</div>
        <div style={{ fontSize: "10px", color: "#999", marginBottom: "12px" }}>등록 3일째 · 조회 24</div>

        <div style={{ display: "flex", gap: "6px", fontSize: "10px", color: "#888" }}>
          <span>✓ 수수료 없음</span>
          <span>·</span>
          <span>배송비만 별도</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", padding: "10px 0", borderTop: "1px solid #EEE" }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#E8F0E5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
          }}>🌿</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ fontSize: "11px", fontWeight: 600 }}>초록옷장</span>
              <span style={{ fontSize: "10px" }}>🌿</span>
            </div>
            <div style={{ fontSize: "9px", color: "#999" }}>순환 12회 · 좋아요 96%</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Badge text="강남구" color="#666" />
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
          <div style={{
            width: "44px",
            height: "40px",
            borderRadius: "8px",
            border: "1px solid #E0DDD5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}>♡</div>
          <div style={{ flex: 1 }}>
            <WireBtn text="교환하기" primary full />
          </div>
        </div>
      </div>
    </div>
  );
}

function ScreenShipping() {
  return (
    <div style={{ padding: "16px", background: "#FAFAF5", height: "100%" }}>
      <div style={{ fontSize: "12px", color: "#888", marginBottom: "16px" }}>배송 방법을 선택하세요</div>

      <WireCard style={{
        padding: "14px",
        marginBottom: "10px",
        border: "2px solid #2D5A27",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px" }}>📦</span>
              <span style={{ fontSize: "13px", fontWeight: 700 }}>편의점 반값택배</span>
              <Badge text="추천" />
            </div>
            <div style={{ fontSize: "10px", color: "#888", lineHeight: 1.5 }}>
              GS25 / CU / 이마트24<br />
              QR코드 접수 · 2~3일 소요
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "#2D5A27" }}>1,800원</div>
          </div>
        </div>
      </WireCard>

      <WireCard style={{ padding: "14px", marginBottom: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px" }}>🤝</span>
              <span style={{ fontSize: "13px", fontWeight: 700 }}>동네 직거래</span>
              <Badge text="무료" color="#8B6914" />
            </div>
            <div style={{ fontSize: "10px", color: "#888", lineHeight: 1.5 }}>
              판매자와 채팅으로 장소 약속<br />
              같은 동네 (강남구) · 배송비 0원
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "#8B6914" }}>0원</div>
          </div>
        </div>
      </WireCard>

      {/* Summary */}
      <div style={{
        background: "#1A1A1A",
        borderRadius: "12px",
        padding: "14px",
        color: "#FFF",
        marginTop: "16px",
      }}>
        <div style={{ fontSize: "10px", color: "#888", marginBottom: "8px" }}>결제 요약</div>
        {[
          ["교환 리프", "🍃 1리프"],
          ["서비스 수수료", "0원"],
          ["반값택배", "1,800원"],
        ].map(([l, v], i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "11px",
            padding: "4px 0",
            color: "#CCC",
          }}>
            <span>{l}</span><span>{v}</span>
          </div>
        ))}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "13px",
          fontWeight: 700,
          borderTop: "1px solid #333",
          paddingTop: "8px",
          marginTop: "4px",
        }}>
          <span>총 결제</span>
          <span>🍃 1리프 + 1,800원</span>
        </div>
      </div>

      <div style={{ marginTop: "12px" }}>
        <WireBtn text="교환 확정하기" primary full />
      </div>
    </div>
  );
}

function ScreenDonate() {
  return (
    <div style={{ padding: "16px", background: "#FAFAF5", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center", marginTop: "8px", marginBottom: "16px" }}>
        <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎁</div>
        <div style={{ fontSize: "15px", fontWeight: 700, color: "#1A1A1A", marginBottom: "4px" }}>옷 기부하기</div>
        <div style={{ fontSize: "11px", color: "#888", lineHeight: 1.5 }}>오래 안 팔리는 옷을 기부하면<br />리폼되어 새 생명을 얻어요</div>
      </div>

      <div style={{ fontSize: "10px", fontWeight: 600, color: "#666", marginBottom: "8px" }}>기부 가능한 내 옷</div>
      {[
        { emoji: "👕", name: "H&M 스트라이프 티", days: "등록 45일째" },
        { emoji: "👖", name: "자라 슬랙스", days: "등록 38일째" },
        { emoji: "👚", name: "유니클로 블라우스", days: "등록 52일째" },
      ].map((item, i) => (
        <WireCard key={i} style={{ padding: "10px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "10px" }}>
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
          }}>{item.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "11px", fontWeight: 600 }}>{item.name}</div>
            <div style={{ fontSize: "9px", color: "#999" }}>{item.days}</div>
          </div>
          <div style={{
            width: "20px",
            height: "20px",
            borderRadius: "4px",
            border: i === 0 ? "2px solid #2D5A27" : "1.5px solid #DDD",
            background: i === 0 ? "#2D5A27" : "#FFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            color: "#FFF",
          }}>{i === 0 ? "✓" : ""}</div>
        </WireCard>
      ))}

      <div style={{ background: "#FFF8F0", borderRadius: "8px", padding: "10px 12px", fontSize: "10px", color: "#8B6914", lineHeight: 1.5, marginTop: "4px" }}>
        💡 기부한 옷은 플랫폼이 리폼하여 팝업 스토어에서 판매합니다. 리프 보상은 없지만, 환경 순환에 기여해요!
      </div>

      <div style={{ marginTop: "auto", paddingBottom: "60px" }}>
        <WireBtn text="1벌 기부하기" primary full />
      </div>

      <TabBar active={3} />
    </div>
  );
}

function ScreenChat() {
  return (
    <div style={{ background: "#FAFAF5", height: "100%" }}>
      <div style={{ padding: "12px 16px" }}>
        <div style={{ fontSize: "12px", fontWeight: 600, color: "#666", marginBottom: "10px" }}>진행중인 거래</div>
        {[
          { name: "초록옷장", badge: "🌿", item: "COS 울코트 · 택배 배송", msg: "네 편의점 택배로 보낼게요!", time: "방금", unread: true },
          { name: "빈티지러버", badge: "🌱", item: "자라 와이드팬츠 · 직거래", msg: "직거래 장소 어디로 할까요?", time: "10분 전", unread: true },
          { name: "미니멀리스트", badge: "🌿", item: "H&M 플로럴 원피스 · 택배", msg: "수령 확인했습니다 감사해요!", time: "어제", unread: false },
        ].map((chat, i) => (
          <WireCard key={i} style={{ padding: "12px", marginBottom: "8px", border: chat.unread ? "1px solid #D4E8D0" : "1px solid #EEEBE3" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "#E8F0E5", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "18px", flexShrink: 0,
              }}>{chat.badge}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600 }}>{chat.name}</span>
                  <span style={{ fontSize: "9px", color: "#BBB" }}>{chat.time}</span>
                </div>
                <div style={{ fontSize: "10px", color: "#2D5A27", marginBottom: "2px" }}>{chat.item}</div>
                <div style={{ fontSize: "10px", color: "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{chat.msg}</div>
              </div>
              {chat.unread && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2D5A27", flexShrink: 0 }} />}
            </div>
          </WireCard>
        ))}

        <div style={{ fontSize: "12px", fontWeight: 600, color: "#666", marginBottom: "10px", marginTop: "16px" }}>완료된 거래</div>
        {[
          { name: "패션피플", badge: "🌱", item: "유니클로 린넨셔츠", msg: "좋아요 평가 완료", time: "3일 전" },
          { name: "에코러버", badge: "🌱", item: "GAP 데님자켓", msg: "거래 완료", time: "1주 전" },
        ].map((chat, i) => (
          <WireCard key={`done${i}`} style={{ padding: "12px", marginBottom: "8px", opacity: 0.6 }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "#F0EDE5", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "18px", flexShrink: 0,
              }}>{chat.badge}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 600 }}>{chat.name}</span>
                  <span style={{ fontSize: "9px", color: "#BBB" }}>{chat.time}</span>
                </div>
                <div style={{ fontSize: "10px", color: "#888", marginBottom: "2px" }}>{chat.item}</div>
                <div style={{ fontSize: "10px", color: "#AAA" }}>{chat.msg}</div>
              </div>
            </div>
          </WireCard>
        ))}
      </div>
      <TabBar active={1} />
    </div>
  );
}

function ScreenDonate2() {
  return (
    <div style={{ padding: "16px", background: "#FAFAF5", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>🌱</div>
        <div style={{ fontSize: "16px", fontWeight: 700, color: "#1A1A1A", marginBottom: "4px" }}>기부 완료!</div>
        <div style={{ fontSize: "12px", color: "#888", lineHeight: 1.5 }}>옷이 리폼되어 새 생명을 얻게 됩니다</div>
      </div>

      <WireCard style={{ marginTop: "24px", padding: "16px" }}>
        <div style={{ fontSize: "10px", color: "#888", marginBottom: "10px", textAlign: "center" }}>기부 옷의 여정</div>
        {[
          { step: "수거 대기중", status: "현재", color: "#2D5A27" },
          { step: "리폼 작업", status: "예정", color: "#888" },
          { step: "팝업 스토어 진열", status: "예정", color: "#888" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: i < 2 ? "1px solid #F0EDE5" : "none" }}>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: s.color,
              flexShrink: 0,
            }} />
            <div style={{ flex: 1, fontSize: "12px", fontWeight: s.status === "현재" ? 600 : 400, color: s.status === "현재" ? "#1A1A1A" : "#AAA" }}>{s.step}</div>
            <div style={{ fontSize: "10px", color: s.color, fontWeight: 600 }}>{s.status}</div>
          </div>
        ))}
      </WireCard>

      <div style={{ marginTop: "auto", paddingBottom: "60px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <WireBtn text="홈으로 돌아가기" primary full />
        <WireBtn text="더 기부하기" full />
      </div>
    </div>
  );
}

function ScreenMypage() {
  return (
    <div style={{ background: "#FAFAF5", height: "100%" }}>
      <div style={{
        padding: "16px",
        background: "#FFF",
        borderBottom: "1px solid #EEE",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#E8F0E5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
        }}>🌿</div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700 }}>리웨어러_민지</span>
            <span style={{ fontSize: "12px" }}>🌿</span>
            <span style={{ fontSize: "9px", color: "#2D5A27", fontWeight: 600 }}>그린</span>
          </div>
          <div style={{ fontSize: "10px", color: "#999" }}>순환 12회 · 마포구</div>
        </div>
      </div>

      {/* Coin wallet - single coin */}
      <div style={{
        margin: "12px 16px",
        background: "#1A1A1A",
        borderRadius: "14px",
        padding: "16px",
        color: "#FFF",
      }}>
        <div style={{ fontSize: "10px", color: "#888", marginBottom: "10px" }}>내 리프 지갑</div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "8px" }}>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#A8D5A0" }}>5</div>
          <div style={{ fontSize: "14px", color: "#888" }}>리프</div>
        </div>
        <div style={{
          marginTop: "12px",
          padding: "8px",
          background: "#2A2A2A",
          borderRadius: "8px",
          textAlign: "center",
          fontSize: "10px",
          color: "#AAA",
        }}>옷을 올리면 리프를받아요</div>
      </div>

      {/* Menu items */}
      <div style={{ padding: "0 16px" }}>
        {[
          { icon: "👕", label: "내 등록 옷", sub: "12벌 (교환완료 5)" },
          { icon: "🔄", label: "교환 내역", sub: "받은 8 · 보낸 5" },
          { icon: "🎁", label: "옷 기부하기", sub: "기부 가능한 옷 보기 · 기부 내역 3벌" },
          { icon: "📦", label: "배송 현황", sub: "배송중 1건" },
          { icon: "🌿", label: "순환 뱃지", sub: "그린 (12/30 → 트리)" },
          { icon: "👥", label: "친구 초대", sub: "초대하면 양쪽 +1리프" },
        ].map((m, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "11px 0",
            borderBottom: "1px solid #F0EDE5",
          }}>
            <span style={{ fontSize: "18px" }}>{m.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "12px", fontWeight: 600 }}>{m.label}</div>
              <div style={{ fontSize: "9px", color: "#999" }}>{m.sub}</div>
            </div>
            <span style={{ fontSize: "12px", color: "#CCC" }}>›</span>
          </div>
        ))}
      </div>

      <TabBar active={3} />
    </div>
  );
}

function ScreenPopup() {
  return (
    <div style={{ background: "#FAFAF5", height: "100%" }}>
      <div style={{
        height: "130px",
        background: "linear-gradient(135deg, #2D5A27, #1A4B6E)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}>
        <Badge text="이벤트" color="#FFF" />
        <div style={{ fontSize: "18px", fontWeight: 800, color: "#FFF", marginTop: "6px" }}>RE:WEAR 팝업 스토어</div>
        <div style={{ fontSize: "10px", color: "#C8E0C4", marginTop: "2px" }}>기획 준비 시 개최 · 성수동 S팩토리</div>
      </div>

      <div style={{ padding: "12px 16px" }}>
        <div style={{ background: "#FFF8F0", borderRadius: "8px", padding: "8px 12px", fontSize: "10px", color: "#8B6914", lineHeight: 1.5, marginBottom: "12px" }}>
          🍃 팝업에서 1리프 = 1,000원 가치로 사용 가능!
        </div>

        <div style={{ fontSize: "11px", fontWeight: 700, color: "#1A1A1A", marginBottom: "8px" }}>존 안내</div>
        {[
          { zone: "A", name: "리폼 마켓", desc: "기부 옷 리폼 제품", color: "#2D5A27", icon: "✂️" },
          { zone: "B", name: "브랜드존", desc: "친환경 브랜드", color: "#1A4B6E", icon: "🌿" },
          { zone: "C", name: "체험 워크숍", desc: "리메이크·커스텀", color: "#6B2D5B", icon: "🧵" },
          { zone: "D", name: "푸드 & 소셜", desc: "카페·포토존", color: "#8B6914", icon: "☕" },
        ].map((z, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 0",
            borderBottom: "1px solid #F0EDE5",
          }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: `${z.color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
            }}>{z.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "11px", fontWeight: 600 }}>
                <span style={{ color: z.color, marginRight: "4px" }}>Zone {z.zone}</span>
                {z.name}
              </div>
              <div style={{ fontSize: "9px", color: "#999" }}>{z.desc}</div>
            </div>
          </div>
        ))}

        <WireCard style={{ marginTop: "12px", padding: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "10px", color: "#888", marginBottom: "6px" }}>내 리프</div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline", gap: "6px" }}>
            <div style={{ fontSize: "22px", fontWeight: 800, color: "#2D5A27" }}>5</div>
            <div style={{ fontSize: "11px", color: "#888" }}>리프 (= 5,000원)</div>
          </div>
        </WireCard>
      </div>

      <TabBar active={0} />
    </div>
  );
}

// ===== MAIN =====
export default function ScreenDesign() {
  const [activeFlow, setActiveFlow] = useState("browse");

  const flowScreens = {
    browse: [
      { comp: <ScreenHome />, id: "S-01", title: "RE:WEAR", annotation: "메인 홈. 우측 하단 +버튼으로 옷 등록 진입. 피드 사이에 친환경 브랜드 광고(AD) 노출." },
      { comp: <ScreenDetail />, id: "S-05", title: "← 상세", annotation: "상품 상세. 수수료 없음, 배송비만 별도. 판매자 뱃지 표시." },
    ],
    upload: [
      { comp: <ScreenUpload1 />, id: "S-02", title: "옷 등록", annotation: "홈 +버튼으로 진입. 앞면·뒷면 최소 2장 촬영. 카테고리·브랜드·사이즈·상태 입력." },
      { comp: <ScreenUpload2 />, id: "S-03", title: "등록 완료", annotation: "AI+플랫폼 검수 합격 후 1리프 지급. 단일 리프 잔액 표시." },
    ],
    detail: [
      { comp: <ScreenDetail />, id: "S-05", title: "← 상세", annotation: "배송비만 부담. 서비스 수수료 없음. 순환 뱃지 표시." },
      { comp: <ScreenShipping />, id: "S-06", title: "배송 선택", annotation: "반값택배 / 직거래. 결제 = 1리프 + 택배비." },
    ],
    shipping: [
      { comp: <ScreenShipping />, id: "S-06", title: "배송 선택", annotation: "반값택배 추천. 수수료 0원. 총 = 1리프 + 배송비." },
    ],
    chat: [
      { comp: <ScreenChat />, id: "S-11", title: "채팅", annotation: "거래 중인 채팅 목록. 진행중/완료된 거래 대화를 확인." },
    ],
    donate: [
      { comp: <ScreenDonate />, id: "S-09", title: "기부하기", annotation: "MY에서 접근. 오래 안 팔린 옷을 자발적 기부. 리프 보상 없음." },
      { comp: <ScreenDonate2 />, id: "S-10", title: "기부 완료", annotation: "기부 → 수거 → 리폼 → 팝업 스토어 판매 여정 표시." },
    ],
    mypage: [
      { comp: <ScreenMypage />, id: "S-07", title: "마이페이지", annotation: "단일 리프 지갑, 순환 뱃지, 옷 기부하기, 친구 초대." },
    ],
    popup: [
      { comp: <ScreenPopup />, id: "S-08", title: "팝업 스토어", annotation: "이벤트성 팝업. 리폼 마켓 중심. 1리프=1,000원 사용." },
    ],
  };

  const screens = flowScreens[activeFlow] || [];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F8F7F3",
      fontFamily: "'Noto Sans KR', 'Pretendard', -apple-system, sans-serif",
      color: "#1A1A1A",
    }}>
      {/* Header */}
      <div className="screen-header">
        <div style={{
          fontSize: "10px",
          letterSpacing: "3px",
          color: "#666",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}>Screen Design Specification</div>
        <h1>RE:WEAR 화면설계서</h1>
        <p style={{ color: "#888", fontSize: "13px", margin: 0 }}>핵심 기능 및 유저 플로우</p>
      </div>

      {/* Flow navigation */}
      <div style={{
        display: "flex",
        gap: "0",
        background: "#2A2A2A",
        overflowX: "auto",
        position: "sticky",
        top: 52,
        zIndex: 90,
      }}>
        {flows.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFlow(f.id)}
            style={{
              flex: "0 0 auto",
              padding: "12px 16px",
              background: activeFlow === f.id ? "#F8F7F3" : "transparent",
              color: activeFlow === f.id ? "#1A1A1A" : "#777",
              border: "none",
              fontSize: "12px",
              fontWeight: activeFlow === f.id ? 700 : 400,
              cursor: "pointer",
              borderBottom: activeFlow === f.id ? "3px solid #2D5A27" : "3px solid transparent",
              whiteSpace: "nowrap",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Flow description */}
      <div className="screen-flow-desc">
        <div style={{ fontSize: "11px", color: "#2D5A27", fontWeight: 700, letterSpacing: "1px", marginBottom: "4px" }}>
          FLOW: {flows.find(f => f.id === activeFlow)?.label}
        </div>
        <div style={{ fontSize: "12px", color: "#888", lineHeight: 1.5 }}>
          {{
            browse: "메인 홈에서 아이템을 탐색합니다. 우측 하단 +버튼으로 옷 등록, 피드에 친환경 브랜드 광고 노출.",
            upload: "홈 +버튼으로 진입. 옷 사진(앞·뒤 최소 2장) 촬영 후 정보 입력하면, 검수 후 1리프 지급.",
            detail: "상품 상세에서 '교환하기'를 누르면 배송 방법을 선택합니다. 수수료 없이 리프+택배비만.",
            shipping: "반값택배(추천) 또는 직거래 중 배송 방법을 선택합니다.",
            chat: "거래 중인 상대방과 채팅합니다. 배송 방법 협의, 직거래 장소 약속 등을 진행합니다.",
            donate: "MY에서 접근. 오래 안 팔리는 옷을 자발적으로 기부. 리폼되어 팝업 스토어에서 판매됩니다.",
            mypage: "단일 리프 지갑, 순환 뱃지, 옷 기부하기, 교환 내역을 확인합니다.",
            popup: "이벤트성 팝업 스토어. 리폼 마켓, 브랜드존, 워크숍, 소셜존으로 구성됩니다.",
          }[activeFlow]}
        </div>
      </div>

      {/* Screens */}
      <div className="screen-phones-wrapper">
        {screens.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start" }}>
            <Phone title={s.title} screenId={s.id} annotation={s.annotation}>
              {s.comp}
            </Phone>
            {i < screens.length - 1 && <Arrow />}
          </div>
        ))}
      </div>
    </div>
  );
}
