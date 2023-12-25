// AgentDashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AgentDashboard.css'; // Import the styles

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [userId, setUserId] = useState(null); // State to store the user ID

  useEffect(() => {
    // Fetch user ID from local storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    // Fetch tickets assigned to the agent when the component mounts
    const fetchTickets = async () => {
      try {
        const response = await fetch(`/api/getTicketsByAgentId/${userId}`);
        if (response.ok && response.headers.get('Content-Type')?.includes('application/json')) {
          const ticketData = await response.json();
          setTickets(ticketData);
        } else {
          console.error('Error fetching tickets:', response.status);
          // Handle non-JSON response, e.g., display an error message
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    if (userId) {
      fetchTickets();
    }
  }, [userId]); // Include userId in the dependency array to refetch tickets when it changes

  return (
    <div className="agent-dashboard">
      <nav className="navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <div className="content">
        <h2>Welcome to Your Dashboard</h2>
        {/* Display tickets in a visually appealing way */}
        <div className="ticket-list">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="ticket-card">
              {/* Display ticket information */}
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>
              {/* You can add more details or styling as needed */}
            </div>
          ))}
        </div>

        {/* Add buttons for updating and closing tickets */}
        <div className="ticket-buttons">
          <Link to="/updateticket">
            <button className="update-ticket-button">Update Ticket</button>
          </Link>
          <Link to="/closeticket">
            <button className="close-ticket-button">Close Ticket</button>
          </Link>
        </div>
      </div>

      {/* Create Ticket button outside the navbar */}
      {/* ... */}
    </div>
  );
};

export default AgentDashboard;
