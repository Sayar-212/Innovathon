const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    availability: [{ type: String }], // Array of days (e.g., "Monday", "Tuesday")
    numSubjectsTaught: { type: Number, default: 0 },
    subjectsTaught: [
        {
            subjectName: { type: String, required: true },
            subjectCode: { type: String, required: true },
        },
    ],
});

module.exports = mongoose.models.Faculty || mongoose.model('Faculty', FacultySchema);
