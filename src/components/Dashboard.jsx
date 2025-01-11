// src/components/Dashboard.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css'; // Make sure to add the corresponding CSS file

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Exercise Level',
        data: data.exercise,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Sleep Hours',
        data: data.sleep,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
      },
      {
        label: 'Stress Levels',
        data: data.stress,
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Health Dashboard</h2>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;
