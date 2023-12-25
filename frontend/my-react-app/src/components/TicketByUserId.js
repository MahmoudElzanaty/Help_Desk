// TicketByUserId.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Tickets by User ID</h1>
      <label>
        Enter User ID:
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <button onClick={handleSearch}>Search</button>

      {tickets.length > 0 ? (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket._id}>
              <p>User ID: {ticket.user}</p>
              <p>Category: {ticket.Category}</p>
              <p>Sub Category: {ticket.Sub_Category}</p>
              <p>Status: {ticket.Status}</p>
              <p>Description: {ticket.TDescribtion}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets found for this user.</p>
      )}
      <button onClick={() => navigate('/view-ticket')}>Back to All Tickets</button>
    </div>
  );
};

export default TicketByUserId;
