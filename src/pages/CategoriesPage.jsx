// // import React, { useEffect, useState } from 'react';
// // import api from '../services/api';

// // function CategoriesPage() {
// //   const [categories, setCategories] = useState([]);
// //   const [name, setName] = useState('');
// //   const [type, setType] = useState('EXPENSE');

// //   const token = localStorage.getItem('token');
// //   const headers = { Authorization: `Bearer ${token}` };

// //   useEffect(() => {
// //     api.get('/categories', { headers }).then(res => setCategories(res.data));
// //   }, []);

// //   const handleAdd = async (e) => {
// //     e.preventDefault();
// //     await api.post('/categories', { name, type }, { headers });
// //     const res = await api.get('/categories', { headers });
// //     setCategories(res.data);
// //     setName('');
// //   };

// //   return (
// //     <div>
// //       <h2>Categories</h2>
// //       <form onSubmit={handleAdd}>
// //         <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
// //         <select value={type} onChange={(e) => setType(e.target.value)}>
// //           <option value="EXPENSE">Expense</option>
// //           <option value="INCOME">Income</option>
// //         </select>
// //         <button type="submit">Add</button>
// //       </form>
// //       <ul>
// //         {categories.map((c, idx) => (
// //           <li key={idx}>{c.name} - {c.type}</li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }


// // export default CategoriesPage;
// import React, { useEffect, useState } from 'react';
// import api from '../services/api';

// function CategoriesPage() {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState('');
//   const [type, setType] = useState('EXPENSE');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   const fetchCategories = async () => {
//     try {
//       const res = await api.get('/categories', { headers });
//       setCategories(res.data);
//     } catch (err) {
//       setError('Failed to load categories.');
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       await api.post('/categories', { name, type }, { headers });
//       await fetchCategories();
//       setName('');
//     } catch (err) {
//       console.error('Error creating category:', err);
//       setError('Could not create category.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Categories</h2>
//       <form onSubmit={handleAdd}>
//         <input
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="EXPENSE">Expense</option>
//           <option value="INCOME">Income</option>
//         </select>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Adding...' : 'Add'}
//         </button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <ul>
//         {categories.map((c, idx) => (
//           <li key={idx}>{c.name} - {c.type}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CategoriesPage;
// import React, { useEffect, useState } from 'react';
// import api from '../services/api';

// function CategoriesPage() {
//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState('');
//   const [type, setType] = useState('EXPENSE');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem('token');
//   const headers = { Authorization: `Bearer ${token}` };

//   const fetchCategories = async () => {
//     try {
//       const res = await api.get('/categories', { headers });
//       setCategories(res.data);
//     } catch (err) {
//       setError('Failed to load categories.');
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       await api.post(
//         '/categories',
//         { name, type, isCustom: true },
//         { headers }
//       );
//       await fetchCategories();
//       setName('');
//     } catch (err) {
//       console.error('Error creating category:', err);
//       setError('Could not create category.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Categories</h2>
//       <form onSubmit={handleAdd}>
//         <input
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           <option value="EXPENSE">Expense</option>
//           <option value="INCOME">Income</option>
//         </select>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Adding...' : 'Add'}
//         </button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <ul>
//         {categories.map((c, idx) => (
//           <li key={idx}>{c.name} - {c.type}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CategoriesPage;
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './CategoriesPage.css';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories', { headers });
      setCategories(res.data);
    } catch (err) {
      setError('Failed to load categories.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post(
        '/categories',
        { name, type, isCustom: true },
        { headers }
      );
      await fetchCategories();
      setName('');
    } catch (err) {
      console.error('Error creating category:', err);
      setError('Could not create category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="category-wrapper">
      <div className="category-card">
        <h2>Add Category</h2>
        <form onSubmit={handleAdd}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
        </form>
        {error && <p className="error-msg">{error}</p>}
      </div>

      <div className="category-list">
        <h3>All Categories</h3>
        <ul>
          {categories.map((c, idx) => (
            <li key={idx} className="category-item">
              {c.name} - {c.type}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategoriesPage;
