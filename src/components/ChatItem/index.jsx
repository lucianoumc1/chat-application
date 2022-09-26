import "./ChatItem.css";

import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { Avatar } from "../Avatar";

export function ChatItem(props) {
  const { setChatId } = useContext(FirebaseContext);

  return (
    <div className="chat-item__container" onClick={() => setChatId(props)}>
      <Avatar uImage={props.uImage} />
      <div className="chat-item__chat-info">
        <div className="chat-info__username">
          <span>{props.name}</span>
        </div>
        <div className="chat-info__last-msg">
          <span>{props.lastMessage}</span>
        </div>
      </div>
    </div>
  );
}
