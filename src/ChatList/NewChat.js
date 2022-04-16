import { useState, useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";
import "./ChatList.css";

export function NewChat() {
  const { saveChat, userState } = useContext(FirebaseContext);
  const [newChatUser, setNewChatUser] = useState();

  const createNewChat = (e) => {
    e.preventDefault();
    const userName = userState.email.replace("@gmail.com", "");
    saveChat(userName, newChatUser);
    setNewChatUser("");
  };

  return (
    <form className="new-chat__container" onSubmit={createNewChat}>
      <img src="" />
      <input
        className="new-chat__input-text"
        type="text"
        placeholder="Enviar Mensaje"
        value={newChatUser}
        onChange={(ev) => setNewChatUser(ev.target.value)}
      />
      <input className="new-chat__input-submit" type="submit" />
    </form>
  );
}
