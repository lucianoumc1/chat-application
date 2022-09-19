import "./ChatRoom.css";
import { useContext } from "react";
import { MessageSendingForm } from "../MessageSendingForm";
import { MessageReceived } from "../MessageReceived";
import { MessageSent } from "../MessageSent";
import { HeaderChatRoom } from "../HeaderChatRoom";
import { FirebaseContext } from "../../contexts/FirebaseContext";

export function ChatRoom() {
  const { chatMessages, account, chatId } = useContext(FirebaseContext);

  return (
    <div className="chat-room__container">
      {!chatId && (
        <div className="chat-room__cover-default">
          <h2 className="chat-room__title">Welcome!</h2>
          <div className="chat-room__description">
            Send messages to your friends easily. <br /> If you do not have
            contacts try creating a chat with <strong>lucianoumc1</strong>
          </div>
        </div>
      )}

      {chatId && (
        <>
          <HeaderChatRoom uImage={chatId.uImage} userName={chatId.name} />
          <div className="chat-room__messages-container">
            {chatMessages.map(
              (el) =>
                (el.sender_id === account.id && (
                  <MessageSent message={el.text} key={el.id} />
                )) || <MessageReceived message={el.text} key={el.id} />
            )}
          </div>
          <MessageSendingForm />
        </>
      )}
    </div>
  );
}
