import { useContext } from "react";
import { Avatar } from "./Avatar";
import { Menu } from "../Menu";
import { FirebaseContext } from "../FirebaseContext";
import "./ChatList.css";

export function User() {
  const { account, logOut } = useContext(FirebaseContext);
  return (
    <div className="user__container">
      <Avatar uImage={account.reloadUserInfo.photoUrl} />
      <h4 className="user-nickname">{account.email.replace("@gmail.com", "")}</h4>
      <Menu>
        <li onClick={logOut}>Log out</li>
      </Menu>
    </div>
  );
}
