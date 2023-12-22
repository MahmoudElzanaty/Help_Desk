const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');



router.post("/register", userController.register);

// Create user
router.post("/", authorizationMiddleware(['agent', 'user', 'manager']), userController.createUser);

// Get all users
router.get("/", authorizationMiddleware(['manager', 'agent']), userController.GetAllUsers);

// Login
router.post("/login", authorizationMiddleware(['agent', 'user', 'manager']), userController.login);




// Get one user
router.get("/:id", authorizationMiddleware(['agent', 'manager']), userController.getUserById);

// Update one user
router.put("/:id", authorizationMiddleware(['manager', 'agent']), userController.UpdateUser);

// Delete one user
router.delete("/:id", authorizationMiddleware(['manager']), userController.deleteUserById);

module.exports = router;