import React, { createContext, useState, useContext } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  // Add a new alert
  const addAlert = (message, type = 'info', timeout = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newAlert = { id, message, type, timeout };
    
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
    
    // Automatically remove alert after timeout
    if (timeout !== 0) {
      setTimeout(() => {
        removeAlert(id);
      }, timeout);
    }
    
    return id;
  };
  
  // Remove an alert by id
  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };
  
  // Helper methods for different alert types
  const success = (message, timeout) => addAlert(message, 'success', timeout);
  const error = (message, timeout) => addAlert(message, 'danger', timeout);
  const info = (message, timeout) => addAlert(message, 'info', timeout);
  const warning = (message, timeout) => addAlert(message, 'warning', timeout);
  
  // Clear all alerts
  const clearAlerts = () => {
    setAlerts([]);
  };
  
  const value = {
    alerts,
    addAlert,
    removeAlert,
    success,
    error,
    info,
    warning,
    clearAlerts
  };
  
  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};

// Custom hook for using the alert context
export const useAlerts = () => useContext(AlertContext); 