import '../App.css';
import React, { useState, useEffect } from 'react';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:3000/Tickets/getAllTickets', {
        headers: {
        'Accept': 'application/json',
      },
    });
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <h1>Ticket List</h1>
      {tickets.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket._id}>
              <p>User ID: {ticket.user}</p>
              <p>Category: {ticket.category}</p>
              <p>Sub Category: {ticket.subcategory}</p>
              <p>Status: {ticket.Status}</p>
              <p>Description: {ticket.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
