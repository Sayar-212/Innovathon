import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1 className="landing-title">Welcome to Synclass</h1>
      <p className="landing-subtitle">Your future begins here!</p>
      <button className="login-button" onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
};

export default LandingPage;
