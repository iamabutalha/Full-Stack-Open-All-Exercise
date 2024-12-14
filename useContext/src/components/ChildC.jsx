import React, { useContext } from "react";
import { ThemeContext } from "../App";

const ChildC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
    console.log("Clicked");
  }
  return (
    <div>
      <button onClick={toggleTheme}>
        {theme === "dark" ? "Turn Light" : "Turn Black"}
      </button>
    </div>
  );
};

export default ChildC;
