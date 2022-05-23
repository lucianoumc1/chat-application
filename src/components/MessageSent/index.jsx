import "./MessageSent.css";

export function MessageSent({ message }) {
  return (
    <div className="message-sent__container">
      <div className="message-sent__item">
        <p>{message}</p>
      </div>
    </div>
  );
}
