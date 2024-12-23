import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTimetable";
import fileImage from "../assets/file.png";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleCreateTimetable = () => {
    navigate("/create-timetable", { state: { stage: 0 } });
  };

  return (
    <div
      style={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4DA1A9",
        margin: 0,
      }}
    >
      <img
        src={fileImage}
        alt="Timetable Icon"
        style={{ maxWidth: "400px", maxHeight: "400px", marginBottom: "40px" }}
      />

      <button
        style={{
          background: "none",
          color: "#2E5077",
          border: "2px solid",
          padding: "1em 2em",
          fontSize: "1em",
          transition: "color 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.25s",
        }}
        onMouseOver={(e) => {
          e.target.style.borderColor = "#F6F4F0";
          e.target.style.color = "white";
          e.target.style.boxShadow = "0 0.5em 0.5em -0.4em #F6F4F0";
          e.target.style.transform = "translateY(-0.25em)";
        }}
        onMouseOut={(e) => {
          e.target.style.borderColor = "#2E5077";
          e.target.style.color = "#2E5077";
          e.target.style.boxShadow = "none";
          e.target.style.transform = "none";
        }}
        onClick={handleCreateTimetable}
      >
        Create Timetable
      </button>
    </div>
  );
};

export default AdminPage;

