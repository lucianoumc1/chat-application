import {
  collection,
  addDoc,
  query,
  updateDoc,
  serverTimestamp,
  doc,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../contexts/FirebaseContext/FirebaseApp";
import { useErrorHandler } from "../hooks/useErrorHandler";

const saveChat = (userId, contactUid) => {
  const docRef = query(collection(db, "chats"));
  const docData = {
    timestamp: serverTimestamp(),
    users: [userId, contactUid],
  };
  addDoc(docRef, docData).catch(() =>
    useErrorHandler("server error, please try again later")
  );
};

const updateChat = (chatId) => {
  const docRef = query(doc(db, "chats", chatId));
  const docData = { timestamp: serverTimestamp() };
  updateDoc(docRef, docData).catch(() =>
    useErrorHandler("server error, please try again later")
  );
};

const saveMessage = (chatId, message, userId) => {
  updateChat(chatId);
  const docRef = query(collection(db, "chats", chatId, "Messages"));
  const docData = {
    sender_id: userId,
    text: message,
    timestamp: serverTimestamp(),
    state: false,
  };
  addDoc(docRef, docData).catch(() =>
    useErrorHandler("server error, please try again later")
  );
};

const userExists = async (userName) => {
  const docRef = query(
    collection(db, "users"),
    where("user_id", "==", userName)
  );
  const docSnap = await getDocs(docRef);
  const result = [];
  docSnap.forEach((snap) => result.push(snap.id));
  const fetchingUser = result.length ? result : null;
  return fetchingUser;
};

export { saveChat, saveMessage, userExists };
