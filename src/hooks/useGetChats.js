import { useContext, useState, useEffect } from "react";

import {
  query,
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { db } from "../contexts/FirebaseContext/FirebaseApp";

export default function useGetChats() {
  const { account } = useContext(FirebaseContext);

  const [chatList, setChatList] = useState([]);

  const [chatsProfile, setChatsProfile] = useState([]);

  const getLastMessage = async (chatId) => {
    const docRef = query(
      collection(db, "chats", chatId, "Messages"),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    const docSnap = await getDocs(docRef);
    return docSnap?.docs[0]?.data()?.text || "";
  };

  const getChatProfile = async (user) => {
    const docRef = query(doc(db, "users", user));
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };

  const getChatsData = async (list) => {
    const newChatsProfile = list.map(async (user) => {
      const chatProfile = await getChatProfile(user.user);

      const lastMessage = await getLastMessage(user.id);

      return {
        chatId: user.id,
        userName: chatProfile.user_id,
        avatar: chatProfile.avatar,
        lastMessage,
      };
    });
    return Promise.all(newChatsProfile);
  };

  const getChatList = () => {
    const userId = account.id;
    const queryMessages = query(
      collection(db, "chats"),
      where("users", "array-contains", userId),
      orderBy("timestamp", "desc")
    );

    onSnapshot(queryMessages, (querySnapshot) => {
      const newChats = [];
      querySnapshot.forEach((res) => {
        const usersList = res.data()?.users.filter((el) => el !== userId)[0];
        newChats.push({ user: usersList, id: res.id });
      });
      setChatList(newChats);
    });
  };

  useEffect(() => {
    getChatList();
  }, []);

  useEffect(() => {
    getChatsData(chatList).then((res) => {
      setChatsProfile(res);
    });
  }, [chatList]);

  return chatsProfile;
}
