const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    return res.status(200).json(users);
  } catch (e) {
    console.error("Error fetching users:", e);
    //print 
    return res.status(500).json({ message: e.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    return res.status(201).json(newUser);
  } catch (e) {
    console.error("Error creating user:", e);
    return res.status(400).json({ message: e.message });
  }
});

module.exports = router;
