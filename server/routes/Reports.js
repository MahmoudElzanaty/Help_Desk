const express = require("express");
const ReportController = require("../controllers/ReportController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
const router = express.Router();

// * Get all products//
router.get("/all", ReportController.getAllReports);

////
router.post("/create",ReportController.createReport);

// * Delete one product//
router.delete("/delete/:id",ReportController.deleteReport);

// * ///
router.get("/GenearteReport/:id",ReportController.getGenearteReport);

// *  one product//
router.get("/getId/:id", ReportController.getReportById);

router.get("/analytics", ReportController.getAnalytics);
module.exports = router; // ! Don't forget to export the router