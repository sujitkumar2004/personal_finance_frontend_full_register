// import React, { useState } from 'react';
// import api from '../services/api';
// import { useNavigate } from 'react-router-dom';

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/auth/login', { username, password });
//       localStorage.setItem('token', response.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       alert('Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

// export default LoginPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="content">
        <div className="brand">MAHAKAL</div>
        <h1 className="headline">Apna<br />Finance<br />Bank</h1>
        <button className="btn black" onClick={() => navigate('/register')}>Register</button>
        <button className="btn white" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default HomePage;
