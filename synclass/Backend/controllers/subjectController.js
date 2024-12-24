const { MongoClient } = require('mongodb');

const uri = "your-mongodb-connection-string";
const client = new MongoClient(uri);
const database = client.db('your-database-name');

const subjectsCollection = database.collection('subjects');

// Create a new subject
const createSubject = async (req, res) => {
    try {
        const { name, code } = req.body;

        if (!name || !code) {
            return res.status(400).send({ error: "Name and code are required." });
        }

        const result = await subjectsCollection.insertOne({ name, code });
        res.status(201).send({ message: "Subject created successfully.", subjectId: result.insertedId });
    } catch (error) {
        console.error("Error creating subject:", error);
        res.status(500).send({ error: "Failed to create subject." });
    }
};

// Get all subjects
const getAllSubjects = async (req, res) => {
    try {
        const subjects = await subjectsCollection.find().toArray();
        res.status(200).send(subjects);
    } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).send({ error: "Failed to fetch subjects." });
    }
};

module.exports = { createSubject, getAllSubjects };
