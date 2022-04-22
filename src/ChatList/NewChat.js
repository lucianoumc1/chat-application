import { useState, useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";
import "./ChatList.css";

export function NewChat() {
  const { saveChat, userExists } = useContext(FirebaseContext);
  const [contactId, setcontactId] = useState("");

  const createNewChat = async(e) => {
    e.preventDefault();
    if (await userExists(contactId)) {
      saveChat(contactId);
    }else{ alert("Usuario inexistente")}
    setcontactId("");
  };

  return (
    <form className="new-chat__container" onSubmit={createNewChat}>
      <input
        className="new-chat__input-text"
        type="text"
        placeholder="Enviar Mensaje"
        value={contactId}
        onChange={(ev) => setcontactId(ev.target.value)}
      />
      <input className="new-chat__input-submit" type="submit" />
    </form>
  );
}
