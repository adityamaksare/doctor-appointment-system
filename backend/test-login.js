const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Load environment variables
dotenv.config();

// Function to test login
const testLogin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGO_URI);
    
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Email and password to test
    const testEmail = 'aditya@gmail.com';
    const testPassword = 'password123';
    
    console.log(`Testing login for: ${testEmail} with password: ${testPassword}`);
    
    // Case-insensitive search for the email
    const users = await User.find({
      email: { $regex: new RegExp(`^${testEmail}$`, 'i') }
    }).select('+password');
    
    if (users.length === 0) {
      console.log('No user found with this email (case-insensitive search)');
      
      // Try to find any similar emails
      const similarUsers = await User.find({
        email: { $regex: new RegExp('aditya', 'i') }
      });
      
      if (similarUsers.length > 0) {
        console.log('Found similar email addresses:');
        similarUsers.forEach(user => {
          console.log(`- ${user.email} (${user.name})`);
        });
      }
      
      process.exit(1);
    }
    
    console.log(`Found ${users.length} users with this email (case-insensitive):`);
    
    // Test login for each matching user
    for (const user of users) {
      console.log(`\nTesting user: ${user.name} (${user.email}), ID: ${user._id}`);
      console.log(`Role: ${user.role}`);
      console.log(`Password hash: ${user.password ? user.password.substring(0, 20) + '...' : 'No password stored'}`);
      
      // Verify if password exists
      if (!user.password) {
        console.log('❌ User has no password stored!');
        continue;
      }
      
      // Try to match password
      const isMatch = await bcrypt.compare(testPassword, user.password);
      console.log(`Password match result: ${isMatch}`);
      
      if (isMatch) {
        console.log(`✅ LOGIN SUCCESSFUL for user: ${user.name} (${user.email})`);
      } else {
        console.log(`❌ Password mismatch for user: ${user.email}`);
        
        // Let's test if this is a bcrypt formatting issue by rehashing the password
        console.log('\nAttempting to fix password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(testPassword, salt);
        
        // Update the password directly in the database
        await User.updateOne(
          { _id: user._id },
          { $set: { password: hashedPassword } }
        );
        
        console.log(`Password updated for user ${user.name}!`);
        console.log(`New password hash: ${hashedPassword.substring(0, 20) + '...'}`);
        
        // Verify the updated password
        const updatedUser = await User.findById(user._id).select('+password');
        const newPasswordMatch = await bcrypt.compare(testPassword, updatedUser.password);
        
        if (newPasswordMatch) {
          console.log('✅ Password reset successful. You can now log in with the password.');
        } else {
          console.log('❌ Password reset failed. There might be a deeper issue.');
        }
      }
    }
    
    // Close MongoDB connection
    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
    
  } catch (error) {
    console.error('Error testing login:', error);
    process.exit(1);
  }
};

// Run the function
testLogin(); 