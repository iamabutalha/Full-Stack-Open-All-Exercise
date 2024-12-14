import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// const promise2 = axios.get("http://localhost:3001/foobar");
// console.log(promise2);

const notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];
