/* eslint-disable jsx-a11y/label-has-associated-control */
import "../../styles/login.css";

import { LoginWithGoogle } from "../LoginWithGoogle";
import { LoginWithGithub } from "../LoginWithGithub";
import loginValidation from "../../validationSchemas/loginValidation";
import InputText from "../InputText";

export default function Login() {
  const { errors, values, handleChange, handleSubmit } = loginValidation();

  return (
    <div className="login__wrapper">
      <div className="login__container">
        <h3>Login</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <InputText
            placeholder="Email"
            type="text"
            id="email"
            value={values.email}
            onChange={handleChange}
            errorMsj={errors.email ? errors.email : null}
          />
          <InputText
            placeholder="Password"
            type="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            errorMsj={errors.password ? errors.password : null}
          />
          <button type="submit" className="primary-button">
            login
          </button>
        </form>
        <LoginWithGoogle />
        <LoginWithGithub />
      </div>
    </div>
  );
}
