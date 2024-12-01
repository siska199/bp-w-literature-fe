import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import "./css/responsive.css";
import "./css/chat.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { ModalContextProvider } from "./context/ModalContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <ModalContextProvider>
        <Router>
          <App />
        </Router>
      </ModalContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
