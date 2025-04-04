import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaUserMd, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-5">
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4 d-flex align-items-center">
              <FaUserMd className="me-2" /> MedConnect
            </h5>
            <p className="mb-3">
              Connecting patients with the best healthcare professionals. Schedule appointments easily and manage your healthcare journey efficiently.
            </p>
            <div className="d-flex">
              <a href="#!" className="me-3 text-decoration-none">
                <FaFacebookF />
              </a>
              <a href="#!" className="me-3 text-decoration-none">
                <RiTwitterXFill />
              </a>
              <a href="#!" className="me-3 text-decoration-none">
                <FaInstagram />
              </a>
              <a href="#!" className="text-decoration-none">
                <FaLinkedinIn />
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/doctors" className="text-decoration-none">Find Doctors</Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-decoration-none">Sign In</Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-decoration-none">Register</Link>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Our Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="#" className="text-decoration-none">Online Consultations</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-decoration-none">Appointment Scheduling</Link>
              </li>
              <li className="mb-2">
                <Link to="#" className="text-decoration-none">Medical Records</Link>
              </li>
              <li className="mb-2">
                <Link to="/help-support" className="text-decoration-none">24/7 Support</Link>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center">
                <FaMapMarkerAlt className="me-2" />
                <span>Kothrud, Pune, Maharashtra, India, 411038</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaPhone className="me-2" />
                <span>+91 9822000000</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaEnvelope className="me-2" />
                <span>support@medconnect.com</span>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        <Row>
          <Col className="text-center">
            <p className="mb-0">
              © {currentYear} MedConnect. - Aditya Maksare.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;