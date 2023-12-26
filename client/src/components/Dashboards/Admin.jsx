// UserDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './User.css'; // Import the styles

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <nav className="navbar">
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/ReportsPage" className="nav-link">Reports</Link>
        <Link to="/FAQPage" className="nav-link">FAQ</Link>
      </nav>

      <div className="content">
        <h2>Welcome to Your Dashboard</h2>
        {/* Other content in the user dashboard */}
      </div>

      {/* Create Ticket button outside the navbar */}
      <Link to="/create-ticket" className="create-ticket-button">
        Create Ticket
      </Link>
    </div>
  );
};

export default AdminDashboard;
