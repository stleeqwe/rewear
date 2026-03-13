import { useState, useRef, useEffect } from "react";

const COLORS = [
  { name: "Emerald", code: "#2D6A4F", desc: "차분하고 고급스러운 그린", temp: "cool" },
  { name: "Garden", code: "#40916C", desc: "밸런스 좋은 중간 톤", temp: "neutral" },
  { name: "Fresh", code: "#52B788", desc: "밝지만 가볍지 않은, 생기있는", temp: "bright" },
  { name: "Sage", code: "#357A45", desc: "Forest보다 가볍고 자연스러운", temp: "warm" },
  { name: "Leaf", code: "#3CB371", desc: "미디엄 시그린, 친근한 느낌", temp: "warm" },
  { name: "Spring", code: "#7DFF3D", desc: "Lime에 가까운 밝은 연두", temp: "bright" },
  { name: "Kiwi", code: "#6DE849", desc: "생기있는 밝은 그린", temp: "bright" },
  { name: "Sprout", code: "#5DD05E", desc: "정중앙, 균형잡힌 톤", temp: "neutral" },
  { name: "Clover", code: "#4DBF6A", desc: "Leaf에 가까운 부드러운 그린", temp: "warm" },
  { name: "Lime", code: "#BEFF0A", desc: "강렬한 형광 라임", temp: "bright" },
  { name: "Forest", code: "#1A3C20", desc: "가장 깊고 어두운 딥 그린", temp: "cool" },
  { name: "Neon Mint", code: "#4DFFA6", desc: "네온 느낌의 밝은 민트 그린", temp: "bright" },
];

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function hexToHsl(hex) {
  let { r, g, b } = hexToRgb(hex);
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function relativeLuminance(hex) {
  let { r, g, b } = hexToRgb(hex);
  [r, g, b] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

const SortButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "6px 14px",
      borderRadius: 20,
      border: "none",
      background: active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
      color: active ? "#fff" : "rgba(255,255,255,0.5)",
      fontSize: 12,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: active ? 600 : 400,
      cursor: "pointer",
      transition: "all 0.25s ease",
      letterSpacing: "0.02em",
    }}
  >
    {label}
  </button>
);

export default function ElectricGardenColors() {
  const [selected, setSelected] = useState([0, 1]);
  const [sort, setSort] = useState("default");
  const [hovered, setHovered] = useState(null);
  const [textPreview, setTextPreview] = useState("#FFFFFF");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const sorted = [...COLORS].map((c, i) => ({ ...c, origIndex: i }));
  if (sort === "light") sorted.sort((a, b) => hexToHsl(b.code).l - hexToHsl(a.code).l);
  if (sort === "hue") sorted.sort((a, b) => hexToHsl(a.code).h - hexToHsl(b.code).h);
  if (sort === "sat") sorted.sort((a, b) => hexToHsl(b.code).s - hexToHsl(a.code).s);

  const toggleSelect = (origIndex) => {
    setSelected(prev => {
      if (prev.includes(origIndex)) return prev.filter(i => i !== origIndex);
      if (prev.length >= 2) return [prev[1], origIndex];
      return [...prev, origIndex];
    });
  };

  const pair = selected.length === 2 ? [COLORS[selected[0]], COLORS[selected[1]]] : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f0d",
      fontFamily: "'DM Sans', sans-serif",
      color: "#fff",
      padding: "40px 24px",
      boxSizing: "border-box",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: 48,
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <div style={{
          display: "inline-block",
          padding: "4px 16px",
          borderRadius: 20,
          background: "rgba(82, 183, 136, 0.12)",
          border: "1px solid rgba(82, 183, 136, 0.2)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#52B788",
          marginBottom: 20,
        }}>
          Color Palette Studio
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: 700,
          margin: "0 0 10px",
          background: "linear-gradient(135deg, #BEFF0A, #7DFF3D, #52B788, #2D6A4F, #1A3C20)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.2,
        }}>
          Electric Garden
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0, fontWeight: 300 }}>
          두 가지 색상을 선택해서 비교해보세요
        </p>
      </div>

      {/* Sort Controls */}
      <div style={{
        display: "flex", gap: 8, justifyContent: "center", marginBottom: 32, flexWrap: "wrap",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.6s ease 0.2s",
      }}>
        {[["default", "기본"], ["light", "밝기순"], ["hue", "색상순"], ["sat", "채도순"]].map(([key, label]) => (
          <SortButton key={key} label={label} active={sort === key} onClick={() => setSort(key)} />
        ))}
      </div>

      {/* Color Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        gap: 12,
        maxWidth: 780,
        margin: "0 auto 40px",
      }}>
        {sorted.map((color, i) => {
          const isSelected = selected.includes(color.origIndex);
          const isHovered = hovered === color.origIndex;
          const hsl = hexToHsl(color.code);
          return (
            <div
              key={color.name}
              onClick={() => toggleSelect(color.origIndex)}
              onMouseEnter={() => setHovered(color.origIndex)}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: "pointer",
                borderRadius: 16,
                overflow: "hidden",
                border: isSelected ? `2px solid ${color.code}` : "2px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.03)",
                transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: isHovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                boxShadow: isSelected
                  ? `0 8px 32px ${color.code}33, 0 0 0 1px ${color.code}44`
                  : "0 2px 8px rgba(0,0,0,0.2)",
                opacity: mounted ? 1 : 0,
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {/* Swatch */}
              <div style={{
                height: 100,
                background: color.code,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {isSelected && (
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(4px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700,
                  }}>
                    {selected.indexOf(color.origIndex) + 1}
                  </div>
                )}
                {/* Text preview samples */}
                <div style={{
                  position: "absolute",
                  bottom: 8, left: 8, right: 8,
                  display: "flex", justifyContent: "space-between",
                  fontSize: 9, fontWeight: 600, letterSpacing: "0.05em",
                }}>
                  <span style={{ color: "#fff" }}>White</span>
                  <span style={{ color: "#000" }}>Black</span>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "12px 14px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{color.name}</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>
                    {color.code}
                  </span>
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", margin: "0 0 10px", lineHeight: 1.5 }}>
                  {color.desc}
                </p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[
                    { label: "H", value: hsl.h + "°" },
                    { label: "S", value: hsl.s + "%" },
                    { label: "L", value: hsl.l + "%" },
                  ].map(({ label, value }) => (
                    <span key={label} style={{
                      padding: "2px 8px",
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.05)",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "monospace",
                    }}>
                      {label}:{value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Panel */}
      {pair && (
        <div style={{
          maxWidth: 780,
          margin: "0 auto 40px",
          borderRadius: 20,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          overflow: "hidden",
        }}>
          {/* Side by Side Bars */}
          <div style={{ display: "flex", height: 120 }}>
            <div style={{
              flex: 1, background: pair[0].code,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 4,
            }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                {pair[0].name}
              </span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>
                {pair[0].code}
              </span>
            </div>
            <div style={{
              width: 2, background: "#0a0f0d", position: "relative",
            }}>
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 32, height: 32, borderRadius: "50%",
                background: "#0a0f0d",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)",
                border: "2px solid rgba(255,255,255,0.1)",
              }}>vs</div>
            </div>
            <div style={{
              flex: 1, background: pair[1].code,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 4,
            }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                {pair[1].name}
              </span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "monospace" }}>
                {pair[1].code}
              </span>
            </div>
          </div>

          {/* Stats Comparison */}
          <div style={{ padding: "24px 28px" }}>
            <h3 style={{
              fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
              margin: "0 0 20px",
            }}>HSL 비교</h3>

            {["Hue (색상)", "Saturation (채도)", "Lightness (밝기)"].map((label, idx) => {
              const keys = ["h", "s", "l"];
              const maxVals = [360, 100, 100];
              const units = ["°", "%", "%"];
              const v0 = hexToHsl(pair[0].code)[keys[idx]];
              const v1 = hexToHsl(pair[1].code)[keys[idx]];
              return (
                <div key={label} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12 }}>
                    <span style={{ color: "rgba(255,255,255,0.6)" }}>{label}</span>
                    <span style={{ fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>
                      {v0}{units[idx]} vs {v1}{units[idx]} (Δ{Math.abs(v0 - v1)}{units[idx]})
                    </span>
                  </div>
                  <div style={{
                    height: 8, borderRadius: 4,
                    background: "rgba(255,255,255,0.06)",
                    position: "relative",
                    overflow: "visible",
                  }}>
                    <div style={{
                      position: "absolute",
                      left: `${(v0 / maxVals[idx]) * 100}%`,
                      top: "50%", transform: "translate(-50%, -50%)",
                      width: 14, height: 14, borderRadius: "50%",
                      background: pair[0].code,
                      border: "2px solid #fff",
                      boxShadow: `0 0 8px ${pair[0].code}66`,
                      zIndex: 2,
                    }} />
                    <div style={{
                      position: "absolute",
                      left: `${(v1 / maxVals[idx]) * 100}%`,
                      top: "50%", transform: "translate(-50%, -50%)",
                      width: 14, height: 14, borderRadius: "50%",
                      background: pair[1].code,
                      border: "2px solid #fff",
                      boxShadow: `0 0 8px ${pair[1].code}66`,
                      zIndex: 2,
                    }} />
                    {/* Connection line */}
                    <div style={{
                      position: "absolute",
                      left: `${(Math.min(v0, v1) / maxVals[idx]) * 100}%`,
                      width: `${(Math.abs(v0 - v1) / maxVals[idx]) * 100}%`,
                      height: 4,
                      top: 2,
                      borderRadius: 2,
                      background: `linear-gradient(90deg, ${pair[0].code}, ${pair[1].code})`,
                    }} />
                  </div>
                </div>
              );
            })}

            {/* Contrast Ratios */}
            <h3 style={{
              fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
              margin: "28px 0 16px",
            }}>접근성 · 대비</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { label: "vs White", bg: "#FFFFFF" },
                { label: "vs Black", bg: "#000000" },
                { label: "서로 간", bg: null },
              ].map(({ label, bg }) => (
                <div key={label} style={{
                  padding: "14px 12px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>{label}</div>
                  {bg !== null ? (
                    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                      {pair.map((p, pi) => {
                        const cr = contrastRatio(p.code, bg);
                        const pass = parseFloat(cr) >= 4.5;
                        return (
                          <div key={pi}>
                            <div style={{
                              fontSize: 16, fontWeight: 700,
                              color: pass ? "#52B788" : "#e57373",
                              fontFamily: "monospace",
                            }}>{cr}</div>
                            <div style={{
                              fontSize: 9, marginTop: 2,
                              color: pass ? "rgba(82,183,136,0.7)" : "rgba(229,115,115,0.7)",
                            }}>{pass ? "AA Pass" : "AA Fail"}</div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        fontSize: 16, fontWeight: 700,
                        color: "#fff",
                        fontFamily: "monospace",
                      }}>{contrastRatio(pair[0].code, pair[1].code)}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Text Preview */}
            <h3 style={{
              fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
              margin: "28px 0 16px",
            }}>텍스트 미리보기</h3>

            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {["#FFFFFF", "#F5F5F5", "#1A1A1A", "#000000"].map(bg => (
                <button key={bg} onClick={() => setTextPreview(bg)} style={{
                  width: 28, height: 28, borderRadius: 8, border: textPreview === bg ? "2px solid #52B788" : "2px solid rgba(255,255,255,0.1)",
                  background: bg, cursor: "pointer",
                  transition: "border-color 0.2s ease",
                }} />
              ))}
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10,
            }}>
              {pair.map((p, pi) => (
                <div key={pi} style={{
                  padding: 20, borderRadius: 14, background: textPreview,
                }}>
                  <p style={{ color: p.code, fontSize: 20, fontWeight: 700, margin: "0 0 4px", fontFamily: "'Playfair Display', serif" }}>
                    {p.name}
                  </p>
                  <p style={{ color: p.code, fontSize: 13, margin: "0 0 8px", lineHeight: 1.6 }}>
                    Electric Garden 팔레트의<br />중간 톤 컬러입니다
                  </p>
                  <p style={{ color: p.code, fontSize: 10, margin: 0, opacity: 0.7 }}>
                    Aa Bb Cc 12345 가나다라
                  </p>
                </div>
              ))}
            </div>

            {/* Gradient */}
            <h3 style={{
              fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
              margin: "28px 0 16px",
            }}>그라디언트 조합</h3>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                `linear-gradient(135deg, ${pair[0].code}, ${pair[1].code})`,
                `linear-gradient(90deg, ${pair[0].code}, ${pair[1].code})`,
                `radial-gradient(circle at 30% 50%, ${pair[0].code}, ${pair[1].code})`,
              ].map((grad, gi) => (
                <div key={gi} style={{
                  flex: 1, height: 64, borderRadius: 12,
                  background: grad,
                }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full palette strip */}
      <div style={{
        maxWidth: 780, margin: "0 auto",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.6s ease 0.5s",
      }}>
        <h3 style={{
          fontSize: 13, fontWeight: 600, letterSpacing: "0.06em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.25)",
          textAlign: "center", margin: "0 0 12px",
        }}>전체 팔레트</h3>
        <div style={{ display: "flex", height: 48, borderRadius: 14, overflow: "hidden" }}>
          {COLORS.map((c) => (
            <div key={c.name} style={{
              flex: 1, background: c.code,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 8, fontWeight: 600,
              color: relativeLuminance(c.code) > 0.3 ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.8)",
              letterSpacing: "0.04em",
            }}>
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
