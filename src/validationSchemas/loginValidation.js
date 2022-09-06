import * as Yup from "yup";
import { useFormik } from "formik";
import authWithEmailAndPassword from "../services/authWithEmailAndPassword";

export default function loginValidation() {
  const initialValues = {
    email: "",
    password: "",
  };
  const { signIn } = authWithEmailAndPassword();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(24).required(),
  });

  const onSubmit = (values) => {
    // alert(JSON.stringify(values, null, 2));
    signIn(values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false,
  });
  return formik;
}
