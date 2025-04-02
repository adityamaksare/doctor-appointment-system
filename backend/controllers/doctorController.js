const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getDoctors = async (req, res) => {
  try {
    // Implement pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    // Build filter object
    const filter = {};
    
    // Filter by specialization if provided
    if (req.query.specialization) {
      filter.specialization = req.query.specialization;
    }

    // If search query is provided, find doctors whose name matches the search query
    let doctors = [];
    let total = 0;
    
    if (req.query.search) {
      // First, find users (doctors) whose name matches the search query
      const users = await User.find({ 
        name: { $regex: req.query.search, $options: 'i' },
        role: 'doctor'
      });
      
      // Get the IDs of these users
      const userIds = users.map(user => user._id);
      
      // Add user filter to our filter object
      if (userIds.length > 0) {
        filter.user = { $in: userIds };
      } else {
        // If no users found matching search, return empty results
        return res.json({
          success: true,
          count: 0,
          total: 0,
          pages: 0,
          currentPage: page,
          data: []
        });
      }
    }
    
    // Execute the query
    doctors = await Doctor.find(filter)
      .populate({
        path: 'user',
        select: 'name email phoneNumber'
      })
      .skip(startIndex)
      .limit(limit);
    
    total = await Doctor.countDocuments(filter);

    res.json({
      success: true,
      count: doctors.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      data: doctors
    });
  } catch (error) {
    console.error('Doctor search error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate({
      path: 'user',
      select: 'name email phoneNumber'
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create doctor profile
// @route   POST /api/doctors
// @access  Private/Doctor
exports.createDoctorProfile = async (req, res) => {
  try {
    // Check if doctor profile already exists for this user
    const existingDoctor = await Doctor.findOne({ user: req.user._id });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor profile already exists for this user'
      });
    }

    // Create doctor profile
    const doctor = await Doctor.create({
      user: req.user._id,
      specialization: req.body.specialization,
      experience: req.body.experience,
      fees: req.body.fees,
      timings: req.body.timings,
      address: req.body.address,
      bio: req.body.bio
    });

    res.status(201).json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/:id
// @access  Private/Doctor
exports.updateDoctorProfile = async (req, res) => {
  try {
    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Make sure the logged in user is the doctor owner
    if (doctor.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    // Update doctor profile
    doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: doctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete doctor profile
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    await doctor.deleteOne();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 