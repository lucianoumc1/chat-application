import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
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
  setDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { Auth, db } from "./FirebaseApp";

export const FirebaseContext = createContext();
export function FirebaseProvider({ children }) {
  // login whit google

  const provider = new GoogleAuthProvider();

  const [account, setAccount] = useState(null);

  const logIn = () => signInWithPopup(Auth, provider);
  const logOut = () => signOut(Auth);

  const getUser = async (user) => {
    const docRef = query(doc(db, "users", user));
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  const saveUser = (user) => {
    const querySaveChat = query(doc(db, "users", user.uid));
    const docData = {
      id: user.uid,
      user_name: user.displayName,
      user_id: user.email.replace("@gmail.com", ""),
      avatar: user.reloadUserInfo.photoUrl,
    };
    setDoc(querySaveChat, docData)
      .catch((e) => console.error(e.message));
  };

  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        getUser(user.uid)
          .then((data) => !data && saveUser(user));
        setAccount(user);
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
      users: [account.uid, contactUid],
    };
    addDoc(docRef, docData)
      .catch((err) => console.error(err.message));
  };

  const updateChat = (chatId) => {
    const docRef = query(doc(db, "chats", chatId));
    const docData = { timestamp: serverTimestamp() };
    updateDoc(docRef, docData)
      .catch((err) => console.error(err.message));
  };

  const saveMessage = (chatId, message) => {
    updateChat(chatId);
    const docRef = query(collection(db, "chats", chatId, "Messages"));
    const docData = {
      sender_id: account.uid,
      text: message,
      timestamp: serverTimestamp(),
      state: false,
    };
    addDoc(docRef, docData)
      .catch((err) => console.error(err.message));
  };

  // Get
  const userExists = async (contactUserName) => {
    const docRef = query(collection(db, "users"), where("user_id", "==", contactUserName));
    const docSnap = await getDocs(docRef);
    const result = [];
    docSnap.forEach((snap) => result.push(snap.id));
    const fetchingUser = result.length ? result : null;
    return fetchingUser;
  };

  // Get Messages in realtime
  const [chatId, setChatId] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    try {
      const queryGetMessages = query(
        collection(db, "chats", chatId.id, "Messages"),
        orderBy("timestamp", "asc"),
      );
      onSnapshot(queryGetMessages, (querySnapshot) => {
        const newMessages = [];
        querySnapshot.forEach((snap) => {
          newMessages.push({ ...snap.data(), id: snap.id });
        });
        setChatMessages(newMessages);
      });
    } catch (e) {
      setChatMessages([]);
    }
  }, [chatId]);

  return (
    <FirebaseContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        logIn,
        logOut,
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
