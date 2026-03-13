import { useState } from "react";
import { LogoWithLeaf } from "./common/LeafitLogo";

// Electric Garden Design System
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

const sections = [
  { id: "summary", label: "Executive Summary" },
  { id: "problem", label: "문제 정의" },
  { id: "solution", label: "솔루션" },
  { id: "bm", label: "수익 모델" },
  { id: "inspection", label: "검수 & 분쟁" },
  { id: "badge", label: "순환 뱃지" },
  { id: "popup", label: "팝업 스토어" },
];

const flowSteps = [
  { num: "01", title: "옷 업로드", desc: "유저가 안 입는 옷 사진(앞면·뒷면 최소 2장) 촬영 & 정보 입력", detail: "브랜드·카테고리·사이즈·상태 입력", icon: "📸" },
  { num: "02", title: "AI 필터 + 검수", desc: "AI가 사진 품질·의류 적합성 1차 판단, 플랫폼이 최종 합격/불합격 결정", detail: "합격 시 1리프 지급 · 등급 구분 없음", icon: "🔍" },
  { num: "03", title: "리프로 교환", desc: "다른 유저의 옷을 1리프로 가져갑니다", detail: "서비스 수수료 없음 · 택배비만 실비 부담", icon: "🛍️" },
  { num: "04", title: "배송 or 직거래", desc: "편의점 반값택배 / 같은 동네면 직거래", detail: "앱 내 QR코드 → GS25·CU 무인택배기 연동", icon: "📦" },
  { num: "05", title: "기부", desc: "오래 안 팔리는 옷을 유저가 자발적으로 플랫폼에 기부", detail: "기부된 옷은 리폼하여 팝업 스토어 상품으로 활용", icon: "🎁" },
];

const badges = [
  { count: "3회", emoji: "🌱", name: "새싹", desc: "순환을 시작했어요", color: C.lime },
  { count: "10회", emoji: "🌿", name: "그린", desc: "옷장이 숨쉬기 시작했어요", color: C.neonMint },
  { count: "30회", emoji: "🌳", name: "트리", desc: "작은 숲을 만들었어요", color: C.forest },
  { count: "100회", emoji: "🌍", name: "어스", desc: "지구가 고마워해요", color: "#1A4B6E" },
  { count: "1,000회", emoji: "🪐", name: "유니버스", desc: "전설의 순환러", color: C.butter },
];

const popupZones = [
  { zone: "ZONE A", name: "리폼 마켓", items: ["기부받은 옷의 리폼 제품", "플랫폼 큐레이션 아이템"], how: "리프 (1리프=1,000원) 또는 현금", color: C.forest, revenue: "리폼 제품 판매 수익" },
  { zone: "ZONE B", name: "브랜드존", items: ["친환경 패션 브랜드", "업사이클 작가 제품"], how: "리프 또는 현금", color: C.neonMint, revenue: "부스비 수익" },
  { zone: "ZONE C", name: "체험 워크숍", items: ["옷 리메이크 체험", "커스텀 패치·자수"], how: "리프 또는 현금 (참가비 1~2만원)", color: C.hotCoral, revenue: "참가비 + 재료비 수익" },
  { zone: "ZONE D", name: "푸드 & 소셜", items: ["카페·음료", "포토존·SNS 인증"], how: "현금", color: C.butter, revenue: "F&B 제휴 수수료" },
];

// Shared sub-components
function Section({ title, sub, children, dark }) {
  return (
    <section style={{
      background: dark ? C.forest : "#FFF",
      borderRadius: 20,
      padding: "28px 22px",
      marginBottom: 20,
      boxShadow: dark ? "0 8px 32px rgba(26,60,32,0.2)" : "0 2px 12px rgba(0,0,0,0.04)",
      border: dark ? "none" : `1px solid ${C.mist}`,
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
        color: dark ? C.lime : C.forest, marginBottom: 6,
        fontFamily: "'Outfit', sans-serif",
      }}>{sub}</div>
      <h3 style={{
        fontSize: 20, fontWeight: 800, color: dark ? "#FFF" : C.offBlack,
        marginBottom: 18, lineHeight: 1.3, margin: "0 0 18px",
      }}>{title}</h3>
      {children}
    </section>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: "#FFF", borderRadius: 14, padding: "14px 16px",
      border: `1px solid ${C.mist}`, marginBottom: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      ...style,
    }}>{children}</div>
  );
}

function DarkCard({ children, style }) {
  return (
    <div style={{
      background: C.smoke, borderRadius: 16, padding: "18px 20px",
      marginBottom: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      ...style,
    }}>{children}</div>
  );
}

export default function BusinessPlan() {
  const [activeSection, setActiveSection] = useState("summary");

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
          }}>Circular Fashion Platform</div>
          <div style={{ marginBottom: 12 }}>
            <LogoWithLeaf size={1} dark={true} />
          </div>
          <div style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 13, fontWeight: 600, letterSpacing: 5,
            color: C.lime, textTransform: "uppercase",
            marginBottom: 12, opacity: 0.8,
          }}>SWAP IS THE NEW SHOP</div>
          <div style={{
            fontSize: 13, color: "#A8D5A0", lineHeight: 1.6,
          }}>
            버리지 마, 리핏해. 순환 패션 플랫폼
            <br />사업 기획서 · 2026. 03
          </div>
        </div>
      </div>

      {/* Section nav */}
      <div style={{
        display: "flex", background: C.forest, position: "sticky",
        top: 52, zIndex: 90, overflowX: "auto",
        boxShadow: "0 2px 12px rgba(26,60,32,0.3)",
      }}>
        {sections.map((s) => (
          <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
            flex: "1 0 auto", padding: "12px 14px",
            background: activeSection === s.id ? C.lime : "transparent",
            color: activeSection === s.id ? C.forest : "#A8D5A0",
            border: "none", fontSize: "12px",
            fontWeight: activeSection === s.id ? 700 : 400,
            cursor: "pointer", whiteSpace: "nowrap",
            borderRadius: activeSection === s.id ? "8px" : 0,
            margin: activeSection === s.id ? "4px 2px" : "4px 2px",
            transition: "all 0.2s",
          }}>{s.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 60px" }}>

        {/* === SUMMARY === */}
        {activeSection === "summary" && (
          <div>
            <Section title="핵심 요약" sub="01 — Executive Summary">
              <p style={pStyle}>LEAFIT는 '옷으로 옷을 사는' 리프 기반 순환 패션 플랫폼입니다. 유저가 안 입는 옷을 업로드하면 검수 후 리프 1개를 지급하고, 이 리프로 다른 유저의 옷을 가져갈 수 있습니다.</p>
              <p style={pStyle}>이 플랫폼의 핵심 타겟은 '팔리지는 않지만 버리기엔 아까운 옷'입니다. 당근마켓이나 번개장터에서는 현금 거래가 성립하지 않는 만원 이하의 옷들이, 리프라는 새로운 화폐를 통해 순환됩니다. 가격이라는 장벽을 없앰으로써 패스트패션 의류까지 재순환시키는 것이 목표입니다.</p>
              <p style={pStyle}>유저가 자발적으로 기부한 옷은 플랫폼이 리폼하여 팝업 스토어(이벤트성)에서 판매하며, 이때 리프는 1개당 1,000원의 가치로 사용할 수 있습니다.</p>
              <p style={pStyle}>초기에는 유저 확보에 집중하며, 트래픽이 확보된 이후 친환경 의류 브랜드의 피드 광고를 핵심 수익 모델로 전환합니다.</p>
            </Section>

            <Section title="핵심 가치 제안" sub="Value Proposition" dark>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  ["가격 장벽 제거", "모든 옷이 1리프. 가격 고민 없는 교환 구조"],
                  ["완전 무료 경험", "서비스비·수수료 없음. 유저 부담은 리프 + 택배비뿐"],
                  ["자발적 순환", "기부 기능을 통해 안 팔리는 옷이 리폼 제품으로 재탄생"],
                  ["친환경 광고 BM", "순환 패션에 관심 있는 유저 → 친환경 브랜드 피드 광고로 수익화"],
                ].map(([t, d], i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    background: "#FFFFFF08", borderRadius: 12, padding: "12px 14px",
                    border: "1px solid #FFFFFF10",
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.lime, marginTop: 5, flexShrink: 0 }} />
                    <div>
                      <span style={{ fontWeight: 700, fontSize: 13, color: C.lime }}>{t}</span>
                      <span style={{ fontSize: 13, color: "#CCC" }}> — {d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* === PROBLEM === */}
        {activeSection === "problem" && (
          <div>
            <Section title="패스트패션의 순환 실패" sub="02 — Problem">
              <p style={pStyle}>한국 패션 시장은 약 50조원 규모로 매년 성장하고 있으나, 소비된 옷의 대부분은 재순환되지 못합니다. 특히 1만원 이하 가치의 옷들은 리셀 플랫폼에서 가격을 매기기 어렵고, 중고거래 시 택배비가 옷 가격의 20~30%를 차지하여 거래 자체가 성립하지 않습니다.</p>
            </Section>

            <Section title="기존 솔루션의 한계" sub="Comparison">
              <div style={{ overflowX: "auto" }}>
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 2fr",
                  gap: 1, background: C.mist, borderRadius: 12, overflow: "hidden",
                  minWidth: 400,
                }}>
                  {["플랫폼", "방식", "한계"].map((h, i) => (
                    <div key={i} style={{
                      padding: "10px 14px", fontSize: 11, fontWeight: 700,
                      background: C.forest, color: C.lime, textAlign: "center",
                    }}>{h}</div>
                  ))}
                  {[
                    ["당근마켓", "직거래 / 현금", "저가 의류는 거래 안 됨, 택배비 부담"],
                    ["번개장터", "리셀 / 현금", "가격 책정 어려움, 수수료 부담"],
                    ["기부/폐기", "일방적 처분", "순환 아닌 폐기, 심리적 아까움"],
                  ].map((row, ri) => (
                    row.map((cell, ci) => (
                      <div key={`${ri}-${ci}`} style={{
                        padding: "10px 14px", fontSize: 12,
                        background: "#FFF", color: ci === 0 ? C.forest : C.offBlack,
                        fontWeight: ci === 0 ? 600 : 400,
                        textAlign: ci === 0 ? "center" : "left",
                      }}>{cell}</div>
                    ))
                  ))}
                </div>
              </div>
            </Section>

            <Section title="핵심 인사이트" sub="Key Insight" dark>
              <div style={{ fontSize: 14, color: "#E0E0E0", lineHeight: 1.8 }}>
                아일랜드의 <strong style={{ color: C.lime }}>Nuw</strong> 플랫폼 창업자 Aisling Byrne은 패스트패션 중고의류가 안 팔리는 이유가 '가격 매기기'라는 것을 발견했습니다. 너무 비싸면 새 걸 사겠다는 반응이, 너무 싸면 별로인가 보다는 반응이 옵니다. 스왑에서 가격이 사라지면 사람들은 기꺼이 패스트패션도 주고받게 됩니다. Nuw는 이 모델로 <strong style={{ color: C.lime }}>12개월 리텐션 88%</strong>를 달성했습니다.
              </div>
              <div style={{
                marginTop: 16, background: "#FFFFFF10", borderRadius: 12,
                padding: "14px 16px", border: "1px solid #FFFFFF15",
              }}>
                <div style={{ fontSize: 13, color: "#CCC", lineHeight: 1.8 }}>
                  LEAFIT에 고가 브랜드 옷이 올라올 것을 기대해서는 안 됩니다. 고가 옷은 번개장터 등에서 현금 거래가 가능하기 때문입니다. 이 서비스의 본질은 <strong style={{ color: "#FFF" }}>'현금으로는 거래되지 않지만, 누군가에게는 가치 있는 옷'</strong>을 순환시키는 것입니다. 그렇기에 모든 옷의 가격을 동일하게 <strong style={{ color: C.neonMint }}>1리프</strong>으로 설정합니다.
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* === SOLUTION === */}
        {activeSection === "solution" && (
          <div>
            <Section title="핵심 서비스 플로우" sub="03 — Solution">
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 24, top: 40, bottom: 40, width: 2, background: `linear-gradient(to bottom, ${C.forest}, ${C.neonMint})`, opacity: 0.2 }} />
                {flowSteps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, position: "relative" }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: "50%",
                      background: C.forest, display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22, flexShrink: 0,
                      boxShadow: `0 4px 16px rgba(26,60,32,0.3)`, zIndex: 1,
                    }}>{step.icon}</div>
                    <Card style={{ flex: 1, borderLeft: `3px solid ${C.forest}`, marginBottom: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 10, color: C.forest, fontWeight: 700, letterSpacing: 1, fontFamily: "'Outfit', sans-serif" }}>{step.num}</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: C.offBlack }}>{step.title}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "#666", margin: "0 0 8px", lineHeight: 1.5 }}>{step.desc}</p>
                      <div style={{ fontSize: 11, color: "#888", background: C.chalk, padding: "6px 10px", borderRadius: 8 }}>{step.detail}</div>
                    </Card>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="리프 경제 설계" sub="Leaf Economy" dark>
              <div style={{ fontSize: 13, color: "#E0E0E0", lineHeight: 1.8, marginBottom: 16 }}>
                리프는 <strong style={{ color: C.lime }}>1종류</strong>이며 등급이 없습니다. <strong style={{ color: C.lime }}>1리프 = 1벌</strong>이라는 단순한 규칙이 핵심입니다. 현금 환전은 불가하며, 플랫폼 내 교환과 팝업 스토어에서만 사용됩니다.
              </div>
              <div style={{
                display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr",
                gap: 1, background: "#FFFFFF10", borderRadius: 12, overflow: "hidden",
              }}>
                {["행동", "리프", "현금"].map((h, i) => (
                  <div key={i} style={{
                    padding: "10px 12px", fontSize: 10, fontWeight: 700,
                    background: C.smoke, color: C.lime,
                    letterSpacing: 1, fontFamily: "'Outfit', sans-serif",
                  }}>{h}</div>
                ))}
                {[
                  ["옷 올리기", "+1리프", "0원"],
                  ["옷 교환 (택배)", "-1리프", "~1,800원"],
                  ["옷 교환 (직거래)", "-1리프", "0원"],
                  ["팝업에서 사용", "-1리프 = ₩1,000", "-"],
                  ["기부", "옷 사라짐", "보상 없음"],
                  ["가입 시", "+1리프 (무료)", "-"],
                  ["친구 초대 시", "양쪽 +1리프", "-"],
                ].map((row, ri) => (
                  row.map((cell, ci) => (
                    <div key={`${ri}-${ci}`} style={{
                      padding: "8px 12px", fontSize: 11,
                      background: ri % 2 === 0 ? "#FFFFFF06" : "transparent",
                      color: ci === 1 ? C.neonMint : "#CCC",
                      fontWeight: ci === 1 ? 600 : 400,
                    }}>{cell}</div>
                  ))
                ))}
              </div>
            </Section>

            <Section title="콜드스타트 대응" sub="Cold Start">
              <p style={pStyle}>초기에 옷이 없으면 리프를 벌어도 교환할 수 없어 유저가 이탈합니다. 이를 방지하기 위해 세 가지 장치를 둡니다.</p>
              {[
                { title: "시드 재고 200벌", desc: "동대문 네트워크를 통해 시즌오프 재고, B급 의류를 입수하여 플랫폼이 직접 등록" },
                { title: "가입 시 무료 1리프", desc: "첫 경험이 '올리기'가 아닌 '가져가기'가 되어 진입장벽을 낮춤" },
                { title: "친구 초대 양쪽 1리프", desc: "초기 유저 확산과 옷 등록을 동시에 유도" },
              ].map((item, i) => (
                <Card key={i} style={{ borderLeft: `3px solid ${C.forest}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.offBlack, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{item.desc}</div>
                </Card>
              ))}
            </Section>

            <Section title="택배비 솔루션" sub="Delivery">
              <p style={{ ...pStyle, marginBottom: 12 }}>서비스 수수료가 없으므로, 유저가 부담하는 현금 비용은 택배비뿐입니다.</p>
              {[
                { title: "편의점 반값택배 연동", desc: "GS25·CU·이마트24 반값택배를 앱 내 QR코드로 원터치 접수. 편의점→편의점 배송. 기본 1,600~1,800원, 물량 계약 시 단가 인하 가능.", icon: "📦" },
                { title: "동네 직거래", desc: "같은 행정동·역세권 유저끼리 직접 교환. '내 근처 스왑 가능한 옷' 필터 제공. 택배비 0원.", icon: "🤝" },
              ].map((item, i) => (
                <Card key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.forest}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.offBlack, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </Card>
              ))}
            </Section>
          </div>
        )}

        {/* === BUSINESS MODEL === */}
        {activeSection === "bm" && (
          <div>
            <Section title="전략: 유저 먼저, 수익은 나중에" sub="04 — Business Model">
              <p style={pStyle}>초기에는 수익화를 하지 않습니다. 서비스비, 수수료, 리프 판매 모두 없습니다. 순환 패션에 진심인 유저를 먼저 모으고, 충분한 트래픽이 확보된 이후 친환경 의류 브랜드의 피드 광고를 핵심 수익원으로 전환합니다.</p>
            </Section>

            <Section title="수익화 타임라인" sub="Revenue Timeline" dark>
              {[
                { phase: "Phase 1", period: "0~6개월", desc: "유저 확보 집중. 수익 0원. 리프 순환 생태계 구축", color: C.lime },
                { phase: "Phase 2", period: "6~12개월", desc: "피드 광고 테스트. 친환경 브랜드 파트너십 확보", color: C.neonMint },
                { phase: "Phase 3", period: "12개월~", desc: "피드 광고 본격 운영. 팝업 B2B 수익 병행", color: C.butter },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, padding: "12px 0",
                  borderBottom: i < 2 ? "1px solid #FFFFFF10" : "none",
                }}>
                  <div style={{ minWidth: 75 }}>
                    <div style={{ fontSize: 11, color: item.color, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>{item.phase}</div>
                    <div style={{ fontSize: 10, color: "#888" }}>{item.period}</div>
                  </div>
                  <div style={{ fontSize: 13, color: "#CCC", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </Section>

            <Section title="피드 광고 구조" sub="Native Feed Ads">
              <p style={pStyle}>유저가 홈 피드에서 옷을 탐색할 때, 일반 아이템 사이에 친환경 의류 브랜드의 광고가 자연스럽게 노출됩니다. 인스타그램의 스폰서드 포스트와 유사한 네이티브 광고 형태입니다.</p>
              {[
                { title: "네이티브 피드 광고", desc: "일반 아이템 카드와 동일한 UI에 'AD' 태그를 붙여 자연스럽게 노출. 유저 경험을 해치지 않으면서 높은 클릭율 유도" },
                { title: "타겟 정합성", desc: "순환 패션에 관심 있는 2030 여성 유저 = 친환경 브랜드의 이상적 타겟. 일반 광고 플랫폼 대비 높은 전환율 기대" },
                { title: "브랜드 파트너십", desc: "파타고니아, 프라이탁, 플리츠마마 등 친환경 의류·패션 브랜드와 제휴. 월간 광고비 또는 CPC/CPM 과금 모델" },
              ].map((item, i) => (
                <Card key={i} style={{ borderLeft: `3px solid ${C.forest}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.offBlack, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{item.desc}</div>
                </Card>
              ))}
            </Section>

            <Section title="왜 이 광고가 작동하는가" sub="Why It Works" dark>
              <div style={{ fontSize: 14, color: "#E0E0E0", lineHeight: 1.8 }}>
                LEAFIT 유저는 <strong style={{ color: C.lime }}>'옷을 순환시키는 행위'</strong>를 하고 있는 사람들입니다. 이들은 이미 친환경 소비에 관심이 높은 상태이며, 새 옷을 살 때도 친환경 브랜드를 선호할 확률이 높습니다. 이 <strong style={{ color: C.lime }}>맥락적 일치</strong>가 광고 효율을 극대화합니다.
              </div>
            </Section>

            <Section title="보조 수익원" sub="Secondary Revenue">
              {[
                { title: "팝업 스토어 B2B", desc: "친환경 브랜드 부스비 (팝업 개최 시)", icon: "🎪" },
                { title: "리폼 제품 판매", desc: "기부 옷 리폼 후 팝업에서 판매 (1리프=1,000원 또는 현금)", icon: "✂️" },
              ].map((item, i) => (
                <Card key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.forest}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.offBlack, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </Card>
              ))}
            </Section>
          </div>
        )}

        {/* === INSPECTION & DISPUTE === */}
        {activeSection === "inspection" && (
          <div>
            <Section title="검수 시스템" sub="05 — Inspection">
              <p style={pStyle}>검수는 '이 옷이 플랫폼에 올라갈 수 있는 상태인가'를 판단하는 합격/불합격 구조입니다. 리프 가치를 차등 산정하지 않습니다.</p>

              <div style={{
                background: `${C.forest}08`, borderRadius: 14, padding: "14px 16px",
                marginBottom: 16, border: `1px solid ${C.forest}20`,
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.forest, marginBottom: 6 }}>'친구에게 줄 수 있는 상태'</div>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>아래 항목에 해당하면 불합격 처리됩니다.</div>
              </div>

              {[
                "찢어짐, 구멍, 수선 불가능한 손상",
                "심한 얼룩, 변색, 변형",
                "속옷, 양말 등 위생 민감 아이템",
                "사진과 설명이 현저히 불성실",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: `${C.hotCoral}15`, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, color: C.hotCoral, flexShrink: 0, fontWeight: 700,
                  }}>✕</div>
                  <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{item}</div>
                </div>
              ))}
            </Section>

            <Section title="검수 프로세스" sub="Process">
              {[
                { step: "AI 1차 필터", desc: "사진 품질, 의류 여부, 명백한 불합격 요소를 자동 판별하여 업로드 차단 또는 통과", icon: "🤖" },
                { step: "플랫폼 2차 검수", desc: "24시간 내 검수자가 최종 합격/불합격 판정. 데이터가 쌓이면 AI 자동 승인 비율을 점진적으로 확대", icon: "👁️" },
                { step: "제재 시스템", desc: "불합격 자체는 패널티 없음. 단, 3회 연속 불합격 시 일정 기간 업로드 제한", icon: "⚠️" },
              ].map((item, i) => (
                <Card key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", borderLeft: `3px solid ${C.forest}` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.forest}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.offBlack, marginBottom: 4 }}>{item.step}</div>
                    <div style={{ fontSize: 12, color: "#888", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </Card>
              ))}
            </Section>

            <Section title="분쟁 처리" sub="Dispute Resolution" dark>
              <div style={{ fontSize: 14, color: "#E0E0E0", lineHeight: 1.8 }}>
                사진과 실물이 다른 경우, 받은 유저가 수령 후 <strong style={{ color: C.lime }}>48시간 내</strong> 사진 증거와 함께 문제를 신고할 수 있습니다. 플랫폼이 판단하여 문제가 확인되면 <strong style={{ color: C.lime }}>리프를 반환</strong>하고, 옷은 보낸 사람에게 반송됩니다(반송비 보낸 사람 부담).
              </div>
              <div style={{
                marginTop: 16, fontSize: 13, color: "#A8D5A0", lineHeight: 1.7,
                background: "#FFFFFF08", borderRadius: 12, padding: "12px 14px",
                border: "1px solid #FFFFFF10",
              }}>
                다만 이 옷들의 가치가 이미 낮기 때문에, 복잡한 분쟁 절차보다는 반복 신고가 접수되는 판매자의 업로드를 제한하는 것이 더 효과적입니다. 거래 완료 후 간단한 평가(좋아요/별로)를 통해 커뮤니티가 자정하는 구조를 지향합니다.
              </div>
            </Section>
          </div>
        )}

        {/* === BADGE === */}
        {activeSection === "badge" && (
          <div>
            <Section title="순환 뱃지 시스템" sub="06 — Badge System">
              <p style={pStyle}>유저의 순환 기여도를 시각화하고 동기를 부여하기 위해 뱃지 시스템을 운영합니다. 순환 횟수는 옷 올리기와 교환하기의 합산으로 산정됩니다. 뱃지는 프로필, 채팅방, 상품 목록 등 플랫폼 전반에 노출됩니다.</p>
            </Section>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {badges.map((b, i) => {
                const isLast = i === badges.length - 1;
                return (
                  <div key={i} style={{
                    background: isLast ? C.smoke : "#FFF",
                    borderRadius: 16,
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    boxShadow: isLast ? "0 4px 20px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.04)",
                    border: isLast ? `2px solid ${C.butter}40` : `1px solid ${C.mist}`,
                  }}>
                    <div style={{
                      fontSize: 32, flexShrink: 0,
                      filter: isLast ? "none" : "none",
                      textShadow: isLast ? `0 0 12px ${C.butter}` : "none",
                    }}>{b.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: isLast ? C.chalk : C.offBlack }}>{b.name}</span>
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: isLast ? C.butter : C.forest,
                          background: isLast ? `${C.butter}20` : `${C.forest}10`,
                          padding: "2px 8px", borderRadius: 10,
                          fontFamily: "'Outfit', sans-serif",
                        }}>{b.count}</span>
                      </div>
                      <div style={{ fontSize: 12, color: isLast ? "#888" : "#999", lineHeight: 1.4 }}>{b.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <Section title="유니버스 특별 등급" sub="Universe Tier" dark>
              <div style={{ fontSize: 14, color: "#E0E0E0", lineHeight: 1.8 }}>
                <strong style={{ color: C.butter }}>🪐 유니버스</strong> 뱃지는 특별 등급으로 운영합니다. 프로필에 차별화된 비주얼로 표시되며, 이 유저가 올린 옷에는 <strong style={{ color: C.butter }}>'유니버스가 올린 옷'</strong> 태그가 붙어 신뢰도와 검색 노출 우선권이 부여됩니다. 팝업 이벤트 개최 시 유니버스 등급은 VIP 초대 대상이 됩니다.
              </div>
              <div style={{
                marginTop: 16, fontSize: 13, color: "#A8D5A0", lineHeight: 1.7,
                background: "#FFFFFF08", borderRadius: 12, padding: "12px 14px",
                border: "1px solid #FFFFFF10",
              }}>
                뱃지 시스템은 당근마켓의 매너온도와 유사한 신뢰 지표 역할을 하면서도, 환경 순환이라는 LEAFIT의 핵심 가치에 부합하는 체계입니다.
              </div>
            </Section>
          </div>
        )}

        {/* === POPUP === */}
        {activeSection === "popup" && (
          <div>
            <Section title="팝업 스토어" sub="07 — Pop-up Store">
              <div style={{
                background: `${C.butter}15`, borderRadius: 14, padding: "14px 16px",
                marginBottom: 16, border: `1px solid ${C.butter}30`,
              }}>
                <div style={{ fontSize: 13, lineHeight: 1.8, color: "#666" }}>
                  팝업 스토어는 정기 행사가 아닌 <strong style={{ color: C.offBlack }}>이벤트성</strong>으로 운영합니다. 기획이 준비되었을 때 개최하며, 열리지 않을 수도 있습니다. 다만, 개최 시의 운영 기획을 사전에 준비해둡니다.
                </div>
              </div>
              {[
                { role: "리프 소비 채널", desc: "1리프 = 1,000원 가치로 사용 가능. 리프 인플레이션을 자연스럽게 관리", icon: "🍃" },
                { role: "리폼 제품 판매", desc: "유저가 기부한 옷을 플랫폼이 리폼하여 팝업 전용 상품으로 판매", icon: "✂️" },
                { role: "신규 유저 확보", desc: "팝업 방문 후 앱 다운로드로 자연 유입", icon: "📱" },
                { role: "B2B 수익", desc: "친환경 브랜드 부스비가 플랫폼의 주요 현금 수익원 중 하나", icon: "💰" },
              ].map((item, i) => (
                <Card key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.forest}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.offBlack, marginBottom: 2 }}>{item.role}</div>
                    <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </Card>
              ))}
            </Section>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {popupZones.map((zone, i) => (
                <div key={i} style={{
                  background: "#FFF", borderRadius: 20, padding: "20px 22px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  border: `1px solid ${C.mist}`,
                  borderTop: `4px solid ${zone.color}`,
                }}>
                  <div style={{ marginBottom: 12 }}>
                    <span style={{
                      fontSize: 10, letterSpacing: 2, color: zone.color, fontWeight: 700,
                      fontFamily: "'Outfit', sans-serif",
                    }}>{zone.zone}</span>
                    <h4 style={{ fontSize: 17, fontWeight: 800, margin: "4px 0 0", color: C.offBlack }}>{zone.name}</h4>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                    {zone.items.map((item, j) => (
                      <span key={j} style={{
                        fontSize: 11, background: `${zone.color}12`, color: zone.color,
                        padding: "4px 12px", borderRadius: 20,
                        border: `1px solid ${zone.color}25`, fontWeight: 600,
                      }}>{item}</span>
                    ))}
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between", fontSize: 11, color: "#999",
                    borderTop: `1px solid ${C.mist}`, paddingTop: 10,
                  }}>
                    <span>💳 {zone.how}</span>
                    <span style={{ color: zone.color, fontWeight: 600 }}>💰 {zone.revenue}</span>
                  </div>
                </div>
              ))}
            </div>

            <Section title="기부 → 리폼 → 팝업 순환" sub="Donation Cycle" dark>
              <div style={{ fontSize: 14, color: "#E0E0E0", lineHeight: 1.8 }}>
                유저가 오래 안 팔리는 옷을 플랫폼에 자발적으로 <strong style={{ color: C.lime }}>기부</strong>하면, 플랫폼이 이를 수거하여 <strong style={{ color: C.lime }}>리폼</strong> 작업을 거쳐 팝업 스토어 전용 상품으로 판매합니다. 기부 시 유저에게 리프 보상은 없으며, 순수 기부로 운영합니다.
              </div>
              <div style={{
                marginTop: 16, fontSize: 13, color: "#A8D5A0", lineHeight: 1.7,
                background: "#FFFFFF08", borderRadius: 12, padding: "12px 14px",
                border: "1px solid #FFFFFF10",
              }}>
                이 구조는 세 가지를 동시에 해결합니다. 유저는 안 팔리는 옷을 처리할 수 있고, 플랫폼은 팝업 전용 상품을 확보하며, 기부된 옷이 리폼을 거쳐 새로운 가치를 갖게 되어 환경적 순환이 완성됩니다.
              </div>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

const pStyle = { fontSize: 13, color: "#666", lineHeight: 1.8, marginBottom: 14, margin: "0 0 14px" };
