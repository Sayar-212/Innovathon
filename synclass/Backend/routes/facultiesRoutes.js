const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');

// Example route for getting all faculties
router.get('/', async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.json(faculties);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
