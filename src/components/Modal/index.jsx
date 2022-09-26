import "./Modal.css";
import ReactDOM from "react-dom";

export default function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modal__content">{children}</div>
    </div>,
    document.getElementById("modal")
  );
}
