import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { query, doc, setDoc } from "firebase/firestore";
import { Auth, db } from "../contexts/FirebaseContext/FirebaseApp";

export default function authWithEmailAndPassword() {
  const saveUser = (user) => {
    const userId = user.email.split(/@/)[0];

    const querySaveChat = query(doc(db, "users", user.uid));
    const docData = {
      id: user.uid,
      user_name: user.name,
      user_id: userId,
      avatar: user.avatar,
    };
    setDoc(querySaveChat, docData)
      .then((res) => console.log(res))
      .catch((e) => console.error(e.message));
  };

  const createUser = (data) => {
    createUserWithEmailAndPassword(Auth, data.email, data.password)
      .then((userCredential) => {
        const { user } = userCredential;
        const newData = { ...data, uid: user.uid };
        saveUser(newData);
        return user;
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  };

  const signIn = (data) => {
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

  return { createUser, signIn };
}
