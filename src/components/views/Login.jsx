/* eslint-disable jsx-a11y/label-has-associated-control */
import { LoginWithGoogle } from "../LoginWithGoogle";
import loginValidation from "../../validationSchemas/loginValidation";
import "../../styles/login.css";

export default function Login() {
  const { errors, values, handleChange, handleSubmit } = loginValidation();

  return (
    <div className="login__wrapper">
      <div className="login__container">
        <h3>Login</h3>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="text-field">
            <span>Email</span>
            <input
              type="text"
              id="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="text-field__error-message">{errors.email}</div>
            )}
          </label>
          <label className="text-field">
            <span>Password</span>
            <input
              id="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="text-field__error-message">{errors.password}</div>
            )}
          </label>
          <button type="submit" className="primary-button">
            login
          </button>
        </form>
        <LoginWithGoogle />
      </div>
    </div>
  );
}
