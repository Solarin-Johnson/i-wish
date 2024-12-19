import React, { useEffect } from "react";
import "./ui.scss"; // Create this CSS file in the same directory
import { AlertCircle, CircleCheck, Info, TriangleAlert, X } from "lucide-react";

const Alert = ({ message, onClose = () => {}, severity = "" }) => {
  const alertClasses = `alert alert-${severity}`;
  const RightIcon = {
    info: Info,
    success: CircleCheck,
    warning: TriangleAlert,
    error: AlertCircle,
  }[severity];

  useEffect(() => {
    const timeout = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={alertClasses} role="alert">
      <span className="alert-message">{message}</span>
      {onClose && (
        <button onClick={onClose} className="alert-close-button">
          <X size={13} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

export default Alert;
