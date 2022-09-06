import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Auth } from "../contexts/FirebaseContext/FirebaseApp";

export default function authWithEmailAndPassword() {
  const createUser = (data) => {
    createUserWithEmailAndPassword(Auth, data.email, data.password)
      .then((userCredential) => {
        const { user } = userCredential;
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
