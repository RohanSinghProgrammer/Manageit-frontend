import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your base URL
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("authToken")}`, // Replace with your auth token
    'Content-Type': 'application/json'
  }
});

export default api;