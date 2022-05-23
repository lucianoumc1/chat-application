import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { Avatar } from "../Avatar";
import "./ChatItem.css";

export function ChatItem(props) {
  const { setChatId } = useContext(FirebaseContext);

  return (
    <div className="chat-item__container" onClick={() => setChatId(props)}>
      <Avatar uImage={props.uImage} />
      <span>{props.name}</span>
    </div>
  );
}
