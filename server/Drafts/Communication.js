const express = require("express");
const router = express.Router();
const Communication = require("../models/CommunicationModel");

// Get all communications
router.get("/", async (req, res) => {
  try {
    const communications = await Communication.find();
    return res.status(200).json(communications);
  } catch (e) {
    console.error("Error fetching communications:", e);
    return res.status(500).json({ message: e.message });
  }
});

// Create a new communication
router.post("/", async (req, res) => {
  try {
    const newCommunication = await Communication.create(req.body);
    return res.status(201).json(newCommunication);
  } catch (e) {
    console.error("Error creating communication:", e);
    return res.status(400).json({ message: e.message });
  }
});

// Delete a communication
router.delete("/:id", async (req, res) => {
  try {
    const deletedCommunication = await Communication.findByIdAndDelete(req.params.id);
    return res.status(200).json(deletedCommunication);
  } catch (e) {
    console.error("Error deleting communication:", e);
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
