// LEAFIT Branding Guide — "Electric Garden" Design System
import { LeafIcon, Wordmark, LogoWithLeaf } from "./common/LeafitLogo";

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
  sponsored: "#F0FFF0",
};

function Section({ title, sub, children, dark }) {
  return (
    <section style={{
      background: dark ? C.forest : "#FFF",
      borderRadius: 20,
      padding: "32px 24px",
      marginBottom: 20,
      boxShadow: dark ? "0 8px 32px rgba(26,60,32,0.2)" : "0 2px 12px rgba(0,0,0,0.04)",
      border: dark ? "none" : `1px solid ${C.mist}`,
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
        color: dark ? C.lime : C.forest, marginBottom: 6,
        fontFamily: "'Outfit', sans-serif",
      }}>{sub}</div>
      <h2 style={{
        fontSize: 22, fontWeight: 800, color: dark ? "#FFF" : C.offBlack,
        marginBottom: 20, lineHeight: 1.3,
        fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
      }}>{title}</h2>
      {children}
    </section>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: "#FFF", borderRadius: 14, padding: "16px 18px",
      border: `1px solid ${C.mist}`, marginBottom: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      ...style,
    }}>{children}</div>
  );
}

function DarkCard({ children, style }) {
  return (
    <div style={{
      background: C.smoke, borderRadius: 16, padding: "16px 18px",
      marginBottom: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      ...style,
    }}>{children}</div>
  );
}

function ColorSwatch({ name, code, role, mood }) {
  const isDark = ["#1A3C20", "#111111", "#2A2A2A"].includes(code);
  return (
    <div style={{
      borderRadius: 14, overflow: "hidden",
      border: `1px solid ${C.mist}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    }}>
      <div style={{
        height: 56, background: code,
        display: "flex", alignItems: "flex-end", padding: "0 12px 6px",
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: isDark ? "#FFF" : C.offBlack,
          fontFamily: "'Outfit', sans-serif", letterSpacing: 0.5,
        }}>{code}</span>
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.offBlack, marginBottom: 2 }}>{name}</div>
        <div style={{ fontSize: 10, color: "#888", lineHeight: 1.4 }}>{role}</div>
        <div style={{ fontSize: 9, color: "#BBB", marginTop: 2 }}>{mood}</div>
      </div>
    </div>
  );
}

function TableRow({ cells, header }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: cells.length <= 3 ? "1fr 2fr" : `repeat(${cells.length}, 1fr)`,
      borderBottom: `1px solid ${C.mist}`, padding: "8px 0",
    }}>
      {cells.map((cell, i) => (
        <div key={i} style={{
          fontSize: header ? 10 : 12,
          fontWeight: header ? 700 : 400,
          color: header ? "#888" : C.offBlack,
          letterSpacing: header ? 0.5 : 0,
          padding: "2px 4px",
          lineHeight: 1.5,
        }}>{cell}</div>
      ))}
    </div>
  );
}

function CopyRow({ before, after }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8,
      padding: "8px 0", borderBottom: `1px solid ${C.mist}40`,
      alignItems: "center",
    }}>
      <div style={{ fontSize: 12, color: "#999", textDecoration: "line-through", lineHeight: 1.5 }}>{before}</div>
      <div style={{ fontSize: 14, color: C.lime }}>→</div>
      <div style={{ fontSize: 12, color: C.offBlack, fontWeight: 600, lineHeight: 1.5 }}>{after}</div>
    </div>
  );
}

function BadgeItem({ emoji, name, req, color, glow, active }) {
  return (
    <div style={{
      textAlign: "center", padding: "12px 8px", borderRadius: 14,
      background: active ? `${color}15` : "transparent",
      border: active ? `2px solid ${color}40` : "2px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        fontSize: 32, marginBottom: 4,
        filter: active ? "none" : "grayscale(0.8) opacity(0.4)",
        textShadow: active && glow ? `0 0 12px ${glow}` : "none",
      }}>{emoji}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: active ? color : "#CCC" }}>{name}</div>
      <div style={{ fontSize: 9, color: "#BBB", marginTop: 2 }}>{req}회</div>
    </div>
  );
}

export default function Branding() {
  return (
    <div style={{ minHeight: "100vh", background: C.chalk }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(160deg, ${C.forest} 0%, #0D2613 100%)`,
        padding: "56px 24px 48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${C.lime}15 0%, transparent 70%)`,
        }} />
        <div style={{ position: "relative" }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase",
            color: C.neonMint, marginBottom: 16,
            fontFamily: "'Outfit', sans-serif",
          }}>Brand Identity Guide</div>
          <div style={{ marginBottom: 12 }}>
            <LogoWithLeaf size={1.1} dark={true} />
          </div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 14, fontWeight: 700, letterSpacing: 6,
            color: C.lime, textTransform: "uppercase",
            marginBottom: 8,
          }}>SWAP IS THE NEW SHOP</div>
          <div style={{
            fontSize: 12, color: C.lime, letterSpacing: 1, marginBottom: 16,
            fontFamily: "'Pretendard', sans-serif", fontWeight: 500,
          }}>
            버리지 마, 리핏해.
          </div>
          <div style={{
            fontSize: 13, color: "#A8D5A0", lineHeight: 1.6, maxWidth: 400,
            margin: "0 auto",
          }}>
            순환에 참여하는 행위 자체가 가장 힙하고 영리한 소비 방식.
            <br />환경을 위해 착한 일을 하는 게 아니라, 이게 더 쿨하니까 하는 거.
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 60px" }}>

        {/* === 타겟 === */}
        <Section title="Target Audience" sub="0.2 타겟">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "🎯", text: "20대 Gen Z, 패션에 관심 있고 영리한 소비를 추구하는 세대" },
              { icon: "💬", text: "\"나 이거 0원에 가져왔어\"가 자랑이 되는 문화" },
              { icon: "🏆", text: "뱃지 플렉스, 순환 횟수가 인스타 바이오에 들어가는 세계" },
            ].map((t, i) => (
              <Card key={i}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{t.icon}</span>
                  <span style={{ fontSize: 13, color: C.offBlack, lineHeight: 1.5 }}>{t.text}</span>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* === 톤 & 무드 === */}
        <Section title="Tone & Mood" sub="0.3 톤 앤 무드" dark>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "핵심 메시지", value: "\"순환이 가장 힙한 쇼핑이다\"" },
              { label: "톤", value: "밝고 경쾌, 자신감 있고, 약간 건방진" },
              { label: "분위기", value: "놀이 + 엔터테인먼트 + 커뮤니티 플렉스" },
              { label: "레퍼런스", value: "Nike SNKRS x Duolingo 게이미피케이션 x Depop 커뮤니티" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: C.lime, minWidth: 70,
                  paddingTop: 2, fontFamily: "'Outfit', sans-serif",
                }}>{item.label}</div>
                <div style={{ fontSize: 13, color: "#E0E0E0", lineHeight: 1.5 }}>{item.value}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 20, background: `${C.hotCoral}15`, borderRadius: 12,
            padding: "12px 16px", border: `1px solid ${C.hotCoral}30`,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.hotCoral, marginBottom: 4 }}>
              NEVER DO THIS
            </div>
            <div style={{ fontSize: 12, color: "#E0C0C0", lineHeight: 1.5 }}>
              설교, 죄책감 유발, "지구를 위해", 뮤트 톤, 힐링 감성
            </div>
          </div>
        </Section>

        {/* === 경쟁사 포지셔닝 === */}
        <Section title="Competitive Positioning" sub="0.4 경쟁사 대비 포지셔닝">
          <div style={{ overflowX: "auto" }}>
            <div style={{
              display: "grid", gridTemplateColumns: "80px repeat(4, 1fr)",
              gap: 1, background: C.mist, borderRadius: 12, overflow: "hidden",
              minWidth: 500,
            }}>
              {/* Header */}
              {["", "Depop", "Nuw", "Vinted", "LEAFIT"].map((h, i) => (
                <div key={i} style={{
                  padding: "10px 8px", fontSize: 11, fontWeight: 700,
                  background: i === 4 ? C.forest : "#F5F3ED",
                  color: i === 4 ? C.lime : "#888",
                  textAlign: "center",
                }}>{h}</div>
              ))}
              {/* Rows */}
              {[
                ["무드", "반항적 유니크", "착한 지속가능", "세련 실용", "힙한 영리한"],
                ["동기", "자기표현", "환경", "절약", "재미 + 플렉스"],
                ["행위", "사고판다", "교환한다", "사고판다", "순환 게임"],
                ["톤", "시끄러운", "조용한", "차분한", "밝고 경쾌한"],
              ].map((row, ri) => (
                row.map((cell, ci) => (
                  <div key={`${ri}-${ci}`} style={{
                    padding: "10px 8px", fontSize: ci === 0 ? 10 : 11,
                    fontWeight: ci === 4 ? 700 : ci === 0 ? 600 : 400,
                    background: ci === 4 ? `${C.forest}10` : "#FFF",
                    color: ci === 4 ? C.forest : ci === 0 ? "#888" : C.offBlack,
                    textAlign: "center",
                  }}>{cell}</div>
                ))
              ))}
            </div>
          </div>
        </Section>

        {/* === 카피 톤 가이드 === */}
        <Section title="Copy Tone Guide" sub="0.5 카피 톤 가이드">
          <div style={{
            display: "flex", alignItems: "center", gap: 12, marginBottom: 16,
          }}>
            <div style={{
              background: `${C.hotCoral}15`, borderRadius: 20, padding: "4px 12px",
              fontSize: 10, fontWeight: 700, color: C.hotCoral,
            }}>착한 톤 (BEFORE)</div>
            <span style={{ color: C.lime, fontSize: 16 }}>→</span>
            <div style={{
              background: `${C.forest}12`, borderRadius: 20, padding: "4px 12px",
              fontSize: 10, fontWeight: 700, color: C.forest,
            }}>힙한 톤 (AFTER)</div>
          </div>
          {[
            ["옷을 올리면 리프를 받아요", "올리고. 받고. 스왑하고."],
            ["기부 감사합니다", "옷에 새 생명 ON 🔥"],
            ["검수 완료! 리프가 지급되었습니다", "통과 ✅ 리프 GET!"],
            ["리프가 부족합니다", "리프 없음 — 올려서 벌어"],
            ["거래가 완료되었습니다", "SWAP DONE 🤝"],
            ["순환을 시작했어요", "첫 발걸음 🌱"],
            ["전설의 유니버스 달성", "🪐 UNIVERSE UNLOCKED"],
            ["아직 등록한 옷이 없어요", "아직 텅 비었어 — 옷장을 털어봐"],
            ["마음에 드는 옷에서 채팅하기를 눌러보세요", "맘에 드는 거 찾으면 바로 채팅 GO"],
          ].map(([before, after], i) => (
            <CopyRow key={i} before={before} after={after} />
          ))}
        </Section>

        {/* === 로고 & 심볼 === */}
        <Section title="LEAFIT 로고 디자인" sub="0.6 로고 앤 심볼" dark>
          <div style={{ fontSize: 12, color: "#A8D5A0", marginBottom: 20, lineHeight: 1.5 }}>
            Leaf + it = LEAFIT · "버리지 마, 리핏해."
          </div>

          {/* Primary Logo — Dark */}
          <div style={{
            background: C.forest, borderRadius: 20, padding: "40px 24px",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            marginBottom: 16, border: "1px solid #2D5A27",
          }}>
            <div style={{ fontSize: 9, color: "#ffffff40", letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>Primary Logo — Dark Background</div>
            <LogoWithLeaf size={0.9} dark={true} />
            <div style={{ marginTop: 16, fontSize: 11, color: C.lime, letterSpacing: 5, fontFamily: "'Outfit', sans-serif", fontWeight: 600, textTransform: "uppercase" }}>SWAP IS THE NEW SHOP</div>
          </div>

          {/* Wordmark Variations */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <div style={{
              background: C.forest, borderRadius: 16, padding: "28px 16px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              border: "1px solid #2D5A27",
            }}>
              <div style={{ fontSize: 9, color: "#ffffff40", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Wordmark — Dark</div>
              <Wordmark leafColor={C.lime} itColor={C.chalk} scale={0.55} />
            </div>
            <div style={{
              background: C.chalk, borderRadius: 16, padding: "28px 16px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              border: `1px solid ${C.mist}`,
            }}>
              <div style={{ fontSize: 9, color: "#AAA", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Wordmark — Light</div>
              <Wordmark leafColor={C.forest} itColor={C.offBlack} scale={0.55} />
            </div>
          </div>

          {/* Leaf Symbol — Currency Icon */}
          <div style={{
            background: "#FFFFFF08", borderRadius: 16, padding: "24px 16px",
            border: "1px solid #FFFFFF10", marginBottom: 16,
          }}>
            <div style={{ fontSize: 9, color: "#ffffff40", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>Leaf Symbol — 리프 화폐 아이콘</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, background: C.forest, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4, border: "1px solid #2D5A27" }}>
                  <LeafIcon size={32} color={C.neonMint} rotate={0} />
                </div>
                <div style={{ fontSize: 9, color: "#888" }}>on Dark</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, background: C.chalk, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4, border: `1px solid ${C.mist}` }}>
                  <LeafIcon size={32} color={C.forest} rotate={0} />
                </div>
                <div style={{ fontSize: 9, color: "#888" }}>on Light</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, background: C.lime, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
                  <LeafIcon size={32} color={C.forest} rotate={0} />
                </div>
                <div style={{ fontSize: 9, color: "#888" }}>on Lime</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, background: C.smoke, padding: "8px 14px", borderRadius: 50, marginBottom: 4 }}>
                  <LeafIcon size={16} color={C.neonMint} rotate={0} />
                  <span style={{ fontSize: 14, fontWeight: 800, color: C.neonMint, fontFamily: "'Outfit', sans-serif" }}>12</span>
                </div>
                <div style={{ fontSize: 9, color: "#888" }}>잔액 표시</div>
              </div>
            </div>
          </div>

          {/* Color Variations Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {[
              { bg: C.forest, leaf: C.lime, it: C.chalk, label: "Forest + Lime (Primary)" },
              { bg: C.offBlack, leaf: C.lime, it: "#FFF", label: "Black + Lime" },
              { bg: C.chalk, leaf: C.forest, it: C.offBlack, label: "Light (역방향)" },
              { bg: "#FFF", leaf: C.forest, it: C.smoke, label: "White Minimal" },
              { bg: C.lime, leaf: C.forest, it: C.forest, label: "Lime 단색" },
              { bg: C.smoke, leaf: C.neonMint, it: "#FFF", label: "Smoke + Mint" },
            ].map((v, i) => (
              <div key={i} style={{
                background: v.bg, borderRadius: 14, padding: "24px 12px",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                border: v.bg === "#FFF" || v.bg === C.chalk ? `1px solid ${C.mist}` : "1px solid transparent",
              }}>
                <Wordmark leafColor={v.leaf} itColor={v.it} scale={0.45} />
                <div style={{ fontSize: 9, color: v.bg === C.chalk || v.bg === "#FFF" || v.bg === C.lime ? "#999" : "#ffffff60", marginTop: 10, letterSpacing: 0.5 }}>{v.label}</div>
              </div>
            ))}
          </div>

          {/* App Icons */}
          <div style={{
            background: "#FFFFFF08", borderRadius: 16, padding: "24px 16px",
            border: "1px solid #FFFFFF10", marginBottom: 16,
          }}>
            <div style={{ fontSize: 9, color: "#ffffff40", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>App Icon Designs</div>
            <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 18,
                  background: `linear-gradient(135deg, ${C.forest}, #0D2614)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                  marginBottom: 6,
                }}>
                  <LeafIcon size={40} color={C.lime} rotate={0} />
                </div>
                <div style={{ fontSize: 9, color: "#CCC" }}>Primary</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 18,
                  background: C.lime,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 4px 16px ${C.lime}40`,
                  marginBottom: 6,
                }}>
                  <LeafIcon size={40} color={C.forest} rotate={0} />
                </div>
                <div style={{ fontSize: 9, color: "#CCC" }}>Alt — Lime</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 18,
                  background: C.offBlack,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                  marginBottom: 6,
                }}>
                  <LeafIcon size={40} color={C.neonMint} rotate={0} />
                </div>
                <div style={{ fontSize: 9, color: "#CCC" }}>Alt — Dark</div>
              </div>
            </div>
          </div>

          {/* Brand Lockups */}
          <div style={{
            background: "#FFFFFF08", borderRadius: 16, padding: "24px 16px",
            border: "1px solid #FFFFFF10",
          }}>
            <div style={{ fontSize: 9, color: "#ffffff40", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, textAlign: "center" }}>Brand Lockups</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
              {/* Horizontal lockup */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: C.forest, padding: "12px 24px", borderRadius: 14, border: "1px solid #2D5A27" }}>
                <LeafIcon size={24} color={C.lime} rotate={0} />
                <Wordmark leafColor={C.lime} itColor="#FFF" scale={0.4} />
              </div>
              {/* Tagline lockup */}
              <div style={{ textAlign: "center", background: C.smoke, padding: "16px 32px", borderRadius: 14 }}>
                <Wordmark leafColor={C.lime} itColor="#FFF" scale={0.45} />
                <div style={{ fontSize: 9, color: "#ffffff50", letterSpacing: 4, fontFamily: "'Outfit', sans-serif", fontWeight: 600, textTransform: "uppercase", marginTop: 6 }}>버리지 마, 리핏해</div>
              </div>
              {/* Korean name */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Wordmark leafColor={C.lime} itColor="#FFF" scale={0.4} />
                <span style={{ fontSize: 16, fontWeight: 700, color: "#888" }}>리핏</span>
              </div>
            </div>
          </div>

          {/* Logo spec */}
          <div style={{ marginTop: 20, fontSize: 12, color: "#CCC", lineHeight: 1.7 }}>
            <div><span style={{ color: C.lime, fontWeight: 600 }}>Font:</span> Outfit · 800 weight</div>
            <div><span style={{ color: C.lime, fontWeight: 600 }}>LEAF:</span> Lime(#BEFF0A) &nbsp;|&nbsp; <span style={{ fontWeight: 600 }}>IT:</span> White or Off Black</div>
            <div><span style={{ color: C.lime, fontWeight: 600 }}>Leaf Icon:</span> Geometric minimal leaf — 리프 화폐 아이콘</div>
            <div><span style={{ color: C.lime, fontWeight: 600 }}>Tagline:</span> "버리지 마, 리핏해" / "SWAP IS THE NEW SHOP"</div>
          </div>
        </Section>

        {/* === 일러스트 스타일 === */}
        <Section title="Illustration & Graphic Style" sub="0.7 일러스트레이션">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { icon: "✏️", title: "볼드 라인", desc: "두꺼운 선, 과감한 형태. 얇은 미니멀 아님." },
              { icon: "🏷️", title: "스티커/배지", desc: "인스타 스토리 스티커처럼, 스크린샷 공유 유도." },
              { icon: "✨", title: "모션", desc: "리프 bounce, 뱃지 glow, 파티클 효과." },
              { icon: "📝", title: "빈 상태", desc: "귀여운 일러스트 대신 대담한 타이포." },
            ].map((item, i) => (
              <Card key={i} style={{ padding: "14px 16px" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.offBlack, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5 }}>{item.desc}</div>
              </Card>
            ))}
          </div>
        </Section>

        {/* ===== DESIGN SYSTEM: "Electric Garden" ===== */}
        <div style={{
          textAlign: "center", margin: "40px 0 24px",
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 4, color: C.forest,
            fontFamily: "'Outfit', sans-serif", marginBottom: 4,
          }}>DESIGN SYSTEM</div>
          <h2 style={{
            fontSize: 28, fontWeight: 800, color: C.offBlack,
            fontFamily: "'Outfit', sans-serif",
          }}>"Electric Garden"</h2>
        </div>

        {/* === 컬러 팔레트 === */}
        <Section title="Color Palette" sub="15.1 컬러 팔레트">
          <div style={{ fontSize: 12, color: "#888", marginBottom: 16, lineHeight: 1.5 }}>
            핵심 조합: <span style={{ fontWeight: 700, color: C.forest }}>다크 포레스트 배경</span> +{" "}
            <span style={{ fontWeight: 700, color: C.forest }}>일렉트릭 라임 포인트</span> (네온 on 다크)
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
            {[
              { name: "Lime", code: "#BEFF0A", role: "Primary Accent — CTA, 핵심 포인트", mood: "에너지, 힙함" },
              { name: "Forest", code: "#1A3C20", role: "Primary Dark — 다크 배경, 헤더", mood: "깊이감, 프리미엄" },
              { name: "Chalk", code: "#F7F5F0", role: "Light BG — 홈 피드, 카드", mood: "깨끗함, 여백" },
              { name: "Off Black", code: "#111111", role: "Text — 본문 텍스트", mood: "선명한 가독성" },
              { name: "Neon Mint", code: "#4DFFA6", role: "Secondary — 리프, 성공", mood: "신선함, 보상감" },
              { name: "Hot Coral", code: "#FF6B6B", role: "Alert — 알림, 에러", mood: "긴장감, 주의" },
              { name: "Butter", code: "#FFE566", role: "Warm — 예약, 뱃지 골드", mood: "따뜻한 활력" },
              { name: "Smoke", code: "#2A2A2A", role: "Dark Card — 리프 지갑", mood: "프리미엄" },
              { name: "Mist", code: "#E8E5DD", role: "Border — 테두리, 구분선", mood: "부드러운 구조" },
              { name: "Sponsored", code: "#F0FFF0", role: "Sponsored — 광고 배경", mood: "미세한 차별화" },
            ].map((c, i) => (
              <ColorSwatch key={i} {...c} />
            ))}
          </div>
        </Section>

        {/* === 컬러 적용 규칙 === */}
        <Section title="Color Usage Rules" sub="15.2 컬러 적용 규칙" dark>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { ctx: "온보딩, 스플래시", rule: "Forest 다크 배경 + Lime 타이포 + White 본문" },
              { ctx: "홈 피드", rule: "Chalk 밝은 배경 + Off Black 텍스트 + Lime FAB" },
              { ctx: "CTA 버튼 (주요)", rule: "Lime 배경 + Forest 텍스트" },
              { ctx: "CTA 버튼 (보조)", rule: "Forest 배경 + White 텍스트" },
              { ctx: "채팅 메시지", rule: "Forest(나) / White(상대)" },
              { ctx: "리프 아이콘", rule: "Neon Mint — 어디서든 빛나는 리프" },
              { ctx: "리프 지갑", rule: "Smoke 배경 + Neon Mint 잔액 숫자" },
              { ctx: "알림 배지", rule: "Hot Coral 원형" },
              { ctx: "예약 상태", rule: "Butter 배경 + 다크 텍스트" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 12, padding: "6px 0",
                borderBottom: `1px solid #FFFFFF10`,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.lime, minWidth: 100 }}>{item.ctx}</div>
                <div style={{ fontSize: 12, color: "#CCC" }}>{item.rule}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* === 순환 뱃지 시스템 === */}
        <Section title="Badge System" sub="뱃지 레벨 시스템">
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6,
            marginBottom: 16,
          }}>
            {[
              { emoji: "🌱", name: "새싹", req: 3, color: C.lime, glow: C.lime, active: true },
              { emoji: "🌿", name: "그린", req: 10, color: C.neonMint, glow: C.neonMint, active: true },
              { emoji: "🌳", name: "트리", req: 30, color: C.forest, glow: "#4CAF50", active: false },
              { emoji: "🌍", name: "어스", req: 100, color: "#1A4B6E", glow: "#1A4B6E", active: false },
              { emoji: "🪐", name: "유니버스", req: 1000, color: "#B8860B", glow: C.butter, active: false },
            ].map((b, i) => (
              <BadgeItem key={i} {...b} />
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#888", lineHeight: 1.6, textAlign: "center" }}>
            순환 횟수에 따라 레벨업. 유니버스(1000회)는 골드 테두리 + 전설 뱃지.
          </div>
        </Section>

        {/* === 타이포그래피 === */}
        <Section title="Typography" sub="15.3 타이포그래피">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 2 }}>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 800, color: C.lime }}>LEAF</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 28, fontWeight: 800, color: C.offBlack }}>IT</span>
              </div>
              <div style={{ fontSize: 10, color: "#BBB" }}>Outfit · 800 weight · LEAFIT 로고 전용</div>
            </div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 20, fontWeight: 700, color: C.offBlack, marginBottom: 2 }}>
                Page Title — Outfit
              </div>
              <div style={{ fontSize: 10, color: "#BBB" }}>Outfit / SUIT · 20px · 700</div>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.offBlack, marginBottom: 2 }}>
                섹션 헤더 — Pretendard
              </div>
              <div style={{ fontSize: 10, color: "#BBB" }}>Pretendard · 16px · 700</div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: C.offBlack, marginBottom: 2 }}>
                본문 텍스트 — 기본 읽기에 최적화된 크기와 굵기입니다.
              </div>
              <div style={{ fontSize: 10, color: "#BBB" }}>Pretendard · 14px · 400</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 2 }}>
                서브 텍스트 — 보조 정보에 사용됩니다.
              </div>
              <div style={{ fontSize: 10, color: "#BBB" }}>Pretendard · 12px · 400</div>
            </div>
            <div>
              <div style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 800,
                letterSpacing: 3, textTransform: "uppercase", color: C.forest, marginBottom: 2,
              }}>
                ENGLISH EMPHASIS COPY
              </div>
              <div style={{ fontSize: 10, color: "#BBB" }}>Outfit · ALL CAPS · letter-spacing: 2~4px</div>
            </div>
            <DarkCard>
              <div style={{ fontSize: 9, color: "#888", marginBottom: 4, fontFamily: "'Outfit', sans-serif", letterSpacing: 1 }}>LEAF BALANCE</div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 44, fontWeight: 800, color: C.neonMint }}>
                42
              </div>
              <div style={{ fontSize: 10, color: "#BBB" }}>Outfit · 32~44px · 800 · Neon Mint</div>
            </DarkCard>
          </div>
        </Section>

        {/* === 라운딩 === */}
        <Section title="Border Radius" sub="15.4 라운딩">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { name: "Card", value: "16px", preview: 16 },
              { name: "CTA Button", value: "14px", preview: 14 },
              { name: "Chip / Tag", value: "20px (pill)", preview: 20 },
              { name: "Profile", value: "50% (circle)", preview: "50%" },
              { name: "Input", value: "12px", preview: 12 },
              { name: "Toast", value: "50px (pill)", preview: 50 },
              { name: "Modal", value: "20px", preview: 20 },
              { name: "Thumbnail", value: "12px", preview: 12 },
            ].map((item, i) => (
              <Card key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: item.preview,
                  background: `linear-gradient(135deg, ${C.lime}, ${C.neonMint})`,
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.offBlack }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "#888" }}>{item.value}</div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* === 그림자 === */}
        <Section title="Shadows" sub="15.5 그림자">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: "Card", shadow: "0 2px 12px rgba(0,0,0,0.06)", bg: "#FFF" },
              { name: "FAB (Lime Glow)", shadow: "0 4px 20px rgba(190,255,10,0.3)", bg: C.lime },
              { name: "Dark Card (리프 지갑)", shadow: "0 8px 24px rgba(0,0,0,0.2)", bg: C.smoke },
              { name: "Modal", shadow: "0 16px 48px rgba(0,0,0,0.15)", bg: "#FFF" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "8px 0" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: item.bg, boxShadow: item.shadow,
                  flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: item.bg === C.smoke ? "#FFF" : C.offBlack, fontSize: 10, fontWeight: 600,
                }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.offBlack }}>{item.name}</div>
                  <div style={{ fontSize: 10, color: "#999", fontFamily: "monospace" }}>{item.shadow}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* === 모션 & 애니메이션 === */}
        <Section title="Motion & Animation" sub="15.6 모션" dark>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { trigger: "리프 획득", effect: "🍃 bounce (1→1.3→1) + 파티클", time: "0.6s" },
              { trigger: "뱃지 레벨업", effect: "glow + scale up + 축하 파티클", time: "1.0s" },
              { trigger: "CTA 버튼 탭", effect: "scale 0.95 → 1.0 (spring)", time: "0.15s" },
              { trigger: "토스트 등장", effect: "slide-up + fade-in", time: "0.3s" },
              { trigger: "화면 전환", effect: "우→좌 slide / 좌→우 slide", time: "0.25s" },
              { trigger: "찜 하트 탭", effect: "bounce + Hot Coral fill", time: "0.3s" },
              { trigger: "채팅 메시지", effect: "fade-in + slide-up", time: "0.2s" },
              { trigger: "FAB hover", effect: "Lime glow 확산", time: "0.2s" },
            ].map((m, i) => (
              <div key={i} style={{
                background: `#FFFFFF08`, borderRadius: 12, padding: "12px 14px",
                border: `1px solid #FFFFFF10`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.lime, marginBottom: 4 }}>{m.trigger}</div>
                <div style={{ fontSize: 11, color: "#CCC", lineHeight: 1.4, marginBottom: 4 }}>{m.effect}</div>
                <div style={{
                  fontSize: 10, color: C.neonMint, fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                }}>{m.time}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* === 상태 뱃지 === */}
        <Section title="Status Badges" sub="공통 컴포넌트">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            {[
              { label: "채팅중", bg: C.mist, color: "#888" },
              { label: "예약중", bg: C.butter, color: C.forest },
              { label: "DONE", bg: `${C.neonMint}26`, color: C.forest },
            ].map((b, i) => (
              <span key={i} style={{
                background: b.bg, color: b.color, fontSize: 12, fontWeight: 700,
                padding: "6px 16px", borderRadius: 20,
              }}>{b.label}</span>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {/* CTA Buttons */}
            <div style={{
              background: C.lime, color: C.forest, padding: "12px 16px", borderRadius: 14,
              fontSize: 13, fontWeight: 700, textAlign: "center",
            }}>Primary CTA</div>
            <div style={{
              background: C.forest, color: "#FFF", padding: "12px 16px", borderRadius: 14,
              fontSize: 13, fontWeight: 700, textAlign: "center",
            }}>Secondary</div>
            <div style={{
              background: C.smoke, color: C.neonMint, padding: "12px 16px", borderRadius: 14,
              fontSize: 13, fontWeight: 700, textAlign: "center",
            }}>Dark Card</div>
          </div>
        </Section>

      </div>
    </div>
  );
}
