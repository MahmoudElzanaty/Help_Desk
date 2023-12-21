const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');


// Get all users
router.get("/GetAllUsers", authorizationMiddleware(['manager', 'agent']), userController.GetAllUsers);

// Login
router.post("/login", authorizationMiddleware(['agent', 'user', 'manager']), userController.login);

router.post("/register", authorizationMiddleware(['agent', 'user', 'manager']), userController.register);


// Get one user
router.get("/getUserByid/:id", authorizationMiddleware(['agent', 'manager']), userController.getUserByid);

// Update one user
router.put("UpdateUser/:id", authorizationMiddleware(['manager', 'agent']), userController.UpdateUser);

// Delete one user
router.delete("deleteUserById/:id", authorizationMiddleware(['manager']), userController.deleteUserById);
router.post("/makeAdmin", authorizationMiddleware(['manager']), userController.makeAdmin);


module.exports = router;
