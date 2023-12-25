const express = require("express");
const ReportController = require("../controllers/ReportsController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
const router = express.Router();

// * Get all products//
router.get("/all", ReportController.getAllReports);

////
router.post("/create/:id",ReportController.createReport);

// * Delete one product//
router.delete("/delete/:id",ReportController.deleteReport);


// *  one product//
router.get("/getId/:id", ReportController.getReportById);

router.get("/analytics/:id", ReportController.getAnalytics);
module.exports = router; // ! Don't forget to export the router