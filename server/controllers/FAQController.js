  const bcrypt = require('bcryptjs'); // hat3ml require lel bcrypt
const jwt = require('jsonwebtoken'); // hat3ml require lel jsonwebtoken
const Communication = require('../models/CommunicationModel'); // hat3ml require lel communication model
const FAQ = require('../models/FAQModel'); // hat3ml require lel FAQ model
const Report = require('../models/ReportModel'); // hat3ml require lel Report model
const Ticket = require('../models/Ticket_Model'); 
const User = require('../models/userModel'); 
const Workflow = require('../models/Workflow_Model'); 


exports.createFAQ = async (req, res) => {
    try {
      const { tickets, status, TDescribtion, FAQ_ID } = req.body; // hatgeb el tickets, status, TDescribtion, FAQ_ID mn el request body
      if (!tickets || !TDescribtion || !FAQ_ID) { // law msh mawgod yb2a msh mawgod ba2a
        return res.status(400).json({ error: 'Incomplete data for FAQ creation' });
      }
      const newFAQ = new FAQ({ tickets, status: status || true, TDescribtion, FAQ_ID,
      });
      const savedFAQ = await newFAQ.save(); // hat save el FAQ de fel database
      res.status(201).json(savedFAQ);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getAllFAQs = async (req, res) => {
    try {
      const faqs = await FAQ.find(); // hatgeb kol el faqs
      res.status(200).json(faqs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getFAQById = async (req, res) => {
    try {
      const faq = await FAQ.findById(req.params.id); // hatgeb el faq de bel id bta3ha
      
      if (!faq) { // if law hwa msh mawgod yb2a msh mawgod ba2a
        return res.status(404).json({ error: 'FAQ not found' });
      }
  
      res.status(200).json(faq);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.updateFAQById = async (req, res) => {
    try {
      const { tickets, status, TDescribtion, FAQ_ID } = req.body; // Get input data from request body
      if (!tickets || !TDescribtion || !FAQ_ID) {
        return res.status(400).json({ error: 'Incomplete data for FAQ update' });
      }
      const updatedFAQ = await FAQ.findByIdAndUpdate( // Update the FAQ by ID
        req.params.id,
        { tickets, status: status || true, TDescribtion, FAQ_ID },
        { new: true } // Return the updated document
      );
      if (!updatedFAQ) {
        return res.status(404).json({ error: 'FAQ not found' });
      }
      res.status(200).json(updatedFAQ);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.deleteFAQById = async (req, res) => {
    try {
      const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id); // Delete the FAQ by ID
      if (!deletedFAQ) {
        return res.status(404).json({ error: 'FAQ not found' }); // If the FAQ doesn't exist
      }
      res.status(200).json({ message: 'FAQ deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const Report = require('../models/Report');
  