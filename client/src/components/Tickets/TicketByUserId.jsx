// TicketByUserId.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TicketByUserId.css'; // Import your custom styles

const TicketByUserId = () => {
  const [userId, setUserId] = useState('');
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/Tickets/getTicketByUserId/${userId}`, {
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  return (
    <div className="all-tickets-page">
      <h1>Tickets by User ID</h1>
      <div className="search-section">
        <label>
          Enter User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {tickets.length > 0 ? (
        <ul className="ticket-list">
          {tickets.map((ticket) => (
            <li key={ticket._id} className="ticket">
              <div className="ticket-info">
                <p className="ticket-detail">User ID: {ticket.user}</p>
                <p className="ticket-detail">Category: {ticket.Category}</p>
                <p className="ticket-detail">Sub Category: {ticket.Sub_Category}</p>
                <p className="ticket-detail">Status: {ticket.Status}</p>
                <p className="ticket-detail">Description: {ticket.TDescribtion}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets found for this user.</p>
      )}
      <button className="back-button" onClick={() => navigate('/view-ticket')}>
        Back to All Tickets
      </button>
    </div>
  );
};

export default TicketByUserId;
