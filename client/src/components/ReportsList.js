import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReportsList.css'; // Import a separate CSS file for styling

const ReportsList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/Reports/all', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []); 

  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/Reports/delete/${reportId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setReports((prevReports) => prevReports.filter((report) => report._id !== reportId));
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  return (
    <div className="reports-container">
      <h2>Reports List</h2>
      <div className="reports-grid">
        {reports.map((report) => (
          <div key={report._id} className="report-box">
            <p>Ticket ID: {report.tickets}</p>
            <p>Agent ID: {report.agent}</p>
            <p>Data: {report.R_data}</p>
            <p>Resolution Time: {report.ResolutionTime}</p>
            <p>User Rate: {report.UserRate}</p>
            <button onClick={() => handleDelete(report._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsList;
