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

class TicketsController {
  // Retrieve all tickets
  async getAllTickets(req, res) {
    try {
      const tickets = await Ticket.find();
      return res.status(200).json(tickets);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Retrieve a ticket by ID
  async getTicketById(req, res) {
    try {
      const ticket = await Ticket.findById(req.params.id);
      return res.status(200).json(ticket);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Create a new ticket
  async createTicket(req, res) {
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
        userId, title, description, category,
      });
      const savedTicket = await newTicket.save();
      res.status(201).json(savedTicket);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: 'Validation error. Check your input data.' });
      }
      res.status(500).json({ error: error.message });
    }
  }

  // Update a ticket
  async updateTicket(req, res) {
    try {
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
  }

  // Delete a ticket
  async deleteTicket(req, res) {
    try {
      const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
      if (!deletedTicket) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Receive a ticket from the database
  async receiveTicketFromDatabase(req, res) {
    try {
      const ticket = await Ticket.findById(req.params.id);
      if (ticket) {
        // Assuming you have these properties in your class
        this.priorityQueues[ticket.priority][ticket.category].push(ticket);
        console.log(`Received ticket from the database: (${ticket.priority}, ${ticket.category})`);
        this.assignTickets();
      } else {
        console.log(`Ticket with ID ${req.params.id} not found in the database.`);
      }
      res.status(200).json({ message: 'Ticket received from the database' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get the next ticket
  async getNextTicket(req, res) {
    try {
      const priorities = ['High', 'Medium', 'Low'];
      for (const priority of priorities) {
        const queue = this.priorityQueues[priority][category];
        if (queue.length > 0) {
          const ticket = queue.shift();
          await Ticket.findByIdAndUpdate(ticket._id, { $set: { state: 'inProgress' } }, { new: true });
          return res.status(200).json(ticket);
        }
      }
      res.status(404).json({ message: 'No pending tickets found' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Check if a ticket should be handled
  async shouldHandleTicket(req, res) {
    try {
      const randNum = Math.random() * 100;
      const ticketCategory = req.body.category; // Assuming you receive the category in the request body
      if (ticketCategory === 'Software') {
        return res.status(200).json({ shouldHandle: randNum <= this.softwarePercentage });
      } else if (ticketCategory === 'Hardware') {
        return res.status(200).json({ shouldHandle: randNum <= this.hardwarePercentage });
      } else if (ticketCategory === 'Network') {
        return res.status(200).json({ shouldHandle: randNum <= this.networkPercentage });
      } else {
        return res.status(400).json({ error: 'Invalid ticket category' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Assign tickets to agents
  async assignTickets(req, res) {
    try {
      const priorities = ['High', 'Medium', 'Low'];
      for (const priority of priorities) {
        for (const category of ['Software', 'Hardware', 'Network']) {
          const queue = this.priorityQueues[priority][category];
          while (queue.length > 0) {
            const ticket = queue.shift();
            const agent = this.agents[category];
            if (agent.isAvailable()) {
              const shouldHandle = await this.shouldHandleTicket({ body: { category } });
              if (shouldHandle) {
                agent.currentLoad.push(ticket);
                await Ticket.findByIdAndUpdate(ticket._id, { $set: { state: 'inProgress' } }, { new: true });
                console.log(`Ticket ${ticket._id} assigned to agent ${agent.category}`);
              } else {
                console.log(`Ticket ${ticket._id} not assigned to agent ${agent.category}`);
              }
            } else {
              console.log(`Agent ${agent.category} is not available`);
            }
          }
        }
      }
      res.status(200).json({ message: 'Tickets assigned successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get tickets by user ID
  async getTicketsByUserId(req, res) {
    try {
      const tickets = await Ticket.find({ userId: req.params.id });
      return res.status(200).json(tickets);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get tickets by agent ID
  async getTicketsByAgentId(req, res) {
    try {
      const tickets = await Ticket.find({ agentId: req.params.id });
      return res.status(200).json(tickets);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get tickets by manager ID
  async getTicketsByManagerId(req, res) {
    try {
      const tickets = await Ticket.find({ managerId: req.params.id });
      return res.status(200).json(tickets);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new TicketsController();
