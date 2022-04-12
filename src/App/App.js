import './App.css';
import {Header} from "../Header";
import {FirebaseProvider} from "../FirebaseContext";
import { Contact } from "../Contacts";
import { Chat } from  "../Chat"


function App() {
  return (
    <div className="App">
      <FirebaseProvider>
       <Header/>
       <main>
        <Contact/>
        <Chat/>
       </main>
      </FirebaseProvider>
    </div>
  );
}

export default App;
