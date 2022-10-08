import "./NewChat.css";
import { useState, useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { saveChat, userExists } from "../../services/chatsService";
import { Avatar } from "../Avatar";
import plusIcon from "../../assets/plus.png";
import { useErrorHandler } from "../../hooks/useErrorHandler";

export function NewChat({ chats }) {
  const { account } = useContext(FirebaseContext);
  const [contactId, setcontactId] = useState("");

  const alreadyExistsChat = (username) => {
    const exists = chats.find((chat) => chat.userName === username);
    return exists;
  };

  const createNewChat = async (e) => {
    e.preventDefault();
    const userId = await userExists(contactId);
    if (!alreadyExistsChat(contactId) && userId) {
      saveChat(account.id, userId[0]);
    } else {
      useErrorHandler("User does not exist");
    }
    setcontactId("");
  };

  return (
    <form className="new-chat__container" onSubmit={createNewChat}>
      <input
        className="new-chat__input-text"
        type="text"
        placeholder="Create a new chat..."
        value={contactId}
        onChange={(ev) => setcontactId(ev.target.value)}
      />
      <button className="new-chat__submit-btn" type="submit">
        <Avatar uImage={plusIcon} />
      </button>
    </form>
  );
}
