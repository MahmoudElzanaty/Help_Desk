const express = require("express");
const ReportsModel = require("../models/ReportsModel"); // Importing the ReportsModel
const router = express.Router();

// Get all Reports
router.get("/", async (req, res) => {
  try {
    const reports = await ReportsModel.find();
    return res.status(200).json(reports);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// Create a Report
router.post("/", async (req, res) => {
  try {
    const newReport = await ReportsModel.create(req.body);
    return res.status(201).json(newReport);
  } catch (e) {
    console.error("Error creating Report:", e);
    return res.status(400).json({ message: e.message });
  }
});

//Delete a Report
router.delete("/:id", async (req, res) => {
    try {
      const report = await ReportsModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({ report, msg: "deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

module.exports = router;