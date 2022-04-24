import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../FirebaseContext";
import {
  query,
  doc,
  getDoc,
  collection,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { User } from "./User";
import { SearchBar } from "./SearchBar";
import { Chat } from "./Chat";
import { NewChat } from "./NewChat";
import "./ChatList.css";
import { async } from "@firebase/util";

export function ChatList() {
  const { db, account } = useContext(FirebaseContext);
  
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    try {
      const userId = account.uid;
      const queryMessages = query(
        collection(db, "chats"),
        where("users", "array-contains", userId),
        orderBy("timestamp", "desc")
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

  // useEffect(() => {
  //   const getUsersProfile = async() => {
  //     // debugger
  //     try{
  //       const arrayDeUsuarios = chatList.map(el => el.user);
  //       const results = []
  //       const docRef = query(collection(db, "users"), where("id", "in", arrayDeUsuarios))
  //       const docSnap = await getDocs(docRef);
  //       docSnap.forEach( doc => {
  //         chatList.map( el => {

  //         })
  //       })
  //       console.log(results)
  //       setChatsProfile(results)
  //     }catch(e){
  //       console.error(e.message);
  //     }
  //   }
  //   getUsersProfile();
  // }, [chatList])

  useEffect(() => {
    try {
      const newChatsProfile = chatList.map(async(user) => {
        const docRef = query(doc(db, "users", user.user));
        const docSnap = await getDoc(docRef);
        const response = docSnap.data();
        console.log(response)
        return {
          chatId: user.id,
          userName: response.user_id,
          avatar: response.avatar,
        };
      });
      Promise.all(newChatsProfile).then((response) =>
        setChatsProfile(response)
      );
    } catch (error) {
      console.error(error.message);
    }
  }, [chatList]);

  return (
    <div className="chat-list__container">
      <User />
      <SearchBar />
      <div className="chat-list__users">
        {chatsProfile.map((el) => (
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
