// UpdateTicketPage.js
import React, { useState } from 'react';

const UpdateTicketPage = () => {
  const [ticketId, setTicketId] = useState('');
  const [updateData, setUpdateData] = useState({});
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateTicket = async (e) => {
    e.preventDefault();

    try {
      // Perform validation if needed

      // Send the update request to the server
      const response = await fetch('http://localhost:3000/api/v1/updateTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketId, updateData }),
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        setResponseMessage(`Ticket updated successfully. Updated data: ${JSON.stringify(updatedTicket)}`);
      } else {
        const errorData = await response.json();
        setResponseMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred during ticket update.');
    }
  };

  return (
    <div>
      <h2>Update Ticket</h2>
      <form onSubmit={handleUpdateTicket}>
        <div>
          <label>Ticket ID:</label>
          <input type="text" name="ticketId" value={ticketId} onChange={(e) => setTicketId(e.target.value)} />
        </div>

        {/* Add other form fields for updateData */}
        <div>
          <label>Update Field 1:</label>
          <input type="text" name="field1" value={updateData.field1 || ''} onChange={handleInputChange} />
        </div>

        <div>
          <label>Update Field 2:</label>
          <input type="text" name="field2" value={updateData.field2 || ''} onChange={handleInputChange} />
        </div>

        <button type="submit">Update Ticket</button>
      </form>

      {responseMessage && <p className="response-message">{responseMessage}</p>}
    </div>
  );
};

export default UpdateTicketPage;
