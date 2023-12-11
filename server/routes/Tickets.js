const express = require("express");
const Ticket = require("../models/Ticket_Model");
const router = express.Router();

// Get all Tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    return res.status(200).json(tickets);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// Get a Ticket by id
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    return res.status(200).json(ticket);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

// Create a Ticket
router.post("/", async (req, res) => {
  try {
    const newTicket = await Ticket.create(req.body);
    return res.status(201).json(newTicket);
  } catch (e) {
    console.error("Error creating ticket:", e);
    return res.status(400).json({ message: e.message });
  }
});


// Delete a Ticket
router.delete("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    return res.status(200).json({ ticket, msg: "deleted" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;