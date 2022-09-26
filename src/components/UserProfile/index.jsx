import "./UserProfile.css";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar } from "../Avatar";
import { Menu } from "../Menu";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { logOut } from "../../services/authService";

export function UserProfile() {
  const navigate = useNavigate();
  const { account } = useContext(FirebaseContext);
  return (
    <div className="user__container">
      <Avatar uImage={account.avatar} />
      <h4 className="user-nickname">{account.user_id}</h4>
      <Menu>
        <li>
          <button type="button" onClick={() => alert("Coming soon")}>
            New group
          </button>
        </li>
        <li>
          <button type="button" onClick={() => navigate("/change-avatar")}>
            Change avatar
          </button>
        </li>
        <li>
          <button type="button" onClick={logOut}>
            Logout
          </button>
        </li>
      </Menu>
    </div>
  );
}
