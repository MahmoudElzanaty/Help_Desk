const express = require("express");
const ReportController = require("../controllers/ReportsController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
const router = express.Router();

// * Get all products//
router.get("/allReports",authorizationMiddleware(['user','manager','agent']) , ReportController.getAllReports);

////
router.post("/createReport/:id",authorizationMiddleware(['user','manager','agent']) ,ReportController.createReport);

// * Delete one product//
router.delete("/deleteReport/:id",authorizationMiddleware(['user','manager','agent']) ,ReportController.deleteReport);


// *  one product//
router.get("/getReportById/:id",authorizationMiddleware(['user','manager','agent']) , ReportController.getReportById);

router.get("/analytics/:id",authorizationMiddleware(['user','manager','agent']) , ReportController.getAnalytics);
module.exports = router; // ! Don't forget to export the router