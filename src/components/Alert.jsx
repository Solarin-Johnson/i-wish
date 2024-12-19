import React from "react";
import "./ui.scss"; // Create this CSS file in the same directory
import { X } from "lucide-react";

const Alert = ({ severity = "info", message, onClose }) => {
  const alertClasses = `alert alert-${severity}`;

  return (
    <div className={alertClasses} role="alert">
      <span className="alert-message">{message}</span>
      {onClose && (
        <button onClick={onClose} className="alert-close-button">
          <X />
        </button>
      )}
    </div>
  );
};

export default Alert;
