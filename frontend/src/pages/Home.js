import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaUserMd, FaCalendarAlt, FaUserPlus, FaChartLine, FaHospital, FaStethoscope, 
  FaUserNurse, FaTooth, FaBone, FaBrain, FaEye, FaHeartbeat, FaShieldAlt, 
  FaClock, FaAward, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaPlay,
  FaCheck, FaStar, FaUsers, FaHeart, FaLightbulb, FaMobileAlt, FaArrowRight, FaSearch
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '../utils/api';
import Loader from '../components/Loader';
import Message from '../components/Message';
import AnimatedHeadline from '../components/AnimatedHeadline';
import { AuthContext } from '../context/AuthContext';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Home = () => {
  const [topDoctors, setTopDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    document.title = 'MedConnect | Your Health, Our Priority';
    
    const fetchTopDoctors = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/doctors?limit=6');
        setTopDoctors(data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch top doctors');
        setLoading(false);
      }
    };

    fetchTopDoctors();
  }, []);

  // Stats data
  const stats = [
    { icon: <FaUsers />, number: '500+', label: 'Happy Patients', color: '#4F9DF9' },
    { icon: <FaUserMd />, number: '50+', label: 'Expert Doctors', color: '#22C99D' },
    { icon: <FaHospital />, number: '8+', label: 'Specializations', color: '#FFAA0D' },
    { icon: <FaAward />, number: '99%', label: 'Success Rate', color: '#FF5A5A' }
  ];

  // Enhanced features
  const features = [
    { 
      title: '24/7 Availability', 
      icon: <FaClock />, 
      text: 'Book appointments anytime, anywhere. Our platform is always available for your healthcare needs.',
      gradient: 'linear-gradient(135deg, #4F9DF9, #2C6ECB)'
    },
    { 
      title: 'Verified Doctors', 
      icon: <FaShieldAlt />, 
      text: 'All our healthcare professionals are verified and certified with years of experience.',
      gradient: 'linear-gradient(135deg, #22C99D, #1AAF8B)'
    },
    { 
      title: 'Smart Matching', 
      icon: <FaLightbulb />, 
      text: 'Our AI-powered system matches you with the best doctors based on your health needs.',
      gradient: 'linear-gradient(135deg, #FFAA0D, #E8940A)'
    },
    { 
      title: 'Mobile App', 
      icon: <FaMobileAlt />, 
      text: 'Manage your health on-the-go with our user-friendly mobile application.',
      gradient: 'linear-gradient(135deg, #FF5A5A, #E04848)'
    }
  ];

  // Enhanced specializations with more details
  const specializations = [
    { 
      name: 'Cardiology', 
      icon: <FaHeartbeat />, 
      description: 'Heart and cardiovascular system specialists',
      doctors: '12+ Doctors',
      color: '#FF5A5A'
    },
    { 
      name: 'Dermatology', 
      icon: <FaUserMd />, 
      description: 'Skin, hair, and nail specialists',
      doctors: '8+ Doctors',
      color: '#22C99D'
    },
    { 
      name: 'Pediatrics', 
      icon: <FaUserNurse />, 
      description: 'Medical care for infants, children, and adolescents',
      doctors: '6+ Doctors',
      color: '#4F9DF9'
    },
    { 
      name: 'Orthopedics', 
      icon: <FaBone />, 
      description: 'Bone, joint, and muscle specialists',
      doctors: '5+ Doctors',
      color: '#FFAA0D'
    },
    { 
      name: 'Neurology', 
      icon: <FaBrain />, 
      description: 'Brain and nervous system specialists',
      doctors: '4+ Doctors',
      color: '#9D4EDD'
    },
    { 
      name: 'Ophthalmology', 
      icon: <FaEye />, 
      description: 'Eye and vision care specialists',
      doctors: '3+ Doctors',
      color: '#06D6A0'
    },
    { 
      name: 'Dentistry', 
      icon: <FaTooth />, 
      description: 'Oral health and dental care specialists',
      doctors: '7+ Doctors',
      color: '#FFD23F'
    },
    { 
      name: 'Psychiatry', 
      icon: <FaHeart />,
      description: 'Mental health specialists',
      doctors: '5+ Doctors',
      color: '#F72585'
    }
  ];

  // Enhanced testimonials
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Patient',
      location: 'Mumbai, India',
      text: 'MedConnect transformed how I approach healthcare. Found the perfect cardiologist and booked an appointment in minutes!',
      image: 'https://randomuser.me/api/portraits/women/41.jpg',
      rating: 5
    },
    {
      name: 'Rajesh Kumar',
      role: 'Patient',
      location: 'Delhi, India',
      text: 'The platform is incredibly user-friendly. My family now uses MedConnect for all our medical appointments.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5
    },
    {
      name: 'Dr. Anita Verma',
      role: 'Dermatologist',
      location: 'Bangalore, India',
      text: 'As a healthcare provider, MedConnect has streamlined my practice and helped me reach more patients efficiently.',
      image: 'https://randomuser.me/api/portraits/women/63.jpg',
      rating: 5
    }
  ];

  return (
    <>
      {/* Enhanced Hero Section */}
      <motion.section 
        className="hero-modern" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ 
          background: 'linear-gradient(135deg, #0a6cb9 0%, #4F9DF9 50%, #2C6ECB 100%)',
          borderRadius: '25px',
          margin: '0 0 40px 0',
          boxShadow: '0 20px 60px rgba(79, 157, 249, 0.15)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="7" cy="7" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '60px 60px'
        }}></div>
        <Container className="py-6" style={{ position: 'relative', zIndex: 2 }}>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="text-white py-5">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Badge 
                  bg="light" 
                  text="dark" 
                  className="mb-3 px-3 py-2 rounded-pill"
                  style={{ fontSize: '0.9rem', fontWeight: '500' }}
                >
                  🏥 Trusted Healthcare Platform
                </Badge>
                <AnimatedHeadline />
                <motion.p 
                  className="lead mb-4 text-white fs-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  style={{ lineHeight: '1.8', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                >
                  Experience the future of healthcare with our AI-powered platform. Find verified doctors, book appointments instantly, and manage your health journey seamlessly.
                </motion.p>
                
                <motion.div 
                  className="d-flex flex-wrap gap-3 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Button 
                    as={Link} 
                    to="/doctors" 
                    size="lg" 
                    variant="light" 
                    className="fw-bold px-4 py-3 rounded-pill"
                    style={{ boxShadow: '0 4px 15px rgba(255,255,255,0.2)' }}
                  >
                    <FaSearch className="me-2" />
                    Find Doctors
                  </Button>
                  {!userInfo && (
                    <Button 
                      as={Link} 
                      to="/register" 
                      size="lg" 
                      variant="outline-light" 
                      className="fw-bold px-4 py-3 rounded-pill"
                      style={{ borderWidth: '2px' }}
                    >
                      <FaUserPlus className="me-2" />
                      Join Now
                    </Button>
                  )}
                </motion.div>

                <motion.div 
                  className="d-flex align-items-center gap-4 text-white-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="d-flex align-items-center">
                    <FaCheck className="text-white me-2" />
                    <small>500+ Happy Patients</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaCheck className="text-white me-2" />
                    <small>50+ Expert Doctors</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <FaCheck className="text-white me-2" />
                    <small>24/7 Available</small>
                  </div>
                </motion.div>
              </motion.div>
            </Col>
            
            <Col lg={6} className="py-5">
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="position-relative"
              >
                <div 
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    borderRadius: '25px',
                    padding: '20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <img 
                    src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg" 
                    alt="Healthcare Professionals" 
                    className="img-fluid rounded-4"
                    style={{ 
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      transform: 'scale(1.02)'
                    }}
                  />
                </div>
                
                {/* Floating elements */}
                <motion.div
                  className="position-absolute"
                  style={{ top: '20%', right: '-10%' }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div 
                    className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                    style={{ width: '60px', height: '60px', boxShadow: '0 10px 25px rgba(79, 157, 249, 0.3)' }}
                  >
                    <FaHeartbeat className="text-primary fs-4" />
                  </div>
                </motion.div>
                
                <motion.div
                  className="position-absolute"
                  style={{ bottom: '20%', left: '-5%' }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                >
                  <div 
                    className="bg-white rounded-3 px-3 py-2"
                    style={{ boxShadow: '0 10px 25px rgba(34, 201, 157, 0.3)' }}
                  >
                    <small className="text-success fw-bold d-flex align-items-center">
                      <FaCheck className="me-2" />Appointment Booked
                    </small>
                  </div>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* Stats Section */}
      <section className="py-5">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Row className="text-center">
              {stats.map((stat, index) => (
                <Col lg={3} md={6} className="mb-4" key={index}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card 
                      className="border-0 h-100"
                      style={{
                        background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}08)`,
                        borderRadius: '20px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                      }}
                    >
                      <Card.Body className="py-4">
                        <motion.div 
                          className="mb-3"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          style={{ 
                            width: '70px', 
                            height: '70px', 
                            background: `${stat.color}20`,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            color: stat.color,
                            fontSize: '1.8rem'
                          }}
                        >
                          {stat.icon}
                        </motion.div>
                        <h3 className="fw-bold text-dark mb-1">{stat.number}</h3>
                        <p className="text-muted mb-0">{stat.label}</p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #E6EBF5 100%)' }}>
        <Container>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill fs-6">
              Why Choose Us
            </Badge>
            <h2 className="fw-bold display-6 text-dark mb-3">Experience Modern Healthcare</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Discover why thousands of patients and doctors trust MedConnect for their healthcare needs
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Row className="g-4">
              {features.map((feature, index) => (
                <Col lg={6} key={index}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card 
                      className="border-0 h-100 overflow-hidden"
                      style={{
                        borderRadius: '20px',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                        background: 'white'
                      }}
                    >
                      <Card.Body className="p-4">
                        <Row className="align-items-center">
                          <Col xs={3}>
                            <motion.div
                              className="d-flex align-items-center justify-content-center rounded-4"
                              style={{
                                width: '70px',
                                height: '70px',
                                background: feature.gradient,
                                color: 'white',
                                fontSize: '1.8rem'
                              }}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              {feature.icon}
                            </motion.div>
                          </Col>
                          <Col xs={9}>
                            <h4 className="fw-bold text-dark mb-2">{feature.title}</h4>
                            <p className="text-muted mb-0" style={{ lineHeight: '1.6' }}>
                              {feature.text}
                            </p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Enhanced Featured Doctors Section */}
      <section className="py-5">
        <Container>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge bg="success" className="mb-3 px-3 py-2 rounded-pill fs-6">
              Our Experts
            </Badge>
            <h2 className="fw-bold display-6 text-dark mb-3">Meet Our Top Doctors</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Connect with certified healthcare professionals who are dedicated to your wellbeing
            </p>
          </motion.div>
          
          {loading ? (
            <Loader />
          ) : error ? (
            <Message>{error}</Message>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Row className="g-4">
                {topDoctors.slice(0, 6).map((doctor, index) => (
                  <Col key={doctor._id} lg={4} md={6}>
                    <motion.div
                      variants={fadeInUp}
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                      <Card 
                        className="doctor-card-modern border-0 h-100 overflow-hidden"
                        style={{
                          borderRadius: '24px',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div 
                          className="position-relative text-center"
                          style={{
                            background: 'linear-gradient(135deg, #4F9DF915, #2C6ECB08)',
                            padding: '30px 20px 20px'
                          }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <img
                              src={`https://ui-avatars.com/api/?name=${doctor.user.name}&background=4F9DF9&color=fff&size=120`}
                              alt={doctor.user.name}
                              className="rounded-circle border border-3 border-white"
                              width="100"
                              height="100"
                              style={{ 
                                objectFit: 'cover',
                                boxShadow: '0 8px 25px rgba(79, 157, 249, 0.3)'
                              }}
                            />
                          </motion.div>
                          <Badge 
                            bg="success" 
                            className="position-absolute rounded-pill px-2"
                            style={{ top: '20px', right: '20px', fontSize: '0.7rem' }}
                          >
                            Available
                          </Badge>
                        </div>
                        
                        <Card.Body className="p-4 text-center">
                          <h5 className="fw-bold text-dark mb-1">{doctor.user.name}</h5>
                          <p className="text-primary fw-semibold mb-2">{doctor.specialization}</p>
                          
                          <div className="d-flex justify-content-center align-items-center mb-3">
                            <div className="text-warning me-2" style={{ fontSize: '0.9rem' }}>
                              {[...Array(5)].map((_, i) => (
                                <FaStar 
                                  key={i} 
                                  className={i < Math.floor(doctor.rating) ? 'text-warning' : 'text-muted'} 
                                />
                              ))}
                            </div>
                            <small className="text-muted">({doctor.reviewCount})</small>
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center mb-3 small text-muted">
                            <span>📅 {doctor.experience}+ years exp</span>
                            <span>💰 ₹{doctor.fees}</span>
                          </div>
                          
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button 
                              as={Link} 
                              to={`/doctors/${doctor._id}`} 
                              variant="primary"
                              className="w-100 rounded-pill fw-semibold"
                              style={{ padding: '10px' }}
                            >
                              Book Appointment
                            </Button>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          )}
          
          <motion.div 
            className="text-center mt-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                as={Link} 
                to="/doctors" 
                variant="outline-primary"
                size="lg"
                className="px-5 py-3 rounded-pill fw-bold"
              >
                View All Doctors
                <FaArrowRight className="ms-2" />
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Enhanced Specializations Grid */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #E6EBF5 100%)' }}>
        <Container>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge bg="warning" className="mb-3 px-3 py-2 rounded-pill fs-6">
              Medical Specialties
            </Badge>
            <h2 className="fw-bold display-6 text-dark mb-3">Comprehensive Healthcare Services</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              From general medicine to specialized care, we cover all aspects of your health
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Row className="g-4">
              {specializations.map((spec, index) => (
                <Col key={index} lg={3} md={4} sm={6}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  >
                    <Card 
                      className="border-0 h-100 text-center specialization-card"
                      style={{
                        borderRadius: '20px',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                        background: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Card.Body className="p-4">
                        <motion.div 
                          className="mb-3"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          style={{
                            width: '60px',
                            height: '60px',
                            background: `${spec.color}15`,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto',
                            color: spec.color,
                            fontSize: '1.5rem'
                          }}
                        >
                          {spec.icon}
                        </motion.div>
                        <h5 className="fw-bold text-dark mb-2">{spec.name}</h5>
                        <p className="text-muted small mb-3" style={{ lineHeight: '1.5' }}>
                          {spec.description}
                        </p>
                        <Badge 
                          style={{ background: `${spec.color}20`, color: spec.color }}
                          className="rounded-pill px-2 py-1 mb-3"
                        >
                          {spec.doctors}
                        </Badge>
                        <div>
                          <Button 
                            as={Link} 
                            to={`/doctors?specialization=${spec.name}`} 
                            variant="outline-primary"
                            size="sm"
                            className="rounded-pill px-3"
                          >
                            Find Doctors
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-5">
        <Container>
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge bg="danger" className="mb-3 px-3 py-2 rounded-pill fs-6">
              Patient Stories
            </Badge>
            <h2 className="fw-bold display-6 text-dark mb-3">What Our Community Says</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '600px' }}>
              Real experiences from patients and healthcare providers who trust MedConnect
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="testimonial-modern"
          >
            <Carousel
              indicators={true}
              controls={true}
              interval={6000}
              pause="hover"
              className="testimonial-carousel-modern"
            >
              {testimonials.map((testimonial, index) => (
                <Carousel.Item key={index}>
                  <Card 
                    className="border-0 mx-auto"
                    style={{
                      maxWidth: '800px',
                      borderRadius: '25px',
                      boxShadow: '0 15px 50px rgba(0,0,0,0.1)',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                    }}
                  >
                    <Card.Body className="p-5 text-center">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="rounded-circle mb-4 border border-3 border-primary"
                          width="80"
                          height="80"
                          style={{ objectFit: 'cover' }}
                        />
                        
                        <div className="mb-4">
                          <div className="text-warning mb-2" style={{ fontSize: '1.2rem' }}>
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <FaStar key={i} className="me-1" />
                            ))}
                          </div>
                          <blockquote className="lead text-dark mb-0 fst-italic" style={{ lineHeight: '1.8' }}>
                            "{testimonial.text}"
                          </blockquote>
                        </div>
                        
                        <div>
                          <h5 className="fw-bold text-dark mb-1">{testimonial.name}</h5>
                          <p className="text-primary fw-semibold mb-1">{testimonial.role}</p>
                          <small className="text-muted d-flex align-items-center justify-content-center">
                            <FaMapMarkerAlt className="me-1" />
                            {testimonial.location}
                          </small>
                        </div>
                      </motion.div>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          </motion.div>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card 
              className="border-0 text-center text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #4F9DF9 0%, #2C6ECB 100%)',
                borderRadius: '25px',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.1
              }}></div>
              <Card.Body className="py-5 px-4 position-relative">
                <motion.div
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="fw-bold display-6 mb-3">Ready to Transform Your Healthcare?</h2>
                  <p className="lead mb-4 mx-auto" style={{ maxWidth: '600px', opacity: 0.9 }}>
                    Join thousands of patients who have already discovered a better way to manage their health
                  </p>
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    {!userInfo && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          as={Link} 
                          to="/register"
                          size="lg"
                          variant="light"
                          className="fw-bold px-5 py-3 rounded-pill"
                        >
                          Get Started Free
                          <FaArrowRight className="ms-2" />
                        </Button>
                      </motion.div>
                    )}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        as={Link} 
                        to="/doctors"
                        size="lg"
                        variant="outline-light"
                        className="fw-bold px-5 py-3 rounded-pill border-2"
                      >
                        <FaSearch className="me-2" />
                        Find Doctors
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </Card.Body>
            </Card>
          </motion.div>
        </Container>
      </section>
    </>
  );
};

export default Home; 