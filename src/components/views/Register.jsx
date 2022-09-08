/* eslint-disable jsx-a11y/label-has-associated-control */
import "../../styles/register.css";

import registerValidation from "../../validationSchemas/registerValidation";
import InputText from "../InputText";
import SelectAvatar from "../SelectAvatar";

export default function Register() {
  const formik = registerValidation();

  return (
    <div className="login__wrapper">
      <div className="login__container">
        <h3>Register</h3>
        <form className="login__form" onSubmit={formik.handleSubmit}>
          <InputText
            placeholder="Full name"
            type="text"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            errorMsj={formik.errors.name ? formik.errors.name : null}
          />
          <InputText
            placeholder="Email"
            type="text"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            errorMsj={formik.errors.email ? formik.errors.email : null}
          />
          <InputText
            placeholder="Password"
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            errorMsj={formik.errors.password ? formik.errors.password : null}
          />
          <InputText
            placeholder="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            errorMsj={
              formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : null
            }
          />
          <SelectAvatar
            avatarValue={formik.values}
            errors={formik.errors.avatar}
          />
          <button type="submit" className="primary-button">
            register
          </button>
        </form>
      </div>
    </div>
  );
}
