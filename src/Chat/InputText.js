import { useContext, useState } from "react";
import { FirebaseContext } from "../FirebaseContext";
import "./Chat.css";

export function InputText() {
  const { saveMessage, chatId, userState } = useContext(FirebaseContext);
  const [messageText, setMessageText] = useState();

  const sendMessage = (e) => {
    e.preventDefault();
    saveMessage(chatId, userState.uid, messageText);
    setMessageText();
  };
  const onChangeMessageText = (ev) => {
    const value = ev.target.value;
    setMessageText(value);
  };

  return (
    <form className="input__container" onSubmit={sendMessage}>
      <input
        className="input_text"
        type="text"
        placeholder="Escribe un mensaje aqui"
        value={messageText}
        onChange={onChangeMessageText}
      />
      <input className="input_submit" type="submit" value=">" />
    </form>
  );
}
