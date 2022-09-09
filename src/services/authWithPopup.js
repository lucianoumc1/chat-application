import { signInWithPopup, signOut } from "firebase/auth";
import { query, doc, setDoc } from "firebase/firestore";
import { Auth, db } from "../contexts/FirebaseContext/FirebaseApp";

export default function authWithPopup() {
  const saveUser = (user) => {
    const querySaveChat = query(doc(db, "users", user.uid));
    const docData = {
      id: user.uid,
      user_name: user.displayName,
      user_id: user.email.replace("@gmail.com", ""),
      avatar: user.reloadUserInfo.photoUrl,
    };
    setDoc(querySaveChat, docData).catch((e) => console.error(e.message));
  };

  const logIn = (provider) =>
    signInWithPopup(Auth, provider).then((result) => {
      const { user } = result;
      saveUser(user);
    });

  const logOut = () => signOut(Auth);

  return { logIn, logOut };
}
