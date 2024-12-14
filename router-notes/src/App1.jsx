import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
  </div>
);
const Notes = () => (
  <div>
    <h2>Notes</h2>
  </div>
);

const Users = () => (
  <div>
    <h2>Users</h2>
  </div>
);

function App1() {
  const padding = {
    padding: 5,
  };
  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>

      <Routes>
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </Router>
  );
}
// function App() {
//   const [page, setPage] = useState("home");

//   const toPage = (page) => (event) => {
//     event.preventDefault();
//     setPage(page);
//   };

//   const content = () => {
//     if (page === "home") {
//       return <Home />;
//     } else if (page === "notes") {
//       return <Notes />;
//     } else if (page === "users") {
//       return <Users />;
//     }
//   };

//   const padding = {
//     padding: 5,
//   };

//   return (
//     <div>
//       <div>
//         <a href="" onClick={toPage("home")} style={padding}>
//           home
//         </a>
//         <a href="" onClick={toPage("notes")} style={padding}>
//           notes
//         </a>
//         <a href="" onClick={toPage("users")} style={padding}>
//           users
//         </a>
//       </div>
//       {content()}
//     </div>
//   );
// }

export default App1;
