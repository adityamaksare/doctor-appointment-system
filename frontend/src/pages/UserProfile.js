import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useAlerts } from '../context/AlertContext';
import Message from '../components/Message';
import Loader from '../components/Loader';

const UserProfile = () => {
  const navigate = useNavigate();
  const { userInfo, updateProfile, loading, error } = useContext(AuthContext);
  const { success } = useAlerts();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPhoneNumber(userInfo.phoneNumber);
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    try {
      setFormError('');
      
      // Only send password if it was entered
      const userData = {
        name,
        email,
        phoneNumber,
        ...(password && { password })
      };
      
      await updateProfile(userData);
      success('Profile updated successfully');
      
      // Clear passwords
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      // Error is handled in the AuthContext
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={6} className="mx-auto">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">User Profile</h2>
              
              {error && <Message variant="danger">{error}</Message>}
              {formError && <Message variant="danger">{formError}</Message>}
              {loading && <Loader />}
              
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password (leave blank to keep current)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Leave blank to keep current password
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
          
          {userInfo && userInfo.role === 'doctor' && (
            <div className="text-center mt-3">
              <Button
                variant="success"
                onClick={() => navigate('/doctor-dashboard')}
              >
                Go to Doctor Dashboard
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile; 