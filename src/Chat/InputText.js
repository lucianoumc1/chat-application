import { useContext, useState } from "react"
import { FirebaseContext } from "../FirebaseContext"
import "./Chat.css"

export function InputText() {
  const { saveMessage, userState, getChat } = useContext(FirebaseContext);
  const [ messageText, setMessageText ] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    saveMessage(userState.uid, messageText )
    setMessageText("");
  }
  const onChangeMessageText = (ev) => {
    const value = ev.target.value
    setMessageText(value)
  }
  
  const leerDatos = () => {
    getChat()
  }
  return(
    <form className="input__container" onSubmit={sendMessage}>
      <input type="text" placeholder="Escribe un mensaje aqui" value={messageText} onChange={onChangeMessageText}/>
      <span onClick={leerDatos}> {`>`} </span>
    </form>
  )
}