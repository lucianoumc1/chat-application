import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import "./LoginWithGoogle.css";

export function LoginWithGoogle() {
  const { logIn } = useContext(FirebaseContext);
  return (
    <div className="login-with-google__container" onClick={logIn}>
      <span className="login-with-google__logo" />
      <span className="login-with-google__text">Sign in with Google</span>
    </div>
  );
}
