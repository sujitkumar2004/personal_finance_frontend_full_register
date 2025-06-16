// import React, { useEffect, useState } from 'react';
// import api from '../services/api';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend
// } from 'chart.js';

// Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

// function LineChart() {
//   const [monthlyData, setMonthlyData] = useState([]);
//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };
//   const year = new Date().getFullYear();

//   useEffect(() => {
//     const fetchAll = async () => {
//       const results = await Promise.all(
//         Array.from({ length: 12 }, (_, i) =>
//           api.get(`/reports/monthly/${year}/${i + 1}`, { headers })
//             .then(res => res.data)
//             .catch(() => null)
//         )
//       );
//       setMonthlyData(results);
//     };
//     fetchAll();
//   }, []);

//   const labels = Array.from({ length: 12 }, (_, i) => `M${i + 1}`);

//   const incomeData = monthlyData.map(r =>
//     r ? Object.values(r.totalIncome || {}).reduce((a, b) => a + Number(b), 0) : 0
//   );
//   const expenseData = monthlyData.map(r =>
//     r ? Object.values(r.totalExpenses || {}).reduce((a, b) => a + Number(b), 0) : 0
//   );
//   const savingsData = monthlyData.map(r =>
//     r ? Number(r.netSavings) : 0
//   );

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Income',
//         data: incomeData,
//         borderColor: '#22c55e',
//         backgroundColor: '#22c55e33',
//         tension: 0.4,
//       },
//       {
//         label: 'Expenses',
//         data: expenseData,
//         borderColor: '#ef4444',
//         backgroundColor: '#ef444433',
//         tension: 0.4,
//       },
//       {
//         label: 'Net Savings',
//         data: savingsData,
//         borderColor: '#0ea5e9',
//         backgroundColor: '#0ea5e933',
//         tension: 0.4,
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Monthly Financial Overview' }
//     },
//     scales: {
//       y: { beginAtZero: true }
//     }
//   };

//   return (
//     <div style={{ marginTop: '30px', background: '#1e293b', padding: '16px', borderRadius: '8px' }}>
//       <h3 style={{ color: '#93c5fd' }}>Monthly Income vs Expenses vs Savings</h3>
//       <Line data={data} options={options} height={250} />
//     </div>
//   );
// }

// export default LineChart;
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Line } from 'react-chartjs-2';
import {
  Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend
} from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function LineChart() {
  const [monthlyData, setMonthlyData] = useState([]);
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  const year = new Date().getFullYear();

  useEffect(() => {
    const fetchAll = async () => {
      const results = await Promise.all(
        Array.from({ length: 12 }, (_, i) =>
          api.get(`/reports/monthly/${year}/${i + 1}`, { headers })
            .then(res => res.data)
            .catch(() => null)
        )
      );
      setMonthlyData(results);
    };
    fetchAll();
  }, []);

  const labels = Array.from({ length: 12 }, (_, i) => `M${i + 1}`);

  const incomeData = monthlyData.map(r =>
    r ? Object.values(r.totalIncome || {}).reduce((a, b) => a + Number(b), 0) : 0
  );
  const expenseData = monthlyData.map(r =>
    r ? Object.values(r.totalExpenses || {}).reduce((a, b) => a + Number(b), 0) : 0
  );
  const savingsData = monthlyData.map(r =>
    r ? Number(r.netSavings) : 0
  );

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: '#22c55e',
        backgroundColor: '#22c55e33',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: expenseData,
        borderColor: '#ef4444',
        backgroundColor: '#ef444433',
        tension: 0.4,
      },
      {
        label: 'Net Savings',
        data: savingsData,
        borderColor: '#0ea5e9',
        backgroundColor: '#0ea5e933',
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Monthly Financial Overview' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="line-chart-full-wrapper">
      <h3 style={{ color: '#93c5fd', marginBottom: '12px' }}>
        Monthly Income vs Expenses vs Savings
      </h3>
      <div className="line-chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default LineChart;
