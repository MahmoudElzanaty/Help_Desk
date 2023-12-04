const bcrypt = require('bcryptjs'); // hat3ml require lel bcrypt
const jwt = require('jsonwebtoken'); // hat3ml require lel jsonwebtoken
const Communication = require('../models/CommunicationModel'); // hat3ml require lel communication model
const FAQ = require('../models/FAQModel'); // hat3ml require lel FAQ model
const Report = require('../models/ReportModel'); // hat3ml require lel Report model
const Ticket = require('../models/Ticket_Model'); // hat3ml require lel Ticket model
const User = require('../models/userModel'); // hat3ml require lel User model
const Workflow = require('../models/Workflow_Model'); // hat3ml require lel Workflow model

// tickteing system yastaaaaa
exports.createTicket = async (req, res) => {
    try {
      const { title, description, category } = req.body; // hatgeb el title, description, category mn el request body
      if (!title || !description || !category) {// law msh mawgod yb2a msh mawgod ba2a
        return res.status(400).json({ error: 'Title, description, and category are required fields' });
      }
      const userId = req.user?.id; // hatgeb el user id mn el authenticated user
      if (!userId) { // enta 3arf ba2a
        return res.status(401).json({ error: 'User not authenticated' });
      }
      const newTicket = new Ticket({// hat3ml instance mn el ticket model
        userId,title,description,category,
      });
      const savedTicket = await newTicket.save(); // hat save el ticket de fel database
      res.status(201).json(savedTicket);
    } catch (error) {
      if (error.name === 'ValidationError') { // law el error name bta3o validation error yb2a msh mawgod ba2a
        return res.status(400).json({ error: 'Validation error. Check your input data.' });
      }  
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.updateTicket = async (req, res) => {
    try {
      const Ticket = require('../models/Ticket_Model'); // ben2ol y3ne 2no el ticket model mawgod fel file de
      const ticketId = req.params.id;// hatgeb el ticket id mn el request params
      const existingTicket = await Ticket.findById(ticketId);// dawar 3la el ticket de bel id bta3o y 7ag
      if (!existingTicket) { // hancheck law msh mawgod yb2a msh mawgod we 3ala allah 7akyto
        return res.status(404).json({ error: 'Ticket not found' });
      }
      if (req.body.title) {// law 3ayz t3ml update 3la el title
        existingTicket.title = req.body.title;
      }
      if (req.body.description) {// law 3ayz t3ml update 3la el description
        existingTicket.description = req.body.description;
      }
      if (req.body.category) {// law 3ayz t3ml update 3la el category
        existingTicket.category = req.body.category;
      }
      const updatedTicket = await existingTicket.save(); // save ybny 3ayz t3mlo update 3la el ticket de fel database
      res.status(200).json(updatedTicket);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };