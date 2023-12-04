const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const authorizationMiddleware=require('../Middleware/authorizationMiddleware')

router.post("/", authorizationMiddleware(['agent' , 'customer', 'manager']),UserController.createUser);

// * Get all users
router.get("/",  authorizationMiddleware(['manager','agent']),UserController.getAllUsers);

router.get("/", authorizationMiddleware(['agent' , 'customer', 'manager']),UserController.login);

// * Get one user
router.get("/:id", authorizationMiddleware(['agent','manager']), UserController.getUserById);

// * Update one user
router.put("/:id",  authorizationMiddleware(['manager','agent']),UserController.updateUserById);

// * Delete one user
router.delete("/:id", authorizationMiddleware(['manager']), UserController.deleteUserById);

// get shopping cart


module.exports = router;