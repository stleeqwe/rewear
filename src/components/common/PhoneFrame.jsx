/**
 * PhoneFrame - Wireframe phone mockup wrapper for LEAFIT design system
 *
 * Props:
 *   title       - screen title bar text
 *   screenId    - annotation ID above the phone (e.g. "S-01")
 *   annotation  - description text below the phone
 *   children    - screen content
 *   showBack    - show back arrow in title bar (default false)
 *   statusBarBg - status bar background color (default Forest)
 *   titleBarBg  - title bar background color (default Chalk)
 */
export default function PhoneFrame({
  title,
  screenId,
  annotation,
  children,
  showBack = false,
  statusBarBg = "#1A3C20",
  titleBarBg = "#F7F5F0",
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
    }}>
      {/* Screen ID label */}
      {screenId && (
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#1A3C20",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          fontFamily: "'Outfit', sans-serif",
        }}>
          {screenId}
        </div>
      )}

      {/* Phone body */}
      <div className="phone-frame">
        {/* Status bar */}
        <div style={{
          height: 36,
          background: statusBarBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          fontSize: 10,
          color: "#FFFFFF",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
        }}>
          <span>9:41</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 8 }}>
            <span style={{ opacity: 0.7 }}>5G</span>
            <span>
              {/* WiFi icon */}
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                <path d="M6 9a0.5 0.5 0 1 0 0-1 0.5 0.5 0 0 0 0 1z" fill="#FFF"/>
                <path d="M3.5 6.5a3.5 3.5 0 0 1 5 0" stroke="#FFF" strokeWidth="1" strokeLinecap="round" fill="none"/>
                <path d="M1.5 4.5a6 6 0 0 1 9 0" stroke="#FFF" strokeWidth="1" strokeLinecap="round" fill="none"/>
              </svg>
            </span>
            <span>
              {/* Battery icon */}
              <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                <rect x="0.5" y="1" width="14" height="8" rx="1.5" stroke="#FFF" strokeWidth="1" fill="none"/>
                <rect x="2" y="2.5" width="11" height="5" rx="0.5" fill="#FFF"/>
                <rect x="15.5" y="3" width="1.5" height="4" rx="0.5" fill="#FFF" opacity="0.5"/>
              </svg>
            </span>
          </span>
        </div>

        {/* Title bar */}
        <div style={{
          height: 44,
          background: titleBarBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #E8E5DD",
          fontSize: 14,
          fontWeight: 700,
          color: "#111111",
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          position: "relative",
          padding: "0 44px",
        }}>
          {showBack && (
            <span style={{
              position: "absolute",
              left: 14,
              fontSize: 18,
              color: "#111111",
              cursor: "pointer",
              lineHeight: 1,
            }}>
              {/* Back arrow */}
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                <path d="M8 2L2 8L8 14" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          )}
          <span style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {title}
          </span>
        </div>

        {/* Content area */}
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
            width: 100,
            height: 4,
            borderRadius: 2,
            background: "#E8E5DD",
          }} />
        </div>
      </div>

      {/* Annotation text */}
      {annotation && (
        <div className="phone-annotation">{annotation}</div>
      )}
    </div>
  );
}
