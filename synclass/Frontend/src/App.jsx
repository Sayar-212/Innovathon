import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AdminPage from "./components/AdminPage";
import CreateTimetable from "./components/CreateTimetable";

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="admin" element={<AdminPage />} />
    <Route path="/create-timetable" element={<CreateTimetable />} />
  </Routes>
);

export default App;
