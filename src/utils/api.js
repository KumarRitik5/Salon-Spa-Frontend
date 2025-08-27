import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log('API Base URL:', API_BASE_URL); // Debug log

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // Increased to 30 seconds for Render cold starts
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.baseURL + config.url); // Debug log
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status, response.config.url); // Debug log
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.error('API Error:', {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    
    // Retry logic for network errors or 500 errors
    if (
      (!error.response || error.response.status >= 500) && 
      !originalRequest._retry &&
      originalRequest.method === 'get'
    ) {
      originalRequest._retry = true;
      console.log('Retrying request...');
      
      // Wait 2 seconds before retry
      await new Promise(resolve => setTimeout(resolve, 2000));
      return api(originalRequest);
    }
    
    if (error.response?.status === 401) {
      // Token expired or invalid, clear user data
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
export { API_BASE_URL };
