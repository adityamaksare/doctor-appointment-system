import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { useAlerts } from '../context/AlertContext';

const AlertToast = () => {
  const { alerts, removeAlert } = useAlerts();
  
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="me-2" />;
      case 'danger':
        return <FaExclamationCircle className="me-2" />;
      case 'warning':
        return <FaExclamationTriangle className="me-2" />;
      case 'info':
      default:
        return <FaInfoCircle className="me-2" />;
    }
  };
  
  if (alerts.length === 0) return null;
  
  return (
    <ToastContainer 
      position="top-end" 
      className="p-3" 
      style={{ zIndex: 1060 }}
    >
      {alerts.map((alert) => (
        <Toast 
          key={alert.id} 
          onClose={() => removeAlert(alert.id)} 
          bg={alert.type}
          className="mb-2 text-white"
          animation={true}
        >
          <Toast.Header className={`bg-${alert.type} text-white`}>
            {getIcon(alert.type)}
            <strong className="me-auto">
              {alert.type === 'success' && 'Success'}
              {alert.type === 'danger' && 'Error'}
              {alert.type === 'warning' && 'Warning'}
              {alert.type === 'info' && 'Information'}
            </strong>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={() => removeAlert(alert.id)}
              aria-label="Close"
            ></button>
          </Toast.Header>
          <Toast.Body>{alert.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default AlertToast; 