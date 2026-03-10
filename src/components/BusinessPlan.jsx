import { useState } from "react";

const sections = [
  { id: "summary", label: "Executive Summary" },
  { id: "problem", label: "문제 정의" },
  { id: "solution", label: "솔루션" },
  { id: "popup", label: "월간 팝업" },
];

const flowSteps = [
  { num: "01", title: "옷 업로드", desc: "유저가 안 입는 옷 사진 촬영 & 상태 입력", detail: "브랜드·사이즈·상태·카테고리 태그 자동 인식 (AI)", icon: "📸", color: "#2D5A27" },
  { num: "02", title: "검수 & 코인 지급", desc: "플랫폼이 사진 기반으로 품질 검수 (24h 내)", detail: "일반 아이템 → 실버코인 1개 | 프리미엄 → 골드코인 1개", icon: "🪙", color: "#8B6914" },
  { num: "03", title: "코인으로 쇼핑", desc: "다른 유저의 옷을 코인으로 구매", detail: "코인 1개 + 서비스비 1,000원 + 반값택배 1,800원", icon: "🛍️", color: "#1A4B6E" },
  { num: "04", title: "배송 or 직거래", desc: "편의점 반값택배 / 같은 동네면 직거래", detail: "앱 내 QR코드 → GS25·CU 무인택배기 연동", icon: "📦", color: "#5C3D2E" },
  { num: "05", title: "월간 팝업", desc: "30일간 안 팔린 옷 → 오프라인 팝업으로 이동", detail: "코인으로 현장 구매 + 친환경 브랜드 부스 + 리메이크 체험", icon: "🎪", color: "#6B2D5B" },
];

const popupZones = [
  { zone: "ZONE A", name: "스왑 마켓", items: ["온라인 미판매 옷", "시즌오프 재고", "유저 직접 반입 옷"], how: "코인으로만 구매 가능", color: "#2D5A27", revenue: "재고 소진 + 코인 순환" },
  { zone: "ZONE B", name: "친환경 브랜드존", items: ["친환경 패션 브랜드", "업사이클 작가 제품", "제로웨이스트 굿즈"], how: "코인 OR 현금 구매 가능", color: "#1A4B6E", revenue: "부스비 50~200만원 / 브랜드" },
  { zone: "ZONE C", name: "체험 워크숍", items: ["옷 리메이크 체험", "자투리 원단 DIY", "커스텀 패치·자수"], how: "참가비 1~2만원 (코인 결제 가능)", color: "#6B2D5B", revenue: "참가비 + 재료비 수익" },
  { zone: "ZONE D", name: "푸드 & 소셜", items: ["비건 카페·음료", "포토존·SNS 인증", "DJ / 음악"], how: "자유 입장, 음료 별도", color: "#8B6914", revenue: "F&B 제휴 수수료" },
];

export default function BusinessPlan() {
  const [activeSection, setActiveSection] = useState("summary");

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8" }}>
      {/* Hero */}
      <div style={{ background: "#1A1A1A", padding: "48px 24px 36px", textAlign: "center" }}>
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#666", textTransform: "uppercase", marginBottom: "12px" }}>Circular Fashion Platform</div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "48px", color: "#F5F0E8", margin: "0 0 8px", lineHeight: 1.1 }}>RE:WEAR</h1>
        <p style={{ color: "#888", fontSize: "15px", margin: "0 0 4px", fontWeight: 300 }}>옷으로 옷을 사는, 순환 패션 플랫폼</p>
        <p style={{ color: "#555", fontSize: "13px", margin: 0 }}>사업 기획서 · 2026. 03</p>
      </div>

      {/* Section nav */}
      <div style={{ display: "flex", background: "#2A2A2A", position: "sticky", top: 52, zIndex: 90, overflowX: "auto" }}>
        {sections.map((s) => (
          <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
            flex: "1 0 auto", padding: "13px 14px", background: activeSection === s.id ? "#F5F0E8" : "transparent",
            color: activeSection === s.id ? "#1A1A1A" : "#777", border: "none", fontSize: "12px",
            fontWeight: activeSection === s.id ? 700 : 400, cursor: "pointer",
            borderBottom: activeSection === s.id ? "3px solid #2D5A27" : "3px solid transparent", whiteSpace: "nowrap",
          }}>{s.label}</button>
        ))}
      </div>

      <div style={{ padding: "24px 20px 60px", maxWidth: "640px", margin: "0 auto" }}>

        {/* === SUMMARY === */}
        {activeSection === "summary" && (
          <div>
            <SectionHead sub="01 — Executive Summary" title="핵심 요약" />
            <p style={pStyle}>RE:WEAR는 '옷으로 옷을 사는' 코인 기반 순환 패션 플랫폼입니다. 유저가 안 입는 옷을 업로드하면 검수 후 코인을 지급하고, 이 코인으로 다른 유저의 옷을 구매할 수 있습니다.</p>
            <p style={pStyle}>가격을 매기기 어려운, 그러나 버리기엔 아까운 옷들이 코인이라는 새로운 화폐를 통해 순환됩니다. 온라인에서 30일간 교환되지 않은 옷들은 매월 개최되는 오프라인 팝업 이벤트로 이동하며, 친환경 브랜드 제품과 리메이크 체험까지 함께 제공합니다.</p>

            <h3 style={h3Style}>핵심 가치 제안</h3>
            {[
              ["가격 장벽 제거", "현금 거래가 아닌 코인 스왑으로 심리적 허들 최소화"],
              ["완전 순환 구조", "온라인 미판매 아이템은 오프라인 팝업에서 소진"],
              ["복합 수익 모델", "거래 수수료 + 구독 + 팝업 B2B + 데이터 판매"],
              ["한국 인프라 활용", "편의점 반값택배(1,600~1,800원) + 동네 직거래 문화"],
            ].map(([t, d], i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2D5A27", marginTop: "8px", flexShrink: 0 }} />
                <div><span style={{ fontWeight: 700, fontSize: "14px" }}>{t}</span><span style={{ fontSize: "14px", color: "#666" }}> — {d}</span></div>
              </div>
            ))}
          </div>
        )}

        {/* === PROBLEM === */}
        {activeSection === "problem" && (
          <div>
            <SectionHead sub="02 — Problem" title="문제 정의" />
            <h3 style={h3Style}>패스트패션의 순환 실패</h3>
            <p style={pStyle}>한국 패션 시장은 약 50조원 규모로 매년 성장하고 있으나, 소비된 옷의 대부분은 재순환되지 못합니다. 특히 1만원 이하 가치의 옷들은 리셀 플랫폼에서 가격을 매기기 어렵고, 중고거래 시 택배비가 옷 가격의 20~30%를 차지하여 거래 자체가 성립하지 않습니다.</p>

            <h3 style={h3Style}>기존 솔루션의 한계</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr>{["플랫폼", "방식", "한계"].map((h, i) => (
                    <th key={i} style={{ background: "#2D5A27", color: "#FFF", padding: "10px 14px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {[
                    ["당근마켓", "직거래 / 현금", "저가 의류는 거래 안 됨, 택배비 부담"],
                    ["번개장터", "리셀 / 현금", "가격 책정 어려움, 수수료 부담"],
                    ["기부/폐기", "일방적 처분", "순환 아닌 폐기, 심리적 아까움"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#FFF" : "#F5F2EA" }}>
                      {row.map((c, j) => <td key={j} style={{ padding: "10px 14px", borderBottom: "1px solid #E8E5DD" }}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={h3Style}>핵심 인사이트</h3>
            <div style={{ background: "#1A1A1A", borderRadius: "14px", padding: "20px", color: "#F5F0E8", fontSize: "14px", lineHeight: 1.8 }}>
              아일랜드의 <strong style={{ color: "#C4A862" }}>Nuw</strong> 플랫폼은 패스트패션 중고의류가 안 팔리는 이유가 '가격 매기기'임을 발견했습니다. 스왑에서 가격이 사라지면 사람들은 기꺼이 패스트패션도 주고받게 됩니다. Nuw는 이 모델로 <strong style={{ color: "#C4A862" }}>12개월 리텐션 88%</strong>를 달성했습니다.
            </div>
          </div>
        )}

        {/* === SOLUTION === */}
        {activeSection === "solution" && (
          <div>
            <SectionHead sub="03 — Solution" title="서비스 구조" />
            <h3 style={h3Style}>핵심 서비스 플로우</h3>

            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: "24px", top: "40px", bottom: "40px", width: "2px", background: "linear-gradient(to bottom, #2D5A27, #6B2D5B)", opacity: 0.2 }} />
              {flowSteps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "20px", position: "relative" }}>
                  <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: step.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0, boxShadow: `0 4px 12px ${step.color}40`, zIndex: 1 }}>{step.icon}</div>
                  <div style={{ flex: 1, background: "#FFF", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", borderLeft: `3px solid ${step.color}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "11px", color: step.color, fontWeight: 700, letterSpacing: "1px" }}>{step.num}</span>
                      <span style={{ fontSize: "15px", fontWeight: 700 }}>{step.title}</span>
                    </div>
                    <p style={{ fontSize: "13px", color: "#555", margin: "0 0 8px", lineHeight: 1.5 }}>{step.desc}</p>
                    <div style={{ fontSize: "12px", color: "#888", background: "#F8F6F0", padding: "8px 12px", borderRadius: "6px" }}>{step.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={h3Style}>코인 경제 설계</h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr>{["구분", "코인 획득/사용", "비고"].map((h, i) => (
                    <th key={i} style={{ background: "#2D5A27", color: "#FFF", padding: "10px 12px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {[
                    ["옷 업로드 (일반)", "실버코인 +1", "패스트패션, 일반 브랜드"],
                    ["옷 업로드 (프리미엄)", "골드코인 +1", "브랜드, 빈티지, 상태 우수"],
                    ["옷 교환 (온라인)", "코인 -1 + 서비스비 1,000원", "받는 사람 부담"],
                    ["옷 교환 (팝업)", "코인 -1 (수수료 없음)", "현장 교환, 택배비 없음"],
                    ["코인 직접 구매", "1코인 = 2,000원", "올릴 옷이 없는 유저용"],
                    ["30일 미판매 보너스", "보너스코인 +1", "팝업 전용, 참여 유인"],
                  ].map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? "#FFF" : "#F5F2EA" }}>
                      {row.map((c, j) => <td key={j} style={{ padding: "9px 12px", borderBottom: "1px solid #E8E5DD" }}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={h3Style}>택배비 솔루션</h3>
            {[
              { title: "편의점 반값택배 연동", desc: "GS25·CU 무인택배기 앱 내 QR 원터치 접수. 기본 1,600~1,800원, 물량 계약 시 1,200원대 가능.", color: "#2D5A27" },
              { title: "동네 직거래", desc: "같은 행정동/역세권 유저끼리 직접 교환. '내 근처 스왑 가능한 옷' 필터 제공. 택배비 0원.", color: "#1A4B6E" },
              { title: "팝업 현장 교환", desc: "월간 팝업에서 코인만으로 현장 구매. 택배비 0원 + 서비스비 0원으로 가장 경제적.", color: "#6B2D5B" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#FFF", borderRadius: "12px", padding: "16px", marginBottom: "10px", borderLeft: `3px solid ${item.color}`, boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>{item.title}</div>
                <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}

            <div style={{ background: "#1A1A1A", borderRadius: "14px", padding: "20px", color: "#F5F0E8", marginTop: "20px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#666", marginBottom: "8px" }}>핵심 메커니즘</div>
              <div style={{ fontSize: "14px", lineHeight: 1.8, fontWeight: 300 }}>
                <strong style={{ color: "#C4A862" }}>30일 룰:</strong> 온라인에서 30일간 교환되지 않은 옷은 자동으로 다음 팝업 재고로 이동. 유저에게는 "팝업 전용 보너스 코인 +1"을 지급해서 팝업 참여 유인.
              </div>
            </div>
          </div>
        )}

        {/* === POPUP === */}
        {activeSection === "popup" && (
          <div>
            <SectionHead sub="04 — Monthly Pop-up" title="월간 팝업: 순환 패션 축제" />
            <p style={pStyle}>매달 마지막 주 토요일, 4개 존으로 구성된 오프라인 이벤트를 개최합니다. 팝업은 단순한 재고 소진이 아니라, 신규 유저 획득, 코인 경제 활성화, B2B 수익 창출의 핵심 채널입니다.</p>

            <h3 style={h3Style}>팝업 존 구성</h3>
            {popupZones.map((zone, i) => (
              <div key={i} style={{ background: "#FFF", borderRadius: "14px", padding: "20px", marginBottom: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", borderTop: `4px solid ${zone.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <span style={{ fontSize: "11px", letterSpacing: "2px", color: zone.color, fontWeight: 700 }}>{zone.zone}</span>
                    <h4 style={{ fontSize: "18px", fontWeight: 700, margin: "4px 0 0" }}>{zone.name}</h4>
                  </div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                  {zone.items.map((item, j) => (
                    <span key={j} style={{ fontSize: "12px", background: `${zone.color}10`, color: zone.color, padding: "4px 12px", borderRadius: "20px", border: `1px solid ${zone.color}30`, fontWeight: 500 }}>{item}</span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#888", borderTop: "1px solid #F0EDE5", paddingTop: "10px" }}>
                  <span>💳 {zone.how}</span>
                  <span style={{ color: zone.color, fontWeight: 600 }}>💰 {zone.revenue}</span>
                </div>
              </div>
            ))}

            <h3 style={h3Style}>팝업 1회 예상 수익</h3>
            <div style={{ background: "#1A1A1A", borderRadius: "14px", padding: "20px", color: "#F5F0E8" }}>
              {[
                { label: "브랜드 부스비 (8개 × 100만)", total: "800만원" },
                { label: "워크숍 참가비 (30명 × 2회 × 1.5만)", total: "90만원" },
                { label: "F&B 수수료 (매출 200만 × 20%)", total: "40만원" },
                { label: "장소 대관 + 운영비", total: "-300만원" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 3 ? "1px solid #333" : "none", fontSize: "14px" }}>
                  <span style={{ color: "#A0A090" }}>{item.label}</span>
                  <span style={{ color: item.total.startsWith("-") ? "#E87070" : "#C4A862", fontWeight: 600 }}>{item.total}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", marginTop: "8px", borderTop: "2px solid #444", fontSize: "16px", fontWeight: 700 }}>
                <span>월간 팝업 순이익</span>
                <span style={{ color: "#7EBF73" }}>약 630만원</span>
              </div>
            </div>

            <h3 style={h3Style}>팝업이 해결하는 문제</h3>
            {[
              { problem: "온라인에서 30일간 안 팔린 옷", solution: "팝업에서 직접 만져보고 구매 → 재고 소진" },
              { problem: "신규 유저 확보 비용", solution: "팝업 방문 → 앱 다운로드 → 자연 유입 (CAC ≈ 0)" },
              { problem: "코인 경제 활성화", solution: "현장에서 코인 사용 → 코인의 실질적 가치 체감" },
              { problem: "친환경 브랜드 수익화", solution: "부스비 = 플랫폼의 B2B 수익원" },
            ].map((item, i) => (
              <div key={i} style={{ background: "#FFF", borderRadius: "10px", padding: "14px", marginBottom: "8px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: "12px", color: "#C44", fontWeight: 600, marginBottom: "4px" }}>⚡ {item.problem}</div>
                <div style={{ fontSize: "13px", color: "#333", lineHeight: 1.5 }}>→ {item.solution}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Shared styles
const pStyle = { fontSize: "14px", color: "#555", lineHeight: 1.8, marginBottom: "16px" };
const h3Style = { fontSize: "16px", fontWeight: 700, color: "#1A4B6E", margin: "28px 0 14px" };

function SectionHead({ sub, title }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#999", textTransform: "uppercase", marginBottom: "6px" }}>{sub}</div>
      <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "28px", margin: 0 }}>{title}</h2>
    </div>
  );
}
