import { MoreOptions } from "../MoreOptionsButton";
import "./Menu.css";

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
