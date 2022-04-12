import { Navbar } from "./Navbar";
import { Avatar } from "./Avatar";
import { useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";
import "./Contact.css";

export function User() {
  const { userState } = useContext(FirebaseContext);
  return(
    <div className="user__container">
      <Avatar/>
      <h4 className="user-nickname">{userState && userState.displayName}</h4>
      <Navbar/>
    </div>
  )
}