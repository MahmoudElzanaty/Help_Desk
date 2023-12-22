const express = require("express");
const FAQController = require("../controllers/FAQController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
const router = express.Router();
router.get("/",authorizationMiddleware(['Agent']), FAQController.getAllFAQs);

router.get("/:id",authorizationMiddleware(['Agent']), FAQController.getById);

router.get("/search",authorizationMiddleware(['User']), FAQController.GetBySearch);

router.post("/",authorizationMiddleware(['Agent']), FAQController.CreateFAQ);

router.delete("/",authorizationMiddleware(['Agent']), FAQController.DeleteFAQ);
module.exports = router;