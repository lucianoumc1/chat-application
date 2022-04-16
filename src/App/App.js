import './App.css';
import { useContext } from 'react';
import {FirebaseProvider, FirebaseContext} from "../FirebaseContext";
import {Header} from "../Header";
import { Contact } from "../Contacts";
import { Chat } from  "../Chat"


function App() {
  const { userState } = useContext(FirebaseContext)
  return (
    <div className="App">
      <FirebaseProvider>
       <Header/>
       <main>
         { userState &&  
          <>
            <Contact/>
            <Chat/>
          </>
         }
       </main>
      </FirebaseProvider>
    </div>
  );
}

export default App;
