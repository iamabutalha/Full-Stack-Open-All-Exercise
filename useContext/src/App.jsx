import { useState, createContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ChildA from "./components/ChildA";

// Step 1: create context
// const UserContext = createContext();

// Step 2: Wrap all the child in Provider
// Step 3: pass Value
// Step 4: consumer the value where it is needed

const ThemeContext = createContext();
function App() {
  // const [user, setUser] = useState({ name: "Love" });
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        id="container"
        style={{ backgroundColor: theme === "light" ? "beige" : "black" }}
      >
        <ChildA />
      </div>
    </ThemeContext.Provider>

    // <div>
    //   <UserContext.Provider value={user}>
    //     <ChildA />
    //   </UserContext.Provider>
    // </div>
  );
}

export default App;
// export { UserContext };
export { ThemeContext };
