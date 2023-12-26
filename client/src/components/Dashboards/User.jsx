import React from 'react';
import { Link } from 'react-router-dom';
import './User.css'; // Import the styles
import backgroundImage from './help9.webp'; // Import the background image

const UserDashboard = () => {
  const dashboardStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: 'black',
    backgroundSize: 'cover',
  };

  return (
    
    <div className="user-dashboard" style={dashboardStyle}>
      <nav className="navbar">

        <Link to="/WorkflowUser" className="nav-link">Workflow</Link>
        <Link to="/ReportsPage" className="nav-link">Reports</Link>
        <Link to="/FAQPage" className="nav-link">FAQ</Link>
      </nav>

      

      {/* Create Ticket button outside the navbar */}
      <Link to="/create-ticket">
        <button className="create-ticket-button">Create Ticket</button>
      </Link>

      <Link to="/UpdateUser" className="Update-user-button">
          Update User
        </Link>

        <Link to="/ticket-byId" className="view-ticket-button">
           View Tickets
        </Link>
    </div>
  );
};

export default UserDashboard;