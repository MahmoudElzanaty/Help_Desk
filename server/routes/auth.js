const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const TicketsController = require("../controllers/TicketsController");
const NotifiController = require("../controllers/Notificontroller");

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

router.get('/getTicketsByAgentId' , TicketsController.getTicketsByAgentId);

module.exports = router; // ! Don't forget to export the router