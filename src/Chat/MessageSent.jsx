export function MessageSent({ message }) {
  return (
    <div className="message__container--sent">
      <div className="container__item--sent">
        <p>{message}</p>
      </div>
    </div>
  );
}
