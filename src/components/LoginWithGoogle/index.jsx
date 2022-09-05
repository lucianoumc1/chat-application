import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import "./LoginWithGoogle.css";

export function LoginWithGoogle() {
  const { logIn } = useContext(FirebaseContext);
  return (
    <button
      className="login-with-google__container"
      type="button"
      onClick={logIn}
    >
      <span className="login-with-google__logo" />
      Sign in with Google
    </button>
  );
}
