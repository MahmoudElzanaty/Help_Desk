const bcrypt = require('bcryptjs'); // hat3ml require lel bcrypt
const jwt = require('jsonwebtoken'); // hat3ml require lel jsonwebtoken
const Communication = require('../models/CommunicationModel'); // hat3ml require lel communication model
const FAQ = require('../models/FAQModel'); // hat3ml require lel FAQ model
const Report = require('../models/ReportModel'); // hat3ml require lel Report model
const Ticket = require('../models/Ticket_Model'); // hat3ml require lel Ticket model
const User = require('../models/userModel'); // hat3ml require lel User model
const Workflow = require('../models/Workflow_Model'); // hat3ml require lel Workflow model

//boso ya shabab el modo3 tal3 systematic gedan emshy ma3a el flow we hatfahem







exports.categorizeTicket = async (req, res) => {
  try {
    const { ticketId, issueType } = req.body;
    if (!ticketId || !issueType) {
      return res.status(400).json({ error: 'Incomplete data for ticket categorization' });
    }
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    switch (issueType.toLowerCase()) {
      case 'software':
        ticket.category = 'Software';
        break;
      case 'hardware':
        ticket.category = 'Hardware';
        break;
      case 'network':
        ticket.category = 'Network';
        break;
      default:
        return res.status(400).json({ error: 'Invalid issue type' });
    }
    const updatedTicket = await ticket.save();

    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;