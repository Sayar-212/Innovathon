import React, { useState } from "react";
import "./../styles/CreateTimetable.css";

const CreateTimetable = () => {
  const [stage, setStage] = useState(1);
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
        subject: "",
        code: "",
        email: "",
        phone: "",
        address: "",
        subjectTaught: "", // New field for subject taught
        subjectCode: "",  // New field for subject code taught
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
            <label>Start Time: </label>
            <select
              value={instituteTiming.startTime}
              onChange={(e) => setInstituteTiming({ ...instituteTiming, startTime: e.target.value })}
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
              onChange={(e) => setInstituteTiming({ ...instituteTiming, endTime: e.target.value })}
            >
              {[...Array(24)].map((_, index) => (
                <option key={index} value={index}>
                  {index < 10 ? `0${index}:00` : `${index}:00`}
                </option>
              ))}
            </select>
            <label>Break Start Time: </label>
            <select
              value={instituteTiming.breakStart}
              onChange={(e) => setInstituteTiming({ ...instituteTiming, breakStart: e.target.value })}
            >
              {[...Array(24)].map((_, index) => (
                <option key={index} value={index}>
                  {index < 10 ? `0${index}:00` : `${index}:00`}
                </option>
              ))}
            </select>
            <label>Break End Time: </label>
            <select
              value={instituteTiming.breakEnd}
              onChange={(e) => setInstituteTiming({ ...instituteTiming, breakEnd: e.target.value })}
            >
              {[...Array(24)].map((_, index) => (
                <option key={index} value={index}>
                  {index < 10 ? `0${index}:00` : `${index}:00`}
                </option>
              ))}
            </select>
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
                <h4>Faculty {index + 1}</h4>
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
                  type="text"
                  placeholder="Subject Taught"
                  value={faculty.subjectTaught}
                  onChange={(e) => {
                    const updated = [...faculties];
                    updated[index].subjectTaught = e.target.value;
                    setFaculties(updated);
                  }}
                />
                <input
                  type="text"
                  placeholder="Subject Code"
                  value={faculty.subjectCode}
                  onChange={(e) => {
                    const updated = [...faculties];
                    updated[index].subjectCode = e.target.value;
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
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                    <div className="day" key={day}>
                      <label>{day}</label>
                      <input
                        type="checkbox"
                        onChange={() => handleFacultyAvailability(day)}
                      />
                    </div>
                  ))}
                </div>
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
              Start Time: {instituteTiming.startTime} &mdash; End Time: {instituteTiming.endTime}
              <br />
              Break Start Time: {instituteTiming.breakStart} &mdash; Break End Time: {instituteTiming.breakEnd}
            </p>
            <h3>Subjects:</h3>
            <pre>{JSON.stringify(subjects, null, 2)}</pre>
            <h3>Faculties:</h3>
            <pre>{JSON.stringify(faculties, null, 2)}</pre>
            <h3>Venues:</h3>
            <pre>{JSON.stringify(venues, null, 2)}</pre>
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
        <button onClick={() => setStage(0)}>Step 1: Set Institute Timings</button>
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
