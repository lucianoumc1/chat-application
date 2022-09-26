import * as Yup from "yup";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { FirebaseContext } from "../contexts/FirebaseContext";
import { updateUser } from "../services/authService";

export default function updateAvatarValidation() {
  const navigate = useNavigate();
  const { account } = useContext(FirebaseContext);
  const initialValues = {
    avatar: "",
  };

  const validationSchema = Yup.object().shape({
    avatar: Yup.string().required(),
  });

  const onSubmit = (values) => {
    updateUser(values, account.id);
    navigate("/");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange: false,
  });
  return formik;
}
