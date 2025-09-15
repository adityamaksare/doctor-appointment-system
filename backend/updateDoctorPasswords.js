const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB Atlas Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Update all doctor passwords
const updateDoctorPasswords = async () => {
  try {
    console.log('Starting to update doctor passwords...');
    
    // Find all users with role 'doctor'
    const doctors = await User.find({ role: 'doctor' });
    
    if (doctors.length === 0) {
      console.log('No doctors found in the database.');
      return;
    }
    
    console.log(`Found ${doctors.length} doctor(s) to update:`);
    
    const newPassword = 'doctor@123';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update each doctor's password
    for (let i = 0; i < doctors.length; i++) {
      const doctor = doctors[i];
      console.log(`${i + 1}. Updating password for: ${doctor.name} (${doctor.email})`);
      
      // Update password directly in database to bypass pre-save middleware
      await User.findByIdAndUpdate(
        doctor._id,
        { password: hashedPassword },
        { new: true }
      );
    }
    
    console.log('\n✅ All doctor passwords have been updated successfully!');
    console.log(`New password for all doctors: ${newPassword}`);
    console.log('\nUpdated doctors:');
    
    // Display updated doctors
    const updatedDoctors = await User.find({ role: 'doctor' }).select('name email phoneNumber');
    updatedDoctors.forEach((doctor, index) => {
      console.log(`${index + 1}. ${doctor.name} - ${doctor.email} - ${doctor.phoneNumber}`);
    });
    
  } catch (error) {
    console.error('Error updating doctor passwords:', error.message);
  } finally {
    // Close database connection
    mongoose.connection.close();
    console.log('\nDatabase connection closed.');
  }
};

// Run the script
const runScript = async () => {
  await connectDB();
  await updateDoctorPasswords();
};

// Execute if this file is run directly
if (require.main === module) {
  runScript();
}

module.exports = { updateDoctorPasswords };