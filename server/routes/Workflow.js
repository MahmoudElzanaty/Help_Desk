const express = require("express");
const router = express.Router();
const workflowController = require('../controllers/WorkflowController');
const authenticationMiddleware = require('../Middleware/authenticationMiddleware');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

// Define routes for the workflow controller
router.post('/createWorkflow', authenticationMiddleware,workflowController.createWorkflow);
router.get('/getAllWorkflows',authenticationMiddleware, workflowController.getAllWorkflows);
router.get('/getWorkflowById/:id', authenticationMiddleware,workflowController.getWorkflowById);
router.put('/updateWorkflowById/:id', authenticationMiddleware,workflowController.updateWorkflowById);
router.delete('/deleteWorkflowById/:id',authenticationMiddleware, workflowController.deleteWorkflowById);


module.exports = router;