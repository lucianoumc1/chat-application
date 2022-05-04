import "./Chat.css";
import { useContext } from "react";
import { InputText } from "./InputText";
import { MessageReceived } from "./MessageReceived";
import { MessageSent } from "./MessageSent";
import { FirebaseContext } from "../FirebaseContext";
import { ChatDetail } from "./ChatDetail";

export function Chat() {
  const { chatMessages, account, chatId } = useContext(FirebaseContext);
  return (
    <div className="chat__container">
      <ChatDetail uImage={chatId.uImage} userName={chatId.name} />
      <div className="message-room__message-container">
        {chatId && (
          <>
            {chatMessages.map(
              (el) =>
                (el.sender_id === account.uid && (
                  <MessageSent message={el.text} key={el.id} />
                )) || <MessageReceived message={el.text} key={el.id} />
            )}
          </>
        )}
      </div>
      <InputText />
    </div>
  );
}
