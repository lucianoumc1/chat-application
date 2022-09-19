import "./LoginWithGithub.css";

import { GithubAuthProvider } from "firebase/auth";
import { logInWithPopup } from "../../services/authService";

export function LoginWithGithub() {
  const githubProvider = new GithubAuthProvider();

  return (
    <button
      className="login-with-github__container"
      type="button"
      onClick={() => logInWithPopup(githubProvider)}
    >
      <span className="login-with-github__logo" />
      Sign in with Github
    </button>
  );
}
