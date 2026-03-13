import { useState, useEffect } from "react";

/**
 * BottomSheet - LEAFIT design system bottom sheet
 *
 * Props:
 *   open      - boolean, controls visibility
 *   onClose   - callback on close
 *   title     - optional header title
 *   options   - array of { label, value, icon? } for list selection
 *   onSelect  - callback(value) when an option is tapped
 *   children  - custom content (used if options is not provided)
 *   showCancel - show cancel button (default true)
 *   cancelText - cancel button label (default "취소")
 */
export default function BottomSheet({
  open = false,
  onClose,
  title,
  options,
  onSelect,
  children,
  showCancel = true,
  cancelText = "\uCDE8\uC18C",
}) {
  const [animState, setAnimState] = useState("closed"); // "closed" | "opening" | "open" | "closing"

  useEffect(() => {
    if (open && animState === "closed") {
      setAnimState("opening");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimState("open");
        });
      });
    } else if (!open && (animState === "open" || animState === "opening")) {
      setAnimState("closing");
      setTimeout(() => setAnimState("closed"), 300);
    }
  }, [open]);

  if (animState === "closed") return null;

  const isVisible = animState === "open" || animState === "opening";

  const handleOptionClick = (option) => {
    onSelect && onSelect(option.value);
    onClose && onClose();
  };

  const handleOverlayClick = () => {
    onClose && onClose();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 1000,
    }}>
      {/* Overlay */}
      <div
        onClick={handleOverlayClick}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.314)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Sheet */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#F7F5F0",
        borderRadius: "20px 20px 0 0",
        maxHeight: "80vh",
        overflowY: "auto",
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        {/* Handle bar */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          padding: "12px 0 4px",
        }}>
          <div style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            background: "#E8E5DD",
          }} />
        </div>

        {/* Title */}
        {title && (
          <div style={{
            padding: "8px 20px 12px",
            fontSize: 16,
            fontWeight: 700,
            color: "#111111",
            fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          }}>
            {title}
          </div>
        )}

        {/* Options list */}
        {options && options.length > 0 ? (
          <div style={{ padding: "0 8px" }}>
            {options.map((option, i) => (
              <button
                key={option.value || i}
                onClick={() => handleOptionClick(option)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "14px 12px",
                  background: "none",
                  border: "none",
                  borderBottom: i < options.length - 1 ? "1px solid #E8E5DD" : "none",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#111111",
                  fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                  cursor: "pointer",
                  textAlign: "left",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {option.icon && (
                  <span style={{ fontSize: 18, lineHeight: 1 }}>{option.icon}</span>
                )}
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        ) : (
          /* Custom children content */
          <div style={{ padding: "4px 20px 8px" }}>
            {children}
          </div>
        )}

        {/* Cancel button */}
        {showCancel && (
          <div style={{ padding: "8px 20px 24px" }}>
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "14px 0",
                background: "#E8E5DD",
                border: "none",
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 700,
                color: "#888888",
                fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {cancelText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
