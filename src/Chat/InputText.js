import { useContext, useState } from "react";
import { FirebaseContext } from "../FirebaseContext";
import "./Chat.css";

export function InputText() {
  const { saveMessage, chatId } = useContext(FirebaseContext);
  const [messageText, setMessageText] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    saveMessage(chatId, messageText);
    setMessageText("");
  };

  return (
    <form className="input__container" onSubmit={sendMessage}>
      <input
        className="input_text"
        type="text"
        placeholder="Escribe un mensaje aqui"
        value={messageText}
        onChange={(ev) => setMessageText(ev.target.value)}
      />
      <input className="input_submit" type="submit" value=">" />
    </form>
  );
}
