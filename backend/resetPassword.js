const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Function to reset a user's password
const resetUserPassword = async () => {
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
    
    // User email to reset
    const userEmail = 'aditya@gmail.com';
    
    // Find the user
    const user = await User.findOne({ email: userEmail });
    
    if (!user) {
      console.log(`User with email ${userEmail} not found!`);
      process.exit(1);
    }
    
    console.log(`Found user: ${user.name} (${user.email}), Role: ${user.role}`);
    
    // New password
    const newPassword = 'password123';
    
    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update the password directly in the database to bypass any validation issues
    await User.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );
    
    console.log(`Password reset successfully for user ${user.name}!`);
    console.log(`New password: ${newPassword}`);
    
    // Verify the updated password
    const updatedUser = await User.findOne({ email: userEmail }).select('+password');
    const passwordMatch = await bcrypt.compare(newPassword, updatedUser.password);
    
    if (passwordMatch) {
      console.log('✅ Password verification successful. You can now log in with the new password.');
    } else {
      console.log('❌ Password verification failed. Please try again.');
    }
    
    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    
  } catch (error) {
    console.error('Error resetting password:', error);
    process.exit(1);
  }
};

// Run the function
resetUserPassword(); 