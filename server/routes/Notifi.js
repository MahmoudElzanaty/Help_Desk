const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../Middleware/authenticationMiddleware');
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');
const NotifiController = require('../controllers/Notificontroller');


// Middleware to send a notification when a new ticket is created
router.post('/submit-ticket',authorizationMiddleware(['admin','manager','agent' , 'user']) , NotifiController.submitTicket);

// Middleware to send a notification when the ticket status is changed
router.put('/change-status',authorizationMiddleware(['admin','manager','agent','user']) ,NotifiController.changeTicketStatus);

//Integrated Messaging system
router.post('/send-email-to-user',authorizationMiddleware(['admin','manager','agent','user']) ,NotifiController.sendEmailToUser);

module.exports = router;