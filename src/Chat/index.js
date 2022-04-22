import "./Chat.css";
import { InputText } from "./InputText";
import { MessageReceived } from "./MessageReceived.js";
import { MessageSent } from "./MessageSent.js";
import { FirebaseContext } from "../FirebaseContext";
import { useContext } from "react";

export function Chat() {
  const { chatMessages, account, chatId } = useContext(FirebaseContext);

  return (
    <div className="chat__container">
      <div className="message-room__message-container">
        {chatId &&
          chatMessages.map(
            (el) =>
              (el.sender_id === account.uid && (
                <MessageSent message={el.text} key={el.id}></MessageSent>
              )) || (
                <MessageReceived
                  message={el.text}
                  key={el.id}
                ></MessageReceived>
              )
          )}
      </div>
      <InputText />
    </div>
  );
}
