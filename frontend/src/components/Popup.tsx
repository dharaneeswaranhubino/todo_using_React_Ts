import { useEffect } from "react";

interface PopupProps {
  message: string;
  type: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
}

const Popup = ({ message, type, isVisible, onClose }: PopupProps) => {
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`popup popup-${type}`}>
      <div className="popup-content">
        <span className="popup-icon">
          {type === "success" && ""}
          {type === "error" && ""}
          {type === "info" && ""}
        </span>
        <p className="popup-message">{message}</p>
        <button className="popup-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default Popup;