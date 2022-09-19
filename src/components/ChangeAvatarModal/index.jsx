import "./ChangeAvatarModal.css";

import Modal from "../Modal";
import SelectAvatar from "../SelectAvatar";

export default function ChangeAvatarModal() {
  return (
    <Modal>
      <div className="change-avatar__container">
        <h1>Change your Avatar</h1>
        <form className="change-avatar__form">
          <SelectAvatar />
          <button type="submit" className="primary-button">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
}
