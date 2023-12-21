const express = require("express");
const Workflow = require("../models/Workflow_Model"); // * Importing the student model
const router = express.Router();

// * Get all students
router.get("/", async (req, res) => {
  try {
    const workflow = await Workflow.find();
    return res.status(200).json(workflow);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// * Get a student by id
router.get("/:id", async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    return res.status(200).json(workflow);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// * Create a student
router.post("/", async (req, res) => {
  try {
    const newwf = await Workflow.create(req.body);
    return res.status(201).json(newwf);
  } catch (e) {
    console.error("Error creating workflow:", e);
    return res.status(400).json({ message: e.message });
  }
});

// * Update a student

router.put("/:id", async (req, res) => {
  try {
    const workflow = await Workflow.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
      },
      { new: true }
    );
    return res.status(200).json({workflow,msg:"updated"});
  } catch (error) {
    return res.status(500).json({ error: err });
  }
});

// * Delete a student

router.delete("/:id", async (req, res) => {
  try {
    const workflow = await Workflow.findByIdAndDelete(req.params.id);
    return res.status(200).json({workflow,msg:"deleted"});
  } catch (error) {
    return res.status(500).json({ error: err });
  }
});

module.exports = router;