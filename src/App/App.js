import "./App.css";
import { FirebaseProvider } from "../FirebaseContext";
import { Header } from "../Header";
import { MainApp } from "./MainApp";

function App() {
  return (
    <div className="App">
      <FirebaseProvider>
        <Header />
        <MainApp />
      </FirebaseProvider>
    </div>
  );
}
export default App;
