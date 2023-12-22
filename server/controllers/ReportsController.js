const bcrypt = require('bcryptjs'); // hat3ml require lel bcrypt
const jwt = require('jsonwebtoken'); // hat3ml require lel jsonwebtoken
const Communication = require('../models/CommunicationModel'); // hat3ml require lel communication model
const FAQ = require('../models/FAQModel'); // hat3ml require lel FAQ model
const Report = require('../models/ReportModel'); // hat3ml require lel Report model
const Ticket = require('../models/Ticket_Model'); // hat3ml require lel Ticket model
const User = require('../models/userModel'); // hat3ml require lel User model
const Workflow = require('../models/Workflow_Model'); // hat3ml require lel Workflow model

exports.createReport = async (req, res) => {
    try {
      const { tickets, agent, Tstatus, R_data } = req.body; 
      if (!tickets || !agent || !R_data) {
        return res.status(400).json({ error: 'Incomplete data for report creation' });
      }
      const newReport = new Report({ tickets, agent,Tstatus: Tstatus || true, R_data,
      });
      const savedReport = await newReport.save();
      res.status(201).json(savedReport);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getAllReports = async (req, res) => {
    try {
      const reports = await Report.find();
      res.status(200).json(reports);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getReportById = async (req, res) => {
    try {
      const report = await Report.findById(req.params.id);
      
      if (!report) {
        return res.status(404).json({ error: 'Report not found' });
      }
  
      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateReportById = async (req, res) => {
    try {
      const { tickets, agent, Tstatus, R_data } = req.body;
  
      if (!tickets || !agent || !R_data) {
        return res.status(400).json({ error: 'Incomplete data for report update' });
      }
      const updatedReport = await Report.findByIdAndUpdate(
        req.params.id,
        { tickets, agent, Tstatus: Tstatus || true, R_data },
        { new: true } // Return the updated document
      );
      if (!updatedReport) {
        return res.status(404).json({ error: 'Report not found' });
      }
      res.status(200).json(updatedReport);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteReportById = async (req, res) => {
    try {
      const deletedReport = await Report.findByIdAndDelete(req.params.id);
  
      if (!deletedReport) {
        return res.status(404).json({ error: 'Report not found' });
      }
  
      res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };