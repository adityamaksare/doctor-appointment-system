import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Nav, Form } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import AppointmentItem from '../components/AppointmentItem';
import Message from '../components/Message';
import Loader from '../components/Loader';
import api from '../utils/api';

const Appointments = () => {
  const { userInfo } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    if (!userInfo) {
      setError('You must be logged in to view appointments');
      setLoading(false);
      return;
    }
    
    fetchAppointments();
  }, [userInfo]);

  const fetchAppointments = async (status = '', date = '') => {
    try {
      setLoading(true);
      
      let endpoint = '/appointments';
      let params = [];
      
      if (status && status !== 'all') {
        params.push(`status=${status}`);
      }
      
      if (date) {
        params.push(`date=${date}`);
      }
      
      if (params.length > 0) {
        endpoint += `?${params.join('&')}`;
      }
      
      const { data } = await api.get(endpoint);
      setAppointments(data.data);
      setLoading(false);
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Error fetching appointments'
      );
      setLoading(false);
    }
  };

  const handleFilterChange = (filterStatus) => {
    setFilter(filterStatus);
    fetchAppointments(filterStatus, dateFilter);
  };

  const handleDateFilterChange = (e) => {
    const date = e.target.value;
    setDateFilter(date);
    fetchAppointments(filter, date);
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">My Appointments</h1>
      
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="mb-4">
            <Col md={6}>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link 
                    active={filter === 'all'} 
                    onClick={() => handleFilterChange('all')}
                  >
                    All
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={filter === 'pending'} 
                    onClick={() => handleFilterChange('pending')}
                  >
                    Pending
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={filter === 'confirmed'} 
                    onClick={() => handleFilterChange('confirmed')}
                  >
                    Confirmed
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={filter === 'completed'} 
                    onClick={() => handleFilterChange('completed')}
                  >
                    Completed
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={filter === 'cancelled'} 
                    onClick={() => handleFilterChange('cancelled')}
                  >
                    Cancelled
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            
            <Col md={6}>
              <Form.Group>
                <Form.Label>Filter by Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dateFilter}
                  onChange={handleDateFilterChange}
                />
              </Form.Group>
            </Col>
          </Row>
          
          {loading ? (
            <Loader />
          ) : appointments.length === 0 ? (
            <Message>No appointments found</Message>
          ) : (
            <Row>
              {appointments.map((appointment) => (
                <Col key={appointment._id} md={6} lg={4} className="mb-4">
                  <AppointmentItem 
                    appointment={appointment} 
                    showPatient={userInfo && userInfo.role === 'doctor'}
                  />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default Appointments; 