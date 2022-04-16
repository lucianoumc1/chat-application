import {Auth, FirebaseApp} from "./FirebaseApp";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, updateDoc, serverTimestamp, doc } from "firebase/firestore";
import { createContext, useState, useEffect } from 'react';

export const FirebaseContext = createContext();
export const FirebaseProvider = (props) => {
  
  // Authentification
  const [ userState, setUserState ] = useState(null);
  onAuthStateChanged(Auth, (user) => {
    user
    ? setUserState(user)
    : setUserState(null)
  })

  const provider = new GoogleAuthProvider();
  const logIn = () => signInWithPopup(Auth, provider);
  const logOut = () => signOut(Auth);

// DataBase
const db = getFirestore(FirebaseApp);

const saveChat = async(userId1, userId2) => {
  const querySaveChat = query(collection(db, "chats"))
  const chatDoc = [userId1, userId2]
  try {
    await addDoc(querySaveChat, chatDoc)
  }catch(e){
    console.error(e.message);
  }
}

const updateChat = async(chatId) => {
  const queryDoc = query(doc(db,"chats", chatId))
  try {
    await updateDoc(queryDoc, {
      timestamp: serverTimestamp()
    })
  }
  catch(e){console.error(e.message)}
}

const saveMessage = async(chatId, userId, message) => {
  updateChat(chatId)
  const querySaveMessage = query(collection(db, "chats", chatId,"Messages"))
  const messageDoc = {
    sender_id: userId,
    text: message,
    timestamp: serverTimestamp(),
    state: false
    }
  try {
    await addDoc(querySaveMessage, messageDoc );
    console.log("Datos guardados con exito")
  } catch (e) {
    console.error(e.message);
  }
};

// TRAER MENSAJES EN TIEMPO REAL
  const [ chatIdState, setChatIdState ] = useState()
  const [ messagesState, setMessagesState ] = useState([])
  
  useEffect(() => {
    try{
    const queryGetMessages = query(collection(db, "chats", chatIdState, "Messages"), orderBy("timestamp","desc"))
    onSnapshot(queryGetMessages, (querySnapshot) => {
      const newMessages = [];
      querySnapshot.forEach( doc => {
        newMessages.push(doc.data())
      })
      setMessagesState(newMessages);
    });
    }
    catch(e){
      console.error(e.message);
    }
  }, [chatIdState])

  // TRAER CHATS EN TIEMPO REAL
  const [ chatState, setChatState ] = useState([]);

  useEffect(() => {
    try{
      const userId = userState.email.replace("@gmail.com", "")
      const queryMessages = query(collection(db,"chats"), orderBy("timestamp", "desc"))
      onSnapshot(queryMessages, (querySnapshot) => {
        const newChats = [];
        querySnapshot.forEach( doc => {
          const array = doc.data().users
          const userChat = doc.data().users.filter( el => el !== userId )[0]
          array.includes(userId) && newChats.push({id: doc.id, user:userChat })
        })
        setChatState(newChats);
        console.log(newChats)
      });
    }
    catch(e){
      console.error(e.message);
      setChatState([]);
    }
  },[userState])
  
  return (
    <FirebaseContext.Provider value={{
      logIn,
      logOut,
      userState,
      saveChat,
      saveMessage,
      setChatIdState,
      chatIdState,
      chatState,
      messagesState,
    }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}