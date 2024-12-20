import { useEffect } from "react";
import "./ui.scss";

export default function PopOver({ title, children }) {
  return (
    <dialog className="pop-over-container">
      <div className="pop-over">
        {/* <h1>{title}</h1> */}
        {children}
      </div>
    </dialog>
  );
}
