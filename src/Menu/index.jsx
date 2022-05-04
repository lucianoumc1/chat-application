import "./Menu.css";
import { MoreOptions } from "../MoreOptionsButton";

export function Menu({ children }) {
  return (
    <div className="options__container">
      <MoreOptions />
      <ul>
        {children}
      </ul>
    </div>
  );
}
