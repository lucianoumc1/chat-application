import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import { FirebaseProvider } from "./FirebaseContext";


ReactDOM.render(
  <>
    <FirebaseProvider>
      <App />
    </FirebaseProvider>
  </>,
  document.getElementById('root')
);

