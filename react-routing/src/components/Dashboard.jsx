import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  function moveToAbout() {
    navigate("/about");
  }
  function moveToHome() {
    navigate("/");
  }
  return (
    <div>
      DashBoard
      <button onClick={moveToAbout}>Move to About</button>
      <button onClick={moveToHome}>Move to Home</button>
      <Outlet />
    </div>
  );
};

export default Dashboard;
