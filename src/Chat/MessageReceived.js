
export function MessageReceived(props) {
  return (
    <div className="message__container--received">
      <div className="container__item--received">
        <p>{props.message}</p>
      </div>
  </div>
  )
}