/* eslint-disable jsx-a11y/label-has-associated-control */
import "../../styles/views.css";

import { Link } from "react-router-dom";

import { LoginWithGoogle } from "../LoginWithGoogle";
import { LoginWithGithub } from "../LoginWithGithub";
import loginValidation from "../../validationSchemas/loginValidation";
import InputText from "../InputText";

export default function Login() {
  const { errors, values, handleChange, handleSubmit } = loginValidation();

  return (
    <div className="view__wrapper">
      <div className="view__container">
        <h3>Login</h3>
        <form className="view__form" onSubmit={handleSubmit}>
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
        <Link to="/register" className="link">
          Create account
        </Link>
        <div className="view__services">
          <LoginWithGoogle />
          <LoginWithGithub />
        </div>
      </div>
    </div>
  );
}
