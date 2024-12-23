import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./../styles/CreateTimetable.css";

const CreateTimetable = () => {
  const location = useLocation();
  const [stage, setStage] = useState(1); // Default stage
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [venues, setVenues] = useState([]);
  const [numSubjects, setNumSubjects] = useState(0);
  const [numFaculties, setNumFaculties] = useState(0);
  const [numRooms, setNumRooms] = useState(0);
  const [instituteTiming, setInstituteTiming] = useState({
    startTime: "",
    endTime: "",
    breakStart: "",
    breakEnd: "",
  });
  const [facultyAvailability, setFacultyAvailability] = useState({
    days: [],
    timeSlots: [],
  });

  useEffect(() => {
    if (location.state && location.state.stage !== undefined) {
      setStage(location.state.stage); // Set stage based on navigation state
    }
  }, [location.state]);

  const handleSubjects = () => {
    const tempSubjects = [];
    for (let i = 0; i < numSubjects; i++) {
      tempSubjects.push({ name: "", code: "", hours: "" });
    }
    setSubjects(tempSubjects);
  };

  const handleFaculties = () => {
    const tempFaculties = [];
    for (let i = 0; i < numFaculties; i++) {
      tempFaculties.push({
        name: "",
        id: "",
        email: "",
        phone: "",
        address: "",
        subjectsTaught: [],
        numSubjectsTaught: 0, // Add field to track the number of subjects taught
      });
    }
    setFaculties(tempFaculties);
  };

  const handleVenues = () => {
    const tempVenues = [];
    for (let i = 0; i < numRooms; i++) {
      tempVenues.push({ room: "" });
    }
    setVenues(tempVenues);
  };

  const handleInstituteTiming = () => {
    if (
      instituteTiming.startTime &&
      instituteTiming.endTime &&
      instituteTiming.breakStart &&
      instituteTiming.breakEnd
    ) {
      console.log("Institute timing set: ", instituteTiming);
    }
  };

  const handleFacultyAvailability = (day, timeSlot) => {
    const updatedAvailability = { ...facultyAvailability };
    if (!updatedAvailability.days.includes(day)) {
      updatedAvailability.days.push(day);
    }
    updatedAvailability.timeSlots.push(timeSlot);
    setFacultyAvailability(updatedAvailability);
  };

  const renderStageContent = () => {
    switch (stage) {
      case 0:
        return (
          <div className="stage-content">
            <h2>Institute Timing</h2>
            Institute -<label> Start Time: </label>
            <select
              value={instituteTiming.startTime}
              onChange={(e) =>
                setInstituteTiming({
                  ...instituteTiming,
                  startTime: e.target.value,
                })
              }
            >
              {[...Array(24)].map((_, index) => (
                <option key={index} value={index}>
                  {index < 10 ? `0${index}:00` : `${index}:00`}
                </option>
              ))}
            </select>
            <label>End Time: </label>
            <select
              value={instituteTiming.endTime}
              onChange={(e) =>
                setInstituteTiming({
                  ...instituteTiming,
                  endTime: e.target.value,
                })
              }
            >
              {[...Array(24)].map((_, index) => (
                <option key={index} value={index}>
                  {index < 10 ? `0${index}:00` : `${index}:00`}
                </option>
              ))}
            </select>
            <br />
            Break -<label> Start Time: </label>
            <select
              value={instituteTiming.breakStart}
              onChange={(e) =>
                setInstituteTiming({
                  ...instituteTiming,
                  breakStart: e.target.value,
                })
              }
            >
              {[...Array(24)].map((_, index) => (
                <option key={index} value={index}>
                  {index < 10 ? `0${index}:00` : `${index}:00`}
                </option>
              ))}
            </select>
            <label>End Time: </label>
            <select
              value={instituteTiming.breakEnd}
              onChange={(e) =>
                setInstituteTiming({
                  ...instituteTiming,
                  breakEnd: e.target.value,
                })
              }
            >
              {[...Array(24)].map((_, index) => (
                <option key={index} value={index}>
                  {index < 10 ? `0${index}:00` : `${index}:00`}
                </option>
              ))}
            </select>
            <br />
            <button onClick={handleInstituteTiming}>Set Timing</button>
          </div>
        );
      case 1:
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
      case 2:
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
                  {" "}
                  <br />
                  Availibility -
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                    (day) => (
                      <div className="day" key={day}>
                        <label>{day}</label>
                        <input
                          type="checkbox"
                          onChange={() => handleFacultyAvailability(day)}
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
          </div>
        );
      case 3:
        return (
          <div className="stage-content">
            <h2>Add Venue</h2>
            <label>Number of Rooms: </label>
            <input
              type="number"
              min="1"
              value={numRooms}
              onChange={(e) => setNumRooms(e.target.value)}
            />
            <button onClick={handleVenues}>Set Venues</button>
            {venues.map((venue, index) => (
              <div key={index}>
                <h4>Room {index + 1}</h4>
                <input
                  type="text"
                  placeholder="Room Number"
                  value={venue.room}
                  onChange={(e) => {
                    const updated = [...venues];
                    updated[index].room = e.target.value;
                    setVenues(updated);
                  }}
                />
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="stage-content">
            <h2>Summary</h2>

            <h3>Institute Timings:</h3>
            <p>
              Start Time: {instituteTiming.startTime}:00 &mdash; End Time:{" "}
              {instituteTiming.endTime}:00
              <br />
              Break Start Time: {instituteTiming.breakStart}:00 &mdash; Break
              End Time: {instituteTiming.breakEnd}:00
            </p>

            <h3>Subjects:</h3>
            {subjects.length > 0 ? (
              <ul>
                {subjects.map((subject, index) => (
                  <li key={index}>
                    {index + 1}. {subject.name} (Code: {subject.code}, Hours:{" "}
                    {subject.hours})
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
                    {index + 1}. {faculty.name} (ID: {faculty.id}, Subject:{" "}
                    {faculty.subjectTaught} - {faculty.subjectCode}, Email:{" "}
                    {faculty.email}, Phone: {faculty.phone}, Address:{" "}
                    {faculty.address})
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

            <button className="generate-button">Generate Timetable</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="create-timetable">
      <h1>Create Timetable</h1>
      <div className="stages">
        <button onClick={() => setStage(0)}>
          Step 1: Set Institute Timings
        </button>
        <button onClick={() => setStage(1)}>Step 2: Add Subjects</button>
        <button onClick={() => setStage(2)}>Step 3: Add Faculties</button>
        <button onClick={() => setStage(3)}>Step 4: Add Venues</button>
        <button onClick={() => setStage(4)}>Step 5: Summary</button>
      </div>
      {renderStageContent()}
    </div>
  );
};

export default CreateTimetable;
