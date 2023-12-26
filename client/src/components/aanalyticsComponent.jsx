import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import './aanalyticsComponent.css';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const AnalyticsComponent = () => {
  const [agentId, setAgentId] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);
  const navigate = useNavigate();

  const handleFetchAnalytics = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/analytics/${agentId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    }
  };

  const chartData = {
    labels: ['Total Tickets', 'Open Tickets', 'Closed Tickets', 'In Progress Tickets', 'Average Rating'],
    datasets: [
      {
        label: 'Analytics Data',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [
          analyticsData?.totalTickets || 0,
          analyticsData?.openTickets || 0,
          analyticsData?.closedTickets || 0,
          analyticsData?.progressTickets || 0,
          analyticsData?.avgRate?.averageRating || 0,
        ],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div>
      <h2>Analytics Component</h2>
      <label>
        Enter Agent ID:
        <input type="text" value={agentId} onChange={(e) => setAgentId(e.target.value)} />
      </label>
      <button onClick={handleFetchAnalytics}>Fetch Analytics</button>

      {analyticsData && (
        <div>
          <h3>Analytics Data</h3>
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}

      <button onClick={() => navigate('/manager')}>Back to Dashboard</button>
    </div>
  );
};

export default AnalyticsComponent;