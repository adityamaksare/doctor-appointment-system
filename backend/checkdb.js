const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Function to connect to MongoDB and check data
const checkDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGO_URI);
    
    // Connect to MongoDB with connection options
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Check if users collection exists
    const userCount = await User.countDocuments();
    console.log(`Found ${userCount} users in the database`);
    
    // List all users
    const users = await User.find().select('name email role');
    console.log('Users in database:');
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}), Role: ${user.role}`);
    });
    
    console.log('Database connection and data verification successful!');
    
    // Check database stats
    const dbStats = await mongoose.connection.db.stats();
    console.log('Database statistics:', {
      collections: dbStats.collections,
      objects: dbStats.objects,
      dataSize: `${(dbStats.dataSize / 1024 / 1024).toFixed(2)} MB`,
      storageSize: `${(dbStats.storageSize / 1024 / 1024).toFixed(2)} MB`,
    });
    
    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

// Run the function
checkDatabase(); 