const express = require("express");
const ReportController = require("../controllers/ReportsController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
const authenticationMiddleware = require('../Middleware/authenticationMiddleware');
const router = express.Router();

// * Get all products//
router.get("/all", authenticationMiddleware, ReportController.getAllReports);

////
router.post("/create",authenticationMiddleware,ReportController.createReport);

// * Delete one product//
router.delete("/delete/:id",authenticationMiddleware, ReportController.deleteReport);

// * ///
router.get("/GenearteReport/:id",authenticationMiddleware,ReportController.getGenearteReport);

// *  one product//
router.get("/getId/:id", authenticationMiddleware, ReportController.getReportById);

router.get("/analytics", authenticationMiddleware, ReportController.getAnalytics);

module.exports = router; // ! Don't forget to export the router