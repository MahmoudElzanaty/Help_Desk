// UserDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AgentDashboard.css'; // Import the styles

const Agent = () => {
  return (
    <div className="agent-dashboard">
      <nav className="navbar">
        <Link to="/workflowList" className="nav-link">
          Workflow
        </Link>
        <Link to="/ReportsPageAgent" className="nav-link">
          Reports
        </Link>
        <Link to="/FAQPage" className="nav-link">
          FAQ
        </Link>
      </nav>

      {/* Centered and inline buttons */}
      <div className="button-container">
        <Link to="/ticket-byId">
          <button>View Tickets by id </button>
        </Link>

        <Link to="/view-ticket">
          <button>View Tickets</button>
        </Link>

        <Link to="/AgentTicketsPage">
          <button>View Assigned Tickets</button>
        </Link>

        <Link to="/UpdateUser" className="Update-user-button">
          Update User
        </Link>
      </div>
    </div>
  );
};

export default Agent;
