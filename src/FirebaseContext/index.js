import {Auth, FirebaseApp} from "./FirebaseApp";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, Query, where} from "firebase/firestore";
import { collection, addDoc, getDocs, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { createContext, useState, useEffect } from 'react';
import { async } from "@firebase/util";

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
  
// OBSERVACIONE = GETDOC { SIRVE PARA RECUPERAR UN DATO EN ESPECIFICO }, GETDOCS { TRAE LA COLECCION COMPLETA }, SETDOC {GUARDA UN DATO CON ID ESPECIFICO}, ADDDOC{ GUARDA UN DATO CON ID AUTOGENERADO }.
const db = getFirestore(FirebaseApp);


const querySave = query(collection(db, "messages"))
const saveMessage = async(userId, message) => {
  const timeNow = Date.now()
  const chatObjet = {
    sender_id: userId,
    receiver_id: userId,
    text: message,
    timestamp: timeNow,
    state: false,
    }
  try {
    await addDoc(querySave, chatObjet );
    console.log("Datos guardados con exito")
  } catch (e) {
    console.error(e.message);
  }
};

// TRAER MENSAJES POR PEDIDO
// useEffect(() => {
  //   const getChats = async() => {
    //     const querySnapshot = await getDocs(queryQuiz);
    //     let mensajes = [];
    //     querySnapshot.forEach((doc) => {
      //       mensajes.push(doc.data());
      //     }); 
      //     // console.log(mensajes);
      //     setChatState(mensajes);
      //   }
      //   getChats()
      // }, [])
      

      // TRAER MENSAJES EN TIEMPO REAL
  const [ chatState, setChatState ] = useState([]);

  useEffect( () => {
    const queryMessages = query(collection(db,"messages"), orderBy("timestamp"))
    const unsub = onSnapshot(queryMessages, (querySnapshot) => {
      const changeMessage = [];
      querySnapshot.forEach((doc) => {
        changeMessage.push(doc.data())
      })
      setChatState(changeMessage);
    });
  }, [])

  return (
    <FirebaseContext.Provider value={{
      logOut,
      logIn,
      userState,
      saveMessage,
      chatState
    }}>
      {props.children}
    </FirebaseContext.Provider>
  )
}