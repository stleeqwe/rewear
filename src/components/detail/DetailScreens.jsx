import { useState } from "react";

/* ==========================================================================
   LEAFIT  Detail & Registration Screens
   Design System "Electric Garden" tokens used inline.
   ========================================================================== */

// --- Design-system colour tokens ---
const C = {
  lime:      "#BEFF0A",
  forest:    "#1A3C20",
  chalk:     "#F7F5F0",
  offBlack:  "#111111",
  neonMint:  "#4DFFA6",
  hotCoral:  "#FF6B6B",
  butter:    "#FFE566",
  smoke:     "#2A2A2A",
  mist:      "#E8E5DD",
};

/* ---------- shared micro-components ---------- */

function Chip({ text, active, yellow, onClick }) {
  return (
    <span
      onClick={onClick}
      style={{
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 10,
        fontWeight: 600,
        cursor: onClick ? "pointer" : "default",
        background: yellow ? C.butter : active ? C.forest : `${C.mist}90`,
        color: yellow ? C.offBlack : active ? "#FFF" : "#666",
        whiteSpace: "nowrap",
        transition: "all 0.15s ease",
      }}
    >
      {text}
    </span>
  );
}

function ActionBtn({ text, bg = C.lime, color = C.forest, full, small, style: extra }) {
  return (
    <div
      style={{
        background: bg,
        color,
        padding: small ? "8px 14px" : "12px 16px",
        borderRadius: 14,
        fontSize: small ? 11 : 13,
        fontWeight: 700,
        textAlign: "center",
        width: full ? "100%" : "auto",
        cursor: "default",
        ...extra,
      }}
    >
      {text}
    </div>
  );
}

function DotIndicators({ total = 3, active = 0 }) {
  return (
    <div style={{ display: "flex", gap: 5, justifyContent: "center", width: "100%" }}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            width: i === active ? 8 : 6,
            height: i === active ? 8 : 6,
            borderRadius: "50%",
            background: i === active ? C.lime : "rgba(255,255,255,0.5)",
            transition: "all 0.2s ease",
          }}
        />
      ))}
    </div>
  );
}

function TradeTags({ tags }) {
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      {tags.map((t, i) => (
        <span
          key={i}
          style={{
            fontSize: 10,
            color: "#666",
            background: "#F0EDE5",
            padding: "4px 10px",
            borderRadius: 14,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* Photo gallery shared by all detail screens */
function PhotoGallery({ emoji = "🧥", dots = 3, activeDot = 0, height = 280 }) {
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          height,
          background: "linear-gradient(135deg, #E8E5DD 0%, #D5D0C8 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 64,
          position: "relative",
        }}
      >
        {emoji}
        {/* swipe-hint arrows */}
        {["left", "right"].map((side) => (
          <div
            key={side}
            style={{
              position: "absolute",
              [side]: 10,
              top: "50%",
              transform: "translateY(-50%)",
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFF",
              fontSize: 11,
            }}
          >
            {side === "left" ? "‹" : "›"}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 10, left: 0, right: 0 }}>
        <DotIndicators total={dots} active={activeDot} />
      </div>
    </div>
  );
}

/* Seller row shared across detail screens */
function SellerRow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 0",
        borderTop: `1px solid ${C.mist}`,
        borderBottom: `1px solid ${C.mist}`,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#D4F0D0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        🌿
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>초록옷장</span>
          <span style={{ fontSize: 12 }}>🌱</span>
          <span
            style={{
              fontSize: 9,
              background: `${C.neonMint}20`,
              color: C.forest,
              padding: "2px 6px",
              borderRadius: 10,
              fontWeight: 600,
            }}
          >
            그린
          </span>
        </div>
        <div style={{ fontSize: 10, color: "#999", marginTop: 1 }}>
          마포구 연남동 · 순환 12회
        </div>
      </div>
      <span style={{ fontSize: 14, color: "#CCC" }}>›</span>
    </div>
  );
}

/* Product info block shared by detail variants */
function ProductInfo({
  chips,
  name = "COS 울 블렌드 코트",
  sub = "등록 3일째 · 조회 24",
  desc = "작년 겨울에 구매했는데 2번 착용. 보풀 없고 상태 좋아요.",
}) {
  return (
    <>
      <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
        {chips || (
          <>
            <Chip text="아우터" active />
            <Chip text="M 사이즈" />
            <Chip text="거의 안입음" yellow />
          </>
        )}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: C.offBlack, marginBottom: 2 }}>
        {name}
      </div>
      <div style={{ fontSize: 10, color: "#999", marginBottom: 10 }}>{sub}</div>
      <div style={{ fontSize: 11, color: "#666", lineHeight: 1.6, marginBottom: 12 }}>
        {desc}
      </div>
    </>
  );
}

/* =========================================================================
   1. ScreenDetail  --  Item Detail Page
   ========================================================================= */
export function ScreenDetail() {
  return (
    <div style={{ background: C.chalk, height: "100%", overflow: "hidden" }}>
      <PhotoGallery />

      <div style={{ padding: 14, paddingBottom: 68 }}>
        <ProductInfo />

        {/* Preferred trading method */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#999", marginBottom: 6 }}>
            희망 거래 방식
          </div>
          <TradeTags tags={["📦 반값택배", "🤝 직거래", "🚛 일반택배"]} />
        </div>

        {/* Seller area */}
        <SellerRow />
      </div>

      {/* Action bar (absolute bottom) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#FFF",
          borderTop: `1px solid ${C.mist}`,
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* Wishlist */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            border: `1px solid ${C.mist}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            flexShrink: 0,
          }}
        >
          ♡
        </div>
        {/* Share */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            border: `1px solid ${C.mist}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 15,
            flexShrink: 0,
          }}
        >
          ↗
        </div>
        {/* More */}
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            border: `1px solid ${C.mist}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: "#999",
            flexShrink: 0,
            letterSpacing: 1,
          }}
        >
          ···
        </div>
        {/* CTA */}
        <div style={{ flex: 1 }}>
          <ActionBtn text="채팅하기" bg={C.lime} color={C.forest} full />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. ScreenDetailNoLeaf  --  When leaf = 0
   ========================================================================= */
export function ScreenDetailNoLeaf() {
  return (
    <div style={{ background: C.chalk, height: "100%", overflow: "hidden" }}>
      <PhotoGallery emoji="👗" dots={2} height={200} />

      <div style={{ padding: 14 }}>
        <ProductInfo
          chips={
            <>
              <Chip text="원피스" active />
              <Chip text="S 사이즈" />
              <Chip text="새것같음" yellow />
            </>
          }
          name="H&M 플로럴 원피스"
          sub="등록 1일째 · 조회 8"
          desc="올 봄 구매. 택 아직 달려있어요."
        />

        <TradeTags tags={["📦 반값택배", "🤝 직거래"]} />

        {/* No-leaf card */}
        <div
          style={{
            background: C.smoke,
            borderRadius: 18,
            padding: 20,
            textAlign: "center",
            marginTop: 16,
          }}
        >
          <div style={{ fontSize: 28, marginBottom: 6 }}>🍃</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#FFF", marginBottom: 4 }}>
            리프 없음
          </div>
          <div style={{ fontSize: 12, color: C.mist, marginBottom: 14 }}>
            올려서 벌어 💪
          </div>
          <ActionBtn text="옷 올리러 가기" bg={C.lime} color={C.forest} full />
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. ScreenDetailMine  --  When it's my item
   ========================================================================= */
export function ScreenDetailMine() {
  return (
    <div style={{ background: C.chalk, height: "100%", overflow: "hidden" }}>
      <PhotoGallery emoji="👕" dots={2} height={200} />

      <div style={{ padding: 14 }}>
        <ProductInfo
          chips={
            <>
              <Chip text="상의" active />
              <Chip text="M 사이즈" />
              <Chip text="양호" yellow />
            </>
          }
          name="유니클로 린넨셔츠"
          sub="등록 5일째 · 조회 15"
          desc="3번 착용. 다림질하면 깔끔합니다."
        />

        <TradeTags tags={["📦 반값택배", "🤝 직거래"]} />

        {/* My item card */}
        <div
          style={{
            background: C.forest,
            borderRadius: 18,
            padding: "18px 16px",
            textAlign: "center",
            marginTop: 16,
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 700, color: "#FFF", marginBottom: 14 }}>
            이건 네 옷이야 ✌️
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <ActionBtn text="수정하기" bg={C.lime} color={C.forest} full small />
            <ActionBtn
              text="삭제하기"
              bg="transparent"
              color={C.hotCoral}
              full
              small
              style={{ border: `1px solid ${C.mist}40` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. ScreenSellerProfile  --  Seller Profile
   ========================================================================= */
export function ScreenSellerProfile() {
  return (
    <div style={{ background: C.chalk, height: "100%" }}>
      {/* Header */}
      <div
        style={{
          height: 44,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          borderBottom: `1px solid ${C.mist}`,
          background: "#FFF",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 16, cursor: "default" }}>←</span>
        <span style={{ fontSize: 14, fontWeight: 700 }}>판매자 프로필</span>
      </div>

      {/* Profile card */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: 16,
          background: "#FFF",
          borderBottom: `1px solid ${C.mist}`,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#D4F0D0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            flexShrink: 0,
          }}
        >
          🌿
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>초록옷장</span>
            <span style={{ fontSize: 12 }}>🌱</span>
            <span
              style={{
                fontSize: 9,
                background: `${C.neonMint}20`,
                color: C.forest,
                padding: "2px 6px",
                borderRadius: 10,
                fontWeight: 600,
              }}
            >
              그린
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#999" }}>마포구 연남동</div>
          <div style={{ fontSize: 11, color: C.forest, fontWeight: 600, marginTop: 2 }}>
            순환 12회
          </div>
        </div>
      </div>

      {/* Seller's items grid */}
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.offBlack, marginBottom: 10 }}>
          판매 중인 옷
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {[
            { emoji: "🧥", name: "COS 울코트" },
            { emoji: "👖", name: "자라 와이드팬츠" },
            { emoji: "👚", name: "COS 니트" },
            { emoji: "👕", name: "무인양품 셔츠" },
            { emoji: "👗", name: "H&M 원피스" },
            { emoji: "🧥", name: "GAP 자켓" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "#FFF",
                borderRadius: 10,
                overflow: "hidden",
                border: `1px solid ${C.mist}`,
              }}
            >
              <div
                style={{
                  height: 60,
                  background: "#F0EDE5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                {item.emoji}
              </div>
              <div style={{ padding: "5px 6px", fontSize: 9, fontWeight: 600, color: C.offBlack }}>
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. ScreenRegisterStep0  --  Product Info Input
   ========================================================================= */
export function ScreenRegisterStep0() {
  const categories = ["상의", "하의", "아우터", "원피스", "가방", "기타"];
  const sizes      = ["XS", "S", "M", "L", "XL"];
  const conditions  = ["새것같음", "거의 안입음", "양호"];
  const trades      = ["반값택배", "직거래", "일반택배"];

  const [cat, setCat]     = useState(0);
  const [sz, setSz]       = useState(2);
  const [cond, setCond]   = useState(1);
  const [trSel, setTrSel] = useState([0]);

  const toggleTrade = (idx) =>
    setTrSel((p) => (p.includes(idx) ? p.filter((x) => x !== idx) : [...p, idx]));

  return (
    <div style={{ padding: 14, background: C.chalk, height: "100%", overflowY: "auto" }}>
      {/* Photo area */}
      <div
        style={{
          height: 160,
          borderRadius: 14,
          border: "2px dashed #CCC",
          background: "#F5F3ED",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 36 }}>📷</span>
        <span style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>탭해서 사진 추가</span>
      </div>

      {/* Thumbnails */}
      <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
        {["앞면", "뒷면", "+", "+"].map((t, i) => (
          <div
            key={i}
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              border: i < 2 ? `2px solid ${C.forest}` : "1.5px dashed #DDD",
              background: i < 2 ? "#E8F0E5" : C.chalk,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: i < 2 ? 10 : 14,
              color: i < 2 ? C.forest : "#CCC",
              fontWeight: 600,
              flexShrink: 0,
            }}
          >
            {t}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 10, color: "#BBB", marginBottom: 14 }}>
        한 벌만. 앞면 + 뒷면 최소 2장.
      </div>

      {/* Category */}
      <FieldLabel label="카테고리" />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {categories.map((c, i) => (
          <Chip key={i} text={c} active={cat === i} onClick={() => setCat(i)} />
        ))}
      </div>

      {/* Size */}
      <FieldLabel label="사이즈" />
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {sizes.map((s, i) => (
          <Chip key={i} text={s} active={sz === i} onClick={() => setSz(i)} />
        ))}
      </div>

      {/* Condition */}
      <FieldLabel label="상태" />
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {conditions.map((c, i) => (
          <Chip key={i} text={c} active={cond === i} onClick={() => setCond(i)} />
        ))}
      </div>

      {/* Description */}
      <FieldLabel label="설명 (선택)" />
      <div
        style={{
          background: "#F5F3ED",
          border: `1px solid ${C.mist}`,
          borderRadius: 12,
          padding: 10,
          fontSize: 11,
          color: "#AAA",
          minHeight: 52,
          lineHeight: 1.5,
          marginBottom: 12,
        }}
      >
        상태, 사이즈 핏, 구매시기 등 자유롭게 적어주세요
      </div>

      {/* Trading method (multi) */}
      <FieldLabel label="거래 방식 (복수 선택)" />
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {trades.map((t, i) => (
          <Chip key={i} text={t} active={trSel.includes(i)} onClick={() => toggleTrade(i)} />
        ))}
      </div>

      <ActionBtn text="등록하기" bg={C.lime} color={C.forest} full />
    </div>
  );
}

/* tiny helper used only in Step0 */
function FieldLabel({ label }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 600, color: "#666", marginBottom: 5 }}>
      {label}
    </div>
  );
}

/* =========================================================================
   6. ScreenRegisterStep1  --  Preview
   ========================================================================= */
export function ScreenRegisterStep1() {
  return (
    <div
      style={{
        padding: 16,
        background: C.chalk,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, textAlign: "center" }}>
        이렇게 등록돼요
      </div>

      {/* Preview card */}
      <div
        style={{
          background: "#FFF",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          flex: "0 0 auto",
        }}
      >
        <div
          style={{
            height: 140,
            background: "linear-gradient(135deg, #E8E5DD, #D5D0C8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 48,
            position: "relative",
          }}
        >
          🧥
          <div style={{ position: "absolute", bottom: 8, left: 0, right: 0 }}>
            <DotIndicators total={3} active={0} />
          </div>
        </div>
        <div style={{ padding: 12 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
            <Chip text="아우터" active />
            <Chip text="M 사이즈" />
            <Chip text="거의 안입음" yellow />
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>COS 울 블렌드 코트</div>
          <div style={{ fontSize: 10, color: "#666", lineHeight: 1.5, marginBottom: 8 }}>
            작년 겨울에 구매, 2번 착용. 상태 좋음.
          </div>
          <TradeTags tags={["📦 반값택배", "🤝 직거래"]} />
        </div>
      </div>

      <div
        style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          paddingBottom: 4,
        }}
      >
        <ActionBtn text="확인하고 등록하기" bg={C.lime} color={C.forest} full />
        <div
          style={{
            textAlign: "center",
            fontSize: 12,
            color: C.forest,
            fontWeight: 600,
            padding: 6,
            cursor: "default",
          }}
        >
          수정하기
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   7. ScreenRegisterStep2  --  AI Inspection  (loading)
   ========================================================================= */
export function ScreenRegisterStep2() {
  return (
    <div
      style={{
        background: C.chalk,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Lime spinner */}
      <div
        style={{
          width: 48,
          height: 48,
          border: `4px solid ${C.mist}`,
          borderTopColor: C.lime,
          borderRadius: "50%",
          animation: "eg-detail-spin 0.8s linear infinite",
          marginBottom: 18,
        }}
      />
      <style>{`@keyframes eg-detail-spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ fontSize: 18, fontWeight: 700, color: C.offBlack, marginBottom: 6 }}>
        AI 검수 중...
      </div>
      <div style={{ fontSize: 13, color: "#999" }}>잠깐만, 확인하는 중 🔍</div>
    </div>
  );
}

/* =========================================================================
   8. ScreenRegisterStep3  --  Pass
   ========================================================================= */
export function ScreenRegisterStep3() {
  return (
    <div
      style={{
        background: C.forest,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      {/* bounce-in checkmark */}
      <div
        style={{
          fontSize: 56,
          lineHeight: 1,
          marginBottom: 10,
          animation: "eg-detail-bounce 0.5s ease",
        }}
      >
        ✅
      </div>
      <style>{`
        @keyframes eg-detail-bounce {
          0%   { transform: scale(0.3); opacity: 0; }
          50%  { transform: scale(1.12); }
          70%  { transform: scale(0.94); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div
        style={{
          fontSize: 28,
          fontWeight: 800,
          color: C.lime,
          marginBottom: 4,
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        통과 ✅
      </div>
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#FFF",
          marginBottom: 24,
          fontFamily: "'Outfit', sans-serif",
          letterSpacing: 2,
        }}
      >
        LEAF GET!
      </div>

      {/* Leaf card */}
      <div
        style={{
          background: C.smoke,
          borderRadius: 18,
          padding: 20,
          width: "100%",
          textAlign: "center",
          marginBottom: 28,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 4 }}>🍃</div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: C.neonMint,
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          +1 LEAF
        </div>
        <div style={{ fontSize: 11, color: "#999", marginTop: 8 }}>
          보유 리프:{" "}
          <span style={{ color: C.neonMint, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
            3
          </span>
        </div>
      </div>

      {/* CTAs */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        <ActionBtn text="스왑하러 가기 →" bg={C.lime} color={C.forest} full />
        <ActionBtn
          text="더 올리기"
          bg={C.forest}
          color={C.lime}
          full
          style={{ border: `1.5px solid ${C.lime}40` }}
        />
      </div>
    </div>
  );
}

/* =========================================================================
   9. ScreenRegisterStep4  --  Fail
   ========================================================================= */
export function ScreenRegisterStep4() {
  const failReasons = ["사진이 흐릿해", "상태가 기준 미달"];
  const criteria = [
    "찢어짐/구멍",
    "심한 얼룩/변색",
    "속옷·양말",
    "대충 찍은 사진",
  ];

  return (
    <div
      style={{
        background: C.chalk,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        overflowY: "auto",
      }}
    >
      <div style={{ fontSize: 56, marginTop: 10, marginBottom: 10, lineHeight: 1 }}>❌</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: C.offBlack, marginBottom: 16 }}>
        아쉽, 통과 못 했어
      </div>

      {/* Reason cards */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {failReasons.map((r, i) => (
          <div
            key={i}
            style={{
              background: `${C.hotCoral}10`,
              border: `1px solid ${C.hotCoral}25`,
              borderRadius: 12,
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              fontWeight: 600,
              color: C.hotCoral,
            }}
          >
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: `${C.hotCoral}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              ⚠️
            </span>
            {r}
          </div>
        ))}
      </div>

      {/* Inspection criteria */}
      <div
        style={{
          width: "100%",
          background: C.smoke,
          borderRadius: 14,
          padding: "14px 16px",
          marginBottom: 20,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: "#FFF", marginBottom: 10 }}>
          친구한테 줄 수 있는 컨디션만 OK
        </div>
        {criteria.map((c, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "4px 0",
              fontSize: 11,
              color: C.mist,
            }}
          >
            <span style={{ color: C.hotCoral, fontWeight: 700, fontSize: 12, width: 16, textAlign: "center", flexShrink: 0 }}>
              ✕
            </span>
            {c}
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        <ActionBtn text="다시 올리기" bg={C.lime} color={C.forest} full />
        <div
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#999",
            fontWeight: 600,
            padding: 6,
            cursor: "default",
          }}
        >
          홈으로
        </div>
      </div>
    </div>
  );
}
