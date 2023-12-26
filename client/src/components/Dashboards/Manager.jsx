import React from 'react';
import { Link } from 'react-router-dom';
import './ManagerDashboard.css'; // Import the new styles

const ManagerDashboard = () => {
  return (
    <div className="manager-dashboard">
      <nav className="navbar">
        <Link to="/workflowList" className="nav-link">Workflow</Link>
        <Link to="/ReportsPage" className="nav-link">Reports</Link>
        <Link to="/FAQPage" className="nav-link">FAQ</Link>
      </nav>

      <div className="content">
        <h2>Welcome to Your Dashboard</h2>
        {/* Other content in the user dashboard */}
      </div>

      {/* Create Ticket buttons */}
      <Link to="/analytics" className="Show-Analytics">
        Show Analytics
      </Link>
      
      

    </div>
  );
};

export default ManagerDashboard;
