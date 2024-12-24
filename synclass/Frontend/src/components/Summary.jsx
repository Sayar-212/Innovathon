import React from "react";
import "./../styles/CreateTimetable.css";

const Summary = ({ instituteTiming, subjects, faculties, venues }) => {
  const handleGenerateTimetable = async () => {
    try {
      // Combine all data into one payload
      const payload = {
        instituteTiming,
        subjects,
        faculties,
        venues,
      };

      // Send data to the backend
      const response = await fetch("http://localhost:5000/timetable/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json(); // Optional: Process the response
        alert("Timetable saved successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to save timetable", errorData);
        alert(`Failed to save timetable: ${errorData.message || "Please try again."}`);
      }
    } catch (error) {
      console.error("Error generating timetable:", error);
      alert("An error occurred while saving the timetable. Please try again.");
    }
  };

  return (
    <div className="stage-content">
      <h2>Summary</h2>

      <h3>Institute Timings:</h3>
      <p>
        Start Time: {instituteTiming.startTime}:00 &mdash; End Time: {instituteTiming.endTime}:00
        <br />
        Break Start Time: {instituteTiming.breakStart}:00 &mdash; Break End Time:{" "}
        {instituteTiming.breakEnd}:00
      </p>

      <h3>Subjects:</h3>
      {subjects.length > 0 ? (
        <ul>
          {subjects.map((subject, index) => (
            <li key={index}>
              {index + 1}. {subject.name} (Code: {subject.code}, Hours: {subject.hours})
            </li>
          ))}
        </ul>
      ) : (
        <p>No subjects added.</p>
      )}

      <h3>Faculties:</h3>
      {faculties.length > 0 ? (
        <ul>
          {faculties.map((faculty, index) => (
            <li key={index}>
              {index + 1}. ID: {faculty.id}, Name: {faculty.name}, Email: {faculty.email}, Phone:{" "}
              {faculty.phone}, Address: {faculty.address}, Availability:{" "}
              {faculty.availability.join(", ")}, Subjects Taught: {faculty.numSubjectsTaught}
            </li>
          ))}
        </ul>
      ) : (
        <p>No faculties added.</p>
      )}

      <h3>Venues:</h3>
      {venues.length > 0 ? (
        <ul>
          {venues.map((venue, index) => (
            <li key={index}>
              Room {index + 1}: {venue.room}
            </li>
          ))}
        </ul>
      ) : (
        <p>No venues added.</p>
      )}

      <button className="generate-button" onClick={handleGenerateTimetable}>
        Generate Timetable
      </button>
    </div>
  );
};

export default Summary;
