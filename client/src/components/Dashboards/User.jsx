// UserDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './User.css'; // Import the styles

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <nav className="navbar">
      <Link to="/WorkflowUser" className="nav-link">Workflow</Link>
      <Link to="/FAQPageUser" className="nav-link">FAQ</Link>
      </nav>

      <div className="content">
        <h2>Welcome to Your Dashboard</h2>
        {/* Other content in the user dashboard */}
      </div>

      {/* Create Ticket button outside the navbar */}
      <Link to="/create-ticket">
        <button className="create-ticket-button">Create Ticket</button>
      </Link>
    </div>
  );
};

export default UserDashboard;
