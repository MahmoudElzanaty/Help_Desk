const express = require("express");
const FAQController = require("../controllers/FAQController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

//const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
const router = express.Router();
router.get("/GetAll",authorizationMiddleware(['manager', 'admin' , 'agent' , 'user']), FAQController.getAllFAQs);

router.get("/GetById/:id",authorizationMiddleware(['manager', 'admin' , 'agent' , 'user']), FAQController.getById);

router.get("/searchFAQ",authorizationMiddleware(['manager', 'admin' , 'agent' , 'user']), FAQController.GetBySearch);

router.post("/CreateFAQ",authorizationMiddleware(['manager', 'admin' , 'agent']), FAQController.createFAQ);

router.delete("/DeleteFAQ/:id",authorizationMiddleware(['manager', 'admin' , 'agent']), FAQController.deleteFAQById);
module.exports = router;