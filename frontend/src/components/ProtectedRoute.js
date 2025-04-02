import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { userInfo, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  if (!userInfo) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userInfo.role)) {
    // User doesn't have required role, redirect to home
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has required role (if specified)
  return children;
};

export default ProtectedRoute; 