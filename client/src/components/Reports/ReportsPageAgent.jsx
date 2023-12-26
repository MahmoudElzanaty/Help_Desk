// ReportsPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './ReportsPage.css'; // Import your custom styles

const ReportsPageAgent = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/getAllReports', {
          headers: {
            'Accept': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setReports(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setError(`Error fetching reports: ${error.message}`);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>All Reports</h1>
        <div className="buttons-container">
        
          <Link to="/report-byId" className="redirect-button">
            Get Report By ID
          </Link>
          <Link to="/Agent" className="redirect-button">
            Back to Dashboard
          </Link>
         
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}

      {reports && reports.length > 0 ? (
        <div className="report-table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Agent ID</th>
                <th>Report Data</th>
                <th>Resolution Time</th>
                <th>User Rate</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td>{report.tickets}</td>
                  <td>{report.agent}</td>
                  <td>{report.R_data}</td>
                  <td>{report.ResolutionTime}</td>
                  <td>{report.UserRate}</td>
                  {/* Add more cells based on report fields */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No reports found.</p>
      )}
    </div>
  );
};

export default ReportsPageAgent;
