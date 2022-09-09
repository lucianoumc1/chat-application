import "./UserProfile.css";

import { useContext } from "react";
import { Avatar } from "../Avatar";
import { Menu } from "../Menu";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import authWithPopup from "../../services/authWithPopup";

export function UserProfile() {
  const { account } = useContext(FirebaseContext);
  const { logOut } = authWithPopup();
  return (
    <div className="user__container">
      <Avatar uImage={account.avatar} />
      <h4 className="user-nickname">{account.user_id}</h4>
      <Menu>
        <li>
          <button type="button" onClick={logOut}>
            Log Out
          </button>
        </li>
      </Menu>
    </div>
  );
}
