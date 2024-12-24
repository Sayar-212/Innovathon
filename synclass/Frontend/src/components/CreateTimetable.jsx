import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AddSubjects from "./AddSubjects";
import AddFaculties from "./AddFaculties";
import AddVenues from "./AddVenues";
import InstituteTiming from "./InstituteTiming";
import Summary from "./Summary";
import "../styles/CreateTimetable.css";

const CreateTimetable = () => {
  const location = useLocation();

  // State Management
  const [stage, setStage] = useState(0); // Default to the first step
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

  // Handle Navigation State
  useEffect(() => {
    if (location.state?.stage !== undefined) {
      setStage(location.state.stage); // Set the stage based on navigation state
    }
  }, [location.state]);

  // Save venues data
  const saveVenues = (newVenues) => {
    setVenues(newVenues); // Update the venues state
  };

  // Render stage content based on the current step
  const renderStageContent = () => {
    switch (stage) {
      case 0:
        return (
          <InstituteTiming
            instituteTiming={instituteTiming}
            setInstituteTiming={setInstituteTiming}
          />
        );
      case 1:
        return (
          <AddSubjects
            numSubjects={numSubjects}
            setNumSubjects={setNumSubjects}
            subjects={subjects}
            setSubjects={setSubjects}
          />
        );
      case 2:
        return (
          <AddFaculties
            numFaculties={numFaculties}
            setNumFaculties={setNumFaculties}
            faculties={faculties}
            setFaculties={setFaculties}
          />
        );
      case 3:
        return (
          <AddVenues
            numRooms={numRooms}
            setNumRooms={setNumRooms}
            venues={venues}
            setVenues={setVenues}
            saveVenues={saveVenues}
          />
        );
      case 4:
        return (
          <Summary
            instituteTiming={instituteTiming}
            subjects={subjects}
            faculties={faculties}
            venues={venues}
          />
        );
      default:
        return <p>Please select a valid step.</p>;
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
      <div className="stage-content">{renderStageContent()}</div>
    </div>
  );
};

export default CreateTimetable;
