const ReportsModel = require("../models/ReportsModel"); // Importing the ReportsModel
const ticket = require("../models/Ticket_Model");

const reportController = {

    getAllReports: async (req, res) => {
        try {
          const reports = await ReportsModel.find();
          return res.status(200).json(reports);
        } catch (err) {
          return res.status(500).json({ error: err });
        }
      },
      createReport: async (req, res) => {
        try {
          // Fetch the ticket data
          const Tickets = await ticket.findById(req.params.id);
      
          if (!Tickets) {
            return res.status(404).json({ error: 'Ticket not found' });
          }
      
          function calculateResolutionTime(createdAt, updatedAt) {
            const createdDate = new Date(createdAt);
            const updatedDate = new Date(updatedAt);
          
            // Calculate the time difference in milliseconds
            const resolutionTimeMs = updatedDate - createdDate;
          
            // Convert milliseconds to seconds
            const resolutionTimeSec = resolutionTimeMs / 1000;
          
            return resolutionTimeSec;
          }
          // Calculate resolution time
          const resolutionTime = calculateResolutionTime(Tickets.createdAt, Tickets.updatedAt);
      
          // Fetch or calculate ticket status and ratings
          const ticketStatus = await Tickets.Status;  // Replace with appropriate code
          const ratings = await Tickets.userRate;      // Replace with appropriate code
      const agentId = await ReportsModel.findOne(req.params.agent);
          // Create a new report with the required fields
          const newReport = await ReportsModel.create({
            ResolutionTime: resolutionTime,
            Status:ticketStatus,        // Replace with the actual agent name
            agent:agentId,
            UserRate: ratings,          // Replace with the actual UserRate value
            tickets:Tickets ,        // Replace with the actual ticket ID
            // ... other fields
          });
      
          if (Tickets.Status === 'closed') {
            return res.status(200).json(newReport);
          } else {
            return res.status(404).json({ error: 'The ticket is not closed yet' });
          }
        } catch (e) {
          console.error("Error creating Report:", e);
          return res.status(400).json({ message: e.message });
        }
      },
      
      
      //Delete a Report
deleteReport: async (req, res) => {
    try {
      const report = await ReportsModel.findByIdAndDelete(req.params.id);
      return res.status(200).json({ report, msg: "deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getReportById: async (req, res) => {
    try {
      const reportModel = await ReportsModel.findById(req.params.id);
      return res.status(200).json(reportModel);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  
  getAnalytics: async (req, res) => {
    const agentId = req.params.agent;
  
    try {
      async function calculateAverageAgentRating(agentId) {
        try {
          // Calculate average rating for the agent
          const tickets = await ticket.find({
            agent: agentId,
            Status: 'closed',
            userRate: { $exists: true }
          }).select('userRate');
  
          if (tickets.length === 0) {
            return { agentId, averageRating: 0 }; // Default if no ratings are found
          }
  
          // Calculate average rating
          const totalRating = tickets.reduce((sum, ticket) => sum + ticket.userRate, 0);
          const averageRating = totalRating / tickets.length;
  
          return { agentId, averageRating };
        } catch (error) {
          console.error('Error calculating average agent ratings:', error);
          throw error;
        }
      }
  
      const totalTickets = await ticket.countDocuments({ agent: agentId });
      const openTickets = await ticket.countDocuments({ Status: 'open', agent: agentId });
      const closedTickets = await ticket.countDocuments({ Status: 'closed', agent: agentId });
      const progressTickets = await ticket.countDocuments({ Status: 'in progress', agent: agentId });
  
      const avgRate = await calculateAverageAgentRating(agentId);
  
      // Return the analytics data as JSON
      return res.status(200).json({
        totalTickets,
        openTickets,
        closedTickets,
        progressTickets,
        avgRate,
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  
};  
module.exports = reportController;