import "./ChatList.css";

import { useState } from "react";
import useGetChats from "../../hooks/useGetChats";

import { UserProfile } from "../UserProfile";
import { SearchBar } from "./SearchBar";
import { ChatItem } from "../ChatItem";
import { NewChat } from "../NewChat";

export function ChatsList() {
  const [chatsFilter, setChatsFilter] = useState("");

  const chats = useGetChats();

  const filterChats = chats.filter((chat) => {
    const nameInLowerCase = chat.userName.toLowerCase();
    return nameInLowerCase.includes(chatsFilter);
  });

  return (
    <div className="chat-list__container">
      <UserProfile />
      <SearchBar chatFilter={chatsFilter} setChatFilter={setChatsFilter} />
      <div className="chat-list__users fancy-scrollbar">
        {filterChats.map((el) => (
          <ChatItem
            name={el.userName}
            id={el.chatId}
            key={el.chatId}
            uImage={el.avatar}
            lastMessage={el.lastMessage}
          />
        ))}
      </div>
      <NewChat chats={chats} />
    </div>
  );
}
