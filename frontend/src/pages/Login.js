import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { FaEnvelope, FaLock, FaExclamationTriangle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Attempting login with:", { email, password });
      const result = await login(email, password);
      console.log("Login successful:", result);
      
      // Redirect based on user role
      if (result.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (result.role === 'patient') {
        navigate('/patient-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error("Login error in component:", err);
      // Error is handled in the AuthContext
    }
  };

  return (
    <div className="auth-form-container">
      <h1 className="auth-form-heading">Welcome Back</h1>
      <p className="auth-form-subtext">Sign in to access your account</p>
      
      {error && (
        <div className="form-error">
          <FaExclamationTriangle /> {error}
        </div>
      )}
      
      {loading && <Loader />}
      
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
          <div className="input-group">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <div className="input-group">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="auth-form-button" 
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="auth-form-footer">
        New User? <Link to="/register" className="auth-form-link">Create an Account</Link>
      </div>
    </div>
  );
};

export default Login;
