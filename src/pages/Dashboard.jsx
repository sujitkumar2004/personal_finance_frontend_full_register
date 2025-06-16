// // // import React, { useEffect, useState } from 'react';
// // // import api from '../services/api';

// // // function Dashboard() {
// // //   const [user, setUser] = useState(null);

// // //   useEffect(() => {
// // //     const token = localStorage.getItem('token');
// // //     api.get('/users/me', {
// // //       headers: { Authorization: `Bearer ${token}` }
// // //     }).then(res => setUser(res.data)).catch(err => console.error(err));
// // //   }, []);

// // //   return (
// // //     <div>
// // //       <h1>Dashboard</h1>
// // //       {user ? <p>Welcome, {user.username}</p> : <p>Loading...</p>}
// // //     </div>
// // //   );
// // // }

// // // export default Dashboard;
// // import React, { useEffect, useState } from 'react';
// // import api from '../services/api';

// // function Dashboard() {
// //   const [user, setUser] = useState(null);
// //   const [report, setReport] = useState(null);
// //   const [goals, setGoals] = useState([]);
// //   const [error, setError] = useState('');

// //   const token = localStorage.getItem('token');
// //   const headers = { Authorization: `Bearer ${token}` };
// //   const currentYear = new Date().getFullYear();

// //   useEffect(() => {
// //     const fetchAll = async () => {
// //       try {
// //         const userRes = await api.get('/users/me', { headers });
// //         setUser(userRes.data);

// //         const reportRes = await api.get(`/reports/yearly/${currentYear}`, { headers });
// //         setReport(reportRes.data);

// //         const goalsRes = await api.get('/goals', { headers });
// //         setGoals(goalsRes.data);
// //       } catch (err) {
// //         console.error(err);
// //         setError('Failed to load dashboard data.');
// //       }
// //     };

// //     fetchAll();
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Dashboard</h1>
// //       {error && <p style={{ color: 'red' }}>{error}</p>}
// //       {user && (
// //         <div>
// //           <h3>Welcome, {user.fullName || user.username}</h3>
// //           <p>Email: {user.username}</p>
// //         </div>
// //       )}

// //       {report && (
// //         <div style={{ marginTop: '20px', background: '#1e293b', color: '#f1f5f9', padding: '15px', borderRadius: '8px' }}>
// //           <h4>Yearly Summary ({report.year})</h4>
// //           <p><strong>Total Income:</strong> ₹{Object.values(report.totalIncome || {}).reduce((a, b) => a + Number(b), 0)}</p>
// //           <p><strong>Total Expenses:</strong> ₹{Object.values(report.totalExpenses || {}).reduce((a, b) => a + Number(b), 0)}</p>
// //           <p><strong>Net Savings:</strong> ₹{report.netSavings}</p>
// //         </div>
// //       )}

// //       {goals.length > 0 && (
// //         <div style={{ marginTop: '20px' }}>
// //           <h4>Your Savings Goals</h4>
// //           <ul>
// //             {goals.map((g, i) => (
// //               <li key={i} style={{ background: '#334155', color: '#fff', margin: '6px 0', padding: '10px', borderRadius: '6px' }}>
// //                 <strong>{g.goalName}</strong>: ₹{g.currentProgress || 0} / ₹{g.targetAmount}
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import api from '../services/api';
// import { Pie, Bar } from 'react-chartjs-2';
// import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// // Register chart components
// Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [report, setReport] = useState(null);
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };
//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const userRes = await api.get('/users/me', { headers });
//         setUser(userRes.data);

//         const reportRes = await api.get(`/reports/yearly/${currentYear}`, { headers });
//         setReport(reportRes.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load dashboard data.');
//       }
//     };

//     fetchAll();
//   }, []);

//   const pieData = report ? {
//     labels: ['Income', 'Expenses'],
//     datasets: [{
//       data: [
//         Object.values(report.totalIncome || {}).reduce((a, b) => a + Number(b), 0),
//         Object.values(report.totalExpenses || {}).reduce((a, b) => a + Number(b), 0)
//       ],
//       backgroundColor: ['#22c55e', '#ef4444'],
//       borderColor: ['#16a34a', '#dc2626'],
//       borderWidth: 1
//     }]
//   } : null;

//   const barData = report ? {
//     labels: ['Net Savings'],
//     datasets: [{
//       label: 'Net Savings',
//       data: [report.netSavings],
//       backgroundColor: '#0ea5e9'
//     }]
//   } : null;

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {user && (
//         <div>
//           <h3>Welcome, {user.fullName || user.username}</h3>
//           <p>Email: {user.username}</p>
//         </div>
//       )}

//       {report && (
//         <div style={{ marginTop: '20px' }}>
//           <h4>Yearly Summary ({report.year})</h4>
//           <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', marginTop: '20px' }}>
//             {pieData && (
//               <div style={{ width: '300px' }}>
//                 <h5>Income vs Expenses</h5>
//                 <Pie data={pieData} />
//               </div>
//             )}
//             {barData && (
//               <div style={{ width: '300px' }}>
//                 <h5>Net Savings</h5>
//                 <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;
// import React, { useEffect, useState } from 'react';
// import api from '../services/api';
// import { Pie, Bar } from 'react-chartjs-2';
// import {
//   Chart, ArcElement, Tooltip, Legend,
//   CategoryScale, LinearScale, BarElement
// } from 'chart.js';

// Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// function DashboardFull() {
//   const [user, setUser] = useState(null);
//   const [report, setReport] = useState(null);
//   const [transactions, setTransactions] = useState([]);
//   const [goals, setGoals] = useState([]);
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };
//   const currentYear = new Date().getFullYear();

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [userRes, reportRes, txRes, goalsRes] = await Promise.all([
//           api.get('/users/me', { headers }),
//           api.get(`/reports/yearly/${currentYear}`, { headers }),
//           api.get('/transactions', { headers }),
//           api.get('/goals', { headers })
//         ]);
//         setUser(userRes.data);
//         setReport(reportRes.data);
//         setTransactions(txRes.data.slice(-5).reverse()); // latest 5
//         setGoals(goalsRes.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load dashboard data.');
//       }
//     };
//     fetchAll();
//   }, []);

//   const pieData = report && {
//     labels: ['Income', 'Expenses'],
//     datasets: [{
//       data: [
//         Object.values(report.totalIncome || {}).reduce((a, b) => a + Number(b), 0),
//         Object.values(report.totalExpenses || {}).reduce((a, b) => a + Number(b), 0)
//       ],
//       backgroundColor: ['#22c55e', '#ef4444'],
//       borderColor: ['#16a34a', '#dc2626'],
//       borderWidth: 1
//     }]
//   };

//   const barData = report && {
//     labels: ['Net Savings'],
//     datasets: [{
//       label: 'Net Savings',
//       data: [report.netSavings],
//       backgroundColor: '#0ea5e9'
//     }]
//   };

//   const getProgress = (g) => Math.min(((g.currentProgress || 0) / g.targetAmount) * 100, 100).toFixed(0);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Dashboard</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {/* USER INFO */}
//       {user && (
//         <div style={{ marginBottom: '20px', background: '#1e293b', padding: '15px', borderRadius: '8px', color: 'white' }}>
//           <h3>Welcome, {user.fullName || user.username}</h3>
//           <p>Email: {user.username}</p>
//         </div>
//       )}

//       {/* CHARTS */}
//       {report && (
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
//           <div style={{ width: '300px' }}>
//             <h4>Income vs Expense</h4>
//             <Pie data={pieData} />
//           </div>
//           <div style={{ width: '300px' }}>
//             <h4>Net Savings</h4>
//             <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
//           </div>
//         </div>
//       )}

//       {/* TRANSACTIONS */}
//       <div style={{ marginTop: '30px' }}>
//         <h3>Recent Transactions</h3>
//         <ul>
//           {transactions.map((t, i) => (
//             <li key={i} style={{ background: '#f1f5f9', padding: '10px', margin: '5px 0', borderRadius: '6px' }}>
//               ₹{t.amount} — {t.description} ({t.category}) [{t.type}] on {t.date}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* SAVINGS GOALS */}
//       <div style={{ marginTop: '30px' }}>
//         <h3>Active Savings Goals</h3>
//         {goals.map((g, i) => (
//           <div key={i} style={{ background: '#f9fafb', marginBottom: '12px', padding: '12px', borderRadius: '8px' }}>
//             <strong>{g.goalName}</strong> - ₹{g.currentProgress} / ₹{g.targetAmount} ({getProgress(g)}%)
//             <div style={{ background: '#e5e7eb', height: '10px', borderRadius: '5px', marginTop: '5px' }}>
//               <div style={{
//                 width: `${getProgress(g)}%`,
//                 background: '#10b981',
//                 height: '100%',
//                 borderRadius: '5px'
//               }}></div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DashboardFull;
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LineChart from '../components/LineChart';
import './Dashboard.css';

function DashboardFull() {
  const [user, setUser] = useState(null);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  const year = new Date().getFullYear();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [userRes, reportRes] = await Promise.all([
          api.get('/users/me', { headers }),
          api.get(`/reports/yearly/${year}`, { headers }),
        ]);
        setUser(userRes.data);
        setReport(reportRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data.');
      }
    };
    fetchAll();
  }, []);

  const monthlyExpenses = report ? Object.values(report.totalExpenses || {}).reduce((a, b) => a + Number(b), 0) : 0;
  const monthlyIncome = report ? Object.values(report.totalIncome || {}).reduce((a, b) => a + Number(b), 0) : 0;
  const netSavings = report?.netSavings || 0;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="summary-cards">
        {/* EXPENSE CARD */}
        <div className="card expense">
          <div className="card-header">Total Expenses</div>
          <div className="card-body">
            <h4>Expense Overview</h4>
            <div className="card-section">Monthly: ₹{monthlyExpenses}</div>
            <div className="card-section">Yearly: ₹{monthlyExpenses * 12}</div>
          </div>
        </div>

        {/* INCOME CARD */}
        <div className="card income">
          <div className="card-header">Total Income</div>
          <div className="card-body">
            <h4>Income Overview</h4>
            <div className="card-section">Monthly: ₹{monthlyIncome}</div>
            <div className="card-section">Yearly: ₹{monthlyIncome * 12}</div>
          </div>
        </div>

        {/* NET SAVINGS CARD */}
        <div className="card savings">
          <div className="card-header">Net Savings</div>
          <div className="card-body">
            <h4>Savings Overview</h4>
            <div className="card-section">Monthly: ₹{netSavings}</div>
            <div className="card-section">Yearly: ₹{netSavings * 12}</div>
          </div>
        </div>
      </div>

      {/* LINE CHART */}
      <div className="chart-section">
        <LineChart />
      </div>
    </div>
  );
}

export default DashboardFull;
