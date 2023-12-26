import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const AnalyticsChart = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    // Fetch analytics data from your server
    // You can use fetch, axios, or any preferred library for HTTP requests
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/Reports/analytics'); // Update with your API endpoint
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchData();
  }, []);

  if (!analyticsData) {
    return <div>Loading...</div>;
  }

  // Extract relevant data for chart
  const { totalTickets, openTickets, closedTickets, progressTickets, avgRate } = analyticsData;

  // Format data for Chart.js
  const chartData = {
    labels: ['Total', 'Open', 'Closed', 'In Progress'],
    datasets: [
      {
        label: 'Number of Tickets',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [totalTickets, openTickets, closedTickets, progressTickets],
      },
    ],
  };

  return (
    <div>
      <h2>Analytics Chart</h2>
      <Bar data={chartData} />

    </div>
  );
};

export default AnalyticsChart;
