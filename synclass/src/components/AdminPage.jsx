import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/AdminPage.css";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <button onClick={() => navigate("/create-timetable")}>Create Timetable</button>
    </div>
  );
};

export default AdminPage;

