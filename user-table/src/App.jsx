import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import UserDetails from "./components/UserDetails.jsx";

function App() {
  return (
    <>
      <Navbar />
      <UserDetails />
    </>
  );
}

export default App;
