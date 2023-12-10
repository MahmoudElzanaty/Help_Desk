const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController");

// * login
router.post("/login",UserController.login );
// * register
router.post("/register",UserController.register);

module.exports = router; // ! Don't forget to export the router