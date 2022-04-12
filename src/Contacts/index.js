import {User} from "./User"
import {SearchBar} from "./SearchBar"
import "./Contact.css"
import { useContext } from "react"
import { FirebaseContext } from "../FirebaseContext"
import { Chat } from "./Chat"

export function Contact() {
  const { chatState, userState } = useContext(FirebaseContext);

  // chatState.sender_id && contarChats(chatState)
  // const funcionDePrueba = (user, arrayDeMensajes) => {
  //   const nuevoarray = arrayDeMensajes
  //   .map(el => el.sender_id)
  //   .filter( (item, index, array) => array.indexOf(item) === index & item !== user )
  //   console.log(nuevoarray)
  // }
  const arrayDeUsuarios = (arrayDeMensajes) => {
    let arrayProvisorio = [];
    arrayDeMensajes.forEach( el => {
      !arrayProvisorio.includes(el.receiver_id) && arrayProvisorio.push(el.receiver_id)
      !arrayProvisorio.includes(el.sender_id) && arrayProvisorio.push(el.sender_id)
    })
    return arrayProvisorio
  }

  return(
    <div className="contact__container">
      <User/>
      <SearchBar/>
      {arrayDeUsuarios(chatState).map( el => (<Chat name={el}/>))}
    </div>
  )
}