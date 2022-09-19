import "./LoginWithGoogle.css";

import { GoogleAuthProvider } from "firebase/auth";
import { logInWithPopup } from "../../services/authService";

export function LoginWithGoogle() {
  const googleProvider = new GoogleAuthProvider();

  return (
    <button
      className="login-with-google__container"
      type="button"
      onClick={() => logInWithPopup(googleProvider)}
    >
      <span className="login-with-google__logo" />
      Sign in with Google
    </button>
  );
}
