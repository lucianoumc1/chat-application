import * as Yup from "yup";
import { useFormik } from "formik";

export default function loginValidation() {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(24).required(),
  });

  const onSubmit = (values) => {
    alert(JSON.stringify(values, null, 2));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false,
  });
  return formik;
}
