// LEAFIT Logo Components — leaf replaces "I": LEAF[🌿]T
const C = {
  lime: "#BEFF0A",
  forest: "#1A3C20",
  chalk: "#F7F5F0",
  mint: "#4DFFA6",
  smoke: "#2A2A2A",
  black: "#111111",
};

// Leaf glyph replacing "I" — teardrop with stem + veins
function LeafI({ height, color = C.mint, stem = C.forest, style }) {
  const w = height * 0.52;
  return (
    <svg width={w} height={height} viewBox="0 0 22 40" style={{ display: "block", ...style }}>
      <path
        d="M11 2 C5 9, 1 17, 3 27 C5 32, 8 36, 11 35 C14 36, 17 32, 19 27 C21 17, 17 9, 11 2Z"
        fill={color}
      />
      <path
        d="M11 11 L11 30"
        stroke={stem} strokeWidth="1.8" fill="none" strokeLinecap="round"
      />
      <path
        d="M8 14 L11 10 L14 14"
        stroke={stem} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M11 18 L7.5 22 M11 23 L14.5 27"
        stroke={stem} strokeWidth="1.4" fill="none" strokeLinecap="round"
      />
    </svg>
  );
}

// Standalone geometric leaf SVG (for currency icon, badges)
export function LeafIcon({ size = 40, color = C.lime, rotate = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ transform: `rotate(${rotate}deg)` }}>
      <path
        d="M50 5 C20 25, 5 55, 15 80 C25 95, 45 98, 50 95 C55 98, 75 95, 85 80 C95 55, 80 25, 50 5Z"
        fill={color}
      />
      <path
        d="M50 30 L50 80 M50 45 L35 55 M50 55 L65 65"
        stroke={color === C.lime ? C.forest : "#FFF"}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Primary logo: LEAF[🌿]T — large display
export function LogoWithLeaf({ size = 1, dark = true }) {
  const fs = 52 * size;
  const fStyle = {
    fontFamily: "'Outfit', 'DM Sans', sans-serif",
    fontSize: `${fs}px`,
    fontWeight: 800,
    letterSpacing: `${-1.5 * size}px`,
    lineHeight: 1,
  };
  return (
    <div style={{ display: "inline-flex", alignItems: "flex-end", userSelect: "none" }}>
      <span style={{ ...fStyle, color: dark ? C.lime : C.forest }}>LEAF</span>
      <LeafI
        height={fs * 0.82}
        color={dark ? C.mint : C.mint}
        stem={dark ? C.forest : C.forest}
        style={{ marginBottom: `${3 * size}px`, marginLeft: `${-1 * size}px`, marginRight: `${-1 * size}px` }}
      />
      <span style={{ ...fStyle, color: dark ? C.chalk : C.black }}>T</span>
    </div>
  );
}

// Wordmark: LEAF[🌿]T — medium display
export function Wordmark({ leafColor = C.lime, itColor = C.chalk, scale = 1 }) {
  const fs = 48 * scale;
  const fStyle = {
    fontFamily: "'Outfit', 'DM Sans', sans-serif",
    fontSize: `${fs}px`,
    fontWeight: 800,
    letterSpacing: `${-1 * scale}px`,
    lineHeight: 1,
  };
  return (
    <div style={{ display: "inline-flex", alignItems: "flex-end", gap: `${1 * scale}px`, userSelect: "none" }}>
      <span style={{ ...fStyle, color: leafColor }}>LEAF</span>
      <LeafI
        height={fs * 0.8}
        color={C.mint}
        stem={C.forest}
        style={{ marginBottom: `${2 * scale}px` }}
      />
      <span style={{ ...fStyle, color: itColor }}>T</span>
    </div>
  );
}

// Compact inline logo for headers / nav: LEAF[🌿]T
export function LeafitInline({ fontSize = 17, dark = false }) {
  const fStyle = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: `${fontSize}px`,
    fontWeight: 800,
    lineHeight: 1,
  };
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "0px" }}>
      <span style={{ ...fStyle, color: dark ? C.lime : C.forest }}>LEAF</span>
      <LeafI
        height={fontSize * 0.95}
        color={C.mint}
        stem={C.forest}
        style={{ marginBottom: "1px" }}
      />
      <span style={{ ...fStyle, color: dark ? C.chalk : C.black }}>T</span>
    </div>
  );
}

export { LeafI };
