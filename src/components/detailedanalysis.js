// DetailedAnalysis.js
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
// import './DetailedAnalysis.css';  // For styling your component

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

function DetailedAnalysis() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the CSV file from the public folder
    fetch('/sme.csv')
      .then(response => response.text())
      .then(csvData => {
        // Parse the CSV data
        Papa.parse(csvData, {
          complete: (result) => {
            setData(result.data);
          },
        });
      })
      .catch(error => console.error('Error fetching CSV:', error));
  }, []);

  // Prepare data for the chart
  const prepareChartData = () => {
    const postDates = data.map((row) => row.Post_Date);
    const likesData = data.map((row) => parseInt(row.Likes, 10));
    const sharesData = data.map((row) => parseInt(row.Shares, 10));
    const commentsData = data.map((row) => parseInt(row.Comments, 10));
    const viewsData = data.map((row) => parseInt(row.Views, 10));

    return {
      labels: postDates,
      datasets: [
        {
          label: 'Likes',
          data: likesData,
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
        },
        {
          label: 'Shares',
          data: sharesData,
          borderColor: 'rgba(153, 102, 255, 1)',
          fill: false,
        },
        {
          label: 'Comments',
          data: commentsData,
          borderColor: 'rgba(255, 159, 64, 1)',
          fill: false,
        },
        {
          label: 'Views',
          data: viewsData,
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: false,
        },
      ],
    };
  };

  const chartData = prepareChartData();

  return (
    <div className="detailed-analysis">
      <h2>Detailed Social Media Post Analysis</h2>

      {/* Total Metrics */}
      <div className="totals">
        <p><strong>Total Likes:</strong> {data.reduce((acc, row) => acc + parseInt(row.Likes, 10), 0)}</p>
        <p><strong>Total Shares:</strong> {data.reduce((acc, row) => acc + parseInt(row.Shares, 10), 0)}</p>
        <p><strong>Total Comments:</strong> {data.reduce((acc, row) => acc + parseInt(row.Comments, 10), 0)}</p>
        <p><strong>Total Views:</strong> {data.reduce((acc, row) => acc + parseInt(row.Views, 10), 0)}</p>
      </div>

      {/* Chart for Engagement Metrics */}
      <div className="chart-container">
        <h3>Engagement Over Time</h3>
        <Line data={chartData} options={{ responsive: true, scales: { x: { beginAtZero: true } } }} />
      </div>

      {/* Table for detailed data */}
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Post ID</th>
              <th>Post Type</th>
              <th>Likes</th>
              <th>Shares</th>
              <th>Comments</th>
              <th>Views</th>
              <th>Post Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.Post_ID}</td>
                <td>{row.Post_Type}</td>
                <td>{row.Likes}</td>
                <td>{row.Shares}</td>
                <td>{row.Comments}</td>
                <td>{row.Views}</td>
                <td>{row.Post_Date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailedAnalysis;
