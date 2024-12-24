import React, { useState } from 'react';
import "./../styles/CreateTimetable.css";

const AddSubject = ({ numSubjects, setNumSubjects, subjects, setSubjects }) => {

  const handleSubjects = () => {
    // Ensure numSubjects is a valid number
    const numberOfSubjects = parseInt(numSubjects, 10);
    if (numberOfSubjects > 0) {
      const newSubjects = Array.from({ length: numberOfSubjects }, () => ({
        name: "",
        code: "",
        hours: ""
      }));
      setSubjects(newSubjects);
    }
  };

  return (
    <div className="stage-content">
      <h2>Add Subjects</h2>
      <label>Number of Subjects: </label>
      <input
        type="number"
        min="1"
        value={numSubjects}
        onChange={(e) => setNumSubjects(e.target.value)}
      />
      <button onClick={handleSubjects}>Set Subjects</button>
      {subjects.map((subject, index) => (
        <div key={index}>
          <h4>Subject {index + 1}</h4>
          <input
            type="text"
            placeholder="Subject Name"
            value={subject.name}
            onChange={(e) => {
              const updated = [...subjects];
              updated[index].name = e.target.value;
              setSubjects(updated);
            }}
          />
          <input
            type="text"
            placeholder="Subject Code"
            value={subject.code}
            onChange={(e) => {
              const updated = [...subjects];
              updated[index].code = e.target.value;
              setSubjects(updated);
            }}
          />
          <input
            type="number"
            placeholder="Hours per Week"
            value={subject.hours}
            onChange={(e) => {
              const updated = [...subjects];
              updated[index].hours = e.target.value;
              setSubjects(updated);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default AddSubject;
