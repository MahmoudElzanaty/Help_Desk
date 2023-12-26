const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Communication = require('../models/CommunicationModel');
const FAQ = require('../models/FAQModel');
const Report = require('../models/ReportsModel');
const Ticket = require('../models/Ticket_Model');
const User = require('../models/userModel');
const Workflow = require('../models/Workflow_Model');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const TicketsController = {
    createTicket: async (req, res) => {
      console.log('Received POST request at /Tickets/createTicket');
        try {
          const userId = req.user.userId; // Get userId from decoded token
          const {
            agent,
            Category,
            Sub_Category,
            Priority,
            Status,
            TDescribtion,
            userRate
          } = req.body;
      
          // Check for required fields
          if (!Category || !Sub_Category || !TDescribtion ) {
            return res.status(400).json({ error: 'All fields are required' });
          }
      
          // Create a new Ticket object with the provided data
          const newTicket = new Ticket({
            user:userId,
            agent,
            Category,
            Sub_Category,
            Priority,
            Status,
            TDescribtion,
            userRate
          });
      
          // Save the new ticket to the database
          const savedTicket = await newTicket.save();
      
          // Respond with the saved ticket details
          res.status(201).json(savedTicket);
        } catch (error) {
          // Handle validation errors
          if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation error. Check your input data.' });
          }
      
          // Handle other types of errors
          res.status(500).json({ error: error.message });
        }
      },

      updateTicket: async (req, res) => {
        try {
          const { ticketId, updateData } = req.body;
      
          if (!ticketId || !updateData) {
            return res.status(400).json({ error: 'Both ticketId and updateData are required' });
          }
      
          const updatedTicket = await Ticket.findByIdAndUpdate(
            ticketId,
            updateData,
            { new: true, runValidators: true }
          );
      
          if (!updatedTicket) {
            return res.status(404).json({ error: 'Ticket not found' });
          }
      
          res.json(updatedTicket);
        } catch (error) {
          // Handle validation errors
          if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation error. Check your input data.' });
          }
      
          // Handle other types of errors
          res.status(500).json({ error: error.message });
        }
      },
    deleteTicket : async(req , res)=> {
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
     getTicketsByAgentId : async (req, res) => {
      try {
        const tickets = await Ticket.find({ agentId: req.params.id });
        return res.status(200).json(tickets);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }, 
     getTicketsByManagerId : async (req, res) => {
      try {
        const tickets = await Ticket.find({ managerId: req.params.id });
        return res.status(200).json(tickets);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
     getTicketsByUserId : async (req, res) => {
      try {
        console.log('User ID:', req.params.id);
        const tickets = await Ticket.find({ user: req.params.id });
        
        return res.status(200).json(tickets);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } ,
     getAllTickets : async(req, res) => {
      try {
        const tickets = await Ticket.find();
        return res.status(200).json(tickets);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
      

};
module.exports = TicketsController;