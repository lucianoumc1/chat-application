import { useContext, useState } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import "./MessageSendingForm.css";

export function MessageSendingForm() {
  const { saveMessage, chatId } = useContext(FirebaseContext);
  const [messageText, setMessageText] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    saveMessage(chatId.id, messageText);
    setMessageText("");
  };

  return (
    <form className="message-form__container" onSubmit={sendMessage}>
      <input
        className="message-form__input--text"
        type="text"
        placeholder="Escribe un mensaje aqui"
        value={messageText}
        onChange={(ev) => setMessageText(ev.target.value)}
      />
      <input className="message-form__input--submit" type="submit" value=">" />
    </form>
  );
}
