const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");
const TicketsController = require("../controllers/TicketsController")

// * login
router.post("/login",UserController.login );
// * register
router.post("/register",UserController.register);

router.post("/createTicket" ,TicketsController.createTicket)
module.exports = router; // ! Don't forget to export the router