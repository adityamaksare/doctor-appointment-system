import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaClock, FaUser, FaUserMd } from 'react-icons/fa';

const AppointmentItem = ({ appointment, showPatient = false }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    let variant;
    switch (status) {
      case 'pending':
        variant = 'warning';
        break;
      case 'confirmed':
        variant = 'success';
        break;
      case 'cancelled':
        variant = 'danger';
        break;
      case 'completed':
        variant = 'dark';
        break;
      default:
        variant = 'secondary';
    }
    return <Badge bg={variant}>{status}</Badge>;
  };

  return (
    <div className={`appointment-item ${appointment.status}`}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">
          {showPatient ? (
            <>
              <FaUser className="me-2" />
              {appointment.patient && appointment.patient.name}
            </>
          ) : (
            <>
              <FaUserMd className="me-2" />
              {appointment.doctor && appointment.doctor.user && appointment.doctor.user.name}
            </>
          )}
        </h5>
        {getStatusBadge(appointment.status)}
      </div>

      <p className="mb-1">
        <FaCalendarAlt className="me-2" />
        <strong>Date:</strong> {formatDate(appointment.appointmentDate)}
      </p>
      <p className="mb-1">
        <FaClock className="me-2" />
        <strong>Time:</strong> {appointment.appointmentTime}
      </p>
      <p className="mb-2">
        <strong>Reason:</strong> {appointment.reason}
      </p>
      <p className="mb-3">
        <strong>Fee:</strong> ₹{appointment.fees} {appointment.isPaid && <Badge bg="success">Paid</Badge>}
      </p>

      <Button as={Link} to={`/appointments/${appointment._id}`} variant="primary" size="sm">
        View Details
      </Button>
    </div>
  );
};

export default AppointmentItem; 