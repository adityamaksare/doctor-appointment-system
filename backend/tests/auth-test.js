const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Function to connect to MongoDB and check user authentication
const testAuthAndPersistence = async () => {
  try {
    console.log('Connecting to MongoDB...');
    
    // Connect to MongoDB with connection options
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // 1. Create a test user if it doesn't exist
    const testUserEmail = 'testauth@example.com';
    const testPassword = 'password123';
    
    let testUser = await User.findOne({ email: testUserEmail });
    
    if (!testUser) {
      console.log('Creating test user...');
      
      testUser = await User.create({
        name: 'Test Auth User',
        email: testUserEmail,
        password: testPassword, // This will be hashed by the pre-save hook
        role: 'patient',
        phoneNumber: '+91 98765 11111'
      });
      
      console.log('Test user created with ID:', testUser._id);
    } else {
      console.log('Test user already exists with ID:', testUser._id);
    }
    
    // 2. Verify login functionality
    console.log('\nTesting login functionality...');
    
    // Get the user with password
    const userWithPassword = await User.findOne({ email: testUserEmail }).select('+password');
    
    if (!userWithPassword) {
      throw new Error('Could not retrieve user with password for testing');
    }
    
    // Verify password match
    const passwordMatch = await userWithPassword.matchPassword(testPassword);
    console.log('Password match result:', passwordMatch);
    
    if (passwordMatch) {
      console.log('✅ Login functionality working correctly');
    } else {
      console.log('❌ Login functionality failed - password not matching');
    }
    
    // 3. Verify data persistence by modifying and retrieving the user
    console.log('\nTesting data persistence...');
    
    // Update the user's name with a timestamp to verify persistence
    const timestamp = new Date().toISOString();
    const updatedName = `Test Auth User (Updated: ${timestamp})`;
    
    await User.findByIdAndUpdate(testUser._id, { name: updatedName });
    console.log('Updated user name with timestamp:', updatedName);
    
    // Reconnect to verify persistence
    await mongoose.connection.close();
    console.log('Closed connection. Reconnecting to verify persistence...');
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    // Retrieve the user again
    const updatedUser = await User.findOne({ email: testUserEmail });
    
    if (updatedUser && updatedUser.name === updatedName) {
      console.log('✅ Data persistence verified - retrieved updated user name:', updatedUser.name);
    } else {
      console.log('❌ Data persistence failed - user name not updated correctly');
      console.log('Retrieved name:', updatedUser ? updatedUser.name : 'User not found');
    }
    
    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    
  } catch (error) {
    console.error('Test error:', error);
  }
};

// Run the function
testAuthAndPersistence(); 