import "./ChatList.css";

export function Avatar(props) {
  return (
    <div className="avatar" styles={{ backgroundImage: `url(${props.image})` }}></div>
  );
}
