const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const TicketsController = require("../controllers/TicketsController");
const NotifiController = require("../controllers/Notificontroller");
const ReportsController = require("../controllers/ReportsController");
const FAQController = require("../controllers/FAQController");
const WorkflowController = require("../controllers/WorkflowController")


// * login
router.post("/login",UserController.login );
// * register
router.post("/register",UserController.register);

//router.put("/makeAgent" , UserController.makeAgent)

router.post("/createTicket" ,TicketsController.createTicket);

router.post('/submit-ticket' , NotifiController.submitTicket);

router.put('/change-status' , NotifiController.changeTicketStatus);

router.post('/send-email-to-user' , NotifiController.sendEmailToUser);

router.get('/getUserByid' , UserController.getUserByid);

router.put('/updateTicket' , TicketsController.updateTicket);

router.get('/getTicketsByAgentId/:id' , TicketsController.getTicketsByAgentId);

router.get('/getTicketsByUserId/:id' , TicketsController.getTicketsByUserId);

router.get('/getAllTickets' ,  TicketsController.getAllTickets);

router.get('/getAllReports' , ReportsController.getAllReports);

router.post('/createReport/:id' , ReportsController.createReport);

router.get('/getReportById/:id' , ReportsController.getReportById);

router.get('/analytics/:id' , ReportsController.getAnalytics);

router.get('/getAllFAQs' , FAQController.getAllFAQs);

router.post('/createFAQ' , FAQController.createFAQ);

router.get('/searchFAQ' , FAQController.GetBySearch);

router.delete('/deleteFAQ/:id', FAQController.deleteFAQById);

router.get('/getAllWorkflows' , WorkflowController.getAllWorkflows);

router.get('/getWorkflowById/:id' , WorkflowController.getWorkflowById);

router.delete('/deleteWorkflowById/:id' , WorkflowController.deleteWorkflowById);

router.post('/createWorkflow' , WorkflowController.createWorkflow);

router.post("/CreateUser", UserController.CreateUser);

router.put("/updateRole/:id", UserController.updateRole);

router.put('/updateWorkflowById/:id' , WorkflowController.updateWorkflowById);

router.put('/UpdateUser/:id' , UserController.UpdateUser)




module.exports = router; // ! Don't forget to export the router