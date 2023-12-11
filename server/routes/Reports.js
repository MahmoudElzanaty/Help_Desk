const express = require("express");
const ReportsModel = require("../models/ReportsModel");
const Ticket = require("../models/Ticket_Model");
const router = express.Router();

// Get all Reports
// router.get("/", async (req, res) => {
//   try {
//     const reports = await ReportsModel.find();
//     return res.status(200).json(reports);
//   } catch (err) {
//     return res.status(500).json({ error: err });
//   }
// });

// Create a Report


router.post("/", async (req, res) => {
  try {
    const newReport = await ReportsModel.create(req.body);
    return res.status(201).json(newReport);
  } catch (e) {
    console.error("Error creating Report:", e);
    return res.status(400).json({ message: e.message });
  }
});

//Delete a Report
router.delete("/:id", async (req, res) => {
    try {
      const report = await ReportsModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({ report, msg: "deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  // router.get("/", async (req, res) => {
  //   const {Status} = req.query;

  //   try {
      
  //     if(Status === "closed"){
  //     const closedTickets = await ReportsModel.find({ Status: 'closed' });
  //     } else {
  //       return res.status(404).json({ message: 'No closed tickets found.' });
  //     }
  
  //     return res.status(200).json(closedTickets);
  //   } catch (err) {
  //     return res.status(500).json({ error: err.message });
  //   }
  // });

  router.get('/', async (req, res) => {
    try {
   
      const totalTickets = await ReportsModel.countDocuments();
      const openTickets = await ReportsModel.countDocuments({ Status: 'open' });
      const closedTickets = await ReportsModel.countDocuments({ Status: 'closed' });
      const progressTickets = await ReportsModel.countDocuments({ Status: 'in progress'});

      //for loop - count including sub-cat and cat
      //mean of the rating of the agent
  
      // Return the analytics data as JSON
      return res.status(200).json({
        totalTickets,
        openTickets,
        closedTickets,
        progressTickets,
        // ... add more analytics data as needed
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });



// router.get('/generate-agent-performance-report', async (req, res) => {
//   try {
//     // Fetch agent performance based on user ratings
//     const agentPerformance = await ReportsModel.aggregate([
//       {
//         $group: {
//           _id: '$agent',
//           avgRating: { $avg: '$Rate' },
//         },
//       },
//     ]);

//     // Create a new report document
//     const newReport = new ReportsModel({
//       agentPerformance,
//     });

//     const savedReport = await newReport.save();

//     return res.status(201).json(savedReport);
//   } catch (error) {
//     console.error('Error generating agent performance report:', error);
//     return res.status(500).json({ message: error.message });
//   }
// });

// router.get('/test', (req, res) => {
//   res.send('Hello, this is a test route!');
// });





module.exports = router;