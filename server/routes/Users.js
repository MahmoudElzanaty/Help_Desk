const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

// Create user
router.post("/", authorizationMiddleware(['agent', 'user', 'manager']), userController.createUser);

// Get all users
router.get("/", authorizationMiddleware(['manager', 'agent']), userController.getAllUsers);

// Login
router.post("/login", authorizationMiddleware(['agent', 'user', 'manager']), userController.login);

router.post("/register", authorizationMiddleware(['agent', 'user', 'manager']), userController.register);


// Get one user
router.get("/:id", authorizationMiddleware(['agent', 'manager']), userController.getUserById);

// Update one user
router.put("/:id", authorizationMiddleware(['manager', 'agent']), userController.updateUserById);

// Delete one user
router.delete("/:id", authorizationMiddleware(['manager']), userController.deleteUserById);

module.exports = router;
