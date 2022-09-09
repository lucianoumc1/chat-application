import "./Menu.css";

export function Menu({ children }) {
  return (
    <div className="options__container">
      <span className="more-options__icon" />
      <ul>{children}</ul>
    </div>
  );
}
