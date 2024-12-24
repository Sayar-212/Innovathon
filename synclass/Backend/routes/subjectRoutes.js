const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

// Example route for getting all subjects
router.get('/', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
