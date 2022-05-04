import { useContext, useEffect, useState } from "react";
import {
  query,
  doc,
  getDoc,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { FirebaseContext } from "../FirebaseContext";
import { User } from "./User";
import { SearchBar } from "./SearchBar";
import { Chat } from "./Chat";
import { NewChat } from "./NewChat";
import "./ChatList.css";

export function ChatList() {
  const { db, account } = useContext(FirebaseContext);
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    try {
      const userId = account.uid;
      const queryMessages = query(
        collection(db, "chats"),
        where("users", "array-contains", userId),
        orderBy("timestamp", "desc"),
      );

      onSnapshot(queryMessages, (querySnapshot) => {
        const newChats = [];
        querySnapshot.forEach((res) => {
          const usersList = res.data().users.filter((el) => el !== userId)[0];
          newChats.push({ id: res.id, user: usersList });
        });
        setChatList(newChats);
      });
    } catch (e) {
      console.log("error");
      setChatList([]);
    }
  }, []);

  const [chatsProfile, setChatsProfile] = useState([]);

  useEffect(() => {
    try {
      const newChatsProfile = chatList.map(async (user) => {
        const docRef = query(doc(db, "users", user.user));
        const docSnap = await getDoc(docRef);
        const response = docSnap.data();
        return {
          chatId: user.id,
          userName: response.user_id,
          avatar: response.avatar,
        };
      });
      Promise.all(newChatsProfile)
        .then((response) => setChatsProfile(response));
    } catch (error) {
      console.error(error.message);
    }
  }, [chatList]);

  const [chatFilter, setChatFilter] = useState("");
  const filterChatsProfile = chatsProfile.filter((chat) => chat.userName.toLowerCase().includes(chatFilter));

  return (
    <div className="chat-list__container">
      <User />
      <SearchBar chatFilter={chatFilter} setChatFilter={setChatFilter} />
      <div className="chat-list__users">
        {filterChatsProfile.map((el) => (
          <Chat
            name={el.userName}
            id={el.chatId}
            key={el.chatId}
            uImage={el.avatar}
          />
        ))}
      </div>
      <NewChat />
    </div>
  );
}
