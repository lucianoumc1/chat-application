import { Auth, FirebaseApp } from "./FirebaseApp";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
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

export const FirebaseContext = createContext();
export const FirebaseProvider = (props) => {
  // Authentification
  const [account, setAccount] = useState(null);
  onAuthStateChanged(Auth, (user) => {
    user ? setAccount(user) : setAccount(null);
  });

  const provider = new GoogleAuthProvider();

  const logIn = () => {
    signInWithPopup(Auth, provider)
  };

  useEffect(() => {
    const addUser = async() => {
      const isExist = await getUser(account.uid);
      !isExist && saveUser(account);
    }
    account && addUser()
  }, [account])

  const logOut = () => signOut(Auth);

  // DataBase
  // Save
  const db = getFirestore(FirebaseApp);

  const saveUser = async (user) => {
    const querySaveChat = query(doc(db, "users", user.uid));
    const userObjet = {
      id: user.uid,
      user_name: user.displayName,
      user_id: user.email.replace("@gmail.com", ""),
      avatar: user.reloadUserInfo.photoUrl,
    };
    try {
      await setDoc(querySaveChat, userObjet);
      console.log("usuario agregado a la base de datos");
    } catch (e) {
      console.error(e.message);
    }
  };

  const saveChat = async(contactId) => {
    const querySaveChat = query(collection(db, "chats"));
    
    const userId = account.uid;

    const chatDoc = {
      timestamp: serverTimestamp(),
      users: [userId, contactId],
    };
    try {
      await addDoc(querySaveChat, chatDoc);
    } catch (e) {
      console.error(e.message);
    }
  };

  const saveMessage = async (chatId, message) => {
    updateChat(chatId);
    const userId = account.uid;
    const querySaveMessage = query(collection(db, "chats", chatId, "Messages"));
    const messageDoc = {
      sender_id: userId,
      text: message,
      timestamp: serverTimestamp(),
      state: false,
    };
    try {
      await addDoc(querySaveMessage, messageDoc);
      console.log("Datos guardados con exito");
    } catch (e) {
      console.error(e.message);
    }
  };

  const updateChat = async (chatId) => {
    const queryDoc = query(doc(db, "chats", chatId));
    try {
      await updateDoc(queryDoc, {
        timestamp: serverTimestamp(),
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  // Get
  const getUser = async (user) => {
    const docRef = query(doc(db, "users", user.uid));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("usuario existente");
    } else {
      console.log("usuario NO existe");
      saveUser(user)
    }
  };

  const userExists = async(user) => {
    const docRef = query(collection(db, "users"), where("user_id", "==", user));
    const docSnap = await getDocs(docRef);
    const result = []
    docSnap.forEach( doc => result.push( doc.id))
    const isExist = result.length ? result : null;
    return isExist;
  }

  // Get Messages in realtime
  const [chatId, setChatId] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    try {
      const queryGetMessages = query(
        collection(db, "chats", chatId, "Messages"),
        orderBy("timestamp", "asc")
      );
      onSnapshot(queryGetMessages, (querySnapshot) => {
        const newMessages = [];
        querySnapshot.forEach((doc) => {
          newMessages.push({ ...doc.data(), id: doc.id });
        });
        setChatMessages(newMessages);
      });
    } catch (e) {
      // console.error(e.message);
      setChatMessages([]);
    }
  }, [chatId]);

  return (
    <FirebaseContext.Provider
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
      {props.children}
    </FirebaseContext.Provider>
  );
};
