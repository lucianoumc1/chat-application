import { useContext } from "react";
import { FirebaseContext } from "../FirebaseContext";
import { Login } from "../Login";
import { ChatList } from "../ChatList";
import { Chat } from "../Chat";

export function MainApp() {
  const { userState } = useContext(FirebaseContext);

  return (
    <main className="main-app">
      {(!userState && <Login />) || (
        <>
          <ChatList />
          <Chat />
        </>
      )}
    </main>
  );
}
