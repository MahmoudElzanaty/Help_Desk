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
          const newReport = await ReportsModel.create(req.body);
          return res.status(201).json(newReport);
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

  
 
  getGenearteReport: async (req, res) => {
    try {
        function calculateResolutionTime(createdAt, updatedAt) {
            const createdDate = new Date(createdAt);
            const updatedDate = new Date(updatedAt);
          
            // Calculate the time difference in milliseconds
            const resolutionTimeMs = updatedDate - createdDate;
          
            // Convert milliseconds to seconds
            const resolutionTimeSec = resolutionTimeMs / 1000;
          
            return resolutionTimeSec;
          }

          
      const tickets = await ticket.findById(req.params.id);
      const resolutionTime = await calculateResolutionTime(tickets.createdAt, tickets.updatedAt);
      const ticketStatus = await tickets.Status;

      const ratings = await tickets.userRate;

      if (!tickets) {
        return res.status(404).json({ error: 'Ticket not found' });
      }
  
      if (tickets.Status === 'closed') {
        // Calculate resolution time based on createdAt and updatedAt
   
        // Calculate average rating of the agent
  
        return res.status(200).json({ resolutionTime, tickets,ticketStatus,ratings });
      } else {
        return res.status(404).json({ error: 'The ticket is not closed yet' });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
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
    try {

               
async function calculateAverageAgentRating() {
  try {
    // Get distinct agents from the collection
    const agents = await ticket.distinct('agent');

    // Calculate average rating for each agent
    const averageRatings = await Promise.all(
      agents.map(async (agentId) => {
        // Find all closed tickets for the agent with user ratings
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
      })
    );

    return averageRatings;
  } catch (error) {
    console.error('Error calculating average agent ratings:', error);
    throw error;
  }
}
      const totalTickets = await ticket.countDocuments();
      const openTickets = await ticket.countDocuments({ Status: 'open' });
      const closedTickets = await ticket.countDocuments({ Status: 'closed' });
      const progressTickets = await ticket.countDocuments({ Status: 'in progress' });
  
      const avgRate = await calculateAverageAgentRating();
  
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