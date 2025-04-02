const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Book a new appointment
// @route   POST /api/appointments
// @access  Private/Patient
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, reason } = req.body;

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Check if appointment slot is available
    const date = new Date(appointmentDate);
    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
    
    // Validate if doctor works on that day
    const doctorSchedule = doctor.timings.find(
      timing => timing.day === dayOfWeek && timing.isAvailable
    );

    if (!doctorSchedule) {
      return res.status(400).json({
        success: false,
        message: `Doctor is not available on ${dayOfWeek}`
      });
    }

    // Check if the requested time is within doctor's working hours
    // This is a simple check, you may need to implement a more robust time validation
    if (appointmentTime < doctorSchedule.startTime || appointmentTime > doctorSchedule.endTime) {
      return res.status(400).json({
        success: false,
        message: 'Appointment time is outside doctor\'s working hours'
      });
    }

    // Check if there's already an appointment at the same time
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate: date,
      appointmentTime,
      status: { $nin: ['cancelled'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This appointment slot is already booked'
      });
    }

    // Create new appointment
    const appointment = await Appointment.create({
      doctor: doctorId,
      patient: req.user._id,
      appointmentDate: date,
      appointmentTime,
      reason,
      fees: doctor.fees
    });

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all appointments for a user (patient or doctor)
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    let query = {};

    // If user is a patient, get all their appointments
    if (req.user.role === 'patient') {
      query.patient = req.user._id;
    } 
    // If user is a doctor, get appointments for doctor's profile
    else if (req.user.role === 'doctor') {
      // Find doctor profile first
      const doctorProfile = await Doctor.findOne({ user: req.user._id });
      if (!doctorProfile) {
        return res.status(404).json({
          success: false,
          message: 'Doctor profile not found'
        });
      }
      query.doctor = doctorProfile._id;
    }

    // Add date filter if provided
    if (req.query.date) {
      const date = new Date(req.query.date);
      date.setHours(0, 0, 0, 0);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      
      query.appointmentDate = {
        $gte: date,
        $lt: nextDay
      };
    }

    // Add status filter if provided
    if (req.query.status) {
      query.status = req.query.status;
    }

    const appointments = await Appointment.find(query)
      .populate({
        path: 'doctor',
        select: 'specialization fees',
        populate: {
          path: 'user',
          select: 'name email phoneNumber'
        }
      })
      .populate({
        path: 'patient',
        select: 'name email phoneNumber'
      })
      .sort({ appointmentDate: 1, appointmentTime: 1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: 'doctor',
        select: 'specialization fees',
        populate: {
          path: 'user',
          select: 'name email phoneNumber'
        }
      })
      .populate({
        path: 'patient',
        select: 'name email phoneNumber'
      });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if user is authorized to view this appointment
    if (
      req.user.role === 'patient' && appointment.patient._id.toString() !== req.user._id.toString() ||
      req.user.role === 'doctor' && appointment.doctor.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this appointment'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validate status
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if user is authorized to update this appointment
    if (
      req.user.role === 'patient' && appointment.patient.toString() !== req.user._id.toString() ||
      req.user.role === 'doctor' && 
        !(await Doctor.exists({ _id: appointment.doctor, user: req.user._id }))
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment'
      });
    }

    // Patients can only cancel appointments
    if (req.user.role === 'patient' && status !== 'cancelled') {
      return res.status(403).json({
        success: false,
        message: 'Patients can only cancel appointments'
      });
    }

    appointment.status = status;
    if (status === 'confirmed') {
      appointment.confirmedAt = Date.now();
    }

    await appointment.save();

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 