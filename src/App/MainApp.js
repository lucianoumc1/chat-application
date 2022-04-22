import { useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";
import { ChatList } from "../ChatList";
import { Chat } from "../Chat";
import { LoginWithGoogle } from "../LoginWithGoogle";

export function MainApp() {
  const { account } = useContext(FirebaseContext);

  return (
    <main className="main-app">
      {(!account && <LoginWithGoogle />) || (
        <>
          <ChatList />
          <Chat />
        </>
      )}
    </main>
  );
}
