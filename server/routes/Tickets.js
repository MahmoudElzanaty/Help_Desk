const express = require("express");
const Ticket = require("../models/Ticket_Model");
const TicketsController = require("../controllers/TicketsController");
const router = express.Router();
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

router.post("/createTicket" , authorizationMiddleware(['user','manager','agent']) , TicketsController.createTicket);
//router.get("/", authorizationMiddleware(['manager', 'agent']), TicketsController.getAllTickets);
//router.get("/", authorizationMiddleware(['manager', 'agent']), TicketsController.getAllTickets);
router.get("/getTicketsByManagerId", authorizationMiddleware(['manager', 'agent']), TicketsController.getTicketsByManagerId);
router.get("/getTicketsByAgentId", authorizationMiddleware(['manager', 'agent']), TicketsController.getTicketsByAgentId);

//router.get("/:id", authorizationMiddleware(['manager', 'agent']), TicketsController.getTicketById);


router.put("/updateTicket", authorizationMiddleware(['manager', 'agent']), TicketsController.updateTicket);

router.delete("/deleteTicket/:id", authorizationMiddleware(['agent','manager']), TicketsController.deleteTicket);

module.exports = router;


