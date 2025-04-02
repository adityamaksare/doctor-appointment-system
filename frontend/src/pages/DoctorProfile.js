import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  ListGroup, 
  Button, 
  Form, 
  Modal 
} from 'react-bootstrap';
import { FaStar, FaStarHalfAlt, FaRegStar, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(AuthContext);
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Booking state
  const [showModal, setShowModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);

  const fetchDoctorDetails = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/doctors/${id}`);
      setDoctor(data.data);
      setLoading(false);
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Error fetching doctor details'
      );
      setLoading(false);
    }
  };

  // Display doctor rating with stars
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full_${i}`} className="text-warning" />);
    }

    // Add half star if needed
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-warning" />);
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty_${i}`} className="text-warning" />);
    }

    return stars;
  };

  const handleBooking = () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    
    if (userInfo.role === 'doctor') {
      setBookingError("Doctors can't book appointments");
      return;
    }
    
    setShowModal(true);
  };

  const submitBookingHandler = async (e) => {
    e.preventDefault();
    
    if (!appointmentDate || !appointmentTime || !reason) {
      setBookingError('Please fill in all fields');
      return;
    }
    
    try {
      setBookingLoading(true);
      setBookingError('');
      
      await api.post('/appointments', {
        doctorId: doctor._id,
        appointmentDate,
        appointmentTime,
        reason
      });
      
      setBookingLoading(false);
      setShowModal(false);
      navigate('/appointments');
    } catch (err) {
      setBookingError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Error booking appointment'
      );
      setBookingLoading(false);
    }
  };

  return (
    <Container className="py-4">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : doctor ? (
        <>
          <Row>
            <Col md={8}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title as="h2">{doctor.user.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {doctor.specialization} | {doctor.experience} years experience
                  </Card.Subtitle>
                  
                  <div className="mb-3">
                    {renderRating(doctor.rating)}
                    <span className="ms-1">({doctor.reviewCount} reviews)</span>
                  </div>
                  
                  <Card.Text>{doctor.bio}</Card.Text>
                  
                  <ListGroup variant="flush" className="mt-4">
                    <ListGroup.Item>
                      <FaMapMarkerAlt className="me-2" /> {doctor.address}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FaPhone className="me-2" /> {doctor.user.phoneNumber}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FaEnvelope className="me-2" /> {doctor.user.email}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Book Appointment</Card.Title>
                  <Card.Text>
                    <strong>Consultation Fee:</strong> ₹{doctor.fees}
                  </Card.Text>
                  
                  <Card.Title className="mt-3">Available Timings</Card.Title>
                  <ListGroup variant="flush" className="mb-3">
                    {doctor.timings.map((timing, index) => (
                      <ListGroup.Item key={index}>
                        <strong>{timing.day}:</strong> {timing.startTime} - {timing.endTime}
                        {!timing.isAvailable && <span className="text-danger ms-2">(Unavailable)</span>}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  
                  <Button
                    onClick={handleBooking}
                    variant="primary"
                    className="w-100"
                    disabled={!userInfo || userInfo.role === 'doctor'}
                  >
                    Book Appointment
                  </Button>
                  
                  {!userInfo && (
                    <Card.Text className="text-center mt-2">
                      <small>Please <a href="/login">login</a> to book an appointment</small>
                    </Card.Text>
                  )}
                  {userInfo && userInfo.role === 'doctor' && (
                    <Card.Text className="text-danger text-center mt-2">
                      <small>Doctors can't book appointments</small>
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Booking Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Book Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {bookingError && <Message variant="danger">{bookingError}</Message>}
              <Form onSubmit={submitBookingHandler}>
                <Form.Group className="mb-3" controlId="appointmentDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="appointmentTime">
                  <Form.Label>Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="reason">
                  <Form.Label>Reason for Visit</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Brief description of your condition"
                    required
                  />
                </Form.Group>
                
                <div className="d-grid">
                  <Button type="submit" variant="primary" disabled={bookingLoading}>
                    {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <Message>Doctor not found</Message>
      )}
    </Container>
  );
};

export default DoctorProfile; 