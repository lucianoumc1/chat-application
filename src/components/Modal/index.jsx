import "./Modal.css";
import ReactDOM from "react-dom";

export default function Modal({ children }) {
  document.getElementById("root").style.filter = "blur(2px)";
  document.getElementById("root").style.pointerEvents = "none";

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__content">{children}</div>
    </div>,
    document.getElementById("modal")
  );
}
