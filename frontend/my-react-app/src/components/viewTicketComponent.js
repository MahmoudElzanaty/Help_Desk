import '../App.css';
import React, { useState, useEffect } from 'react';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:3000/tickets');
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
              <p>User: {ticket.user}</p>
              <p>Category: {ticket.Category}</p>
              <p>Sub Category: {ticket.Sub_Category}</p>
              <p>Status: {ticket.Status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TicketList;
