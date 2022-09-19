import { useContext, useState, useEffect } from "react";

import {
  query,
  doc,
  getDoc,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { db } from "../contexts/FirebaseContext/FirebaseApp";

export default function chatsHandler() {
  const { account } = useContext(FirebaseContext);

  const [chatList, setChatList] = useState([]);

  const [chatsProfile, setChatsProfile] = useState([]);

  useEffect(() => {
    try {
      const userId = account.id;
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
      setChatList([]);
    }
  }, []);

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
      Promise.all(newChatsProfile).then((response) => {
        setChatsProfile(response);
      });
    } catch (error) {
      setChatsProfile({});
    }
  }, [chatList]);

  return chatsProfile;
}
