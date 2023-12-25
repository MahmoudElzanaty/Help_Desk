// AllTicketsPage.js
import React, { useEffect, useState } from 'react';

const AllTicketsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const response = await fetch('http://localhost:3000/Tickets/getAllTickets', {
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
    <div>
      <h1>All Tickets Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
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
        <p>No tickets found.</p>
      )}
    </div>
  );
};

export default AllTicketsPage;
