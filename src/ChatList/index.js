import { User } from "./User";
import { SearchBar } from "./SearchBar";
import { useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";
import { Chat } from "./Chat";
import { NewChat } from "./NewChat";
import image from "../img/image.jpg";
import "./ChatList.css";

export function ChatList() {
  const { chatList } = useContext(FirebaseContext);
  return (
    <div className="chat-list__container">
      <User />
      <SearchBar />
      <div className="chat-list__users">
        {chatList.map((el) => (
          <Chat name={el.user} id={el.id} key={el.id} image={image} />
        ))}
      </div>
      <NewChat />
    </div>
  );
}
