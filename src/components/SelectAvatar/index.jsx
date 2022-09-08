/* eslint-disable no-param-reassign */
import "./SelectAvatar.css";

export default function SelectAvatar({ avatarValue, errors = null }) {
  // eslint-disable-next-line no-unused-vars

  const avatarUrl =
    "https://firebasestorage.googleapis.com/v0/b/chat-app-e12e1.appspot.com/o/avatars%2F";

  const handleAvatar = (e) => {
    avatarValue.avatar = e.target.value;
  };

  return (
    <div className="select-avatar__container">
      <h4>Select your avatar</h4>
      <div className="select-avatar__wrapper">
        <label htmlFor="avatar1" className="select-avatar__item">
          <input
            type="radio"
            name="avatar"
            id="avatar1"
            value={`${avatarUrl}avatar1.png?alt=media&token=7c5d2874-4227-4260-9e7c-52a6cea94c3f`}
            onChange={(e) => handleAvatar(e)}
          />
          <img
            src={`${avatarUrl}avatar1.png?alt=media&token=7c5d2874-4227-4260-9e7c-52a6cea94c3f`}
            alt="avatar1"
          />
        </label>

        <label htmlFor="avatar2" className="select-avatar__item">
          <input
            type="radio"
            name="avatar"
            id="avatar2"
            value={`${avatarUrl}avatar2.png?alt=media&token=6b9f93c6-583d-445a-8053-3f87c1b10857`}
            onChange={(e) => handleAvatar(e)}
          />
          <img
            src={`${avatarUrl}avatar2.png?alt=media&token=6b9f93c6-583d-445a-8053-3f87c1b10857`}
            alt="avatar2"
          />
        </label>

        <label htmlFor="avatar3" className="select-avatar__item">
          <input
            type="radio"
            name="avatar"
            id="avatar3"
            value={`${avatarUrl}avatar3.png?alt=media&token=d7dad95f-8014-4e1d-b185-706db240ac55`}
            onChange={(e) => handleAvatar(e)}
          />
          <img
            src={`${avatarUrl}avatar3.png?alt=media&token=d7dad95f-8014-4e1d-b185-706db240ac55`}
            alt="avatar3"
          />
        </label>

        <label htmlFor="avatar4" className="select-avatar__item">
          <input
            type="radio"
            name="avatar"
            id="avatar4"
            value={`${avatarUrl}avatar4.png?alt=media&token=6d02d4d9-5262-4522-86da-653289449673`}
            onChange={(e) => handleAvatar(e)}
          />
          <img
            src={`${avatarUrl}avatar4.png?alt=media&token=6d02d4d9-5262-4522-86da-653289449673`}
            alt="avatar4"
          />
        </label>

        <label htmlFor="avatar5" className="select-avatar__item">
          <input
            type="radio"
            name="avatar"
            id="avatar5"
            value={`${avatarUrl}avatar5.png?alt=media&token=395b1f0d-f0ae-46c6-88c6-f8f70eac83c2`}
            onChange={(e) => handleAvatar(e)}
          />
          <img
            src={`${avatarUrl}avatar5.png?alt=media&token=395b1f0d-f0ae-46c6-88c6-f8f70eac83c2`}
            alt="avatar5"
          />
        </label>

        <label htmlFor="avatar6" className="select-avatar__item">
          <input
            type="radio"
            name="avatar"
            id="avatar6"
            value={`${avatarUrl}avatar6.png?alt=media&token=e9a19db8-f147-457d-9ebb-a17ba877df34`}
            onChange={(e) => handleAvatar(e)}
          />
          <img
            src={`${avatarUrl}avatar6.png?alt=media&token=e9a19db8-f147-457d-9ebb-a17ba877df34`}
            alt="avatar6"
          />
        </label>
      </div>
      {errors && <p className="select-avatar__error-message">{errors}</p>}
    </div>
  );
}
