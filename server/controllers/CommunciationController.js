// liveChatController.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model

// Route to initiate the live chat
router.get('/initiateChat/:userId', async (req, res) => {
  try {
    // Get the user ID from the request parameter
    const userId = req.params.userId;

    // Find the user in the database
    const user = await User.findById(userId);

    // Check if the user exists and is not an agent or manager
    if (user && !user.isAgent && !user.isManager) {
      // Render the live chat page for the user
      res.render('liveChatPage', { user });
    } else {
      // Redirect to an error page or handle accordingly
      res.redirect('/error');
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.redirect('/error');
  }
});

// Route to handle agent joining the live chat
router.get('/joinChat/:agentId', async (req, res) => {
  try {
    // Get the agent ID from the request parameter
    const agentId = req.params.agentId;

    // Find the agent in the database
    const agent = await User.findById(agentId);

    // Check if the agent exists and is an agent (not a manager)
    if (agent && agent.isAgent && !agent.isManager) {
      // Render the live chat page for the agent
      res.render('liveChatPage', { agent });
    } else {
      // Redirect to an error page or handle accordingly
      res.redirect('/error');
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.redirect('/error');
  }
});

module.exports = router;
