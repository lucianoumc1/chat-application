import * as Yup from "yup";
import { useFormik } from "formik";
import { createUserWithEmail } from "../services/authService";

export default function registerValidation() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(24).required(),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null]),
    avatar: Yup.string().required(),
  });

  const onSubmit = (values) => {
    createUserWithEmail(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false,
  });
  return formik;
}
