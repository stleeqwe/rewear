import { useState } from "react";
import BusinessPlan from "./components/BusinessPlan";
import Branding from "./components/Branding";
import ScreenDesign from "./components/ScreenDesign";
import TechArchitecture from "./components/TechArchitecture";
import ElectricGardenColors from "./components/ElectricGardenColors";
import { LeafitInline } from "./components/common/LeafitLogo";

const pages = [
  { id: "plan", label: "사업 기획서", icon: "📄" },
  { id: "brand", label: "브랜딩", icon: "🎨" },
  { id: "screen", label: "화면설계서 v2.1", icon: "📱" },
  { id: "tech", label: "시스템 아키텍처", icon: "⚙️" },
  { id: "colors", label: "컬러 팔레트", icon: "🌿" },
];

export default function App() {
  const [page, setPage] = useState("brand");

  return (
    <div style={{ minHeight: "100vh", background: "#F7F5F0" }}>
      {/* Top nav */}
      <nav className="top-nav">
        <div style={{ marginRight: "auto" }}>
          <LeafitInline fontSize={18} dark={true} />
        </div>
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setPage(p.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "10px",
              border: "none",
              background: page === p.id ? "#BEFF0A" : "transparent",
              color: page === p.id ? "#1A3C20" : "#A8D5A0",
              fontSize: "13px",
              fontWeight: page === p.id ? 700 : 400,
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "14px" }}>{p.icon}</span>
            {p.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      {page === "plan" && <BusinessPlan />}
      {page === "brand" && <Branding />}
      {page === "screen" && <ScreenDesign />}
      {page === "tech" && <TechArchitecture />}
      {page === "colors" && <ElectricGardenColors />}
    </div>
  );
}
