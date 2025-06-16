// import React, { useEffect, useState } from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import LoginPage from './pages/HomePage';
// import RegisterPage from './pages/RegisterPage';
// import Dashboard from './pages/Dashboard';
// import TransactionsPage from './pages/TransactionsPage';
// import CategoriesPage from './pages/CategoriesPage';
// import SavingsGoalsPage from './pages/SavingsGoalsPage';
// import ReportsPage from './pages/ReportsPage';
// import ProtectedRoute from './components/ProtectedRoute';
// import './index.css';

// function App() {
//   const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode);
//     localStorage.setItem("darkMode", darkMode);
//   }, [darkMode]);

//   return (
//     <>
//       <nav>
//         <Link to="/dashboard">Dashboard</Link> |{" "}
//         <Link to="/transactions">Transactions</Link> |{" "}
//         <Link to="/categories">Categories</Link> |{" "}
//         <Link to="/goals">Goals</Link> |{" "}
//         <Link to="/reports">Reports</Link> |{" "}
//         <button onClick={() => setDarkMode(prev => !prev)}>
//           {darkMode ? 'Light Mode' : 'Dark Mode'}
//         </button>
//       <Link to="/register">Register</Link> | </nav>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
// <Route path="/register" element={<RegisterPage />} />
//         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
//         <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
//         <Route path="/goals" element={<ProtectedRoute><SavingsGoalsPage /></ProtectedRoute>} />
//         <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
//       </Routes>
//     </>
//   );
// }

// export default App;
// import React, { useEffect, useState } from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import HomePage from './pages/HomePage'; // ✅ Proper name
// import LoginPage from './pages/LoginPage'; // ✅ Real login form
// import RegisterPage from './pages/RegisterPage';
// import Dashboard from './pages/Dashboard';
// import TransactionsPage from './pages/TransactionsPage';
// import CategoriesPage from './pages/CategoriesPage';
// import SavingsGoalsPage from './pages/SavingsGoalsPage';
// import ReportsPage from './pages/ReportsPage';
// import ProtectedRoute from './components/ProtectedRoute';
// import './index.css';

// function App() {
//   const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", darkMode);
//     localStorage.setItem("darkMode", darkMode);
//   }, [darkMode]);

//   return (
//     <>
//       <nav>
//         <Link to="/">Home</Link> |{" "}
//         <Link to="/dashboard">Dashboard</Link> |{" "}
//         <Link to="/transactions">Transactions</Link> |{" "}
//         <Link to="/categories">Categories</Link> |{" "}
//         <Link to="/goals">Goals</Link> |{" "}
//         <Link to="/reports">Reports</Link> |{" "}
//         <Link to="/login">Login</Link> |{" "}
//         <Link to="/register">Register</Link> |{" "}
//         <button onClick={() => setDarkMode(prev => !prev)}>
//           {darkMode ? 'Light Mode' : 'Dark Mode'}
//         </button>
//       </nav>

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
//         <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
//         <Route path="/goals" element={<ProtectedRoute><SavingsGoalsPage /></ProtectedRoute>} />
//         <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
//       </Routes>
//     </>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import CategoriesPage from './pages/CategoriesPage';
import SavingsGoalsPage from './pages/SavingsGoalsPage';
import ReportsPage from './pages/ReportsPage';
import ProtectedRoute from './components/ProtectedRoute';
import { isTokenExpired } from './utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Navbar from './components/Navbar';


function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('You have been logged out!');
    navigate('/');
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{" "}

        {isLoggedIn && (
          <>
            <Link to="/dashboard">Dashboard</Link> |{" "}
            <Link to="/transactions">Transactions</Link> |{" "}
            <Link to="/categories">Categories</Link> |{" "}
            <Link to="/goals">Goals</Link> |{" "}
            <Link to="/reports">Reports</Link> |{" "}
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link> |{" "}
          </>
        )}

        {isLoggedIn && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            <span role="img" aria-label="User" style={{ fontSize: '1.4rem' }}>👤</span>
            <button onClick={handleLogout}>Logout</button> |{" "}
          </div>
        )}

        {isLoggedIn && (
          <button onClick={() => setDarkMode(prev => !prev)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><CategoriesPage /></ProtectedRoute>} />
        <Route path="/goals" element={<ProtectedRoute><SavingsGoalsPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
