import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenerateReportComponent = () => {
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        // Replace 'http://localhost:3000' with your actual backend URL
        const response = await axios.get(`http://localhost:3000/GenearteReport/6585c098c91b1c33df656a88 `);

        // console.log('Response status:', response.status);
        // console.log('Response data:', response.data);

        if (response.status === 200) {
          setReportData(response.data);
        } else {
          setError('Failed to fetch report data');
        }
      } catch (error) {
        console.error('Error fetching report data:', error);
        setError('An error occurred while fetching report data');
      }
    };

    fetchReportData();
  }, []);

  return (
    <div>
      <h2>Generate Report</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : !reportData ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Resolution Time: {reportData.resolutionTime}</p>
          <p>Ticket Status: {reportData.ticketStatus}</p>
          <p>Ratings: {reportData.ratings}</p>
          {/* Render other report data as needed */}
        </div>
      )}
    </div>
  );
};

export default GenerateReportComponent;
