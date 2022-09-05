import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { ChatsList } from "../ChatsList";
import { ChatRoom } from "../ChatRoom";
import Login from "../views/Login";

export function MainApp() {
  const { account } = useContext(FirebaseContext);

  return (
    <main className="main-app">
      {(!account && <Login />) || (
        <>
          <ChatsList />
          <ChatRoom />
        </>
      )}
    </main>
  );
}
