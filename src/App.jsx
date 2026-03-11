import { useState } from "react";
import BusinessPlan from "./components/BusinessPlan";
import ScreenDesign from "./components/ScreenDesign";

const pages = [
  { id: "plan", label: "사업 기획서", icon: "📄" },
  { id: "screen", label: "화면설계서", icon: "📱" },
];

export default function App() {
  const [page, setPage] = useState("plan");

  return (
    <div style={{ minHeight: "100vh", background: "#F8F7F3" }}>
      {/* Top nav */}
      <nav className="top-nav">
        <div style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "18px",
          color: "#F5F0E8",
          marginRight: "auto",
          letterSpacing: "0.5px",
        }}>RE:WEAR</div>
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setPage(p.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: page === p.id ? "#2D5A27" : "transparent",
              color: page === p.id ? "#FFF" : "#888",
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
      {page === "plan" ? <BusinessPlan /> : <ScreenDesign />}
    </div>
  );
}
