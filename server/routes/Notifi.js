const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../Middleware/authenticationMiddleware');
const NotifiController = require('../controllers/Notificontroller');

// Middleware to send a notification when a new ticket is created
router.post('/submit-ticket',authenticationMiddleware,NotifiController.submitTicket);

// Middleware to send a notification when the ticket status is changed
router.put('/change-status', authenticationMiddleware,NotifiController.changeTicketStatus);

//Integrated Messaging system
router.post('/send-email-to-user',authenticationMiddleware,NotifiController.sendEmailToUser);

module.exports = router;