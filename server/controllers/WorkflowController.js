const bcrypt = require('bcryptjs'); // hat3ml require lel bcrypt
const jwt = require('jsonwebtoken'); // hat3ml require lel jsonwebtoken
const Communication = require('../models/CommunicationModel'); // hat3ml require lel communication model
const FAQ = require('../models/FAQModel'); // hat3ml require lel FAQ model
const Report = require('../models/ReportModel'); // hat3ml require lel Report model
const Ticket = require('../models/Ticket_Model'); // hat3ml require lel Ticket model
const User = require('../models/userModel'); // hat3ml require lel User model
const Workflow = require('../models/Workflow_Model'); // hat3ml require lel Workflow model

exports.createWorkflow = async (req, res) => {
    try {
      const { user, Category, Sub_Category, Workflow_Steps, Issue_Type } = req.body;
      if (!user || !Category || !Sub_Category || !Workflow_Steps || !Issue_Type) {
        return res.status(400).json({ error: 'Incomplete data for workflow creation' });
      }
  
      const newWorkflow = new Workflow({user, Category, Sub_Category, Workflow_Steps, Issue_Type,
      });
      const savedWorkflow = await newWorkflow.save();
      res.status(201).json(savedWorkflow);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getAllWorkflows = async (req, res) => {
    try {
      const workflows = await Workflow.find();
      res.status(200).json(workflows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getWorkflowById = async (req, res) => {
    try {
      const workflow = await Workflow.findById(req.params.id);
      if (!workflow) {
        return res.status(404).json({ error: 'Workflow not found' });
      }
      res.status(200).json(workflow);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.updateWorkflowById = async (req, res) => {
    try {
      const { user, Category, Sub_Category, Workflow_Steps, Issue_Type } = req.body;
      if (!user || !Category || !Sub_Category || !Workflow_Steps || !Issue_Type) {
        return res.status(400).json({ error: 'Incomplete data for workflow update' });
      }
      const updatedWorkflow = await Workflow.findByIdAndUpdate(
        req.params.id,
        { user, Category, Sub_Category, Workflow_Steps, Issue_Type },
        { new: true } // Return the updated document
      );
  
      if (!updatedWorkflow) {
        return res.status(404).json({ error: 'Workflow not found' });
      }
  
      res.status(200).json(updatedWorkflow);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  exports.deleteWorkflowById = async (req, res) => {
    try {
      const deletedWorkflow = await Workflow.findByIdAndDelete(req.params.id);
  
      if (!deletedWorkflow) {
        return res.status(404).json({ error: 'Workflow not found' });
      }
  
      res.status(200).json({ message: 'Workflow deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  