const express = require("express");
const Ticket = require("../models/Ticket_Model");
const TicketsController = require("../controllers/TicketsController");
const router = express.Router();
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');
const authenticationMiddleware =require('../Middleware/authenticationMiddleware');

router.post("/createTicket" , authenticationMiddleware ,authorizationMiddleware(['agent','manager' ,'user', 'admin']) , TicketsController.createTicket);

router.get("/getTicketByUserId/:id", authorizationMiddleware(['agent','manager' ,'user', 'admin']) ,TicketsController.getTicketsByUserId);
router.get("/getAllTickets",authorizationMiddleware(['agent','manager' ,'user', 'admin']) , TicketsController.getAllTickets);

//router.get("/", authorizationMiddleware(['manager', 'agent']), TicketsController.getAllTickets);
router.get("/getTicketsByManagerId", authorizationMiddleware(['agent','manager' ,'user', 'admin']), TicketsController.getTicketsByManagerId);
router.get("/getTicketsByAgentId/:id", authorizationMiddleware(['agent','manager' ,'user', 'admin']), TicketsController.getTicketsByAgentId);




router.put("/updateTicket", authorizationMiddleware(['agent','manager' ,'user', 'admin']), TicketsController.updateTicket);

router.delete("/deleteTicket/:id", authorizationMiddleware(['manager', 'admin' , 'agent']), TicketsController.deleteTicket);

module.exports = router;