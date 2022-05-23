import "./Chat.css";
import { useContext } from "react";
import { MessageSendingForm } from "../MessageSendingForm";
import { MessageReceived } from "../MessageReceived";
import { MessageSent } from "../MessageSent";
import { HeaderChatRoom } from "../HeaderChatRoom";
import { FirebaseContext } from "../../contexts/FirebaseContext";

export function ChatRoom() {
  const { chatMessages, account, chatId } = useContext(FirebaseContext);

  return (
    <div className="chat__container">
      <HeaderChatRoom uImage={chatId.uImage} userName={chatId.name} />
      <div className="message-room__message-container">
        {chatId && (
          <>
            {chatMessages.map(
              (el) => (el.sender_id === account.uid && (
                <MessageSent message={el.text} key={el.id} />
              )) || (<MessageReceived message={el.text} key={el.id} />),
            )}
          </>
        )}
      </div>
      <MessageSendingForm />
    </div>
  );
}
