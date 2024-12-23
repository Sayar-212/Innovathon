import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/AdminPage.css";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleCreateTimetable = () => {
    navigate("/create-timetable", { state: { stage: 0 } });
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <button onClick={handleCreateTimetable}>Create Timetable</button>
    </div>
  );
};

export default AdminPage;
