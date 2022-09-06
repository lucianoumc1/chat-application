import "./LoginWithGoogle.css";

import { GoogleAuthProvider } from "firebase/auth";
import authWithPopup from "../../services/authWithPopup";

export function LoginWithGoogle() {
  const { logIn } = authWithPopup();
  const googleProvider = new GoogleAuthProvider();

  return (
    <button
      className="login-with-google__container"
      type="button"
      onClick={() => logIn(googleProvider)}
    >
      <span className="login-with-google__logo" />
      Sign in with Github
    </button>
  );
}
