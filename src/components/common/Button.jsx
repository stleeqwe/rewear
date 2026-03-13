import { useState } from "react";

/**
 * Button - LEAFIT design system button
 *
 * Props:
 *   variant  - "primary" (Lime bg, Forest text) | "secondary" (Forest bg, Lime text)
 *   full     - boolean, full-width
 *   small    - boolean, compact size
 *   children - button label
 *   onClick  - handler
 *   disabled - boolean
 *   style    - additional inline styles
 */
export default function Button({
  variant = "primary",
  full = false,
  small = false,
  children,
  onClick,
  disabled = false,
  style: customStyle,
  ...rest
}) {
  const [isPressed, setIsPressed] = useState(false);

  const isPrimary = variant === "primary";

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
    fontWeight: 700,
    lineHeight: 1,
    whiteSpace: "nowrap",
    WebkitTapHighlightColor: "transparent",
    transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.15s ease",
    transform: isPressed && !disabled ? "scale(0.95)" : "scale(1)",
    opacity: disabled ? 0.45 : 1,

    // Sizing
    padding: small ? "8px 14px" : "12px 20px",
    borderRadius: 14,
    fontSize: small ? 12 : 14,
    width: full ? "100%" : "auto",

    // Variant colors
    background: isPrimary ? "#BEFF0A" : "#1A3C20",
    color: isPrimary ? "#1A3C20" : "#FFFFFF",

    ...customStyle,
  };

  return (
    <button
      style={baseStyle}
      onClick={disabled ? undefined : onClick}
      onPointerDown={() => !disabled && setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
