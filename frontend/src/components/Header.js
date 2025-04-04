import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaCalendarAlt, FaUserMd, FaHome, FaSearch, FaStethoscope, FaUserCircle, FaSignInAlt, FaUserPlus, FaClipboardList, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { useAlerts } from '../context/AlertContext';

const Header = () => {
  // Get user info from AuthContext
  const { userInfo, logout } = useContext(AuthContext);
  const { success } = useAlerts();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Detect scroll position for navbar effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Logout handler
  const logoutHandler = () => {
    logout();
    success('You have been successfully logged out');
    navigate('/login');
    setExpanded(false);
  };

  // Toggle navbar collapse
  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  // Close navbar when clicking a link
  const closeNavbar = () => {
    if (expanded) {
      setExpanded(false);
    }
  };

  // Check if the path is active
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') {
      return true;
    }
    if (path !== '/' && location.pathname.startsWith(path)) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <header className={scrolled ? 'header-scrolled' : ''}>
      <Navbar 
        expand="lg" 
        className={`navbar-custom ${scrolled ? 'navbar-scrolled' : ''}`} 
        variant="dark" 
        fixed="top"
        expanded={expanded}
      >
        <Container>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navbar.Brand as={Link} to="/" className="brand-logo" onClick={closeNavbar}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaStethoscope size={24} className="brand-icon" />
              </motion.div>
              <motion.span 
                className="brand-text"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                MedConnect
              </motion.span>
            </Navbar.Brand>
          </motion.div>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={toggleNavbar}
            className="nav-toggler"
          />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-menu">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <Nav.Link 
                  as={Link} 
                  to="/" 
                  className={`nav-link-custom ${isActive('/') ? 'active' : ''}`}
                  onClick={closeNavbar}
                >
                  <FaHome className="nav-icon" /> 
                  <span>Home</span>
                </Nav.Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Nav.Link 
                  as={Link} 
                  to="/doctors" 
                  className={`nav-link-custom ${isActive('/doctors') ? 'active' : ''}`}
                  onClick={closeNavbar}
                >
                  <FaUserMd className="nav-icon" /> 
                  <span>Doctors</span>
                </Nav.Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Nav.Link 
                  as={Link} 
                  to="/help-support" 
                  className={`nav-link-custom ${isActive('/help-support') ? 'active' : ''}`}
                  onClick={closeNavbar}
                >
                  <FaHeadset className="nav-icon" /> 
                  <span>Contact Us</span>
                </Nav.Link>
              </motion.div>
              
              {userInfo ? (
                <>
                  {userInfo.role === 'patient' && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        <Nav.Link 
                          as={Link} 
                          to="/appointments" 
                          className={`nav-link-custom ${isActive('/appointments') ? 'active' : ''}`}
                          onClick={closeNavbar}
                        >
                          <FaCalendarAlt className="nav-icon" /> 
                          <span>Appointments</span>
                        </Nav.Link>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        <Nav.Link 
                          as={Link} 
                          to="/patient-dashboard" 
                          className={`nav-link-custom ${isActive('/patient-dashboard') ? 'active' : ''}`}
                          onClick={closeNavbar}
                        >
                          <FaClipboardList className="nav-icon" /> 
                          <span>Dashboard</span>
                        </Nav.Link>
                      </motion.div>
                    </>
                  )}
                  
                  {userInfo.role === 'doctor' && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        <Nav.Link 
                          as={Link} 
                          to="/doctor-dashboard" 
                          className={`nav-link-custom ${isActive('/doctor-dashboard') ? 'active' : ''}`}
                          onClick={closeNavbar}
                        >
                          <FaClipboardList className="nav-icon" />
                          <span>Dashboard</span>
                        </Nav.Link>
                      </motion.div>
                    </>
                  )}
                  
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    <NavDropdown 
                      title={
                        <motion.span 
                          className="user-dropdown-toggle"
                          whileHover={{ scale: 1.05 }}
                        >
                          <FaUser className="user-icon" />
                          <span className="username-text">{userInfo.name.split(' ')[0]}</span>
                        </motion.span>
                      } 
                      id="basic-nav-dropdown"
                      className="dropdown-custom"
                      align="end"
                    >
                      <motion.div whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                        <NavDropdown.Item as={Link} to="/profile" onClick={closeNavbar}>
                          <FaUserCircle className="dropdown-icon" /> Profile
                        </NavDropdown.Item>
                      </motion.div>
                      <NavDropdown.Divider />
                      <motion.div whileHover={{ x: 5, transition: { duration: 0.2 } }}>
                        <NavDropdown.Item onClick={logoutHandler}>
                          <FaSignOutAlt className="dropdown-icon" /> Logout
                        </NavDropdown.Item>
                      </motion.div>
                    </NavDropdown>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <Nav.Link 
                      as={Link} 
                      to="/login" 
                      className={`nav-link-custom ${isActive('/login') ? 'active' : ''}`}
                      onClick={closeNavbar}
                    >
                      <FaSignInAlt className="nav-icon" /> 
                      <span>Login</span>
                    </Nav.Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <Nav.Link 
                      as={Link} 
                      to="/register" 
                      className={`nav-link-custom ${isActive('/register') ? 'active' : ''}`}
                      onClick={closeNavbar}
                    >
                      <FaUserPlus className="nav-icon" /> 
                      <span>Sign Up</span>
                    </Nav.Link>
                  </motion.div>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header; 