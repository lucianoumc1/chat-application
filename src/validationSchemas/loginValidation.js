import * as Yup from "yup";
import { useFormik } from "formik";
import { signInWithEmail } from "../services/authService";

export default function loginValidation() {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(24).required(),
  });

  const onSubmit = signInWithEmail;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false,
  });
  return formik;
}
