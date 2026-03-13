import { useState, useEffect } from "react";

/**
 * Modal - LEAFIT design system center modal
 *
 * Props:
 *   open         - boolean, controls visibility
 *   onClose      - callback on close / overlay tap
 *   title        - modal title (Off Black, Bold)
 *   description  - body text
 *   confirmText  - primary action button label (default "확인")
 *   cancelText   - cancel text button label (default "취소")
 *   onConfirm    - primary action callback
 *   showCancel   - show cancel text button (default true)
 *   children     - custom body content (overrides description)
 */
export default function Modal({
  open = false,
  onClose,
  title,
  description,
  confirmText = "\uD655\uC778",
  cancelText = "\uCDE8\uC18C",
  onConfirm,
  showCancel = true,
  children,
}) {
  const [animState, setAnimState] = useState("closed");

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
      setTimeout(() => setAnimState("closed"), 250);
    }
  }, [open]);

  if (animState === "closed") return null;

  const isVisible = animState === "open" || animState === "opening";

  const handleConfirm = () => {
    onConfirm && onConfirm();
    onClose && onClose();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 1100,
    }}>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.314)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
      />

      {/* Modal card */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "min(320px, calc(100% - 48px))",
        background: "#F7F5F0",
        borderRadius: 20,
        boxShadow: "0 16px 48px rgba(0, 0, 0, 0.15)",
        padding: "28px 24px 20px",
        animation: isVisible
          ? "eg-scale-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
          : "eg-scale-out 0.2s ease forwards",
      }}>
        {/* Title */}
        {title && (
          <div style={{
            fontSize: 18,
            fontWeight: 700,
            color: "#111111",
            fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
            marginBottom: 8,
            textAlign: "center",
          }}>
            {title}
          </div>
        )}

        {/* Description or children */}
        {children ? (
          <div style={{ marginBottom: 20 }}>{children}</div>
        ) : description ? (
          <div style={{
            fontSize: 13,
            color: "#666666",
            fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
            lineHeight: 1.6,
            textAlign: "center",
            marginBottom: 20,
          }}>
            {description}
          </div>
        ) : null}

        {/* Actions */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}>
          {/* Primary action - Lime bg */}
          <button
            onClick={handleConfirm}
            style={{
              width: "100%",
              padding: "13px 0",
              background: "#BEFF0A",
              color: "#1A3C20",
              border: "none",
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              transition: "transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onPointerDown={(e) => { e.currentTarget.style.transform = "scale(0.95)"; }}
            onPointerUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            onPointerLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            {confirmText}
          </button>

          {/* Cancel - text only */}
          {showCancel && (
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "10px 0",
                background: "none",
                border: "none",
                fontSize: 13,
                fontWeight: 500,
                color: "#999999",
                fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
