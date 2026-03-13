/**
 * Badge - LEAFIT design system badge/pill
 *
 * Props:
 *   status   - "chatting" | "reserved" | "done" (predefined status badges)
 *   text     - custom text (used when status is not provided)
 *   bg       - custom background color
 *   color    - custom text color
 *   style    - additional inline styles
 */

const STATUS_MAP = {
  chatting: {
    bg: "#E8E5DD",
    color: "#888888",
    label: "\uCC44\uD305\uC911",
  },
  reserved: {
    bg: "#FFE566",
    color: "#1A3C20",
    label: "\uC608\uC57D\uC911",
  },
  done: {
    bg: "rgba(77, 255, 166, 0.15)",
    color: "#1A3C20",
    label: "DONE",
  },
};

export default function Badge({
  status,
  text,
  bg,
  color,
  style: customStyle,
  ...rest
}) {
  const preset = status ? STATUS_MAP[status] : null;

  const resolvedBg = bg || (preset ? preset.bg : "#E8E5DD");
  const resolvedColor = color || (preset ? preset.color : "#111111");
  const resolvedText = text || (preset ? preset.label : "");

  const isDone = status === "done";

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: isDone ? 10 : 11,
    fontWeight: 700,
    fontFamily: isDone
      ? "'Outfit', sans-serif"
      : "'Pretendard Variable', 'Pretendard', sans-serif",
    letterSpacing: isDone ? "1.5px" : "0px",
    textTransform: isDone ? "uppercase" : "none",
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    background: resolvedBg,
    color: resolvedColor,
    ...customStyle,
  };

  return (
    <span style={baseStyle} {...rest}>
      {resolvedText}
    </span>
  );
}
