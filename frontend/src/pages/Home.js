import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserMd, FaCalendarAlt, FaUserPlus, FaChartLine, FaHospital, FaStethoscope, FaUserNurse, FaTooth, FaBone, FaBrain, FaEye, FaHeartbeat } from 'react-icons/fa';
import api from '../utils/api';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [topDoctors, setTopDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/doctors?limit=4');
        setTopDoctors(data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch top doctors');
        setLoading(false);
      }
    };

    fetchTopDoctors();
  }, []);

  // Specializations
  const specializations = [
    { name: 'Cardiology', icon: <FaHospital />, description: 'Heart and cardiovascular system specialists' },
    { name: 'Dermatology', icon: <FaUserMd />, description: 'Skin, hair, and nail specialists' },
    { name: 'Pediatrics', icon: <FaUserNurse />, description: 'Medical care for infants, children, and adolescents' },
    { name: 'Orthopedics', icon: <FaBone />, description: 'Bone, joint, and muscle specialists' },
    { name: 'Neurology', icon: <FaBrain />, description: 'Brain and nervous system specialists' },
    { name: 'Ophthalmology', icon: <FaEye />, description: 'Eye and vision care specialists' },
    { name: 'Psychiatry', icon: <FaHeartbeat />, description: 'Mental health specialists' },
    { name: 'Dentistry', icon: <FaTooth />, description: 'Oral health and dental care specialists' }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Thompson',
      role: 'Patient',
      text: 'MedConnect made it incredibly easy to find a doctor and book an appointment. The whole process was seamless!',
      image: 'https://randomuser.me/api/portraits/women/41.jpg'
    },
    {
      name: 'Michael Johnson',
      role: 'Patient',
      text: 'I was able to find a specialist in my area within minutes. The interface is very user-friendly and intuitive.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Doctor',
      text: 'As a healthcare provider, MedConnect has simplified my appointment scheduling and patient management.',
      image: 'https://randomuser.me/api/portraits/women/63.jpg'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero py-5" style={{ 
        background: 'linear-gradient(135deg, #054A91 0%, #2A9DF4 100%)',
        borderRadius: '0 0 20px 20px'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-white mb-5 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">Your Health, Our Priority</h1>
              <p className="lead mb-4">
                Find the right doctor, book an appointment, and get the care you deserve. MedConnect makes healthcare accessible and convenient.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/doctors" size="lg" variant="light" className="fw-bold">
                  Find Doctors
                </Button>
                {!userInfo && (
                  <Button as={Link} to="/register" size="lg" variant="outline-light" className="fw-bold">
                    Sign Up Now
                  </Button>
                )}
              </div>
            </Col>
            <Col lg={6}>
              <img 
                src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg" 
                alt="Healthcare Professional" 
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: '400px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Why Choose MedConnect</h2>
          <Row>
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 text-center py-4 border-0 shadow-sm">
                <div className="text-center mb-3">
                  <span style={{ fontSize: '3rem', color: 'var(--primary-blue)' }}>
                    <FaUserMd />
                  </span>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">Expert Doctors</Card.Title>
                  <Card.Text>
                    Access to a network of qualified and experienced healthcare professionals.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 text-center py-4 border-0 shadow-sm">
                <div className="text-center mb-3">
                  <span style={{ fontSize: '3rem', color: 'var(--primary-blue)' }}>
                    <FaCalendarAlt />
                  </span>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">Easy Scheduling</Card.Title>
                  <Card.Text>
                    Book appointments online 24/7 with just a few clicks, no phone calls needed.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 text-center py-4 border-0 shadow-sm">
                <div className="text-center mb-3">
                  <span style={{ fontSize: '3rem', color: 'var(--primary-blue)' }}>
                    <FaUserPlus />
                  </span>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">Patient Profiles</Card.Title>
                  <Card.Text>
                    Manage your health information and appointment history in one place.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <Card className="h-100 text-center py-4 border-0 shadow-sm">
                <div className="text-center mb-3">
                  <span style={{ fontSize: '3rem', color: 'var(--primary-blue)' }}>
                    <FaChartLine />
                  </span>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">Health Tracking</Card.Title>
                  <Card.Text>
                    Keep track of your appointments and health records over time.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Top Doctors</h2>
          
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            <Row>
              {topDoctors.slice(0, 4).map(doctor => (
                <Col key={doctor._id} lg={3} md={6} className="mb-4">
                  <Card className="doctor-card h-100 border-0 shadow-sm">
                    <div className="text-center pt-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${doctor.user.name}&background=random&size=150`}
                        alt={doctor.user.name}
                        className="rounded-circle mb-3 border"
                        width="100"
                        height="100"
                      />
                    </div>
                    <Card.Body className="text-center">
                      <Card.Title className="fw-bold">{doctor.user.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{doctor.specialization}</Card.Subtitle>
                      <div className="mb-2">
                        <small className="text-warning">
                          {'★'.repeat(Math.floor(doctor.rating))}
                          {'☆'.repeat(5 - Math.floor(doctor.rating))}
                          <span className="ms-1 text-muted">({doctor.reviewCount} reviews)</span>
                        </small>
                      </div>
                      <Card.Text>
                        <small className="text-muted">{doctor.experience} years of experience</small>
                      </Card.Text>
                      <Button 
                        as={Link} 
                        to={`/doctors/${doctor._id}`} 
                        variant="outline-primary" 
                        size="sm"
                      >
                        View Profile
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          
          <div className="text-center mt-4">
            <Button as={Link} to="/doctors" variant="primary" size="lg">
              View All Doctors
            </Button>
          </div>
        </Container>
      </section>

      {/* Specialization Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Our Specializations</h2>
          <Row>
            {specializations.map((spec, index) => (
              <Col key={index} md={3} sm={6} className="mb-4">
                <Card className="h-100 text-center py-4 border-0 shadow-sm">
                  <div className="text-center mb-3">
                    <span style={{ fontSize: '3rem', color: 'var(--primary-blue)' }}>
                      {spec.icon}
                    </span>
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold">{spec.name}</Card.Title>
                    <Card.Text>
                      {spec.description}
                    </Card.Text>
                    <Button 
                      as={Link} 
                      to={`/doctors?specialization=${spec.name}`} 
                      variant="outline-primary" 
                      size="sm"
                      className="mt-2"
                    >
                      Find Specialists
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 fw-bold">What Our Users Say</h2>
          <Carousel 
            variant="dark" 
            controls={true} 
            indicators={true}
            interval={5000}
            className="testimonial-carousel"
          >
            {testimonials.map((testimonial, index) => (
              <Carousel.Item key={index}>
                <div className="text-center px-5 py-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="rounded-circle mb-4"
                    width="100"
                    height="100"
                  />
                  <h5 className="mb-1 fw-bold">{testimonial.name}</h5>
                  <p className="text-muted mb-4">{testimonial.role}</p>
                  <p className="lead mb-0 px-md-5 mx-md-5">"{testimonial.text}"</p>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5" style={{ 
        background: 'linear-gradient(135deg, #054A91 0%, #2A9DF4 100%)',
        borderRadius: '20px',
        margin: '0 1rem 2rem'
      }}>
        <Container className="text-center text-white py-5">
          <h2 className="mb-4 fw-bold">Ready to Get Started?</h2>
          <p className="lead mb-5">
            Join thousands of patients who have already discovered the convenience of MedConnect.
          </p>
          {!userInfo && (
            <Button as={Link} to="/register" size="lg" variant="light" className="fw-bold me-3">
              Create an Account
            </Button>
          )}
          <Button as={Link} to="/doctors" size="lg" variant="outline-light" className="fw-bold">
            Find Doctors
          </Button>
        </Container>
      </section>
    </>
  );
};

export default Home; 