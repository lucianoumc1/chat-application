import { useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";
import { Avatar } from "./Avatar";
import "./ChatList.css";

export function Chat(props) {
  const { setChatId } = useContext(FirebaseContext);

  return (
    <div className="chat__item" onClick={() => setChatId(props.id)}>
      <Avatar image={props.image} />
      <span>{props.name}</span>
    </div>
  );
}