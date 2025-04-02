const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Sample data
const createSampleData = async () => {
  try {
    // First clear existing data
    await User.deleteMany({ role: 'doctor' });
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});
    
    console.log('Previous doctor and appointment data cleared');
    
    // Create test patient user
    const patientUser = {
      name: 'Rohit Sharma',
      email: 'patient@example.com',
      password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK', // password123
      role: 'patient',
      phoneNumber: '+91 98765 43210'
    };
    
    // First, check if the test patient already exists
    let testPatient = await User.findOne({ email: patientUser.email });
    if (!testPatient) {
      testPatient = await User.create(patientUser);
      console.log('Test patient user created');
    } else {
      console.log('Test patient user already exists');
    }

    // Create additional test patients
    const additionalPatients = [
      {
        name: 'Virat Kohli',
        email: 'virat@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK', // password123
        role: 'patient',
        phoneNumber: '+91 98765 43211'
      },
      {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK', // password123
        role: 'patient',
        phoneNumber: '+91 98765 43212'
      },
      {
        name: 'Amit Patel',
        email: 'amit@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK', // password123
        role: 'patient',
        phoneNumber: '+91 98765 43213'
      },
      {
        name: 'Neha Singh',
        email: 'neha@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK', // password123
        role: 'patient',
        phoneNumber: '+91 98765 43214'
      }
    ];

    let createdPatients = [testPatient];
    
    // Create additional patients if they don't exist
    for (const patient of additionalPatients) {
      const exists = await User.findOne({ email: patient.email });
      if (!exists) {
        const newPatient = await User.create(patient);
        createdPatients.push(newPatient);
        console.log(`Created patient: ${patient.name}`);
      } else {
        createdPatients.push(exists);
        console.log(`Patient ${patient.name} already exists`);
      }
    }
    
    // Define specializations we want to have
    const specializations = [
      'Cardiology', 
      'Dermatology', 
      'Pediatrics', 
      'Orthopedics', 
      'Neurology', 
      'Ophthalmology', 
      'Psychiatry', 
      'Dentistry'
    ];
    
    // Create sample doctor users for each specialization
    const doctorsData = [
      // Cardiology Doctors
      {
        name: 'Dr. Rajesh Sharma',
        email: 'rajesh.sharma@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK', // password123
        role: 'doctor',
        phoneNumber: '+91 98765 12345',
        specialization: 'Cardiology'
      },
      {
        name: 'Dr. Sunita Agarwal',
        email: 'sunita.agarwal@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 12346',
        specialization: 'Cardiology'
      },
      {
        name: 'Dr. Ashok Gupta',
        email: 'ashok.gupta@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 12347',
        specialization: 'Cardiology'
      },
      // Add more doctors with their specializations
      // Dermatology Doctors
      {
        name: 'Dr. Priya Patel',
        email: 'priya.patel@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 23456',
        specialization: 'Dermatology'
      },
      {
        name: 'Dr. Karan Malhotra',
        email: 'karan.malhotra@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 23457',
        specialization: 'Dermatology'
      },
      // Pediatrics Doctors
      {
        name: 'Dr. Vikram Mehta',
        email: 'vikram.mehta@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 34567',
        specialization: 'Pediatrics'
      },
      {
        name: 'Dr. Meenakshi Nair',
        email: 'meenakshi.nair@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 34568',
        specialization: 'Pediatrics'
      },
      // Orthopedics Doctors
      {
        name: 'Dr. Neha Kapoor',
        email: 'neha.kapoor@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 45678',
        specialization: 'Orthopedics'
      },
      // Neurology Doctors
      {
        name: 'Dr. Sanjay Rajan',
        email: 'sanjay.rajan@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 56789',
        specialization: 'Neurology'
      },
      // Ophthalmology Doctors
      {
        name: 'Dr. Vijay Desai',
        email: 'vijay.desai@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 67890',
        specialization: 'Ophthalmology'
      },
      // Psychiatry Doctors
      {
        name: 'Dr. Anita Kumar',
        email: 'anita.kumar@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 78901',
        specialization: 'Psychiatry'
      },
      // Dentistry Doctors
      {
        name: 'Dr. Rahul Verma',
        email: 'rahul.verma.dent@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 89012',
        specialization: 'Dentistry'
      }
    ];

    // Create doctor users and their profiles
    console.log('Creating doctors...');
    for (let i = 0; i < doctorsData.length; i++) {
      const doctorData = doctorsData[i];
      
      // Check if the doctor already exists
      let doctorUser = await User.findOne({ email: doctorData.email });
      
      if (!doctorUser) {
        // Create the doctor user account
        const { specialization, ...userData } = doctorData;
        doctorUser = await User.create(userData);
        console.log(`Created doctor user: ${doctorData.name}`);
      } else {
        console.log(`Doctor user ${doctorData.name} already exists`);
      }
      
      // Check if the doctor profile exists
      const doctorProfile = await Doctor.findOne({ user: doctorUser._id });
      
      if (!doctorProfile) {
        // Create the doctor profile with random data and the specified specialization
        await createDoctorProfile(doctorUser, i, doctorData.specialization);
        console.log(`Created profile for doctor: ${doctorData.name}`);
      } else {
        console.log(`Profile for doctor ${doctorData.name} already exists`);
      }
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

// Update the doctorDetails array where doctor profiles are defined
const createDoctorProfile = async (doctorUser, index, specialization) => {
  // Helper function to determine gender based on doctor name
  const determineGender = (name) => {
    // Common Indian female name patterns
    const femalePatterns = [
      'priya', 'sunita', 'neha', 'meenakshi', 'anita', 
      'rekha', 'deepa', 'sneha', 'anjali', 'pooja', 
      'kavita', 'nisha', 'divya', 'shalini'
    ];
    
    // Explicit check for the specified male doctors
    if (name.toLowerCase().includes('ashok') || 
        name.toLowerCase().includes('vikram') || 
        name.toLowerCase().includes('sanjay') || 
        name.toLowerCase().includes('vijay')) {
      return 'male';
    }
    
    // Convert name to lowercase for comparison
    const lowerName = name.toLowerCase();
    
    // Check if name contains any female patterns
    for (const pattern of femalePatterns) {
      if (lowerName.includes(pattern)) {
        return 'female';
      }
    }
    
    // If we can't determine from the patterns, assume male (more common for doctors in India)
    return 'male';
  };

  // Create a hash from the doctor's name for consistent image selection
  const getNameHash = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash) + name.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  // Determine the gender based on the doctor's name
  const gender = determineGender(doctorUser.name);
  
  // Generate a hash from the doctor's name for consistent image assignment
  const nameHash = getNameHash(doctorUser.name);
  
  // Assign a profile image to about 80% of doctors
  const shouldHaveProfileImage = Math.random() > 0.2;
  
  // Assign profile image based on gender and name hash
  let profileImage = null;
  
  if (shouldHaveProfileImage) {
    if (gender === 'female') {
      // We have 8 unique female doctor images
      const imageNum = (nameHash % 8) + 1;
      profileImage = `female-doctor-${imageNum}.jpg`;
    } else {
      // We have 8 unique male doctor images
      const imageNum = (nameHash % 8) + 1;
      profileImage = `male-doctor-${imageNum}.jpg`;
    }
  }

  // Create doctor profile
  await Doctor.create({
    user: doctorUser._id,
    specialization: specialization,
    experience: Math.floor(Math.random() * 15) + 3, // 3-18 years of experience
    fees: Math.floor(Math.random() * 500) + 500, // 500-1000 INR fees
    timings: [
      {
        day: 'Monday',
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      },
      {
        day: 'Tuesday',
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      },
      {
        day: 'Wednesday',
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      },
      {
        day: 'Thursday',
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      },
      {
        day: 'Friday',
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      }
    ],
    address: `Medical Center, ${Math.floor(Math.random() * 100) + 1} Main Street, ${["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune"][Math.floor(Math.random() * 7)]}, India`,
    bio: `Dr. ${doctorUser.name.split(' ')[1]} is a highly skilled ${specialization} specialist with extensive experience in treating patients with a wide range of conditions. ${getRandomBioText(specialization)}`,
    profileImage: profileImage,
    rating: (Math.random() * 2) + 3, // 3-5 star rating
    reviewCount: Math.floor(Math.random() * 50) + 5 // 5-55 reviews
  });
};

// Helper function to get random bio text based on specialization
const getRandomBioText = (specialization) => {
  const bioTexts = {
    'Cardiology': 'Specializes in heart diseases and vascular health. Offers comprehensive treatment for all cardiac conditions.',
    'Dermatology': 'Expert in diagnosing and treating skin, hair, and nail disorders. Committed to helping patients achieve healthy skin.',
    'Pediatrics': 'Dedicated to the health and well-being of children. Provides compassionate care for infants, children, and teenagers.',
    'Orthopedics': 'Focuses on bone and joint health. Helps patients regain mobility and manage musculoskeletal conditions.',
    'Neurology': 'Experienced in treating disorders of the nervous system. Offers advanced diagnostic and treatment options for neurological issues.',
    'Ophthalmology': 'Passionate about eye care and vision health. Provides comprehensive eye examinations and treatments.',
    'Psychiatry': 'Committed to mental health and well-being. Offers support for a wide range of psychological and emotional issues.',
    'Dentistry': 'Dedicated to oral health and beautiful smiles. Provides gentle and effective dental care.'
  };
  
  return bioTexts[specialization] || 'Committed to providing high-quality healthcare and improving patients\' quality of life.';
};

createSampleData(); 