import "./UserProfile.css";

import { useContext } from "react";
import { Avatar } from "../Avatar";
import { Menu } from "../Menu";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { logOut } from "../../services/authService";

export function UserProfile() {
  const { account } = useContext(FirebaseContext);
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
