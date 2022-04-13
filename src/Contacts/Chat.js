import { useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";
import { Avatar } from "./Avatar";
import "./Contact.css"

export function Chat(props) {

  const { setChatIdState } = useContext(FirebaseContext)
  const onSelectChat = () => {
    setChatIdState(props.id)
  }
  return(
    <div className="chat__item" onClick={onSelectChat}>
      <Avatar></Avatar>
      <span>{props.name}</span>
    </div>
  )
}