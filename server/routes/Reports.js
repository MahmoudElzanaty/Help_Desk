const express = require("express");
const ReportController = require("../controllers/ReportsController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
const router = express.Router();

// * Get all products//
router.get("/allReports",authorizationMiddleware(['user','manager','agent' , 'user']) , ReportController.getAllReports);

////
router.post("/createReport/:id",authorizationMiddleware(['admin','manager','agent']) ,ReportController.createReport);

// * Delete one product//
router.delete("/deleteReport/:id",authorizationMiddleware(['admin','manager','agent']) ,ReportController.deleteReport);


// *  one product//
router.get("/getReportById/:id",authorizationMiddleware(['admin','manager','agent' , 'user']) , ReportController.getReportById);

router.get("/analytics/:id",authorizationMiddleware(['admin','manager','agent' ]) , ReportController.getAnalytics);
module.exports = router; // ! Don't forget to export the router