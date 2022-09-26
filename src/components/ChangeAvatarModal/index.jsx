import "./ChangeAvatarModal.css";

import { useNavigate } from "react-router-dom";

import Modal from "../Modal";
import SelectAvatar from "../SelectAvatar";
import updateAvatarValidation from "../../validationSchemas/updateAvatarValidation";
import plusIcon from "../../assets/plus-icon.png";

export default function ChangeAvatarModal() {
  const formik = updateAvatarValidation();
  const navigate = useNavigate();

  const navToMain = () => {
    navigate("/");
  };

  return (
    <Modal>
      <div className="change-avatar__container">
        <button
          type="button"
          className="change-avatar__exit-button"
          onClick={navToMain}
        >
          <img src={plusIcon} alt="plus-icon" />
        </button>
        <form className="change-avatar__form" onSubmit={formik.handleSubmit}>
          <SelectAvatar
            avatarValue={formik.values}
            errors={formik.errors.avatar}
          />
          <button type="submit" className="primary-button">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
}
