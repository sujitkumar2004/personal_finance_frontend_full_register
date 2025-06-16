import axios from 'axios';

const api = axios.create({
  baseURL: 'https://personal-finance-manager-9ja1.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
