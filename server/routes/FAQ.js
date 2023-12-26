const express = require("express");
const FAQController = require("../controllers/FAQController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
const router = express.Router();
router.get("/GetAll", FAQController.getAllFAQs);

router.get("/GetById/:id", FAQController.getById);

router.get("/search", FAQController.GetBySearch);

router.post("/CreateFAQ", FAQController.createFAQ);

router.delete("/DeleteFAQ/:id", FAQController.deleteFAQById);
module.exports = router;