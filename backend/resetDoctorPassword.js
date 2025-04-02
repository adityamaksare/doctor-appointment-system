const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Function to reset a doctor's password
const resetDoctorPassword = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Find a doctor account to reset
    const doctors = await User.find({ role: 'doctor' }).limit(5);
    
    if (doctors.length === 0) {
      console.log('No doctor accounts found!');
      process.exit(1);
    }
    
    console.log('Found the following doctor accounts:');
    doctors.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc.name} (${doc.email})`);
    });
    
    // Reset password for the first doctor account
    const doctorToReset = doctors[0];
    
    // New password
    const newPassword = 'password123';
    
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update the password
    await User.updateOne(
      { _id: doctorToReset._id },
      { $set: { password: hashedPassword } }
    );
    
    console.log(`\nPassword reset successfully for doctor ${doctorToReset.name}!`);
    console.log(`Email: ${doctorToReset.email}`);
    console.log(`New password: ${newPassword}`);
    
    // Verify if this doctor has a profile
    const doctorProfile = await Doctor.findOne({ user: doctorToReset._id });
    
    if (doctorProfile) {
      console.log(`\nDoctor specialization: ${doctorProfile.specialization}`);
      console.log(`Experience: ${doctorProfile.experience} years`);
      console.log(`Fees: ₹${doctorProfile.fees}`);
    } else {
      console.log('\nNote: This doctor does not have a profile yet. They will need to create one after logging in.');
    }
    
    // Verify the updated password
    const updatedUser = await User.findOne({ email: doctorToReset.email }).select('+password');
    const passwordMatch = await bcrypt.compare(newPassword, updatedUser.password);
    
    if (passwordMatch) {
      console.log('\n✅ Password verification successful. You can now log in with the new password.');
    } else {
      console.log('\n❌ Password verification failed. Please try again.');
    }
    
    // Get all specializations
    console.log('\nAvailable specializations:');
    const specializations = await Doctor.distinct('specialization');
    specializations.forEach(spec => console.log(`- ${spec}`));
    
    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
    
  } catch (error) {
    console.error('Error resetting doctor password:', error);
    process.exit(1);
  }
};

// Run the function
resetDoctorPassword(); 