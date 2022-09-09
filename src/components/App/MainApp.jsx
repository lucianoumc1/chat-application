import { useContext } from "react";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import { ChatsList } from "../ChatsList";
import { ChatRoom } from "../ChatRoom";
// import Login from "../views/Login";
import Register from "../views/Register";

export function MainApp() {
  const { account } = useContext(FirebaseContext);

  return (
    <main className="main-app">
      {(!account && <Register />) || (
        <>
          <ChatsList />
          <ChatRoom />
        </>
      )}
    </main>
  );
}
