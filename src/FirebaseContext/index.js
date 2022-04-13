import {Auth, FirebaseApp} from "./FirebaseApp";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from "firebase/firestore";
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
  const logIn = () => {
    signInWithPopup(Auth, provider)
      .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(token)
      console.log(user)
      console.log(credential)
      })
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(errorMessage)
  })}

  const logOut = () => {
    signOut(Auth)
      .then(() => {
        console.log("Sesion cerrada con exito")
       }).catch((error) => {
        console.log(`No se pudo cerrar la sesion correctamente Error:${error.message}`)
      });
  } 


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

const saveMessage = async(chatId, userId, message) => {
  const querySaveMessage = query(collection(db, "chats", chatId,"Messages"))
  const timeNow = Date.now()
  const messageDoc = {
    sender_id: userId,
    text: message,
    timestamp: timeNow,
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
  const [ chatIdState, setChatIdState ] = useState("4XYRoDLCuXXPH1vjje0o")
  const [ messagesState, setMessagesState ] = useState([])
  const queryGetMessages = query(collection(db, "chats", chatIdState, "Messages"), orderBy("timestamp","asc"))
  
  useEffect( () => {
    const unsub = onSnapshot(queryGetMessages, (querySnapshot) => {
      const newMessages = [];
      querySnapshot.forEach( doc => {
        newMessages.push(doc.data())
      })
      setMessagesState(newMessages);
      console.log(newMessages);
    });
  }, [chatIdState])

// TRAER CHATS EN TIEMPO REAL
  const [ chatState, setChatState ] = useState([]);

  useEffect( () => {
    const queryMessages = query(collection(db,"chats"))
    const unsub = onSnapshot(queryMessages, (querySnapshot) => {
      const newChats = [];
      querySnapshot.forEach( doc => {
        const array = doc.data().users
        const userChat = doc.data().users.filter( el => el !== "lucianoumc1" )[0]
        array.includes("lucianoumc1") && newChats.push({id: doc.id, user:userChat })
      })
      setChatState(newChats);
      console.log(newChats)
    });
  }, [])

  return (
    <FirebaseContext.Provider value={{
      logIn,
      logOut,
      userState,
      saveChat,
      saveMessage,
      chatState,
      setChatIdState,
      chatIdState,
      messagesState,
    }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}