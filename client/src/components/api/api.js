import axios from 'axios';

// Configure Axios instance
const API = axios.create({
  baseURL: 'https://bidly-server.vercel.app', // Set your API base URL here
  // You can add more default settings here
});

// Set up a request interceptor if needed (e.g., for setting headers)
API.interceptors.request.use((config) => {
  // For example, attaching an authorization header
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Define API methods
const api = {
  get: (url, params = {}) => API.get(url, { params }),
  post: (url, data) => API.post(url, data),
  put: (url, data) => API.put(url, data),
  delete: (url) => API.delete(url),
};

export default api;
