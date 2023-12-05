const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();


const secretKey = process.env.SECRET_KEY;

const UserController = {
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

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ Email: email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isManager = user.is_Manager;
      const isAgent = user.is_Agent;
      const isNormalUser = !(isManager || isAgent);

      if (!isManager && !isAgent && !isNormalUser) {
        return res.status(403).json({ error: 'Access forbidden' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '1h' });

      res.status(200).json({ token, role: user.role });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  register: async (req, res) => {
    //only a normal user is allowed to register
    try {
      const { user_id, Email, is_Agent, is_Manager, Phone_Number, Rate, password } = req.body;
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
        password,
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },


  getUserById: async (req, res) => {
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
  updateUserById: async (req, res) => {
    try {
      const { user_id, Email, is_Agent, is_Manager, Phone_Number, Rate } = req.body;

      if (!user_id || !Email) {
        return res.status(400).json({ error: 'Incomplete data for user update' });
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { user_id, Email, is_Agent: is_Agent || false, is_Manager: is_Manager || false, Phone_Number, Rate: Rate || 0 },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(updatedUser);
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
};

module.exports = UserController;
