// UserDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css'; // Import the styles

const AdminDashboard = () => {
  
  return (
    <div className="admin-dashboard">
      <nav className="navbar">
        <Link to="/workflowList" className="nav-link">
          Workflow
        </Link>
        <Link to="/ReportsPage" className="nav-link">
          Reports
        </Link>
        <Link to="/FAQPage" className="nav-link">
          FAQ
        </Link>
      </nav>

      {/* Centered buttons with some space */}
      <div className="centered-buttons">
        <Link to="/UpdateUser" className="update-user-button">
          Update User
        </Link>
        <Link to="/makeAdmin" className="make-admin-button">
          Make Admin
        </Link>
        <Link to="/CreateUser" className="create-user-button">
          Create User
        </Link>
        <Link to="/UpdateUser" className="Update-user-button">
          Update User
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
