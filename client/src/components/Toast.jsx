import { useEffect, useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const show = (message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    return id;
  };

  const remove = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, show, remove };
}

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={() => onRemove(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ toast, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 3000);
    return () => clearTimeout(timer);
  }, [onRemove]);

  const icons = {
    success: "✓",
    error: "✕",
    loading: "⟳"
  };

  return (
    <div className={`toast ${toast.type}`}>
      <span className="toast-icon">{toast.type === "loading" ? <span className="spinner" /> : icons[toast.type]}</span>
      <span>{toast.message}</span>
    </div>
  );
}
