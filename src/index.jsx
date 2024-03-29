import ReactDOM from "react-dom";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
