import "./LoginWithGithub.css";

import { GithubAuthProvider } from "firebase/auth";
import authWithPopup from "../../services/authWithPopup";

export function LoginWithGithub() {
  const { logIn } = authWithPopup();
  const githubProvider = new GithubAuthProvider();

  return (
    <button
      className="login-with-github__container"
      type="button"
      onClick={() => logIn(githubProvider)}
    >
      <span className="login-with-github__logo" />
      Sign in with Github
    </button>
  );
}
