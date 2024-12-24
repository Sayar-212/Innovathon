import React, { useState } from 'react';
import '../styles/CreateTimetable.css';

const InstituteTiming = () => {
  const [instituteTiming, setInstituteTiming] = useState({
    startTime: '',
    endTime: '',
    breakStart: '',
    breakEnd: '',
  });

  const handleInstituteTiming = () => {
    // handle the logic when setting timing
    
    console.log(instituteTiming);
  };

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
};

export default InstituteTiming;
