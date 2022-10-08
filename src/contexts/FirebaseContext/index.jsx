import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth, db } from "./FirebaseApp";
import { getUser, saveUserWithService } from "../../services/authService";
import { useErrorHandler } from "../../hooks/useErrorHandler";

export const FirebaseContext = createContext();

export function FirebaseProvider({ children }) {
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    onAuthStateChanged(Auth, async (user) => {
      if (user) {
        getUser(user.uid)
          .then((userData) => {
            if (!userData) {
              return saveUserWithService(user);
            }
            return userData;
          })
          .then((userData) => {
            setAccount(userData);
          })
          .then(() => {
            navigate("/");
          })
          .catch(() => {
            useErrorHandler("server error, please try again later");
          });
      } else {
        setAccount(null);
      }
    });
  }, []);

  // Get Messages in realtime
  const [chatId, setChatId] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    try {
      const queryGetMessages = query(
        collection(db, "chats", chatId.id, "Messages"),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(queryGetMessages, (querySnapshot) => {
        const newMessages = [];
        querySnapshot.forEach((snap) => {
          newMessages.push({ ...snap.data(), id: snap.id });
        });
        setChatMessages(newMessages);
      });

      return () => unsubscribe && unsubscribe();
    } catch (e) {
      setChatMessages([]);
    }
  }, [chatId]);

  return (
    <FirebaseContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        account,
        setChatId,
        chatId,
        chatMessages,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
