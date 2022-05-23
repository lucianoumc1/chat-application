import "./MessageReceived.css";

export function MessageReceived({ message }) {
  return (
    <div className="message-received__container">
      <div className="message-received__item">
        <p>{message}</p>
      </div>
    </div>
  );
}
