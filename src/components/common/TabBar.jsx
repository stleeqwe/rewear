import { useState } from "react";

const tabs = [
  { icon: "\uD83C\uDFE0", label: "\uD648", id: "home" },
  { icon: "\uD83D\uDCAC", label: "\uCC44\uD305", id: "chat" },
  { icon: "\uD83D\uDC64", label: "MY", id: "my" },
];

/**
 * TabBar - 3-tab bottom navigation for LEAFIT
 *
 * Props:
 *   activeTab   - "home" | "chat" | "my" (or index 0/1/2)
 *   onTabChange - callback(tabId)
 *   chatBadge   - number | null, unread message count
 */
export default function TabBar({ activeTab = "home", onTabChange, chatBadge = 0 }) {
  const resolvedActive = typeof activeTab === "number"
    ? tabs[activeTab]?.id
    : activeTab;

  const [pressedTab, setPressedTab] = useState(null);

  return (
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 70,
      background: "#FFFFFF",
      borderTop: "1px solid #F0EDE5",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      zIndex: 100,
    }}>
      {tabs.map((tab) => {
        const isActive = resolvedActive === tab.id;
        const isPressed = pressedTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange && onTabChange(tab.id)}
            onPointerDown={() => setPressedTab(tab.id)}
            onPointerUp={() => setPressedTab(null)}
            onPointerLeave={() => setPressedTab(null)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 0 12px",
              position: "relative",
              WebkitTapHighlightColor: "transparent",
              transform: isPressed ? "scale(0.92)" : "scale(1)",
              transition: "transform 0.12s ease",
            }}
          >
            {/* Icon */}
            <span style={{
              fontSize: 22,
              lineHeight: 1,
              filter: isActive ? "none" : "grayscale(1)",
              opacity: isActive ? 1 : 0.4,
              transition: "all 0.2s ease",
              position: "relative",
            }}>
              {tab.icon}

              {/* Chat unread badge */}
              {tab.id === "chat" && chatBadge > 0 && (
                <span style={{
                  position: "absolute",
                  top: -4,
                  right: -8,
                  minWidth: 16,
                  height: 16,
                  borderRadius: 8,
                  background: "#FF6B6B",
                  color: "#FFF",
                  fontSize: 9,
                  fontWeight: 700,
                  fontFamily: "'Outfit', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4px",
                  lineHeight: 1,
                }}>
                  {chatBadge > 99 ? "99+" : chatBadge}
                </span>
              )}
            </span>

            {/* Label */}
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? "#1A3C20" : "#E8E5DD",
              fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
              transition: "all 0.2s ease",
            }}>
              {tab.label}
            </span>

            {/* Lime dot indicator */}
            {isActive && (
              <span style={{
                position: "absolute",
                bottom: 6,
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: "#BEFF0A",
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}
