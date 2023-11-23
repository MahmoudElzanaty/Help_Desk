const express = require("express");
const ReportsModel = require("../Models/ReportsModel"); // Importing the ReportsModel
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
    const newReport = new ReportsModel({
      Report_Id: req.body.Report_Id,
      User_Id: req.body.User_Id,
      Tstatus: req.body.Tstatus,
      Manager_Id: req.body.Manager_Id,
      R_data: req.body.R_data,
    });

    const report = await newReport.save();

    return res.status(201).json({ report, msg: "created" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
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
