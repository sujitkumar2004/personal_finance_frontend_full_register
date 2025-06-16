// // import React, { useState, useEffect } from 'react';
// // import api from '../services/api';

// // function ReportsPage() {
// //   const [year, setYear] = useState('');
// //   const [month, setMonth] = useState('');
// //   const [monthlyReport, setMonthlyReport] = useState(null);
// //   const [yearlyReport, setYearlyReport] = useState(null);

// //   const token = localStorage.getItem('token');
// //   const headers = { Authorization: `Bearer ${token}` };

// //   const fetchMonthly = () => {
// //     api.get(`/reports/monthly/${year}/${month}`, { headers }).then(res => setMonthlyReport(res.data));
// //   };

// //   const fetchYearly = () => {
// //     api.get(`/reports/yearly/${year}`, { headers }).then(res => setYearlyReport(res.data));
// //   };

// //   return (
// //     <div>
// //       <h2>Reports</h2>
// //       <div>
// //         <input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
// //         <input placeholder="Month" value={month} onChange={(e) => setMonth(e.target.value)} />
// //         <button onClick={fetchMonthly}>Get Monthly</button>
// //         <button onClick={fetchYearly}>Get Yearly</button>
// //       </div>
// //       {monthlyReport && <pre>{JSON.stringify(monthlyReport, null, 2)}</pre>}
// //       {yearlyReport && <pre>{JSON.stringify(yearlyReport, null, 2)}</pre>}
// //     </div>
// //   );
// // }

// // export default ReportsPage;

// import React, { useState } from 'react';
// import api from '../services/api';

// function ReportsPage() {
//   const [year, setYear] = useState('');
//   const [month, setMonth] = useState('');
//   const [monthlyReport, setMonthlyReport] = useState(null);
//   const [yearlyReport, setYearlyReport] = useState(null);
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   const fetchMonthly = async () => {
//     try {
//       const res = await api.get(`/reports/monthly/${year}/${month}`, { headers });
//       setMonthlyReport(res.data);
//       setYearlyReport(null);
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch monthly report.');
//     }
//   };

//   const fetchYearly = async () => {
//     try {
//       const res = await api.get(`/reports/yearly/${year}`, { headers });
//       setYearlyReport(res.data);
//       setMonthlyReport(null);
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch yearly report.');
//     }
//   };

//   const renderReport = (report) => (
//     <div style={{ background: '#f0f0f0', padding: '10px', marginTop: '20px' }}>
//       <p><strong>Year:</strong> {report.year}</p>
//       {report.month && <p><strong>Month:</strong> {report.month}</p>}
//       <h4>Total Income</h4>
//       <ul>
//         {Object.entries(report.totalIncome || {}).map(([cat, amount], idx) => (
//           <li key={idx}>{cat}: ₹{amount}</li>
//         ))}
//       </ul>
//       <h4>Total Expenses</h4>
//       <ul>
//         {Object.entries(report.totalExpenses || {}).map(([cat, amount], idx) => (
//           <li key={idx}>{cat}: ₹{amount}</li>
//         ))}
//       </ul>
//       <p><strong>Net Savings:</strong> ₹{report.netSavings}</p>
//     </div>
//   );

//   return (
//     <div>
//       <h2>Reports</h2>
//       <div>
//         <input
//           type="number"
//           placeholder="Year (e.g., 2025)"
//           value={year}
//           onChange={(e) => setYear(e.target.value)}
//           required
//         />
//         <input
//           type="number"
//           min="1"
//           max="12"
//           placeholder="Month (1-12)"
//           value={month}
//           onChange={(e) => setMonth(e.target.value)}
//         />
//         <button onClick={fetchMonthly}>Get Monthly</button>
//         <button onClick={fetchYearly}>Get Yearly</button>
//       </div>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {monthlyReport && renderReport(monthlyReport)}
//       {yearlyReport && renderReport(yearlyReport)}
//     </div>
//   );
// }

// export default ReportsPage;
import React, { useState } from 'react';
import api from '../services/api';
import './ReportsPage.css'; // External styles for clean separation

function ReportsPage() {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [yearlyReport, setYearlyReport] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchMonthly = async () => {
    try {
      const res = await api.get(`/reports/monthly/${year}/${month}`, { headers });
      setMonthlyReport(res.data);
      setYearlyReport(null);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch monthly report.');
    }
  };

  const fetchYearly = async () => {
    try {
      const res = await api.get(`/reports/yearly/${year}`, { headers });
      setYearlyReport(res.data);
      setMonthlyReport(null);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch yearly report.');
    }
  };

  const renderReport = (report) => (
    <div className="report-container">
      <div className="report-header">
        <span><strong>Year:</strong> {report.year}</span>
        {report.month && <span><strong>Month:</strong> {report.month}</span>}
      </div>

      <div className="report-section">
        <h4>Total Income</h4>
        <ul>
          {Object.entries(report.totalIncome || {}).map(([cat, amount], idx) => (
            <li key={idx} className="report-item income">{cat}: ₹{amount}</li>
          ))}
        </ul>
      </div>

      <div className="report-section">
        <h4>Total Expenses</h4>
        <ul>
          {Object.entries(report.totalExpenses || {}).map(([cat, amount], idx) => (
            <li key={idx} className="report-item expense">{cat}: ₹{amount}</li>
          ))}
        </ul>
      </div>

      <div className="net-savings">
        <strong>Net Savings:</strong> ₹{report.netSavings}
      </div>
    </div>
  );

  return (
    <div>
      <h2>Reports</h2>
      <div className="report-inputs">
        <input
          type="number"
          placeholder="Year (e.g., 2025)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          type="number"
          min="1"
          max="12"
          placeholder="Month (1-12)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <button onClick={fetchMonthly}>Get Monthly</button>
        <button onClick={fetchYearly}>Get Yearly</button>
      </div>
      {error && <p className="error-text">{error}</p>}
      {monthlyReport && renderReport(monthlyReport)}
      {yearlyReport && renderReport(yearlyReport)}
    </div>
  );
}

export default ReportsPage;
