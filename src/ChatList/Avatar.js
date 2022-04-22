import "./ChatList.css";

export function Avatar(props) {
  return (
    <div className="avatar" style={{ backgroundImage: `url(${props.uImage})` }}></div>
  );
}
