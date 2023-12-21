const express = require('express');
const router = express.Router();
const { submitTicket, changeTicketStatus } = require('../controllers/Notificontroller');

// Middleware to send a notification when a new ticket is created
router.post('/submit-ticket', submitTicket);

// Middleware to send a notification when the ticket status is changed
router.put('/change-status', changeTicketStatus);

module.exports = router;
