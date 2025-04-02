import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          const parsedUser = JSON.parse(storedUserInfo);
          // If we have a token, verify it's valid by making an API call
          if (parsedUser && parsedUser.token) {
            setUserInfo(parsedUser);
            // Optionally verify token validity with the server
            validateUserSession(parsedUser);
          } else {
            // No valid token, clear storage
            localStorage.removeItem('userInfo');
          }
        }
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('userInfo');
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Validate user session with the server
  const validateUserSession = async (user) => {
    try {
      // Make a request to get the user profile to validate the token
      await api.get('/users/profile');
      // If successful, token is valid
    } catch (err) {
      console.error('Session validation failed:', err);
      // If token is invalid, clear user info
      logout();
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/users/login', { email, password });
      console.log('Login response:', response.data);
      
      const { user } = response.data;
      
      if (user && user.token) {
        setUserInfo(user);
        localStorage.setItem('userInfo', JSON.stringify(user));
        return user;
      } else {
        throw new Error('Invalid response format - no user or token');
      }
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'An unexpected error occurred'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Register data being sent:', userData);
      const response = await api.post('/users/register', userData);
      console.log('Register response:', response.data);
      
      const { user } = response.data;
      
      if (user && user.token) {
        setUserInfo(user);
        localStorage.setItem('userInfo', JSON.stringify(user));
        return user;
      } else {
        throw new Error('Invalid response format - no user or token');
      }
    } catch (err) {
      console.error('Register error:', err.response ? err.response.data : err.message);
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'An unexpected error occurred'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await api.put('/users/profile', userData);
      
      const { user } = data;
      
      if (user && user.token) {
        setUserInfo(user);
        localStorage.setItem('userInfo', JSON.stringify(user));
        return user;
      } else {
        throw new Error('Invalid response format from update profile');
      }
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'An unexpected error occurred'
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    userInfo,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!userInfo,
    isDoctor: userInfo?.role === 'doctor',
    isPatient: userInfo?.role === 'patient',
    isAdmin: userInfo?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 