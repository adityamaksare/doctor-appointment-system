const express = require('express');
const router = express.Router();
const { 
  bookAppointment, 
  getAppointments, 
  getAppointment, 
  updateAppointmentStatus 
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middlewares/auth');

// Protected routes
router.post('/', protect, authorize('patient'), bookAppointment);
router.get('/', protect, getAppointments);
router.get('/:id', protect, getAppointment);
router.put('/:id', protect, updateAppointmentStatus);

module.exports = router; 