import { ChatsList } from "../ChatsList";
import { ChatRoom } from "../ChatRoom";

export default function MainApp() {
  return (
    <main className="main-app">
      <ChatsList />
      <ChatRoom />
    </main>
  );
}
