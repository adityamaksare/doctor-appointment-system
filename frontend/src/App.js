import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AlertToast from './components/AlertToast';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorList from './pages/DoctorList';
import DoctorProfile from './pages/DoctorProfile';
import Appointments from './pages/Appointments';
import AppointmentDetails from './pages/AppointmentDetails';
import UserProfile from './pages/UserProfile';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import HelpAndSupport from './pages/HelpAndSupport';
import PageTitleUpdater from './components/PageTitleUpdater';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <PageTitleUpdater />
        <Header />
        <AlertToast />
        <main className="container py-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route path="/help-support" element={<HelpAndSupport />} />
            
            {/* Protected Routes - Any Authenticated User */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            
            {/* Protected Routes - Patients Only */}
            <Route path="/appointments" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <Appointments />
              </ProtectedRoute>
            } />
            <Route path="/appointments/:id" element={
              <ProtectedRoute allowedRoles={['patient', 'doctor']}>
                <AppointmentDetails />
              </ProtectedRoute>
            } />
            <Route path="/patient-dashboard" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </ProtectedRoute>
            } />
            
            {/* Protected Routes - Doctors Only */}
            <Route path="/doctor-dashboard" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
