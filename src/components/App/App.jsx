import "./App.css";
import { Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "../../contexts/FirebaseContext";
import { Header } from "../Header";
import ProtectedRoute from "../ProtectedRoute";
import MainApp from "./MainApp";
import Login from "../views/Login";
import Register from "../views/Register";

function App() {
  return (
    <div className="App">
      <FirebaseProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </FirebaseProvider>
    </div>
  );
}
export default App;
