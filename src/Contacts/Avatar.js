import "./Contact.css"
import image from "../img/image.jpg"

export function Avatar() {

  return(
    <div className="avatar" styles={{ backgroundImage:`url(${image})` }}></div>
  )
}