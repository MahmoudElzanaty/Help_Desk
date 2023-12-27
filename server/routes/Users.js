const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const authorizationMiddleware = require('../Middleware/authorizationMiddleware');

// Get all users
router.get("/GetAllUsers", authorizationMiddleware(['agent', 'user', 'manager' , 'admin']), userController.GetAllUsers);

// Login
router.post("/login", authorizationMiddleware(['agent', 'user', 'manager' , 'admin']), userController.login);

router.post("/register", authorizationMiddleware(['agent', 'user', 'manager']), userController.register);


// Get one user
router.get("/getUserByid/:id", authorizationMiddleware(['agent', 'user', 'manager' , 'admin']), userController.getUserByid);

router.put('/updateRole/:id', authorizationMiddleware(['agent', 'user', 'manager' , 'admin']), userController.updateRole);
router.post('/CreateUser', authorizationMiddleware(['agent', 'user', 'manager' , 'admin']), userController.CreateUser);
router.put("UpdateUser/:id", authorizationMiddleware(['agent', 'user', 'manager' , 'admin']), userController.UpdateUser);

// Delete one user
router.delete("deleteUserById/:id", authorizationMiddleware(['agent', 'user', 'manager' , 'admin']), userController.deleteUserById);
//router.post("/makeAdmin", authorizationMiddleware(['manager']), userController.makeAdmin);


module.exports = router;