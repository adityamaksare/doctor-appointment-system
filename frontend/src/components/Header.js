import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaCalendarAlt, FaUserMd, FaHome, FaSearch, FaStethoscope, FaUserCircle, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  // Get user info from AuthContext
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Logout handler
  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <Navbar expand="lg" className="navbar-custom" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <FaStethoscope size={24} className="me-2" />
            MedConnect
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="nav-link-custom">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/doctors" className="nav-link-custom">
                Doctors
              </Nav.Link>
              
              {userInfo ? (
                <>
                  {userInfo.role === 'patient' && (
                    <>
                      <Nav.Link as={Link} to="/appointments" className="nav-link-custom">
                        My Appointments
                      </Nav.Link>
                      <Nav.Link as={Link} to="/patient-dashboard" className="nav-link-custom">
                        Dashboard
                      </Nav.Link>
                    </>
                  )}
                  
                  {userInfo.role === 'doctor' && (
                    <>
                      <Nav.Link as={Link} to="/doctor-dashboard" className="nav-link-custom">
                        Dashboard
                      </Nav.Link>
                    </>
                  )}
                  
                  <NavDropdown 
                    title={
                      <span>
                        <FaUser className="me-1" />
                        {userInfo.name}
                      </span>
                    } 
                    id="basic-nav-dropdown"
                    className="dropdown-custom"
                  >
                    <NavDropdown.Item as={Link} to="/profile">
                      <FaUserCircle className="me-2" /> Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      <FaSignOutAlt className="me-2" /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="nav-link-custom">
                    <FaSignInAlt className="me-1" /> Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register" className="nav-link-custom">
                    <FaUserPlus className="me-1" /> Register
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