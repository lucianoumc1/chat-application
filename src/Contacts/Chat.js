import { Avatar } from "./Avatar";
import "./Contact.css"

export function Chat(props) {

  return(
    <div className="chat__item">
      <Avatar></Avatar>
      <span>{props.name}</span>
    </div>
  )
}