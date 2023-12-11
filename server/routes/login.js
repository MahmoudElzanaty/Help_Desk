const express = require('express');
const router = express.Router();
const Users = require('../models/userModel');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    const userPassword = await Users.findOne({ password });

    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    if (!userPassword) {
      return res.status(405).json({ message: 'Incorrect password' });
    }

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

