import { useState, useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";
import { Avatar } from "./Avatar";
import plusIcon from "../img/plus-v2.png";
import "./ChatList.css";

export function NewChat() {
  const { saveChat, userExists } = useContext(FirebaseContext);
  const [contactId, setcontactId] = useState("");

  const createNewChat = async (e) => {
    e.preventDefault();
    const userId = await userExists(contactId);
    if (userId) {
      saveChat(userId[0]);
    } else { alert("Usuario inexistente"); }
    setcontactId("");
  };

  return (
    <form className="new-chat__container" onSubmit={createNewChat}>
      <Avatar uImage={plusIcon} />
      <input
        className="new-chat__input-text"
        type="text"
        placeholder="New user"
        value={contactId}
        onChange={(ev) => setcontactId(ev.target.value)}
      />
      {/* <input className="new-chat__input-submit" type="submit" /> */}
    </form>
  );
}
