import "./ChatList.css";

import { useState } from "react";
import chatsHandler from "../../services/chatsHandler";

import { UserProfile } from "../UserProfile";
import { SearchBar } from "./SearchBar";
import { ChatItem } from "../ChatItem";
import { NewChat } from "../NewChat";

export function ChatsList() {
  const chats = chatsHandler();

  const [chatsFilter, setChatsFilter] = useState("");

  const filterChats = chats.filter((chat) => {
    const nameInLowerCase = chat.userName.toLowerCase();
    return nameInLowerCase.includes(chatsFilter);
  });

  return (
    <div className="chat-list__container">
      <UserProfile />
      <SearchBar chatFilter={chatsFilter} setChatFilter={setChatsFilter} />
      <div className="chat-list__users">
        {filterChats.map((el) => (
          <ChatItem
            name={el.userName}
            id={el.chatId}
            key={el.chatId}
            uImage={el.avatar}
          />
        ))}
      </div>
      <NewChat chats={chats} />
    </div>
  );
}
