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
  where,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { createContext, useState, useEffect, cloneElement } from "react";

export const FirebaseContext = createContext();
export const FirebaseProvider = (props) => {
  // Authentification
  const [userState, setUserState] = useState(null);
  onAuthStateChanged(Auth, (user) => {
    user ? setUserState(user) : setUserState(null);
  });

  const provider = new GoogleAuthProvider();

  const logIn = () => {
    signInWithPopup(Auth, provider)
      .then((result) => {
        getUser(result.user);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const logOut = () => signOut(Auth);

  // DataBase
  // Save
  const db = getFirestore(FirebaseApp);

  const saveUser = async (user) => {
    const querySaveChat = query(doc(db, "users", user.uid));
    const userObjet = {
      user_name: user.displayName,
      user_id: user.email.replace("@gmail.com", ""),
      avatar: user.reloadUserInfo.photoUrl,
    };
    try {
      await setDoc(querySaveChat, userObjet);
      console.log("usuario agregado");
    } catch (e) {
      console.error(e.message);
    }
  };

  const saveChat = async (userId1, userId2) => {
    const querySaveChat = query(collection(db, "chats"));
    const chatDoc = { timestamp: serverTimestamp(), users: [userId1, userId2] };
    try {
      await addDoc(querySaveChat, chatDoc);
    } catch (e) {
      console.error(e.message);
    }
  };

  const saveMessage = async (chatId, userId, message) => {
    updateChat(chatId);
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
      saveUser(user);
    }
  };
  // Get Messages in realtime
  const [chatId, setChatId] = useState();
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
      console.error(e.message);
      setChatMessages([]);
    }
  }, [chatId]);

  // get Chats in realtime
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    try {
      const userId = userState.email.replace("@gmail.com", "");
      const queryMessages = query(
        collection(db, "chats"),
        where("users", "array-contains", userId),
        orderBy("timestamp", "desc")
      );
      onSnapshot(queryMessages, (querySnapshot) => {
        const newChats = [];
        querySnapshot.forEach((doc) => {
          const usersList = doc.data().users;
          const chatPartner = usersList.filter((el) => el !== userId)[0];
          newChats.push({ id: doc.id, user: chatPartner });
        });
        setChatList(newChats);
      });
    } catch (e) {
      setChatList([]);
    }
  }, [userState]);

  return (
    <FirebaseContext.Provider
      value={{
        logIn,
        logOut,
        userState,
        saveChat,
        saveMessage,
        setChatId,
        chatId,
        chatList,
        chatMessages,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
