// TicketByReportId.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketByReportId = () => {
  const [reportId, setReportId] = useState('');
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/getReportById/${reportId}`, {
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error('Error fetching report:', error);
    }
  };

  return (
    <div>
      <h1>Get Report by ID</h1>
      <label>
        Enter Report ID:
        <input type="text" value={reportId} onChange={(e) => setReportId(e.target.value)} />
      </label>
      <button onClick={handleSearch}>Search</button>

      {report ? (
        <div>
          <p>Report ID: {report._id}</p>
          <p>Agent ID: {report.agent}</p>
          <p>Resolution Time: {report.ResolutionTime}</p>
          <p>User Rate: {report.UserRate}</p>
          <p>Status: {report.Status}</p>
        </div>
      ) : (
        <p>No report found for this ID.</p>
      )}
      <button onClick={() => navigate('/manager')}>Back to Dashboard</button>
    </div>
  );
};

export default TicketByReportId;