/* eslint-disable react/self-closing-comp */
import "./LoadingSpinner.css";

export function LoadingSpinner({ state = null }) {
  return (
    <div className="icon-state__container">
      {state === "loading" && <div className="icon-state--loading"></div>}
      {state === "success" && <div className="icon-state--done"></div>}
      {state === "error" && <div className="icon-state--error"></div>}
    </div>
  );
}
