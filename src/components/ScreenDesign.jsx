import { useState } from "react";

const flows = [
  { id: "browse", label: "홈 / 탐색" },
  { id: "upload", label: "옷 등록" },
  { id: "detail", label: "교환하기" },
  { id: "shipping", label: "배송" },
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
      <div style={{
        width: "260px",
        height: "520px",
        borderRadius: "28px",
        border: "3px solid #1A1A1A",
        background: "#FFFFFF",
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        flexShrink: 0,
      }}>
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
        <div style={{
          height: "390px",
          overflow: "hidden",
          position: "relative",
        }}>
          {children}
        </div>
        {/* Home indicator */}
        <div style={{
          height: "50px",
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
        <div style={{
          width: "260px",
          fontSize: "11px",
          color: "#888",
          lineHeight: 1.5,
          textAlign: "center",
          padding: "0 8px",
        }}>{annotation}</div>
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
function WireBtn({ text, primary, full, small }) {
  return (
    <div style={{
      background: primary ? "#2D5A27" : "#F0EDE5",
      color: primary ? "#FFF" : "#1A1A1A",
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

function ItemThumb({ label, coin, size = 70 }) {
  return (
    <div style={{ width: size, textAlign: "center" }}>
      <div style={{
        width: size,
        height: size,
        borderRadius: "8px",
        background: "#F0EDE5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size > 60 ? "28px" : "20px",
        marginBottom: "4px",
      }}>👕</div>
      {label && <div style={{ fontSize: "9px", color: "#666", lineHeight: 1.3 }}>{label}</div>}
      {coin && (
        <div style={{ fontSize: "9px", color: "#8B6914", fontWeight: 700 }}>🪙 {coin}</div>
      )}
    </div>
  );
}

function TabBar({ active }) {
  const tabs = [
    { icon: "🏠", label: "홈" },
    { icon: "📸", label: "등록" },
    { icon: "🪙", label: "코인" },
    { icon: "🎪", label: "팝업" },
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
      {/* Search */}
      <WireInput placeholder="브랜드, 카테고리 검색..." icon="🔍" />

      {/* Category pills */}
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

      {/* Items grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "8px",
        marginTop: "12px",
      }}>
        {[
          { emoji: "👕", name: "유니클로 린넨셔츠", coin: "실버 1", tag: "M · 상의" },
          { emoji: "👖", name: "자라 와이드팬츠", coin: "실버 1", tag: "S · 하의" },
          { emoji: "🧥", name: "COS 울코트", coin: "골드 1", tag: "M · 아우터" },
          { emoji: "👗", name: "H&M 플로럴 원피스", coin: "실버 1", tag: "S · 원피스" },
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
            <div style={{ fontSize: "9px", color: "#999", marginBottom: "4px" }}>{item.tag}</div>
            <div style={{
              fontSize: "11px",
              fontWeight: 700,
              color: item.coin.includes("골드") ? "#8B6914" : "#2D5A27",
            }}>🪙 {item.coin}</div>
          </WireCard>
        ))}
      </div>

      <TabBar active={0} />
    </div>
  );
}

function ScreenUpload1() {
  return (
    <div style={{ padding: "16px", background: "#FAFAF5", height: "100%" }}>
      {/* Photo area */}
      <div style={{
        height: "160px",
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
        <div style={{ fontSize: "12px", color: "#888", fontWeight: 500 }}>사진 촬영 또는 앨범에서 선택</div>
        <div style={{ fontSize: "10px", color: "#BBB" }}>최소 1장, 최대 5장</div>
      </div>

      {/* Photo thumbnails */}
      <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
        {[1, 2, 3, 4, 5].map(n => (
          <div key={n} style={{
            width: "40px",
            height: "40px",
            borderRadius: "6px",
            border: n === 1 ? "2px solid #2D5A27" : "1px dashed #DDD",
            background: n === 1 ? "#E8F0E5" : "#FAFAF5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: n === 1 ? "16px" : "12px",
            color: "#CCC",
          }}>{n === 1 ? "👕" : "+"}</div>
        ))}
      </div>

      {/* Form fields */}
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
      {/* Status */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
        <div style={{ fontSize: "16px", fontWeight: 700, color: "#1A1A1A", marginBottom: "4px" }}>검수 완료!</div>
        <div style={{ fontSize: "12px", color: "#888" }}>코인이 지급되었습니다</div>
      </div>

      {/* Coin result */}
      <WireCard style={{ marginTop: "24px", padding: "16px", textAlign: "center" }}>
        <div style={{ fontSize: "11px", color: "#888", marginBottom: "8px" }}>지급된 코인</div>
        <div style={{ fontSize: "36px", marginBottom: "4px" }}>🪙</div>
        <div style={{ fontSize: "22px", fontWeight: 800, color: "#2D5A27" }}>실버코인 +1</div>
        <div style={{ fontSize: "10px", color: "#AAA", marginTop: "8px" }}>유니클로 린넨셔츠 M</div>
      </WireCard>

      {/* Wallet summary */}
      <WireCard style={{ marginTop: "12px", padding: "14px" }}>
        <div style={{ fontSize: "10px", color: "#888", marginBottom: "8px" }}>내 코인 현황</div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#2D5A27" }}>3</div>
            <div style={{ fontSize: "9px", color: "#888" }}>실버코인</div>
          </div>
          <div style={{ width: "1px", background: "#EEE" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#8B6914" }}>1</div>
            <div style={{ fontSize: "9px", color: "#888" }}>골드코인</div>
          </div>
          <div style={{ width: "1px", background: "#EEE" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#6B2D5B" }}>0</div>
            <div style={{ fontSize: "9px", color: "#888" }}>보너스코인</div>
          </div>
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
      {/* Image */}
      <div style={{
        height: "200px",
        background: "#F0EDE5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "64px",
      }}>🧥</div>

      <div style={{ padding: "14px" }}>
        {/* Tags */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
          <Badge text="아우터" />
          <Badge text="M 사이즈" color="#666" />
          <Badge text="거의 안입음" color="#8B6914" />
        </div>

        <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "2px" }}>COS 울 블렌드 코트</div>
        <div style={{ fontSize: "10px", color: "#999", marginBottom: "12px" }}>등록 3일째 · 조회 24</div>

        {/* Coin price */}
        <WireCard style={{ padding: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "10px", color: "#888" }}>교환 가격</div>
            <div style={{ fontSize: "20px", fontWeight: 800, color: "#8B6914" }}>🪙 골드코인 1</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "9px", color: "#AAA" }}>+ 서비스비 1,000원</div>
            <div style={{ fontSize: "9px", color: "#AAA" }}>+ 배송비 별도</div>
          </div>
        </WireCard>

        {/* Seller info */}
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
            <div style={{ fontSize: "11px", fontWeight: 600 }}>초록옷장</div>
            <div style={{ fontSize: "9px", color: "#999" }}>스왑 12회 · ⭐ 4.8</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Badge text="강남구" color="#666" />
          </div>
        </div>

        {/* Actions */}
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
            <WireBtn text="코인으로 교환하기" primary full />
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

      {/* Option 1: 반값택배 */}
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
              GS25 / CU 편의점 → 편의점 배송<br />
              QR코드 접수 · 2~3일 소요
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "14px", fontWeight: 800, color: "#2D5A27" }}>1,800원</div>
          </div>
        </div>
      </WireCard>

      {/* Option 2: 직거래 */}
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

      {/* Option 3: 일반택배 */}
      <WireCard style={{ padding: "14px", marginBottom: "16px", opacity: 0.6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <span style={{ fontSize: "16px" }}>🚛</span>
              <span style={{ fontSize: "13px", fontWeight: 700 }}>일반택배</span>
            </div>
            <div style={{ fontSize: "10px", color: "#888" }}>
              집으로 직접 배송 · 1~2일 소요
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#999" }}>3,500원</div>
          </div>
        </div>
      </WireCard>

      {/* Summary */}
      <div style={{
        background: "#1A1A1A",
        borderRadius: "12px",
        padding: "14px",
        color: "#FFF",
      }}>
        <div style={{ fontSize: "10px", color: "#888", marginBottom: "8px" }}>결제 요약</div>
        {[
          ["교환 코인", "🪙 골드 1"],
          ["서비스비", "1,000원"],
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
          <span>🪙 골드 1 + 2,800원</span>
        </div>
      </div>

      <div style={{ marginTop: "12px" }}>
        <WireBtn text="교환 확정하기" primary full />
      </div>
    </div>
  );
}

function ScreenMypage() {
  return (
    <div style={{ background: "#FAFAF5", height: "100%" }}>
      {/* Profile */}
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
        }}>🌱</div>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 700 }}>리웨어러_민지</div>
          <div style={{ fontSize: "10px", color: "#999" }}>스왑 8회 · 등록 12벌 · 마포구</div>
        </div>
      </div>

      {/* Coin wallet */}
      <div style={{
        margin: "12px 16px",
        background: "#1A1A1A",
        borderRadius: "14px",
        padding: "16px",
        color: "#FFF",
      }}>
        <div style={{ fontSize: "10px", color: "#888", marginBottom: "10px" }}>내 코인 지갑</div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {[
            { n: "3", label: "실버", color: "#A8D5A0" },
            { n: "1", label: "골드", color: "#D4B85A" },
            { n: "2", label: "보너스", color: "#C490B8" },
          ].map((c, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "22px", fontWeight: 800, color: c.color }}>{c.n}</div>
              <div style={{ fontSize: "9px", color: "#888" }}>{c.label}</div>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: "10px",
          padding: "8px",
          background: "#2A2A2A",
          borderRadius: "8px",
          textAlign: "center",
          fontSize: "10px",
          color: "#AAA",
        }}>코인 구매하기 · 1코인 = 2,000원</div>
      </div>

      {/* Menu items */}
      <div style={{ padding: "0 16px" }}>
        {[
          { icon: "👕", label: "내 등록 옷", sub: "12벌 (교환완료 5)" },
          { icon: "🔄", label: "교환 내역", sub: "받은 8 · 보낸 5" },
          { icon: "📦", label: "배송 현황", sub: "배송중 1건" },
          { icon: "🎪", label: "다음 팝업", sub: "3월 29일(토) 성수" },
          { icon: "🌍", label: "나의 환경 기여", sub: "CO₂ 12kg 절감" },
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

      <TabBar active={4} />
    </div>
  );
}

function ScreenPopup() {
  return (
    <div style={{ background: "#FAFAF5", height: "100%" }}>
      {/* Banner */}
      <div style={{
        height: "130px",
        background: "linear-gradient(135deg, #2D5A27, #1A4B6E)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}>
        <Badge text="D-12" color="#FFF" />
        <div style={{ fontSize: "18px", fontWeight: 800, color: "#FFF", marginTop: "6px" }}>3월 RE:WEAR 팝업</div>
        <div style={{ fontSize: "10px", color: "#C8E0C4", marginTop: "2px" }}>3.29(토) 13:00~19:00 · 성수동 S팩토리</div>
      </div>

      <div style={{ padding: "12px 16px" }}>
        {/* Zones */}
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#1A1A1A", marginBottom: "8px" }}>존 안내</div>
        {[
          { zone: "A", name: "스왑 마켓", desc: "미판매 옷 200벌+", color: "#2D5A27", icon: "👕" },
          { zone: "B", name: "친환경 브랜드", desc: "8개 브랜드 참여", color: "#1A4B6E", icon: "🌿" },
          { zone: "C", name: "리메이크 체험", desc: "현장 옷 수선·커스텀", color: "#6B2D5B", icon: "✂️" },
          { zone: "D", name: "카페 & 소셜", desc: "비건 음료·포토존", color: "#8B6914", icon: "☕" },
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

        {/* My popup coins */}
        <WireCard style={{ marginTop: "12px", padding: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "10px", color: "#888", marginBottom: "6px" }}>팝업에서 사용 가능한 코인</div>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#2D5A27" }}>3</div>
              <div style={{ fontSize: "9px", color: "#888" }}>실버</div>
            </div>
            <div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: "#6B2D5B" }}>2</div>
              <div style={{ fontSize: "9px", color: "#888" }}>보너스</div>
            </div>
          </div>
        </WireCard>

        <div style={{ marginTop: "12px" }}>
          <WireBtn text="참여 신청하기 (무료)" primary full />
        </div>
      </div>

      <TabBar active={3} />
    </div>
  );
}

// ===== MAIN =====
export default function ScreenDesign() {
  const [activeFlow, setActiveFlow] = useState("browse");

  const flowScreens = {
    browse: [
      { comp: <ScreenHome />, id: "S-01", title: "RE:WEAR", annotation: "메인 홈. 카테고리 필터와 아이템 그리드. 코인 타입(실버/골드)이 가격 역할." },
      { comp: <ScreenDetail />, id: "S-05", title: "← 상세", annotation: "상품 상세. 코인 가격, 판매자 정보, 상태 태그. '교환하기' CTA." },
    ],
    upload: [
      { comp: <ScreenUpload1 />, id: "S-02", title: "옷 등록", annotation: "사진 촬영 후 카테고리·브랜드·사이즈·상태 입력. 최대한 간결하게." },
      { comp: <ScreenUpload2 />, id: "S-03", title: "등록 완료", annotation: "검수 완료 후 코인 지급 확인. 현재 보유 코인 현황 표시." },
    ],
    detail: [
      { comp: <ScreenDetail />, id: "S-05", title: "← 상세", annotation: "코인 가격 + 서비스비 + 배송비 구조 명시. 찜하기와 교환 CTA." },
      { comp: <ScreenShipping />, id: "S-06", title: "배송 선택", annotation: "반값택배 / 직거래 / 일반택배 3가지 옵션. 결제 요약 표시." },
    ],
    shipping: [
      { comp: <ScreenShipping />, id: "S-06", title: "배송 선택", annotation: "반값택배 추천. 총 결제금액 = 코인 + 현금(서비스비+배송비)." },
    ],
    mypage: [
      { comp: <ScreenMypage />, id: "S-07", title: "마이페이지", annotation: "코인 지갑, 등록/교환 내역, 배송 현황, 다음 팝업, 환경 기여도." },
    ],
    popup: [
      { comp: <ScreenPopup />, id: "S-08", title: "팝업 이벤트", annotation: "다음 팝업 정보, 4개 존 안내, 사용 가능 코인 표시, 참여 신청." },
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
      <div style={{
        background: "#1A1A1A",
        padding: "32px 24px 24px",
      }}>
        <div style={{
          fontSize: "10px",
          letterSpacing: "3px",
          color: "#666",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}>Screen Design Specification</div>
        <h1 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "32px",
          color: "#F5F0E8",
          margin: "0 0 4px",
        }}>RE:WEAR 화면설계서</h1>
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
      <div style={{ padding: "20px 24px 8px" }}>
        <div style={{ fontSize: "11px", color: "#2D5A27", fontWeight: 700, letterSpacing: "1px", marginBottom: "4px" }}>
          FLOW: {flows.find(f => f.id === activeFlow)?.label}
        </div>
        <div style={{ fontSize: "12px", color: "#888", lineHeight: 1.5 }}>
          {{
            browse: "메인 홈에서 아이템을 탐색하고, 상세 페이지에서 코인 교환을 시작합니다.",
            upload: "옷 사진을 촬영하고 정보를 입력하면, 검수 후 코인이 지급됩니다.",
            detail: "상품 상세에서 '교환하기'를 누르면 배송 방법을 선택하고 결제합니다.",
            shipping: "반값택배(추천), 직거래, 일반택배 중 배송 방법을 선택합니다.",
            mypage: "코인 지갑, 교환 내역, 배송 현황, 환경 기여도를 한눈에 확인합니다.",
            popup: "다음 팝업 일정, 4개 존 정보, 사용 가능 코인을 확인하고 참여 신청합니다.",
          }[activeFlow]}
        </div>
      </div>

      {/* Screens */}
      <div style={{
        display: "flex",
        gap: "0",
        padding: "16px 24px 48px",
        overflowX: "auto",
        alignItems: "flex-start",
      }}>
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
