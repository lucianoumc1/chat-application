import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FirebaseContext } from "../../contexts/FirebaseContext";

export default function ProtectedRoute({ children }) {
  const { account } = useContext(FirebaseContext);

  if (!account) {
    return <Navigate to="/login" />;
  }
  return children;
}
