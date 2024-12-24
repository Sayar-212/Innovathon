const { MongoClient } = require('mongodb');

const uri = "your-mongodb-connection-string";
const client = new MongoClient(uri);
const database = client.db('your-database-name');

const facultiesCollection = database.collection('faculties');

// Create a new faculty
const createFaculty = async (req, res) => {
    try {
        const { name, expertise } = req.body;

        if (!name || !expertise) {
            return res.status(400).send({ error: "Name and expertise are required." });
        }

        const result = await facultiesCollection.insertOne({ name, expertise });
        res.status(201).send({ message: "Faculty created successfully.", facultyId: result.insertedId });
    } catch (error) {
        console.error("Error creating faculty:", error);
        res.status(500).send({ error: "Failed to create faculty." });
    }
};

// Get all faculties
const getAllFaculties = async (req, res) => {
    try {
        const faculties = await facultiesCollection.find().toArray();
        res.status(200).send(faculties);
    } catch (error) {
        console.error("Error fetching faculties:", error);
        res.status(500).send({ error: "Failed to fetch faculties." });
    }
};

module.exports = { createFaculty, getAllFaculties };