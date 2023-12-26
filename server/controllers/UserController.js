const sessionModel = require("../models/SessionModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/userModel');
require('dotenv').config();


const secretKey = process.env.SECRET_KEY;
const UserController = {


  register: async (req, res) => {
    try {
      const { user_id, Email, password, Phone_Number, role } = req.body;
  
      // Validate user role
      if (!['user', 'agent'].includes(role)) {
        return res.status(400).json({ message: "Invalid user role" });
      }
  
      const existingUser = await User.findOne({ Email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        user_id,
        Email,
        password: hashedPassword,
        Phone_Number,
        role
      });
  
      // Set req.user after successful registration
      req.user = {
        user_id: newUser.user_id,
        role: newUser.role,
        // Add any other relevant user information here
      };
  
      // Generate JWT token after successful registration
      const token = jwt.sign(
        { user: req.user.user_id },
        secretKey,
        { expiresIn: '1h' }
      );
  
      // Set token as cookie for future requests
      res.cookie('token', token, { httpOnly: true });
  
      // Respond with user data and token
      res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ message: error.message });
    }
  },


 
  login: async (req, res) => {
    try {
      const { Email, password } = req.body;

      console.log(Email, password)

      const user = await User.findOne({ Email });
      console.log(user)
      if (!user) {
        return res.status(404).json({ message: 'Email not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(405).json({ message: 'Incorrect password' });
      }

      const currentDateTime = new Date();
      const expiresAt = new Date(+currentDateTime + 1800000); // expire in 3 minutes

      const token = jwt.sign(
        { user: { userId: user._id, role: user.role } },
        's1234rf,.lp', // Replace with your actual secret key
        {
          expiresIn: 3 * 60 * 60,
        }
      );

      let newSession = new sessionModel({
        userId: user._id,
        token,
        expiresAt: expiresAt,
      });

      await newSession.save();

      return res
        .cookie('token', token, {
          expires: expiresAt,
          withCredentials: true,
          httpOnly: false,
          sameSite: 'none',
        })
        .status(200)
        .json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  createUser: async (req, res) => {
    try {
      const { user_id, Email, is_Agent, is_Manager, Phone_Number, Rate } = req.body;

      const existingUser = await User.findOne({ Email });

      if (existingUser) {
        return res.status(409).json({ error: 'User already exists' });
      }

      if (!user_id || !Email) {
        return res.status(400).json({ error: 'Incomplete data for user creation' });
      }

      const newUser = new User({
        user_id,
        Email,
        is_Agent: is_Agent || false,
        is_Manager: is_Manager || false,
        Phone_Number,
        Rate: Rate || 0,
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  makeAgent: async (req, res) => {
    try {
        // Check if the current logged-in user is a manager
        const loggedInUser = req.user; // Assuming you set the user in the middleware
        if (!loggedInUser || loggedInUser.role !== 'manager') {
            return res.status(403).json({ error: 'Access forbidden. Only managers can make users admin.' });
        }

        // Get the user ID to be made admin from the request parameters
        const userIdToMakeAgent = req.params.id;

        // Find the user in the database by ID
        const userToMakeAgent = await User.findOne(userIdToMakeAgent);

        // Check if the user exists
        if (!userToMakeAgent) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Change the user's role to admin
        userToMakeAgentn.role = "agent";

        // Save the updated user in the database
        const updatedUser = await userToMakeAgent.save();

        // Respond with the updated user
        res.status(200).json({ message: 'User role updated to admin', user: updatedUser });
    } catch (error) {
        console.error('Error making admin:', error);
        res.status(500).json({ error: 'Server error' });
    }
},

 
  GetAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (e) {
      console.error('Error fetching users:', e);
      return res.status(500).json({ message: e.message });
    }
  },

  getUserByid: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteUserById: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  UpdateUser: async (req, res) => {
    try {
      const { Email, Phone_Number } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { Email, Phone_Number },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: error.message });
    }
  },
  
  initializeAgentsFromDatabase: async (req, res) => {
    try {
      const agentDocs = await AgentModel.find({});
      for (const agentDoc of agentDocs) {
        const { category, maxCapacity, softwarePercentage, hardwarePercentage, networkPercentage } = agentDoc;
        this.agents[category] = new Agent(category, maxCapacity, softwarePercentage, hardwarePercentage, networkPercentage);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } ,

  isAgentAvailable: async (req, res) => {
    try {
      const { category } = req.body;
      const agent = this.agents[category];
      if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
      }
      res.status(200).json({ isAvailable: agent.isAvailable() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

 
};
module.exports = UserController;