import {User} from "./User"
import {SearchBar} from "./SearchBar"
import "./Contact.css"
import { useContext } from "react"
import { FirebaseContext } from "../FirebaseContext"
import { Chat } from "./Chat"

export function Contact() {
  const { chatState, userState } = useContext(FirebaseContext);

  return(
    <div className="contact__container">
      <User/>
      <SearchBar/>
      {chatState.map( el => (<Chat name={el.user} id={el.id} />))}
    </div>
  )
}