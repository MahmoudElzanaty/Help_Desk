const bcrypt = require('bcryptjs'); // hat3ml require lel bcrypt
const jwt = require('jsonwebtoken'); // hat3ml require lel jsonwebtoken
const Communication = require('../models/CommunicationModel'); // hat3ml require lel communication model
const FAQ = require('../models/FAQModel'); // hat3ml require lel FAQ model
const Report = require('../models/ReportModel'); // hat3ml require lel Report model
const Ticket = require('../models/Ticket_Model'); // hat3ml require lel Ticket model
const User = require('../models/userModel'); // hat3ml require lel User model
const Workflow = require('../models/Workflow_Model'); // hat3ml require lel Workflow model

exports.createCommunication = async (req, res) => {
    try { 
      const { user, agent, Description, Message_Id } = req.body; // hatgeb el user, agent, Description, Message_Id mn el request body
      if (!user || !agent || !Description || !Message_Id) { // el if de beyshof law msh mawgod wa7ed mn el 7agat de yb2a msh mawgod ba2a
        return res.status(400).json({ error: 'Incomplete data for communication creation' });
      }
      const newCommunication = new Communication({
        user,agent,Description,Message_Id,
      }); // hat3ml instance mn el communication model
      const savedCommunication = await newCommunication.save(); // hat save el communication de fel database
      res.status(201).json(savedCommunication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getAllCommunications = async (req, res) => { 
    try {
      const communications = await Communication.find(); // hatgeb kol el communications
      res.status(200).json(communications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getCommunicationById = async (req, res) => {
    try {
      const communication = await Communication.findById(req.params.id); // enta momkn tegeeb el communication de bel id bta3ha
      
      if (!communication) { // law el communication msh mawgod yb2a msh mawgod ba2a
        return res.status(404).json({ error: 'Communication not found' });
      }
      res.status(200).json(communication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateCommunicationById = async (req, res) => {
    try {
      const { user, agent, Description, Message_Id } = req.body; // hatgeb el user, agent, Description, Message_Id mn el request body
      if (!user || !agent || !Description || !Message_Id) { // nafs el kalam el fo2
        return res.status(400).json({ error: 'Incomplete data for communication update' });
      }
      const updatedCommunication = await Communication.findByIdAndUpdate( // hat update el communication de bel id bta3ha w hatgeb el updated communication
        req.params.id,
        { user, agent, Description, Message_Id },
        { new: true } // Return the updated document
      );
      if (!updatedCommunication) { // law msh mawgod yb2a msh mawgod y bashaa
        return res.status(404).json({ error: 'Communication not found' });
      }
      res.status(200).json(updatedCommunication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteCommunicationById = async (req, res) => {
    try {
      const deletedCommunication = await Communication.findByIdAndDelete(req.params.id); // hat delete el communication de bel id bta3ha
      if (!deletedCommunication) { // law msh mawgod yb2a msh mawgod y bashaa
        return res.status(404).json({ error: 'Communication not found' });
      }
      res.status(200).json({ message: 'Communication deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };