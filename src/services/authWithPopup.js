import { signInWithPopup, signOut } from "firebase/auth";
import { Auth } from "../contexts/FirebaseContext/FirebaseApp";

export default function authWithPopup() {
  const logIn = (provider) => signInWithPopup(Auth, provider);

  const logOut = () => signOut(Auth);

  return { logIn, logOut };
}
