import React, { useState } from 'react';
import './../styles/CreateTimetable.css';

const AddFaculties = ({ faculties, setFaculties, handleSave }) => {
  const [numFaculties, setNumFaculties] = useState(1);

  const handleFaculties = () => {
    const numberOfFaculties = parseInt(numFaculties, 10);
    if (numberOfFaculties > 0) {
      const newFaculties = Array.from({ length: numberOfFaculties }, () => ({
        name: "",
        id: "",
        email: "",
        phone: "",
        address: "",
        availability: [],
        numSubjectsTaught: 0,
        subjectsTaught: [],
      }));
      setFaculties(newFaculties);
    }
  };

  const handleFacultyAvailability = (day, facultyIndex) => {
    const updated = [...faculties];
    if (!updated[facultyIndex].availability.includes(day)) {
      updated[facultyIndex].availability.push(day);
    } else {
      updated[facultyIndex].availability = updated[facultyIndex].availability.filter(d => d !== day);
    }
    setFaculties(updated);
  };

  return (
    <div className="stage-content">
      <h2>Add Faculty</h2>
      <label>Number of Faculties: </label>
      <input
        type="number"
        min="1"
        value={numFaculties}
        onChange={(e) => setNumFaculties(e.target.value)}
      />
      <button onClick={handleFaculties}>Set Faculties</button>
      {faculties.map((faculty, index) => (
        <div key={index}>
          <br />
          <br />
          <h3>Faculty {index + 1}</h3>
          <input
            type="text"
            placeholder="Faculty Name"
            value={faculty.name}
            onChange={(e) => {
              const updated = [...faculties];
              updated[index].name = e.target.value;
              setFaculties(updated);
            }}
          />
          <input
            type="text"
            placeholder="Faculty ID"
            value={faculty.id}
            onChange={(e) => {
              const updated = [...faculties];
              updated[index].id = e.target.value;
              setFaculties(updated);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            value={faculty.email}
            onChange={(e) => {
              const updated = [...faculties];
              updated[index].email = e.target.value;
              setFaculties(updated);
            }}
          />
          <input
            type="text"
            placeholder="Phone"
            value={faculty.phone}
            onChange={(e) => {
              const updated = [...faculties];
              updated[index].phone = e.target.value;
              setFaculties(updated);
            }}
          />
          <input
            type="text"
            placeholder="Address"
            value={faculty.address}
            onChange={(e) => {
              const updated = [...faculties];
              updated[index].address = e.target.value;
              setFaculties(updated);
            }}
          />
          {/* Availability Days */}
          <div className="faculty-availability">
            <br />
            Availability -
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day) => (
                <div className="day" key={day}>
                  <label>{day}</label>
                  <input
                    type="checkbox"
                    checked={faculty.availability.includes(day)}
                    onChange={() => handleFacultyAvailability(day, index)}
                  />
                </div>
              )
            )}
          </div>
          <br />
          <br />
          {/* Number of Subjects Taught */}
          <label>Number of Subjects Taught: </label>
          <input
            type="number"
            min="1"
            value={faculty.numSubjectsTaught}
            onChange={(e) => {
              const updated = [...faculties];
              const numSubjects = parseInt(e.target.value, 10);
              updated[index].numSubjectsTaught = numSubjects;

              // Ensure subjectsTaught array length matches numSubjects
              updated[index].subjectsTaught = Array.from(
                { length: numSubjects },
                (_, i) =>
                  updated[index].subjectsTaught[i] || {
                    subjectName: "",
                    subjectCode: "",
                  }
              );
              setFaculties(updated);
            }}
          />
          {/* Dynamically Render Subject Fields */}
          {faculty.subjectsTaught.map((subject, subIndex) => (
            <div key={subIndex}>
              <h5>Subject {subIndex + 1}</h5>
              <input
                type="text"
                placeholder="Subject Name"
                value={subject.subjectName}
                onChange={(e) => {
                  const updated = [...faculties];
                  updated[index].subjectsTaught[subIndex].subjectName =
                    e.target.value;
                  setFaculties(updated);
                }}
              />
              <input
                type="text"
                placeholder="Subject Code"
                value={subject.subjectCode}
                onChange={(e) => {
                  const updated = [...faculties];
                  updated[index].subjectsTaught[subIndex].subjectCode =
                    e.target.value;
                  setFaculties(updated);
                }}
              />
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default AddFaculties;
