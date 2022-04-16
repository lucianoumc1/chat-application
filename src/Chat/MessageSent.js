
export function MessageSent(props) {
  return(
    <div className="message__container--sent">
      <div className="container__item--sent">
        <p>{props.message}</p>
      </div>
  </div>
  )
}