import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout, darkMode, toggleDarkMode }) => {
  return (
    <nav style={{ padding: "10px 20px", borderBottom: "1px solid #ddd" }}>
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
        <span style={{ marginLeft: 12, display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <span role="img" aria-label="User" style={{ fontSize: '1.4rem' }}>👤</span>
          <button onClick={onLogout}>Logout</button>
        </span>
      )}

      {isLoggedIn && (
        <button onClick={toggleDarkMode} style={{ marginLeft: 10 }}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      )}
    </nav>
  );
};

export default Navbar;
