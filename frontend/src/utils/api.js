import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token to requests
api.interceptors.request.use(
  (config) => {
    const userInfoStr = localStorage.getItem('userInfo');
    if (userInfoStr) {
      try {
        const userInfo = JSON.parse(userInfoStr);
        if (userInfo && userInfo.token) {
          config.headers.Authorization = `Bearer ${userInfo.token}`;
        } else {
          console.warn('No token found in userInfo', userInfo);
        }
      } catch (error) {
        console.error('Error parsing userInfo from localStorage', error);
        // Clear corrupted localStorage
        localStorage.removeItem('userInfo');
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Handle authentication errors (401)
    if (response && response.status === 401) {
      console.log('Authentication error detected, clearing user session');
      localStorage.removeItem('userInfo');
      
      // Only redirect if not already on login page to avoid redirect loops
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    // Handle server errors (500)
    if (response && response.status >= 500) {
      console.error('Server error:', response.data);
    }
    
    return Promise.reject(error);
  }
);

// Add a function to check if the user is logged in
api.isLoggedIn = () => {
  const userInfo = localStorage.getItem('userInfo');
  return !!userInfo;
};

// Function to get the current user
api.getCurrentUser = () => {
  try {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    localStorage.removeItem('userInfo');
    return null;
  }
};

export default api; 