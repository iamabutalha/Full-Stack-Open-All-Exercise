import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isOnline, setisOnline] = useState(true);
  const navigate = useNavigate();
  function handleClick() {
    navigate("/about");
  }
  window.onoffline = (event) => {
    setisOnline(false);
    console.log("You are offline");
  };
  window.ononline = (event) => {
    setisOnline(true);
    console.log("Reconnected");
  };
  return (
    <div>
      Home page
      <button onClick={handleClick}>Move to About page</button>
      <div>
        {isOnline ? (
          <h1>You are online</h1>
        ) : (
          <h1>Check Your Connection You are offline</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
