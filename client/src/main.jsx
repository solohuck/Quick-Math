import React from "react";
import ReactDOM from "react-dom/client"; // Correct import path for ReactDOM
import App from "./components/App.jsx";
import "./styles/App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
