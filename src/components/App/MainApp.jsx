import { ChatsList } from "../ChatsList";
import ChangeAvatarModal from "../ChangeAvatarModal";
import { ChatRoom } from "../ChatRoom";

export default function MainApp({ openModal }) {
  return (
    <main className="main-app">
      {openModal && <ChangeAvatarModal />}
      <ChatsList />
      <ChatRoom />
    </main>
  );
}
