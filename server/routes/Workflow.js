const express = require("express");
const router = express.Router();
const workflowController = require('../controllers/WorkflowController');

const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

// Define routes for the workflow controller
router.post('/createWorkflow',authorizationMiddleware(['agent', 'user', 'manager' , 'admin']), workflowController.createWorkflow);
router.get('/getAllWorkflows',authorizationMiddleware(['agent', 'user', 'manager' , 'admin']), workflowController.getAllWorkflows);
router.get('/getWorkflowById/:id', authorizationMiddleware(['agent', 'user', 'manager' , 'admin']),workflowController.getWorkflowById);
router.put('/updateWorkflowById/:id',authorizationMiddleware(['agent', 'user', 'manager' , 'admin']), workflowController.updateWorkflowById);
router.delete('/deleteWorkflowById/:id', authorizationMiddleware(['agent', 'user', 'manager' , 'admin']),workflowController.deleteWorkflowById);

module.exports = router;