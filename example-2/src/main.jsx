import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import React from "react";

let counter = 1;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// setInterval(() => {
//   refresh();
//   counter += 1;
// }, 1000);
