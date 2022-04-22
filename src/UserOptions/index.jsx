import "./UserOptions.css";
import { useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";

export function UserOptions() {
  const { logOut } = useContext(FirebaseContext);
  return(
    <div className="options__container">
      <ul>
        <li>think</li>
        <li>Config</li>
        <li onClick={logOut}>Log out</li>
      </ul>
    </div>
  )
}