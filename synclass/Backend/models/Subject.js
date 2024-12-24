const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    code: { type: String, required: true },
    hours: { type: Number, required: true },
});

// Use mongoose.models to avoid model overwrite errors
module.exports = mongoose.models.Subject || mongoose.model('Subject', SubjectSchema);
