const express = require("express");
const Ticket = require("../models/Ticket_Model");
const TicketsController = require("../controllers/TicketsController");
const router = express.Router();
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');


router.get("/", authorizationMiddleware(['manager', 'agent']), TicketsController.getAllTickets);

router.get("/:id", authorizationMiddleware(['manager', 'agent']), TicketsController.getTicketById);

router.post("/", authorizationMiddleware(['customer']), TicketsController.createTicket);

router.put("/:id", authorizationMiddleware(['manager', 'agent']), TicketsController.updateTicket);

router.delete("/:id", authorizationMiddleware(['manager']), TicketsController.deleteTicket);

module.exports = router;


