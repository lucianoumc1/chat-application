import { useContext, useState } from "react"
import { FirebaseContext } from "../../FirebaseContext"
import "./Login.css"

export function Login() {
  const { logIn, logOut, userState } = useContext(FirebaseContext);

  return (
    <div className="buttons__container">
      { userState
      ?<button type="button" className="btn-log--out" onClick={logOut} >Cerrar Sesion</button>
      :<button type="button" className="btn-log--in" onClick={logIn}>Iniciar Sesion</button>
      }
    </div>
  )
}