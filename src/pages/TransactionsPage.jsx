// import React, { useState, useEffect } from 'react';
// import api from '../services/api';

// function TransactionsPage() {
//   const [transactions, setTransactions] = useState([]);
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');

//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     api.get('/transactions', { headers }).then(res => setTransactions(res.data));
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     await api.post('/transactions', { amount, description, category }, { headers });
//     const res = await api.get('/transactions', { headers });
//     setTransactions(res.data);
//     setAmount('');
//     setDescription('');
//     setCategory('');
//   };

//   return (
//     <div>
//       <h2>Transactions</h2>
//       <form onSubmit={handleAdd}>
//         <input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
//         <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
//         <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
//         <button type="submit">Add</button>
//       </form>
//       <ul>
//         {transactions.map((t, idx) => (
//           <li key={idx}>{t.description}: {t.amount}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TransactionsPage;

// import React, { useState, useEffect } from 'react';
// import api from '../services/api';

// function TransactionsPage() {
//   const [transactions, setTransactions] = useState([]);
//   const [amount, setAmount] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
//   const [date, setDate] = useState('');
//   const [type, setType] = useState('EXPENSE');
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   const fetchTransactions = async () => {
//     try {
//       const res = await api.get('/transactions', { headers });
//       setTransactions(res.data);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch transactions");
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       await api.post('/transactions', {
//         amount: parseFloat(amount),
//         description,
//         category,
//         date: date || new Date().toISOString().split('T')[0], // defaults to today
//         type
//       }, { headers });

//       await fetchTransactions();
//       setAmount('');
//       setDescription('');
//       setCategory('');
//       setDate('');
//       setType('EXPENSE');
//     } catch (err) {
//       console.error('Error adding transaction:', err);
//       setError('Failed to add transaction');
//     }
//   };

//   return (
//     <div>
//       <h2>Transactions</h2>
//       <form onSubmit={handleAdd}>
//         <input
//           type="number"
//           step="0.01"
//           placeholder="Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           required
//         />
//         <input
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         />
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="EXPENSE">Expense</option>
//           <option value="INCOME">Income</option>
//         </select>
//         <button type="submit">Add</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <ul>
//         {transactions.map((t, idx) => (
//           <li key={idx}>
//             {t.date}: {t.description} ({t.category}) - {t.amount} [{t.type}]
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TransactionsPage;
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './TransactionsPage.css';

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions', { headers });
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch transactions");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/transactions', {
        amount: parseFloat(amount),
        description,
        category,
        date: date || new Date().toISOString().split('T')[0],
        type
      }, { headers });

      await fetchTransactions();
      setAmount('');
      setDescription('');
      setCategory('');
      setDate('');
      setType('EXPENSE');
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction');
    }
  };

  return (
    <div className="transaction-wrapper">
      <div className="transaction-card">
        <h2>Add Transaction</h2>
        <form onSubmit={handleAdd}>
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
          <button type="submit">Add</button>
        </form>
        {error && <p className="error-msg">{error}</p>}
      </div>

      <div className="transaction-list">
        <h3>Recent Transactions</h3>
        <ul>
          {transactions.map((t, idx) => (
            <li key={idx} className="transaction-item">
              <strong>{t.date}</strong>: {t.description} ({t.category}) - ₹{t.amount} [{t.type}]
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TransactionsPage;
