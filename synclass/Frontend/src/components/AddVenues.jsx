import React, { useState } from "react";
import "../styles/CreateTimetable.css";

const AddVenues = ({ saveVenues }) => {
  const [numRooms, setNumRooms] = useState(1);
  const [venues, setVenues] = useState([]);

  const handleVenues = () => {
    const numberOfRooms = parseInt(numRooms, 10);
    if (numberOfRooms > 0) {
      const newVenues = Array.from({ length: numberOfRooms }, () => ({
        room: "",
      }));
      setVenues(newVenues);
    }
  };

  const handleSave = () => {
    saveVenues(venues); // Pass the venues data to the parent component
  };

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
      <button onClick={handleSave}>Save Venues</button>
    </div>
  );
};

export default AddVenues;
