import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserMd, FaExclamationTriangle } from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('patient');
  const [formError, setFormError] = useState('');
  
  const { register, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    try {
      console.log("Attempting registration with:", { name, email, password, phoneNumber, role });
      const result = await register({ name, email, password, phoneNumber, role });
      console.log("Registration successful:", result);
      
      // Redirect based on user role
      if (result.role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (result.role === 'patient') {
        navigate('/patient-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error("Registration error in component:", err);
      // Error is handled in the AuthContext
    }
  };

  return (
    <div className="auth-form-container">
      <h1 className="auth-form-heading">Create Account</h1>
      <p className="auth-form-subtext">Join us to book or manage appointments</p>
      
      {(error || formError) && (
        <div className="form-error">
          <FaExclamationTriangle /> {error || formError}
        </div>
      )}
      
      {loading && <Loader />}
      
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
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

        <div className="form-group">
          <label className="form-label" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            className="form-control"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Create a password (min. 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="role">
            Register as
          </label>
          <select 
            id="role"
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          <small className="text-muted" style={{display: 'block', marginTop: '0.5rem', fontSize: '14px', color: '#6c757d'}}>
            {role === 'doctor' ? 'You will need to set up your profile after registration' : 'You can book appointments after registration'}
          </small>
        </div>

        <button 
          type="submit" 
          className="auth-form-button" 
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="auth-form-footer">
        Already have an account? <Link to="/login" className="auth-form-link">Sign In</Link>
      </div>
    </div>
  );
};

export default Register; 