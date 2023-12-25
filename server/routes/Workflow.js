const express = require("express");
const router = express.Router();
const workflowController = require('../controllers/WorkflowController');

const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

// Define routes for the workflow controller
router.post('/createWorkflow', workflowController.createWorkflow);
router.get('/getAllWorkflows', workflowController.getAllWorkflows);
router.get('/getWorkflowById/:id', workflowController.getWorkflowById);
router.put('/updateWorkflowById/:id', workflowController.updateWorkflowById);
router.delete('/deleteWorkflowById/:id', workflowController.deleteWorkflowById);


module.exports = router;