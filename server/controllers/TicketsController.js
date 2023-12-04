const bcrypt = require('bcryptjs'); // hat3ml require lel bcrypt
const jwt = require('jsonwebtoken'); // hat3ml require lel jsonwebtoken
const Communication = require('../models/CommunicationModel'); // hat3ml require lel communication model
const FAQ = require('../models/FAQModel'); // hat3ml require lel FAQ model
const Report = require('../models/ReportModel'); // hat3ml require lel Report model
const Ticket = require('../models/Ticket_Model'); // hat3ml require lel Ticket model
const User = require('../models/userModel'); // hat3ml require lel User model
const Workflow = require('../models/Workflow_Model'); // hat3ml require lel Workflow model
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const TicketsController = {
  getAllTickets: async (req, res) => {
    try {
      const tickets = await Ticket.find();
      return res.status(200).json(tickets);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  } ,
  getTicketById: async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);
      return res.status(200).json(ticket);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  //create ticket
  createTicket: async (req, res) => {
    try {
      const { title, description, category } = req.body;
      if (!title || !description || !category) {
        return res.status(400).json({ error: 'Title, description, and category are required fields' });
      }
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
      const newTicket = new Ticket({
        userId,title,description,category,
      });
      const savedTicket = await newTicket.save();
      res.status(201).json(savedTicket);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation error. Check your input data.' });
      }  
      res.status(500).json({ error: error.message });
    }
  },
  //update ticket
  updateTicket: async (req, res) => {
    try {
      const Ticket = require('../models/Ticket_Model');
      const ticketId = req.params.id;
      const existingTicket = await Ticket.findById(ticketId);
      if (!existingTicket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      if (req.body.title) {
        existingTicket.title = req.body.title;
      }
      if (req.body.description) {
        existingTicket.description = req.body.description;
      }
      if (req.body.category) {
        existingTicket.category = req.body.category;
      }
      const updatedTicket = await existingTicket.save();
      res.status(200).json(updatedTicket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  //delete ticket
  deleteTicket: async (req, res) => {
    try {
      const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
      if (!deletedTicket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },



}

module.exports = TicketsController;

