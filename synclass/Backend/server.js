const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const facultiesRoutes = require('./routes/facultiesRoutes');
const subjectsRoutes = require('./routes/subjectRoutes');
const venuesRoutes = require('./routes/venuesRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes
app.use('/faculties', facultiesRoutes);
app.use('/subjects', subjectsRoutes);
app.use('/venues', venuesRoutes);
app.use('/timetable', timetableRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
