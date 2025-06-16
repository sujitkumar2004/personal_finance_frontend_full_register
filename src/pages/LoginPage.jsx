import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username: email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="login-brand">💸 MyFinance</div>
        <div className="login-illustration">
          {/* Optional image or gradient here */}
        </div>
      </div>
      <div className="login-right">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Log In</h2>
          <p>Access your personal finance dashboard.</p>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
          <div className="login-links">
            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
            <p className="forgot">Forgot password?</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
