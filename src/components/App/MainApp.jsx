import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { ChatsList } from "../ChatsList";
import { ChatRoom } from "../ChatRoom";
import { LoginWithGoogle } from "../LoginWithGoogle";

export function MainApp() {
  const { account } = useContext(FirebaseContext);

  return (
    <main className="main-app">
      {(!account && <LoginWithGoogle />) || (
        <>
          <ChatsList />
          <ChatRoom />
        </>
      )}
    </main>
  );
}
