import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaCalendarAlt, FaUserMd, FaHome, FaSearch, FaStethoscope, FaUserCircle, FaSignInAlt, FaUserPlus, FaClipboardList, FaHeadset } from 'react-icons/fa';
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
          <Navbar.Brand as={Link} to="/" className="brand-logo" onClick={closeNavbar}>
            <FaStethoscope size={24} className="brand-icon pulse-on-hover" />
            <span className="brand-text">MedConnect</span>
          </Navbar.Brand>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={toggleNavbar}
            className="nav-toggler"
          />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-menu">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={`nav-link-custom ${isActive('/') ? 'active' : ''}`}
                onClick={closeNavbar}
              >
                <FaHome className="nav-icon" /> 
                <span>Home</span>
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/doctors" 
                className={`nav-link-custom ${isActive('/doctors') ? 'active' : ''}`}
                onClick={closeNavbar}
              >
                <FaUserMd className="nav-icon" /> 
                <span>Doctors</span>
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/help-support" 
                className={`nav-link-custom ${isActive('/help-support') ? 'active' : ''}`}
                onClick={closeNavbar}
              >
                <FaHeadset className="nav-icon" /> 
                <span>Contact Us</span>
              </Nav.Link>
              
              {userInfo ? (
                <>
                  {userInfo.role === 'patient' && (
                    <>
                      <Nav.Link 
                        as={Link} 
                        to="/appointments" 
                        className={`nav-link-custom ${isActive('/appointments') ? 'active' : ''}`}
                        onClick={closeNavbar}
                      >
                        <FaCalendarAlt className="nav-icon" /> 
                        <span>Appointments</span>
                      </Nav.Link>
                      <Nav.Link 
                        as={Link} 
                        to="/patient-dashboard" 
                        className={`nav-link-custom ${isActive('/patient-dashboard') ? 'active' : ''}`}
                        onClick={closeNavbar}
                      >
                        <FaClipboardList className="nav-icon" /> 
                        <span>Dashboard</span>
                      </Nav.Link>
                    </>
                  )}
                  
                  {userInfo.role === 'doctor' && (
                    <>
                      <Nav.Link 
                        as={Link} 
                        to="/doctor-dashboard" 
                        className={`nav-link-custom ${isActive('/doctor-dashboard') ? 'active' : ''}`}
                        onClick={closeNavbar}
                      >
                        <FaClipboardList className="nav-icon" />
                        <span>Dashboard</span>
                      </Nav.Link>
                    </>
                  )}
                  
                  <NavDropdown 
                    title={
                      <span className="user-dropdown-toggle">
                        <FaUser className="user-icon" />
                        <span className="username-text">{userInfo.name.split(' ')[0]}</span>
                      </span>
                    } 
                    id="basic-nav-dropdown"
                    className="dropdown-custom"
                    align="end"
                  >
                    <NavDropdown.Item as={Link} to="/profile" onClick={closeNavbar}>
                      <FaUserCircle className="dropdown-icon" /> Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      <FaSignOutAlt className="dropdown-icon" /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/login" 
                    className={`nav-link-custom ${isActive('/login') ? 'active' : ''}`}
                    onClick={closeNavbar}
                  >
                    <FaSignInAlt className="nav-icon" /> 
                    <span>Login</span>
                  </Nav.Link>
                  <Nav.Link 
                    as={Link} 
                    to="/register" 
                    className={`nav-link-custom ${isActive('/register') ? 'active' : ''}`}
                    onClick={closeNavbar}
                  >
                    <FaUserPlus className="nav-icon" /> 
                    <span>Sign Up</span>
                  </Nav.Link>
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