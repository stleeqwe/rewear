import { useState } from "react";

/**
 * Chip - LEAFIT design system chip/tag
 *
 * Props:
 *   label    - chip text
 *   active   - boolean, selected state
 *   onClick  - handler
 *   style    - additional inline styles
 */
function Chip({
  label,
  active = false,
  onClick,
  style: customStyle,
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "7px 16px",
        borderRadius: 20,
        border: "none",
        fontSize: 12,
        fontWeight: active ? 700 : 500,
        fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
        cursor: "pointer",
        whiteSpace: "nowrap",
        WebkitTapHighlightColor: "transparent",
        transition: "all 0.15s ease",
        transform: isPressed ? "scale(0.94)" : "scale(1)",

        background: active ? "#2D5A27" : "#E8E5DD",
        color: active ? "#FFFFFF" : "#666666",

        ...customStyle,
      }}
    >
      {label}
    </button>
  );
}

/**
 * ChipGroup - manages single or multi select chips
 *
 * Props:
 *   items     - array of strings or { label, value }
 *   value     - selected value(s): string | string[]
 *   onChange  - callback(selectedValue | selectedValues[])
 *   multiple  - allow multi-select (default false)
 *   style     - container style overrides
 */
function ChipGroup({
  items = [],
  value,
  onChange,
  multiple = false,
  style: customStyle,
}) {
  const normalizedItems = items.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item
  );

  const selectedValues = multiple
    ? Array.isArray(value) ? value : value ? [value] : []
    : [];
  const selectedSingle = multiple ? null : value;

  const handleClick = (itemValue) => {
    if (multiple) {
      const next = selectedValues.includes(itemValue)
        ? selectedValues.filter((v) => v !== itemValue)
        : [...selectedValues, itemValue];
      onChange && onChange(next);
    } else {
      onChange && onChange(itemValue);
    }
  };

  return (
    <div style={{
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      ...customStyle,
    }}>
      {normalizedItems.map((item) => {
        const isActive = multiple
          ? selectedValues.includes(item.value)
          : selectedSingle === item.value;

        return (
          <Chip
            key={item.value}
            label={item.label}
            active={isActive}
            onClick={() => handleClick(item.value)}
          />
        );
      })}
    </div>
  );
}

export default Chip;
export { Chip, ChipGroup };
