import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportsListComponent = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Replace 'http://localhost:3000' with your actual backend URL
        const response = await axios.get('http://localhost:3000/Reports/all');
        console.log(response);
        if (response.status === 200) {
          setReports(response.data);
        } else {
          setError('Failed to fetch reports');
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
        setError('An error occurred while fetching reports');
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h2>All Reports</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : !reports.length ? (
        <p>No reports available</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report._id}>
              <p>Tickets: {report.tickets}</p>
              <p>Agent: {report.agent}</p>
              <p>R data: {report.R_data}</p>
              {/* Add other fields as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportsListComponent;
