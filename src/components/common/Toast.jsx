import { useState, useEffect, useCallback } from "react";

/**
 * Toast - LEAFIT design system toast notification
 *
 * Props:
 *   message    - text to display
 *   type       - "success" | "error" | "info" (default "info")
 *   visible    - boolean, controls visibility
 *   onDismiss  - callback when toast is dismissed
 *   duration   - auto-dismiss duration in ms (default 2500)
 */
export default function Toast({
  message,
  type = "info",
  visible = false,
  onDismiss,
  duration = 2500,
}) {
  const [animState, setAnimState] = useState("idle"); // "idle" | "in" | "out"

  const dismiss = useCallback(() => {
    setAnimState("out");
    setTimeout(() => {
      setAnimState("idle");
      onDismiss && onDismiss();
    }, 200);
  }, [onDismiss]);

  useEffect(() => {
    if (visible) {
      setAnimState("in");
      const timer = setTimeout(dismiss, duration);
      return () => clearTimeout(timer);
    } else {
      if (animState === "in") {
        dismiss();
      }
    }
  }, [visible, duration, dismiss]);

  if (animState === "idle" && !visible) return null;

  const icon = type === "success"
    ? "\u2713"
    : type === "error"
    ? "\u2715"
    : null;

  const iconColor = type === "success"
    ? "#4DFFA6"
    : type === "error"
    ? "#FF6B6B"
    : "#FFFFFF";

  const isEntering = animState === "in";

  return (
    <div style={{
      position: "fixed",
      bottom: 100,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      animation: isEntering
        ? "eg-toast-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
        : "eg-toast-out 0.2s ease forwards",
      pointerEvents: isEntering ? "auto" : "none",
    }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#1A3C20",
          color: "#FFFFFF",
          padding: "12px 24px",
          borderRadius: 50,
          fontSize: 13,
          fontWeight: 600,
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
          whiteSpace: "nowrap",
          maxWidth: "90vw",
        }}
        onClick={dismiss}
      >
        {icon && (
          <span style={{
            fontSize: 14,
            fontWeight: 800,
            color: iconColor,
            lineHeight: 1,
          }}>
            {icon}
          </span>
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}

/**
 * useToast - hook for easy toast management
 *
 * Usage:
 *   const { toastProps, showToast } = useToast();
 *   showToast("Saved!", "success");
 *   <Toast {...toastProps} />
 */
export function useToast() {
  const [state, setState] = useState({
    visible: false,
    message: "",
    type: "info",
  });

  const showToast = useCallback((message, type = "info") => {
    setState({ visible: true, message, type });
  }, []);

  const toastProps = {
    ...state,
    onDismiss: () => setState((s) => ({ ...s, visible: false })),
  };

  return { toastProps, showToast };
}
