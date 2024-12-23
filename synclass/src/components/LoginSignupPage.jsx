import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/LoginSignupPage.css";

const LoginSignupPage = () => {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleProceed = () => {
    if (role === "admin") navigate("/admin");
    else navigate("/signup");
  };

  return (
    <div className="login-signup-page">
      <h1>Select Role</h1>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleProceed}>Proceed</button>
    </div>
  );
};

export default LoginSignupPage;
