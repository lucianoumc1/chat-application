import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBK6R9T2d0b7ord0VKcC8ExcE5yglDuY30",
  authDomain: "chat-app-e12e1.firebaseapp.com",
  databaseURL: "https://chat-app-e12e1-default-rtdb.firebaseio.com",
  projectId: "chat-app-e12e1",
  storageBucket: "chat-app-e12e1.appspot.com",
  messagingSenderId: "161721113113",
  appId: "1:161721113113:web:639c2b518a49c0204b2888",
};

export const FirebaseApp = initializeApp(firebaseConfig);

export const Auth = getAuth(FirebaseApp);
