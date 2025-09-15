const mongoose = require('mongoose');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');
require('dotenv').config();

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  separator: () => console.log('=' + '='.repeat(60))
};

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    log.success(`MongoDB Atlas Connected: ${conn.connection.host}`);
    log.info(`Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    log.error(`MongoDB Atlas Connection Error: ${error.message}`);
    throw error;
  }
};

// Test database operations
const testDatabaseOperations = async () => {
  log.separator();
  log.info('TESTING DATABASE CONNECTIVITY AND OPERATIONS');
  log.separator();

  try {
    // Test MongoDB connection
    await connectDB();
    
    // Test User model operations
    log.info('Testing User model operations...');
    const userCount = await User.countDocuments();
    log.success(`Total users in database: ${userCount}`);
    
    const doctorUsers = await User.countDocuments({ role: 'doctor' });
    log.success(`Total doctor users: ${doctorUsers}`);
    
    const patientUsers = await User.countDocuments({ role: 'patient' });
    log.success(`Total patient users: ${patientUsers}`);
    
    // Test Doctor model operations
    log.info('Testing Doctor model operations...');
    const doctorProfiles = await Doctor.countDocuments();
    log.success(`Total doctor profiles: ${doctorProfiles}`);
    
    // Get sample doctor with populated user data
    const sampleDoctor = await Doctor.findOne().populate('user', 'name email role');
    if (sampleDoctor) {
      log.success(`Sample doctor found: ${sampleDoctor.user.name} - ${sampleDoctor.specialization}`);
    }
    
    // Test Appointment model operations
    log.info('Testing Appointment model operations...');
    const appointmentCount = await Appointment.countDocuments();
    log.success(`Total appointments in database: ${appointmentCount}`);
    
    const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
    log.success(`Pending appointments: ${pendingAppointments}`);
    
    const confirmedAppointments = await Appointment.countDocuments({ status: 'confirmed' });
    log.success(`Confirmed appointments: ${confirmedAppointments}`);
    
    const cancelledAppointments = await Appointment.countDocuments({ status: 'cancelled' });
    log.success(`Cancelled appointments: ${cancelledAppointments}`);
    
    // Test complex queries with populate
    log.info('Testing complex database queries...');
    
    const appointmentsWithDetails = await Appointment.find()
      .populate({
        path: 'doctor',
        select: 'specialization fees',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .populate('patient', 'name email')
      .limit(3);
      
    log.success(`Successfully retrieved ${appointmentsWithDetails.length} appointments with populated data`);
    
    if (appointmentsWithDetails.length > 0) {
      const appointment = appointmentsWithDetails[0];
      log.info(`Sample appointment: ${appointment.patient?.name} -> ${appointment.doctor?.user?.name} (${appointment.status})`);
    }
    
    // Test aggregation operations
    log.info('Testing aggregation operations...');
    
    const doctorStats = await Doctor.aggregate([
      {
        $group: {
          _id: '$specialization',
          count: { $sum: 1 },
          avgFees: { $avg: '$fees' },
          avgExperience: { $avg: '$experience' }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    log.success(`Doctor statistics by specialization:`);
    doctorStats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} doctors, Avg fees: ₹${Math.round(stat.avgFees)}, Avg exp: ${Math.round(stat.avgExperience)} years`);
    });
    
    // Test appointment statistics
    const appointmentStats = await Appointment.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    log.success(`Appointment statistics by status:`);
    appointmentStats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} appointments`);
    });
    
    // Test database indexes
    log.info('Checking database indexes...');
    const userIndexes = await User.collection.indexes();
    log.success(`User model has ${userIndexes.length} indexes`);
    
    const doctorIndexes = await Doctor.collection.indexes();
    log.success(`Doctor model has ${doctorIndexes.length} indexes`);
    
    const appointmentIndexes = await Appointment.collection.indexes();
    log.success(`Appointment model has ${appointmentIndexes.length} indexes`);
    
    // Test database performance with a time-based query
    log.info('Testing database performance...');
    const start = Date.now();
    
    const recentAppointments = await Appointment.find({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
    }).populate('doctor patient');
    
    const queryTime = Date.now() - start;
    log.success(`Retrieved ${recentAppointments.length} recent appointments in ${queryTime}ms`);
    
    // Test schema validations
    log.info('Testing schema validations...');
    try {
      const invalidUser = new User({
        name: '',  // Should fail validation
        email: 'invalid-email',  // Should fail validation
        password: '123'  // Too short
      });
      await invalidUser.validate();
      log.error('Schema validation failed to catch invalid data');
    } catch (validationError) {
      log.success('Schema validation working correctly - invalid data rejected');
    }
    
    log.separator();
    log.success('🎉 ALL DATABASE TESTS COMPLETED SUCCESSFULLY!');
    log.info('Database connectivity and operations are working properly.');
    
  } catch (error) {
    log.error(`Database operation failed: ${error.message}`);
    throw error;
  } finally {
    // Close database connection
    mongoose.connection.close();
    log.info('Database connection closed.');
  }
};

// Run the test
const runDatabaseTest = async () => {
  console.log(`${colors.blue}🚀 Starting Database Connectivity and Operations Test...${colors.reset}\n`);
  
  try {
    await testDatabaseOperations();
  } catch (error) {
    log.error(`Unexpected error during database testing: ${error.message}`);
    process.exit(1);
  }
};

// Execute if this file is run directly
if (require.main === module) {
  runDatabaseTest();
}

module.exports = { testDatabaseOperations };