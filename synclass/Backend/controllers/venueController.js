const { MongoClient } = require('mongodb');

const uri = "your-mongodb-connection-string";
const client = new MongoClient(uri);
const database = client.db('your-database-name');

const venuesCollection = database.collection('venues');

// Create a new venue
const createVenue = async (req, res) => {
    try {
        const { name, capacity } = req.body;

        if (!name || !capacity) {
            return res.status(400).send({ error: "Name and capacity are required." });
        }

        const result = await venuesCollection.insertOne({ name, capacity });
        res.status(201).send({ message: "Venue created successfully.", venueId: result.insertedId });
    } catch (error) {
        console.error("Error creating venue:", error);
        res.status(500).send({ error: "Failed to create venue." });
    }
};

// Get all venues
const getAllVenues = async (req, res) => {
    try {
        const venues = await venuesCollection.find().toArray();
        res.status(200).send(venues);
    } catch (error) {
        console.error("Error fetching venues:", error);
        res.status(500).send({ error: "Failed to fetch venues." });
    }
};

module.exports = { createVenue, getAllVenues };
