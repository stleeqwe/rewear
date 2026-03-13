import { useState } from "react";

/**
 * Input - LEAFIT design system text input
 *
 * Props:
 *   placeholder - placeholder text
 *   icon        - emoji or node to render on the left
 *   value       - controlled value
 *   onChange    - change handler (receives event)
 *   type        - input type (default "text")
 *   disabled    - boolean
 *   style       - additional container styles
 *   inputStyle  - additional input element styles
 */
export default function Input({
  placeholder = "",
  icon,
  value,
  onChange,
  type = "text",
  disabled = false,
  style: customStyle,
  inputStyle: customInputStyle,
  ...rest
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: isFocused ? "#FFFFFF" : "#F7F5F0",
        border: isFocused
          ? "1.5px solid #1A3C20"
          : "1.5px solid #E8E5DD",
        borderRadius: 12,
        padding: "10px 14px",
        transition: "all 0.2s ease",
        opacity: disabled ? 0.5 : 1,
        ...customStyle,
      }}
    >
      {icon && (
        <span style={{
          fontSize: 16,
          lineHeight: 1,
          flexShrink: 0,
          color: isFocused ? "#1A3C20" : "#AAAAAA",
          transition: "color 0.2s ease",
        }}>
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: 13,
          fontWeight: 400,
          color: "#111111",
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          padding: 0,
          lineHeight: 1.4,
          "::placeholder": { color: "#AAAAAA" },
          ...customInputStyle,
        }}
        {...rest}
      />
    </div>
  );
}
