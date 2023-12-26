// AllTicketsPage.js
import React, { useEffect, useState } from 'react';
import './TicketList.css'; // Import your custom styles

const AllTicketsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/getAllTickets', {
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAllTickets();
  }, []);

  return (
    <div className="all-tickets-page">
      <h1>All Tickets Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
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
        <p>No tickets found.</p>
      )}
    </div>
  );
};

export default AllTicketsPage;