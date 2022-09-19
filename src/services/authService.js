import {
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { query, doc, setDoc, getDoc } from "firebase/firestore";
import { Auth, db } from "../contexts/FirebaseContext/FirebaseApp";

const getUser = async (userId) => {
  const docRef = query(doc(db, "users", userId));
  const userData = await getDoc(docRef);
  return userData.data();
};

const saveUserWithService = (user) => {
  const userId = user.email.split(/@/)[0];
  const avatarDefault =
    "https://firebasestorage.googleapis.com/v0/b/chat-app-e12e1.appspot.com/o/avatars%2Fuser-undefined.png?alt=media&token=af0f50e0-f06c-4edc-b9fb-da37c1325d3f";

  const querySaveChat = query(doc(db, "users", user.uid));
  const docData = {
    id: user.uid,
    user_name: user.displayName,
    user_id: userId,
    avatar: avatarDefault,
  };
  return setDoc(querySaveChat, docData)
    .then(() => getUser(user.uid))
    .catch((e) => console.error(e.message));
};

const logInWithPopup = (provider) => signInWithPopup(Auth, provider);

const logOut = () => signOut(Auth);

const saveUserWithEmail = (user) => {
  const userId = user.email.split(/@/)[0];

  const querySaveChat = query(doc(db, "users", user.uid));
  const docData = {
    id: user.uid,
    user_name: user.name,
    user_id: userId,
    avatar: user.avatar,
  };
  setDoc(querySaveChat, docData).catch((e) => console.error(e.message));
};

const createUserWithEmail = (data) => {
  createUserWithEmailAndPassword(Auth, data.email, data.password)
    .then((userCredential) => {
      const { user } = userCredential;
      const newData = { ...data, uid: user.uid };
      saveUserWithEmail(newData);
      return user;
    })
    .catch((error) => {
      console.log(error);
      // ..
    });
};

const signInWithEmail = (data) => {
  signInWithEmailAndPassword(Auth, data.email, data.password)
    .then((userCredential) => {
      const { user } = userCredential;
      return user;
    })

    .catch((error) => {
      console.log(error);
      // ..
    });
};

export {
  logInWithPopup,
  logOut,
  createUserWithEmail,
  signInWithEmail,
  getUser,
  saveUserWithService,
};
