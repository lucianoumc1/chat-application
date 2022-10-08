import "./MessageSendingForm.css";

import { useContext, useState } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { saveMessage } from "../../services/chatsService";

export function MessageSendingForm() {
  const { chatId, account } = useContext(FirebaseContext);
  const [messageText, setMessageText] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    saveMessage(chatId.id, messageText, account.id);
    setMessageText("");
  };

  return (
    <form className="message-form__container" onSubmit={sendMessage}>
      <input
        className="message-form__input--text"
        type="text"
        placeholder="Write a message here"
        value={messageText}
        onChange={(ev) => setMessageText(ev.target.value)}
      />
    </form>
  );
}
