// UserDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './User.css'; // Import the styles

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <nav className="navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
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
