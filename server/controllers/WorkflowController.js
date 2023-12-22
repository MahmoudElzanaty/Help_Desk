const Workflow = require('../models/Workflow_Model'); // hat3ml require lel Workflow model

const WorkflowController = {
  createWorkflow: async (req, res) => {
    try {
      const { user, Category, Sub_Category, Workflow_Steps, Issue_Type } = req.body;
      if (!user || !Category || !Sub_Category || !Workflow_Steps || !Issue_Type) {
        return res.status(400).json({ error: 'Incomplete data for workflow creation' });
      }

      const newWorkflow = new Workflow({
        user,
        Category,
        Sub_Category,
        Workflow_Steps,
        Issue_Type,
      });
      const savedWorkflow = await newWorkflow.save();
      res.status(201).json(savedWorkflow);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllWorkflows: async (req, res) => {
    try {
      const workflows = await Workflow.find();
      res.status(200).json(workflows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getWorkflowById: async (req, res) => {
    try {
      const workflow = await Workflow.findById(req.params.id);
      if (!workflow) {
        return res.status(404).json({ error: 'Workflow not found' });
      }
      res.status(200).json(workflow);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateWorkflowById: async (req, res) => {
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
  },

  deleteWorkflowById: async (req, res) => {
    try {
      const deletedWorkflow = await Workflow.findByIdAndDelete(req.params.id);

      if (!deletedWorkflow) {
        return res.status(404).json({ error: 'Workflow not found' });
      }

      res.status(200).json({ message: 'Workflow deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = WorkflowController;