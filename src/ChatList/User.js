import { Navbar } from "./Navbar";
import { Avatar } from "./Avatar";
import { UserOptions } from "../UserOptions";
import { useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";
import "./ChatList.css";

export function User() {
  const { account } = useContext(FirebaseContext);
  return (
    <div className="user__container">
      <Avatar uImage={account.reloadUserInfo.photoUrl} />
      <h4 className="user-nickname">{account.email.replace("@gmail.com", "")}</h4>
      <UserOptions />
      <Navbar />
    </div>
  );
}
