import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  serverTimestamp,
  doc,
  getDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, db } from "./FirebaseApp";

export const FirebaseContext = createContext();
export function FirebaseProvider({ children }) {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  // AGREEGAR USUARIOS
  const getUser = async (user) => {
    const docRef = query(doc(db, "users", user));
    const userData = await getDoc(docRef);
    return userData.data();
  };

  useEffect(() => {
    onAuthStateChanged(Auth, async (user) => {
      if (user) {
        getUser(user.uid)
          .then((data) => data && setAccount(data))
          .then(() => navigate("/"));
      } else {
        setAccount(null);
      }
    });
  }, []);

  // chat functions

  const saveChat = (contactUid) => {
    const docRef = query(collection(db, "chats"));
    const docData = {
      timestamp: serverTimestamp(),
      users: [account.id, contactUid],
    };
    addDoc(docRef, docData).catch((err) => console.error(err.message));
  };

  const updateChat = (chatId) => {
    const docRef = query(doc(db, "chats", chatId));
    const docData = { timestamp: serverTimestamp() };
    updateDoc(docRef, docData).catch((err) => console.error(err.message));
  };

  const saveMessage = (chatId, message) => {
    updateChat(chatId);
    const docRef = query(collection(db, "chats", chatId, "Messages"));
    const docData = {
      sender_id: account.id,
      text: message,
      timestamp: serverTimestamp(),
      state: false,
    };
    addDoc(docRef, docData).catch((err) => console.error(err.message));
  };

  // Get
  const userExists = async (contactUserName) => {
    const docRef = query(
      collection(db, "users"),
      where("user_id", "==", contactUserName)
    );
    const docSnap = await getDocs(docRef);
    const result = [];
    docSnap.forEach((snap) => result.push(snap.id));
    const fetchingUser = result.length ? result : null;
    return fetchingUser;
  };

  // Get Messages in realtime
  const [chatId, setChatId] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      const queryGetMessages = query(
        collection(db, "chats", chatId.id, "Messages"),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(queryGetMessages, (querySnapshot) => {
        const newMessages = [];
        querySnapshot.forEach((snap) => {
          newMessages.push({ ...snap.data(), id: snap.id });
        });
        setChatMessages(newMessages);
      });

      return () => unsubscribe && unsubscribe();
    } catch (e) {
      setChatMessages([]);
    }
  }, [chatId]);

  return (
    <FirebaseContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        account,
        saveChat,
        saveMessage,
        setChatId,
        userExists,
        chatId,
        chatMessages,
        db,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
