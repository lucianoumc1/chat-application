import "./Login.css";
import { LoginWithGoogle } from "./LoginWithGoogle";

export function Login() {
  return(
  <div className="login-container">
    <form className="login-form__container">
      <h3>LOGIN</h3>
      <input className="login-form__input-text" type="text" placeholder="Email"  />
      <input className="login-form__input-text" type="text" placeholder="Password" />
      <input className="login-form__input-submit" type="submit" value="SEND" />
    </form>
    <LoginWithGoogle/>
  </div>

  )
}