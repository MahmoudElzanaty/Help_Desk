const express = require("express");
const Ticket = require("../Models/Ticket_Model"); // * Importing the student model
const router = express.Router();

// * Get all students
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    return res.status(200).json(tickets);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// * Get a student by id
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    return res.status(200).json(ticket);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// * Create a student

router.post("/", async (req, res) => {
  try {
    const newTicket = new Ticket({
      Ticket_Id: req.body.Ticket_Id,
      User_Id: req.body.User_Id,
      Agent_Id: req.body.Agent_Id,
      Category: req.body.Category,
      Sub_Category: req.body.Sub_Category,
      Priority: req.body.Priority,
      Date: req.body.Date,
      Status: req.body.Status,
      TDescribtion: req.body.TDescribtion
    });
    const ticket = await newTicket.save();
    return res.status(201).json({ticket,msg:"created"});
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// * Update a student

router.put("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
      },
      { new: true }
    );
    return res.status(200).json({ticket,msg:"updated"});
  } catch (error) {
    return res.status(500).json({ error: err });
  }
});

// * Delete a student

router.delete("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    return res.status(200).json({ticket,msg:"deleted"});
  } catch (error) {
    return res.status(500).json({ error: err });
  }
});
//---------useing router.routr()----------------
/*router
  .route("/")
  .get(async (req, res) => {
    try {
      const students = await studentModel.find();
      return res.status(200).json(students);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  })
  .post(async (req, res) => {
    try {
      const newStudent = new studentModel({
        name: req.body.name,
        age: req.body.age,
      });
      const student = await newStudent.save();
      return res.status(201).json(student);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const student = await studentModel.findById(req.params.id);
      return res.status(200).json(student);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  })
  .put(async (req, res) => {
    try {
      const student = await studentModel.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          age: req.body.age,
        },
        { new: true }
      );
      return res.status(200).json({student,msg:"updated"});
    } catch (error) {
      return res.status(500).json({ error: err });
    }
  })
  .delete(async (req, res) => {
    try {
      const student = await studentModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({student,msg:"deleted"});
    } catch (error) {
      return res.status(500).json({ error: err });
    }
  });
*/
module.exports = router;