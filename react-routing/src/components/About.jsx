import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  function moveToDahsboard() {
    navigate("/dashboard");
  }
  function moveToHome() {
    navigate("/");
  }
  return (
    <div>
      About PAge
      <button onClick={moveToDahsboard}>Move to Dashboard</button>
      <button onClick={moveToHome}>Move to Home</button>
    </div>
  );
};

export default About;
