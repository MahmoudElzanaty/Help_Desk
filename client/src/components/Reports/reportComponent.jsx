import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const CreateReportForm = () => {
  const [ticketId, setTicketId] = useState('');
  const [userRate, setUserRate] = useState(null);
  const [status, setStatus] = useState(null);
  const [resolutionTime, setResolutionTime] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch initial data if needed
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to create report
      const response = await fetch(`http://localhost:3000/api/v1/createReport/${ticketId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        // Add other headers if needed
      });

      if (response.ok) {
        const newReport = await response.json();
        console.log('Report created successfully:', newReport);

        // Update state with report details
        setUserRate(newReport.UserRate);
        setStatus(newReport.Status);
        setResolutionTime(newReport.ResolutionTime);

        // Handle success (e.g., show a success message, update state, etc.)
      } else {
        const errorData = await response.json();
        console.error('Error creating report:', errorData.message);
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error creating report:', error);
      // Handle network error or other unexpected issues
    }
  };

  return (
    <div>
      <h2>Create Report</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form fields, e.g., ticket ID input */}
        <label htmlFor="ticketId">Ticket ID:</label>
        <input
          type="text"
          id="ticketId"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          required
        />

        {/* Add other form fields as needed */}

        <button type="submit">Create Report</button>
      </form>

      {/* Display report details */}
      {userRate !== null && (
        <div>
          <h3>Report Details</h3>
          <p>User Rate: {userRate}</p>
          <p>Status: {status}</p>
          <p>Resolution Time: {resolutionTime} seconds</p>
        </div>
      )}
    <button onClick={() => navigate('/manager')}>Back to Dashboard</button>
    </div>
  );
};

export default CreateReportForm;