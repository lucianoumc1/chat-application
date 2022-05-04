import "./ChatList.css";

export function Avatar({ uImage }) {
  return (
    <div className="avatar" style={{ backgroundImage: `url(${uImage})` }} />
  );
}
