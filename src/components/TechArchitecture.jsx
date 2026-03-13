import { useState } from "react";
import { LogoWithLeaf } from "./common/LeafitLogo";

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
  { id: "overview", label: "개요" },
  { id: "stack", label: "기술 스택" },
  { id: "architecture", label: "시스템 구조" },
  { id: "db", label: "데이터베이스" },
  { id: "realtime", label: "실시간 & 보안" },
  { id: "flutter", label: "앱 구조" },
  { id: "flow", label: "데이터 플로우" },
];

function Section({ title, sub, children, dark }) {
  return (
    <section style={{
      background: dark ? C.forest : "#FFF",
      borderRadius: 20, padding: "28px 22px", marginBottom: 20,
      boxShadow: dark ? "0 8px 32px rgba(26,60,32,0.2)" : "0 2px 12px rgba(0,0,0,0.04)",
      border: dark ? "none" : `1px solid ${C.mist}`,
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase",
        color: dark ? C.lime : C.forest, marginBottom: 6, fontFamily: "'Outfit', sans-serif",
      }}>{sub}</div>
      <h3 style={{
        fontSize: 20, fontWeight: 800, color: dark ? "#FFF" : C.offBlack,
        margin: "0 0 18px", lineHeight: 1.3,
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
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)", ...style,
    }}>{children}</div>
  );
}

function GridTable({ headers, rows, dark }) {
  const cols = headers.length;
  return (
    <div style={{
      display: "grid", gridTemplateColumns: headers.map(h => h.w || "1fr").join(" "),
      gap: 1, background: dark ? "#FFFFFF10" : C.mist, borderRadius: 12, overflow: "hidden",
    }}>
      {headers.map((h, i) => (
        <div key={i} style={{
          padding: "10px 12px", fontSize: 10, fontWeight: 700,
          background: dark ? C.smoke : C.forest, color: dark ? C.lime : C.lime,
          letterSpacing: 1, fontFamily: "'Outfit', sans-serif",
        }}>{h.label}</div>
      ))}
      {rows.map((row, ri) => (
        row.map((cell, ci) => (
          <div key={`${ri}-${ci}`} style={{
            padding: "9px 12px", fontSize: 11, lineHeight: 1.5,
            background: dark ? (ri % 2 === 0 ? "#FFFFFF06" : "transparent") : (ri % 2 === 0 ? "#FFF" : C.chalk),
            color: dark ? (ci === 0 ? C.lime : "#CCC") : (ci === 0 ? C.forest : C.offBlack),
            fontWeight: ci === 0 ? 600 : 400,
          }}>{cell}</div>
        ))
      ))}
    </div>
  );
}

function ArchBlock({ icon, label, desc, color = C.forest, small }) {
  return (
    <div style={{
      background: `${color}10`, border: `1.5px solid ${color}25`, borderRadius: 14,
      padding: small ? "10px 12px" : "14px 16px",
      display: "flex", gap: 10, alignItems: "flex-start",
    }}>
      <span style={{ fontSize: small ? 18 : 22, flexShrink: 0 }}>{icon}</span>
      <div>
        <div style={{ fontSize: small ? 11 : 13, fontWeight: 700, color: C.offBlack, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: small ? 10 : 11, color: "#888", lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
}

export default function TechArchitecture() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div style={{ minHeight: "100vh", background: C.chalk }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(160deg, ${C.smoke} 0%, #0D0D0D 100%)`,
        padding: "56px 24px 48px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${C.neonMint}12 0%, transparent 70%)`,
        }} />
        <div style={{ position: "relative" }}>
          <div style={{
            fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase",
            color: C.neonMint, marginBottom: 16, fontFamily: "'Outfit', sans-serif",
          }}>System Architecture v1.0</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 12 }}>
            <LogoWithLeaf size={0.85} dark={true} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 28, color: "#666", lineHeight: 1 }}>Tech</span>
          </div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>
            기술 스택 · 시스템 아키텍처 · 데이터베이스 설계
            <br />
            <span style={{ fontSize: 11, color: "#666" }}>최종 수정: 2026.03.11</span>
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
            borderRadius: activeSection === s.id ? 8 : 0,
            margin: "4px 2px", transition: "all 0.2s",
          }}>{s.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 60px" }}>

        {/* === OVERVIEW === */}
        {activeSection === "overview" && (
          <div>
            <Section title="서비스 요약" sub="Project Overview">
              <GridTable
                headers={[
                  { label: "항목", w: "100px" },
                  { label: "내용" },
                ]}
                rows={[
                  ["서비스명", "LEAFIT (리핏)"],
                  ["컨셉", "옷으로 옷을 사는 순환 패션 플랫폼"],
                  ["화폐", "🍃 리프 (Leaf) — 현금 가치 없는 순수 교환권"],
                  ["타겟", "20대 Gen Z, 한국"],
                  ["초기 규모", "300명"],
                  ["개발 인원", "AI 바이브코딩 개발자 2명"],
                ]}
              />
            </Section>

            <Section title="핵심 기능" sub="Core Features" dark>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { icon: "📸", title: "옷 등록 & AI 검수", desc: "사진 업로드 → Gemini AI 검수 → 합격 시 리프 1개 자동 지급" },
                  { icon: "🔄", title: "리프 교환", desc: "1리프 = 1벌. 가격 없이 옷으로 옷을 교환" },
                  { icon: "💬", title: "1:1 채팅 & 거래", desc: "실시간 채팅 → 예약 → 거래 완료 플로우" },
                  { icon: "🏆", title: "순환 뱃지", desc: "🌱→🪐 5단계 뱃지 + 게이미피케이션" },
                  { icon: "🎁", title: "기부 & 리폼", desc: "안 팔리는 옷 기부 → 팝업 스토어 상품화" },
                  { icon: "📢", title: "스폰서드 광고", desc: "친환경 브랜드 네이티브 피드 광고 (BM)" },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: "#FFFFFF08", borderRadius: 14, padding: "14px 14px",
                    border: "1px solid #FFFFFF10",
                  }}>
                    <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.lime, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: "#CCC", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* === TECH STACK === */}
        {activeSection === "stack" && (
          <div>
            <Section title="기술 스택 총괄" sub="Tech Stack">
              <div style={{ overflowX: "auto" }}>
                <GridTable
                  headers={[
                    { label: "레이어", w: "90px" },
                    { label: "기술", w: "120px" },
                    { label: "선정 이유" },
                  ]}
                  rows={[
                    ["모바일 앱", "Flutter (Dart)", "자체 렌더링 커스텀 UI, iOS/Android 픽셀 동일"],
                    ["상태 관리", "Riverpod", "컴파일 타임 안전성, 비동기, Flutter 공식 권장"],
                    ["라우팅", "go_router", "선언적 라우팅, 딥링크 지원"],
                    ["백엔드", "Supabase", "PostgreSQL ACID 트랜잭션, 실시간, 인증, 스토리지 통합"],
                    ["AI 검수", "Gemini Flash", "건당 ~$0.001, 1초 응답, 이미지 분류 최적"],
                    ["이미지 CDN", "Cloudinary", "자동 리사이징, WebP 변환, 썸네일, CDN"],
                    ["푸시 알림", "FCM", "Flutter 네이티브 지원, iOS/Android 통합"],
                    ["분석", "Firebase Analytics", "유저 행동 추적, 이벤트 퍼널"],
                  ]}
                />
              </div>
            </Section>

            <Section title="Flutter 채택 이유" sub="vs React Native + Expo" dark>
              <div style={{ fontSize: 12, color: "#A8D5A0", lineHeight: 1.5, marginBottom: 16 }}>
                LEAFIT의 "Electric Garden" 디자인 시스템을 네이티브 성능으로 구현하기 위한 최적의 선택
              </div>
              {[
                { title: "자체 렌더링 엔진", desc: "Lime glow, 파티클 애니메이션, 커스텀 뱃지 등 브랜드 UI를 네이티브 성능으로 구현", icon: "🎨" },
                { title: "픽셀 동일 브랜드 경험", desc: "iOS/Android에서 픽셀 단위로 동일한 Electric Garden 디자인 보장", icon: "📱" },
                { title: "내장 그래픽 API", desc: "CustomPainter, Shader, AnimationController 등 프레임워크 내장 그래픽 도구", icon: "✨" },
                { title: "네이티브 성능", desc: "Dart AOT 컴파일로 브릿지 오버헤드 없는 순수 네이티브 실행", icon: "⚡" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: 10, padding: "10px 0",
                  borderBottom: i < 3 ? "1px solid #FFFFFF10" : "none", alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.lime, marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: "#CCC", lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </Section>

            <Section title="Supabase 채택 이유" sub="vs Firebase">
              {[
                { title: "ACID 트랜잭션", desc: "PostgreSQL 기반으로 리프 잔액 정합성을 DB Function에서 원자적으로 보장", color: C.forest },
                { title: "Row Level Security", desc: "클라이언트가 직접 DB에 접근해도 RLS 정책으로 데이터 보안 유지", color: C.forest },
                { title: "SQL 자유도", desc: "복잡한 필터, 정렬, 검색, JOIN 쿼리를 SQL로 자유롭게 작성", color: C.forest },
                { title: "Edge Functions", desc: "Deno 기반 서버리스 로직으로 AI 검수, 푸시, 이미지 처리 구현", color: C.forest },
              ].map((item, i) => (
                <Card key={i} style={{ borderLeft: `3px solid ${item.color}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.offBlack, marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5 }}>{item.desc}</div>
                </Card>
              ))}
            </Section>

            <Section title="Gemini Flash 채택 이유" sub="vs Claude Vision" dark>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { label: "태스크 특성", value: "고도 추론 불필요 — 구조화된 이미지 분류", icon: "🧠" },
                  { label: "비용", value: "건당 ~$0.001 (Claude 대비 5~10배 저렴)", icon: "💰" },
                  { label: "응답 속도", value: "1초 이내 → 유저 대기 UX 최적", icon: "⚡" },
                  { label: "월 비용", value: "300명 × 10건 = ~$3/월 (사실상 무료)", icon: "📊" },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: "#FFFFFF08", borderRadius: 12, padding: "14px",
                    border: "1px solid #FFFFFF10",
                  }}>
                    <div style={{ fontSize: 18, marginBottom: 6 }}>{item.icon}</div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.lime, marginBottom: 4, fontFamily: "'Outfit', sans-serif", letterSpacing: 0.5 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: "#CCC", lineHeight: 1.4 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* === ARCHITECTURE === */}
        {activeSection === "architecture" && (
          <div>
            <Section title="전체 시스템 구조" sub="System Architecture">
              {/* Client Layer */}
              <div style={{ marginBottom: 16 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.forest,
                  fontFamily: "'Outfit', sans-serif", marginBottom: 8,
                }}>CLIENT LAYER</div>
                <div style={{
                  background: `${C.forest}08`, borderRadius: 16, padding: 16,
                  border: `1.5px solid ${C.forest}20`,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: C.forest, marginBottom: 12 }}>Flutter App (Dart) — iOS + Android</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                    {[
                      { name: "Riverpod", role: "상태 관리" },
                      { name: "go_router", role: "라우팅, 딥링크" },
                      { name: "FCM", role: "푸시 알림" },
                      { name: "supabase_flutter", role: "DB/Auth/Realtime" },
                      { name: "cached_network_image", role: "이미지 캐싱" },
                      { name: "geolocator", role: "위치/동네 인증" },
                    ].map((p, i) => (
                      <div key={i} style={{
                        background: "#FFF", borderRadius: 10, padding: "8px 10px",
                        border: `1px solid ${C.mist}`,
                      }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: C.forest }}>{p.name}</div>
                        <div style={{ fontSize: 9, color: "#999" }}>{p.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div style={{ textAlign: "center", margin: "8px 0", color: C.forest, fontSize: 18 }}>▼ HTTPS / WSS</div>

              {/* Supabase Layer */}
              <div style={{ marginBottom: 16 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.neonMint,
                  fontFamily: "'Outfit', sans-serif", marginBottom: 8,
                }}>BACKEND (BaaS)</div>
                <div style={{
                  background: C.forest, borderRadius: 16, padding: 16,
                  border: "none",
                }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: C.lime, marginBottom: 12 }}>Supabase</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                    {[
                      { name: "Auth", desc: "카카오 OAuth · Apple Sign-In · JWT", icon: "🔐" },
                      { name: "PostgreSQL", desc: "RLS 전체 적용 · DB Functions · Full-Text Search", icon: "🗄️" },
                      { name: "Realtime", desc: "채팅 WebSocket · 거래 상태 구독", icon: "⚡" },
                      { name: "Storage (S3)", desc: "옷 사진 원본 저장 · 버킷 정책", icon: "📁" },
                    ].map((s, i) => (
                      <div key={i} style={{
                        background: "#FFFFFF08", borderRadius: 12, padding: "10px 12px",
                        border: "1px solid #FFFFFF10",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <span style={{ fontSize: 14 }}>{s.icon}</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: C.lime }}>{s.name}</span>
                        </div>
                        <div style={{ fontSize: 10, color: "#AAA", lineHeight: 1.4 }}>{s.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    background: C.smoke, borderRadius: 12, padding: "12px 14px",
                    border: "1px solid #FFFFFF10",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.neonMint, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>Edge Functions (Deno)</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {[
                        "ai-review — Gemini 검수",
                        "push-notify — FCM 푸시",
                        "process-image — Cloudinary",
                        "verify-invite — 초대 코드",
                        "check-report — 신고/제재",
                        "sponsor-serve — 광고 기록",
                      ].map((f, i) => (
                        <span key={i} style={{
                          fontSize: 10, background: `${C.neonMint}15`, color: C.neonMint,
                          padding: "3px 10px", borderRadius: 20, fontWeight: 500,
                          border: `1px solid ${C.neonMint}25`,
                        }}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div style={{ textAlign: "center", margin: "8px 0", color: C.forest, fontSize: 18 }}>▼</div>

              {/* External Services */}
              <div>
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: 2, color: C.butter,
                  fontFamily: "'Outfit', sans-serif", marginBottom: 8,
                }}>EXTERNAL SERVICES</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    { name: "Cloudinary", desc: "이미지 CDN · 리사이징 · WebP 변환 · 썸네일", color: C.butter, icon: "🖼️" },
                    { name: "Gemini Flash", desc: "옷 사진 AI 검수 · 합격/불합격 판정", color: C.neonMint, icon: "🤖" },
                    { name: "Firebase", desc: "FCM 푸시 알림 · Analytics · Crashlytics", color: C.hotCoral, icon: "🔔" },
                  ].map((s, i) => (
                    <div key={i} style={{
                      background: "#FFF", borderRadius: 14, padding: "14px 12px",
                      border: `1px solid ${C.mist}`, borderTop: `3px solid ${s.color}`,
                      textAlign: "center",
                    }}>
                      <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: C.offBlack, marginBottom: 4 }}>{s.name}</div>
                      <div style={{ fontSize: 10, color: "#999", lineHeight: 1.4 }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section title="통신 프로토콜" sub="Protocols" dark>
              <GridTable dark
                headers={[
                  { label: "통신", w: "1.5fr" },
                  { label: "프로토콜", w: "0.8fr" },
                  { label: "용도" },
                ]}
                rows={[
                  ["앱 ↔ Supabase DB", "HTTPS", "CRUD 쿼리"],
                  ["앱 ↔ Realtime", "WSS", "채팅/거래 실시간 구독"],
                  ["앱 ↔ Auth", "HTTPS", "인증/토큰 관리"],
                  ["앱 ↔ Storage", "HTTPS", "이미지 업로드/다운로드"],
                  ["Edge ↔ Gemini", "HTTPS", "AI 검수 API 호출"],
                  ["Edge ↔ Cloudinary", "HTTPS", "이미지 후처리"],
                  ["Edge ↔ FCM", "HTTPS", "푸시 알림 발송"],
                ]}
              />
            </Section>
          </div>
        )}

        {/* === DATABASE === */}
        {activeSection === "db" && (
          <div>
            <Section title="ERD 관계도" sub="Entity Relationships" dark>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { from: "users", rel: "1:N", to: "items, leaf_transactions, notifications, reports" },
                  { from: "items", rel: "1:N", to: "item_photos" },
                  { from: "items", rel: "1:1", to: "trades (item_id)" },
                  { from: "trades", rel: "N:1", to: "users (seller_id, buyer_id)" },
                  { from: "trades", rel: "1:N", to: "messages" },
                  { from: "users", rel: "N:M", to: "items (via wishlist)" },
                  { from: "sponsored_items", rel: "독립", to: "외부 광고 데이터" },
                ].map((r, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "6px 0", borderBottom: i < 6 ? "1px solid #FFFFFF10" : "none",
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.lime, minWidth: 100, fontFamily: "'Outfit', sans-serif" }}>{r.from}</span>
                    <span style={{
                      fontSize: 10, color: C.neonMint, fontWeight: 600, background: `${C.neonMint}15`,
                      padding: "2px 8px", borderRadius: 8, fontFamily: "'Outfit', sans-serif",
                    }}>{r.rel}</span>
                    <span style={{ fontSize: 11, color: "#CCC" }}>{r.to}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Table definitions */}
            {[
              {
                name: "users", desc: "유저 프로필 + 리프 잔액 + 뱃지 + 설정",
                fields: [
                  ["id", "UUID PK"],
                  ["nickname", "닉네임"],
                  ["area", "동네 (마포구 연남동)"],
                  ["leaf_balance", "리프 잔액 (INTEGER)"],
                  ["badge_level", "sprout → universe"],
                  ["total_uploads / swaps / donations", "순환 통계"],
                  ["invite_code", "내 초대 코드 (UNIQUE)"],
                  ["push_token", "FCM 토큰"],
                  ["notification_*", "알림 설정 (채팅/거래/키워드)"],
                  ["is_suspended", "정지 여부"],
                ],
              },
              {
                name: "items", desc: "등록된 옷 정보 + 상태 관리",
                fields: [
                  ["id / user_id", "PK + 등록자 FK"],
                  ["title / description", "상품명 + 설명"],
                  ["category / size / condition", "카테고리 · 사이즈 · 상태"],
                  ["trade_methods", "TEXT[] — 반값택배/직거래/일반택배"],
                  ["status", "reviewing → active → reserved → swapped/donated"],
                  ["view_count", "조회수"],
                  ["area / lat / lng", "등록 위치"],
                ],
                indexes: ["status 필터", "카테고리 필터", "유저별 조회", "GIN 한글 텍스트 검색"],
              },
              {
                name: "trades", desc: "거래 상태 머신 (채팅 → 예약 → 완료)",
                fields: [
                  ["item_id / seller_id / buyer_id", "FK 관계"],
                  ["status", "chatting → reserved → completed/cancelled/reported"],
                  ["trade_method", "합의된 거래 방법"],
                  ["report_deadline", "completed_at + 48시간"],
                  ["buyer_rating", "good / bad"],
                ],
              },
              {
                name: "messages", desc: "채팅 메시지 (실시간 구독 대상)",
                fields: [
                  ["trade_id / sender_id", "거래방 + 발신자"],
                  ["type", "text / image / system / appointment / safety"],
                  ["content / image_url", "메시지 내용"],
                  ["is_read", "읽음 처리"],
                ],
              },
            ].map((table, ti) => (
              <Section key={ti} title={table.name} sub={table.desc}>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {table.fields.map(([col, desc], i) => (
                    <div key={i} style={{
                      display: "grid", gridTemplateColumns: "1fr 1.5fr",
                      padding: "8px 0", borderBottom: i < table.fields.length - 1 ? `1px solid ${C.mist}` : "none",
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: C.forest, fontFamily: "'Outfit', sans-serif" }}>{col}</div>
                      <div style={{ fontSize: 11, color: "#888" }}>{desc}</div>
                    </div>
                  ))}
                </div>
                {table.indexes && (
                  <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {table.indexes.map((idx, i) => (
                      <span key={i} style={{
                        fontSize: 10, background: `${C.forest}10`, color: C.forest,
                        padding: "3px 10px", borderRadius: 20, fontWeight: 600,
                        border: `1px solid ${C.forest}20`,
                      }}>INDEX: {idx}</span>
                    ))}
                  </div>
                )}
              </Section>
            ))}

            <Section title="기타 테이블" sub="Additional Tables" dark>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { name: "item_photos", desc: "사진 URL (원본 + 썸네일) + 정렬 순서" },
                  { name: "leaf_transactions", desc: "리프 입출금 이력 (+1/-1, 유형, 참조 ID)" },
                  { name: "wishlist", desc: "찜 목록 (user_id + item_id UNIQUE)" },
                  { name: "reports", desc: "신고 (대상 유형/ID, 사유, 처리 상태)" },
                  { name: "notifications", desc: "알림 (유형, 제목, 참조, 읽음 여부)" },
                  { name: "sponsored_items", desc: "광고 (브랜드, 노출/클릭 카운트, 기간)" },
                ].map((t, i) => (
                  <div key={i} style={{
                    background: "#FFFFFF08", borderRadius: 12, padding: "12px 14px",
                    border: "1px solid #FFFFFF10",
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.lime, marginBottom: 4, fontFamily: "'Outfit', sans-serif" }}>{t.name}</div>
                    <div style={{ fontSize: 10, color: "#CCC", lineHeight: 1.4 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* === REALTIME & SECURITY === */}
        {activeSection === "realtime" && (
          <div>
            <Section title="실시간 채팅 구조" sub="Supabase Realtime" dark>
              <div style={{ fontSize: 12, color: "#A8D5A0", lineHeight: 1.6, marginBottom: 16 }}>
                Supabase Realtime의 PostgreSQL Change Data Capture를 통해 메시지와 거래 상태를 실시간으로 구독합니다.
              </div>
              {[
                { title: "메시지 실시간 구독", desc: "messages 테이블의 INSERT 이벤트를 trade_id 기준으로 필터링하여 WebSocket으로 수신. 새 메시지가 삽입되면 즉시 채팅 UI에 반영", icon: "💬" },
                { title: "거래 상태 구독", desc: "trades 테이블의 UPDATE 이벤트를 감지. 채팅중 → 예약중 → 완료 상태 변경이 양쪽 유저에게 실시간 반영", icon: "🔄" },
                { title: "읽음 처리", desc: "채팅방 진입 시 해당 거래의 읽지 않은 상대 메시지를 일괄 is_read = true로 업데이트", icon: "✅" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, padding: "14px 0",
                  borderBottom: i < 2 ? "1px solid #FFFFFF10" : "none", alignItems: "flex-start",
                }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.lime, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 12, color: "#CCC", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </Section>

            <Section title="보안: Row Level Security" sub="Data Security">
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5, marginBottom: 14 }}>
                모든 테이블에 RLS가 적용되어, 클라이언트가 Supabase에 직접 접근해도 인가된 데이터만 조회/수정 가능합니다.
              </div>
              {[
                { table: "users", policy: "누구나 읽기 가능, 본인만 수정" },
                { table: "items", policy: "active 상태만 공개 읽기, 본인 아이템만 쓰기/수정" },
                { table: "messages", policy: "거래 참여자(seller/buyer)만 접근" },
                { table: "leaf_transactions", policy: "본인만 조회, 쓰기는 SECURITY DEFINER 함수만" },
                { table: "wishlist", policy: "본인 데이터만 CRUD" },
                { table: "notifications", policy: "본인 알림만 접근" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "100px 1fr",
                  padding: "8px 0", borderBottom: i < 5 ? `1px solid ${C.mist}` : "none",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.forest, fontFamily: "'Outfit', sans-serif" }}>{item.table}</div>
                  <div style={{ fontSize: 11, color: "#888" }}>{item.policy}</div>
                </div>
              ))}
            </Section>

            <Section title="모니터링 & 에러 추적" sub="Monitoring" dark>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { tool: "Firebase Crashlytics", purpose: "Flutter 앱 크래시 리포트", icon: "🐛" },
                  { tool: "Firebase Analytics", purpose: "화면 조회, 이벤트 퍼널", icon: "📊" },
                  { tool: "Supabase Dashboard", purpose: "DB 쿼리 성능, Edge Function 로그", icon: "📈" },
                  { tool: "Flutter DevTools", purpose: "UI 렌더링 성능, 메모리 프로파일링", icon: "🔧" },
                ].map((m, i) => (
                  <div key={i} style={{
                    background: "#FFFFFF08", borderRadius: 12, padding: "14px",
                    border: "1px solid #FFFFFF10",
                  }}>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{m.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.lime, marginBottom: 3 }}>{m.tool}</div>
                    <div style={{ fontSize: 10, color: "#CCC", lineHeight: 1.4 }}>{m.purpose}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* === FLUTTER STRUCTURE === */}
        {activeSection === "flutter" && (
          <div>
            <Section title="Flutter 프로젝트 구조" sub="App Structure">
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5, marginBottom: 14 }}>
                Feature-first 아키텍처로, 각 기능별로 화면 · 위젯 · Provider가 독립적으로 구성됩니다.
              </div>
              {[
                { dir: "core/", desc: "Electric Garden 테마(colors, typography), Supabase 클라이언트, GoRouter 라우트, 상수", color: C.forest },
                { dir: "models/", desc: "user, item, trade, message, notification, leaf_transaction 데이터 모델 (Freezed 불변 객체)", color: C.neonMint },
                { dir: "services/", desc: "auth, item, trade, chat, leaf, image, push, location 서비스 레이어", color: C.butter },
                { dir: "providers/", desc: "Riverpod Provider — auth, items, trade, chat, leaf, badge, wishlist, notification, profile", color: C.hotCoral },
              ].map((item, i) => (
                <Card key={i} style={{ borderLeft: `3px solid ${item.color}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.offBlack, marginBottom: 3, fontFamily: "'Outfit', sans-serif" }}>{item.dir}</div>
                  <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5 }}>{item.desc}</div>
                </Card>
              ))}
            </Section>

            <Section title="Feature 모듈" sub="features/" dark>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { name: "auth/", screens: "splash, onboarding(3장), login, location, first_leaf", icon: "🔐" },
                  { name: "home/", screens: "home_screen, search_screen + item_grid, category_chips, sponsored_card", icon: "🏠" },
                  { name: "item/", screens: "item_detail, seller_profile, upload(정보입력), preview, review_result", icon: "👕" },
                  { name: "chat/", screens: "chat_list, chat_room + bubble, quick_replies, appointment_card", icon: "💬" },
                  { name: "profile/", screens: "my_screen, edit_profile, settings + badge_progress, leaf_wallet, closet_tab", icon: "👤" },
                  { name: "notification/", screens: "notification_screen (검수/채팅/거래/기부 알림)", icon: "🔔" },
                ].map((f, i) => (
                  <div key={i} style={{
                    background: "#FFFFFF08", borderRadius: 14, padding: "14px",
                    border: "1px solid #FFFFFF10",
                  }}>
                    <div style={{ fontSize: 18, marginBottom: 6 }}>{f.icon}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.lime, marginBottom: 4, fontFamily: "'Outfit', sans-serif" }}>{f.name}</div>
                    <div style={{ fontSize: 10, color: "#CCC", lineHeight: 1.5 }}>{f.screens}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="공유 위젯" sub="shared/widgets/">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  "leafit_button (CTA)",
                  "leafit_chip (카테고리/사이즈)",
                  "leafit_toast (토스트)",
                  "leafit_bottom_sheet",
                  "leafit_modal",
                  "leaf_icon (CustomPainter)",
                  "badge_icon + glow",
                  "status_badge (채팅중/예약중/완료)",
                  "tab_bar_layout (3탭)",
                ].map((w, i) => (
                  <span key={i} style={{
                    fontSize: 11, background: `${C.forest}10`, color: C.forest,
                    padding: "5px 14px", borderRadius: 20, fontWeight: 600,
                    border: `1px solid ${C.forest}20`,
                  }}>{w}</span>
                ))}
              </div>
            </Section>

            <Section title="주요 패키지" sub="pubspec.yaml" dark>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { cat: "상태/라우팅", pkgs: "flutter_riverpod, go_router" },
                  { cat: "백엔드", pkgs: "supabase_flutter" },
                  { cat: "Firebase", pkgs: "firebase_core, messaging, analytics" },
                  { cat: "이미지", pkgs: "cached_network_image, image_picker, photo_view" },
                  { cat: "위치", pkgs: "geolocator, geocoding" },
                  { cat: "UI", pkgs: "smooth_page_indicator, flutter_animate, shimmer" },
                  { cat: "유틸", pkgs: "share_plus, url_launcher, intl, uuid" },
                  { cat: "코드젠", pkgs: "freezed, json_serializable, riverpod_generator" },
                ].map((g, i) => (
                  <div key={i} style={{ padding: "8px 0", borderBottom: i < 7 ? "1px solid #FFFFFF10" : "none" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.lime, marginBottom: 3, fontFamily: "'Outfit', sans-serif" }}>{g.cat}</div>
                    <div style={{ fontSize: 10, color: "#AAA", lineHeight: 1.4 }}>{g.pkgs}</div>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* === DATA FLOW === */}
        {activeSection === "flow" && (
          <div>
            <Section title="핵심 데이터 플로우" sub="End-to-End Flows">
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5, marginBottom: 14 }}>
                유저 행위별 Flutter → Edge Function → DB Function → Realtime 흐름 요약
              </div>
            </Section>

            {[
              { action: "회원가입", flow: "Supabase Auth → verify-invite → signup_bonus (+1리프)", color: C.forest, icon: "🔐" },
              { action: "옷 등록", flow: "image_picker → Storage → ai-review (Gemini) + process-image (Cloudinary) → grant_leaf_for_upload (+1리프)", color: C.lime, icon: "📸" },
              { action: "피드 탐색", flow: "items SELECT + 필터/정렬 → sponsor-serve (노출 기록)", color: C.neonMint, icon: "🔍" },
              { action: "상세 조회", flow: "items + photos + users JOIN → view_count +1", color: C.forest, icon: "👁️" },
              { action: "채팅 시작", flow: "trades INSERT → messages INSERT → push-notify → messages 실시간 구독 시작", color: C.butter, icon: "💬" },
              { action: "메시지 전송", flow: "messages INSERT → push-notify → 상대에게 Realtime 전달", color: C.butter, icon: "📨" },
              { action: "예약하기", flow: "trades UPDATE → 'reserved' → push-notify → trades 구독 반영", color: C.neonMint, icon: "📅" },
              { action: "거래 완료", flow: "trades RPC → complete_swap (-1리프) → push-notify → trades 구독 반영", color: C.lime, icon: "🤝" },
              { action: "48h 신고", flow: "reports INSERT → check-report (누적/제재 처리)", color: C.hotCoral, icon: "🚨" },
              { action: "기부", flow: "items UPDATE → 'donated' → push-notify → donate_item", color: C.forest, icon: "🎁" },
              { action: "친구 초대", flow: "링크 공유 → 가입 시 verify-invite → process_invite (+1 양쪽)", color: C.neonMint, icon: "👫" },
            ].map((item, i) => (
              <Card key={i} style={{ borderLeft: `3px solid ${item.color}`, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.offBlack, marginBottom: 3 }}>{item.action}</div>
                  <div style={{ fontSize: 11, color: "#888", lineHeight: 1.6 }}>{item.flow}</div>
                </div>
              </Card>
            ))}

            <Section title="환경 분리" sub="Environments" dark>
              <GridTable dark
                headers={[
                  { label: "환경", w: "0.7fr" },
                  { label: "Supabase" },
                  { label: "Gemini" },
                  { label: "Cloudinary" },
                ]}
                rows={[
                  ["dev", "leafit-dev", "무료 티어", "무료 티어"],
                  ["staging", "leafit-staging", "유료", "유료"],
                  ["prod", "leafit-prod", "유료", "유료"],
                ]}
              />
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}
