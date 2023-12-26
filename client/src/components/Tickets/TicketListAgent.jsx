// AgentTicketsPage.jsx
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './TicketList.css';



const AgentTicketsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchAgentTickets = async () => {
      try {
        const storedUserId = Cookies.get('token');
        console.log('Stored User ID:', storedUserId);
        setUserId(storedUserId);

        const agentId = storedUserId;
        const response = await fetch(`http://localhost:3000/api/v1/Tickets/getTicketsByAgentId/${agentId}`, {
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
        console.error('Error fetching agent tickets:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAgentTickets();
  }, []);

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/Notifi/change-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ticketId,
          newStatus,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
      }

      // Update the ticket status in the local state
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, Status: newStatus } : ticket
        )
      );
    } catch (error) {
      console.error('Error changing ticket status:', error.message);
    }
  };

  return (
    <div className="agent-tickets-page">
      <div className="header-box">
        <h1>Agent Tickets Page</h1>
      </div>
      {loading && <p className="loading-message">Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {tickets.length > 0 ? (
        <ul className="ticket-list">
          {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} onStatusChange={handleStatusChange} />
          ))}
        </ul>
      ) : (
        <p>No tickets found for the agent.</p>
      )}
    </div>
  );
};

// TicketItem.jsx
const TicketItem = ({ ticket, onStatusChange }) => (
  <li className="ticket">
    <div className="ticket-info">
      <p className="ticket-detail">
        <span className="bold-text">User ID:</span> {ticket.user}
      </p>
      <p className="ticket-detail">
        <span className="bold-text">Category:</span> {ticket.Category}
      </p>
      <p className="ticket-detail">
        <span className="bold-text">Sub Category:</span> {ticket.Sub_Category}
      </p>
      <p className="ticket-detail">
        <span className="bold-text">Status:</span> {ticket.Status}
      </p>
      <p className="ticket-detail">
        <span className="bold-text">Description:</span> {ticket.TDescribtion}
      </p>
    </div>
    <div className="status-change">
      <select value={ticket.Status} onChange={(e) => onStatusChange(ticket._id, e.target.value)}>
        <option value="open">Open</option>
        <option value="inProgress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <button onClick={() => onStatusChange(ticket._id, ticket.Status)}>Change Status</button>
    </div>
  </li>
);

export default AgentTicketsPage;
