export function MessageReceived({ message }) {
  return (
    <div className="message__container--received">
      <div className="container__item--received">
        <p>{message}</p>
      </div>
    </div>
  );
}
