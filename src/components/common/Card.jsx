/**
 * Card - LEAFIT design system card
 *
 * Props:
 *   variant  - "default" (white, 16px round, card shadow) | "dark" (Smoke bg, 18px round)
 *   children - card content
 *   style    - additional inline styles
 *   onClick  - optional click handler
 */
export default function Card({
  variant = "default",
  children,
  style: customStyle,
  onClick,
  ...rest
}) {
  const isDark = variant === "dark";

  const baseStyle = {
    background: isDark ? "#2A2A2A" : "#FFFFFF",
    borderRadius: isDark ? 18 : 16,
    boxShadow: isDark
      ? "0 8px 24px rgba(0, 0, 0, 0.2)"
      : "0 2px 12px rgba(0, 0, 0, 0.06)",
    padding: 16,
    color: isDark ? "#FFFFFF" : "#111111",
    cursor: onClick ? "pointer" : "default",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    ...customStyle,
  };

  return (
    <div
      style={baseStyle}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
}
