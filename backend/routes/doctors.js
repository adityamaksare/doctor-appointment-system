const express = require('express');
const router = express.Router();
const { 
  getDoctors,
  getDoctor,
  createDoctorProfile,
  updateDoctorProfile,
  deleteDoctor
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/', getDoctors);
router.get('/:id', getDoctor);

// Protected routes
router.post('/', protect, authorize('doctor'), createDoctorProfile);
router.put('/:id', protect, authorize('doctor', 'admin'), updateDoctorProfile);
router.delete('/:id', protect, authorize('admin'), deleteDoctor);

module.exports = router; 