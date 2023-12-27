const express = require("express");
const Ticket = require("../models/Ticket_Model");
const TicketsController = require("../controllers/TicketsController");
const router = express.Router();
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

router.post("/createTicket" , authorizationMiddleware(['user']) , TicketsController.createTicket);

router.get("/getTicketByUserId/:id", authorizationMiddleware(['agent','manager' ,'user', 'admin']) ,TicketsController.getTicketsByUserId);
router.get("/getAllTickets",authorizationMiddleware(['manger', 'admin' , 'agent']) , TicketsController.getAllTickets);

//router.get("/", authorizationMiddleware(['manager', 'agent']), TicketsController.getAllTickets);
router.get("/getTicketsByManagerId", authorizationMiddleware(['manger', 'admin' , 'agent']), TicketsController.getTicketsByManagerId);
router.get("/getTicketsByAgentId/:id", authorizationMiddleware(['manger', 'admin' , 'agent']), TicketsController.getTicketsByAgentId);




router.put("/updateTicket", authorizationMiddleware(['manger', 'admin' , 'agent']), TicketsController.updateTicket);

router.delete("/deleteTicket/:id", authorizationMiddleware(['manger', 'admin' , 'agent']), TicketsController.deleteTicket);

module.exports = router;