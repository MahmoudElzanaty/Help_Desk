import React from 'react';
import { Link } from 'react-router-dom';
import './ManagerDashboard.css'; // Import the new styles
import backgroundImagee from './help9.webp'; // Import the background image

const ManagerDashboard = () => {
  const dashboardStylee = {
    backgroundImage: `url(${backgroundImagee})`,
    backgroundColor: 'black', // Set a background color for visibility (you can remove this once the image is visible)
    backgroundSize: 'cover',
    height: '100vh', // Ensure the component has a height
  };

  return (
    <div className="manager-dashboard" style={dashboardStylee}>
      <nav className="navbar">
        <Link to="/workflowList" className="nav-link">Workflow</Link>
        <Link to="/ReportsPage" className="nav-link">Reports</Link>
        <Link to="/FAQPage" className="nav-link">FAQ</Link>
      </nav>

      <div className="content">
        <h2>Hello Manager</h2>
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
