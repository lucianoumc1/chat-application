import "./Chat.css";
import { InputText } from "./InputText";
import { MessageReceived } from"./MessageReceived.js";
import { MessageSent } from"./MessageSent.js";
import { FirebaseContext } from "../FirebaseContext"
import { useContext } from "react";

export function Chat() {
  const { messagesState, userState } = useContext(FirebaseContext)

  return(
    <div className="chat__container">
      {userState && messagesState.map(el => 
      el.sender_id === userState.uid 
      && (<MessageSent message={el.text}></MessageSent>) 
      || (<MessageReceived message={el.text} ></MessageReceived>)
      )}
      <InputText/>
    </div>
  )
}