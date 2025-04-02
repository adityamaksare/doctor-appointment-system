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
    
    // Create sample doctor users for each specialization (at least 5 per specialization)
    const doctorUsers = [
      // Cardiology Doctors (5)
      {
        name: 'Dr. Rajesh Sharma',
        email: 'rajesh.sharma@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK', // password123
        role: 'doctor',
        phoneNumber: '+91 98765 12345'
      },
      {
        name: 'Dr. Sunita Agarwal',
        email: 'sunita.agarwal@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 12346'
      },
      {
        name: 'Dr. Ashok Gupta',
        email: 'ashok.gupta@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 12347'
      },
      {
        name: 'Dr. Priyanka Joshi',
        email: 'priyanka.joshi@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 12348'
      },
      {
        name: 'Dr. Vivek Malhotra',
        email: 'vivek.malhotra@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 12349'
      },
      
      // Dermatology Doctors (5)
      {
        name: 'Dr. Priya Patel',
        email: 'priya.patel@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 23456'
      },
      {
        name: 'Dr. Karan Malhotra',
        email: 'karan.malhotra@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 23457'
      },
      {
        name: 'Dr. Sneha Acharya',
        email: 'sneha.acharya@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 23458'
      },
      {
        name: 'Dr. Rahul Verma',
        email: 'rahul.verma@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 23459'
      },
      {
        name: 'Dr. Leela Singh',
        email: 'leela.singh@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 23460'
      },
      
      // Pediatrics Doctors (5)
      {
        name: 'Dr. Vikram Mehta',
        email: 'vikram.mehta@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 34567'
      },
      {
        name: 'Dr. Meenakshi Nair',
        email: 'meenakshi.nair@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 34568'
      },
      {
        name: 'Dr. Aditya Krishnan',
        email: 'aditya.krishnan@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 34569'
      },
      {
        name: 'Dr. Kavita Menon',
        email: 'kavita.menon@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 34570'
      },
      {
        name: 'Dr. Raj Sharma',
        email: 'raj.sharma@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 34571'
      },
      
      // Orthopedics Doctors (5)
      {
        name: 'Dr. Neha Kapoor',
        email: 'neha.kapoor@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 45678'
      },
      {
        name: 'Dr. Ravi Shankar',
        email: 'ravi.shankar@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 45679'
      },
      {
        name: 'Dr. Sheetal Reddy',
        email: 'sheetal.reddy@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 45680'
      },
      {
        name: 'Dr. Anand Prasad',
        email: 'anand.prasad@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 45681'
      },
      {
        name: 'Dr. Divya Mathur',
        email: 'divya.mathur@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 45682'
      },
      
      // Neurology Doctors (5)
      {
        name: 'Dr. Suresh Iyer',
        email: 'suresh.iyer@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 56789'
      },
      {
        name: 'Dr. Nandini Bose',
        email: 'nandini.bose@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 56790'
      },
      {
        name: 'Dr. Hari Krishnan',
        email: 'hari.krishnan@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 56791'
      },
      {
        name: 'Dr. Jyoti Sinha',
        email: 'jyoti.sinha@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 56792'
      },
      {
        name: 'Dr. Ramesh Trivedi',
        email: 'ramesh.trivedi@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 56793'
      },
      
      // Ophthalmology Doctors (5)
      {
        name: 'Dr. Ananya Desai',
        email: 'ananya.desai@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 67890'
      },
      {
        name: 'Dr. Deepak Khanna',
        email: 'deepak.khanna@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 67891'
      },
      {
        name: 'Dr. Anjali Gopalan',
        email: 'anjali.gopalan@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 67892'
      },
      {
        name: 'Dr. Prakash Rao',
        email: 'prakash.rao@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 67893'
      },
      {
        name: 'Dr. Uma Patel',
        email: 'uma.patel@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 67894'
      },
      
      // Psychiatry Doctors (5)
      {
        name: 'Dr. Arjun Reddy',
        email: 'arjun.reddy@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 78901'
      },
      {
        name: 'Dr. Lakshmi Menon',
        email: 'lakshmi.menon@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 78902'
      },
      {
        name: 'Dr. Vinay Chauhan',
        email: 'vinay.chauhan@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 78903'
      },
      {
        name: 'Dr. Gayatri Devi',
        email: 'gayatri.devi@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 78904'
      },
      {
        name: 'Dr. Sanjay Shukla',
        email: 'sanjay.shukla@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 78905'
      },
      
      // Dentistry Doctors (5)
      {
        name: 'Dr. Meera Singhania',
        email: 'meera.singhania@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 89012'
      },
      {
        name: 'Dr. Naveen Kumar',
        email: 'naveen.kumar@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 89013'
      },
      {
        name: 'Dr. Sonali Batra',
        email: 'sonali.batra@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 89014'
      },
      {
        name: 'Dr. Kannan Iyer',
        email: 'kannan.iyer@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 89015'
      },
      {
        name: 'Dr. Pooja Mahajan',
        email: 'pooja.mahajan@example.com',
        password: '$2a$10$TqKTh713LqgA0oN/BBnb8.iEUy3efPBqA2rRg1iE0r.EMk9KVdVMK',
        role: 'doctor',
        phoneNumber: '+91 98765 89016'
      }
    ];
    
    // Insert users and get their IDs
    const createdUsers = await User.insertMany(doctorUsers);
    console.log('Sample doctor users created');
    
    // Generate hospital addresses
    const hospitals = [
      'Apollo Hospitals, Greams Road, Chennai, Tamil Nadu',
      'Fortis Hospital, Bannerghatta Road, Bengaluru, Karnataka',
      'AIIMS, Ansari Nagar, New Delhi, Delhi',
      'Kokilaben Dhirubhai Ambani Hospital, Andheri West, Mumbai, Maharashtra',
      'Medanta - The Medicity, Sector 38, Gurugram, Haryana',
      'NIMHANS, Hosur Road, Bengaluru, Karnataka',
      'Tata Memorial Hospital, Parel, Mumbai, Maharashtra',
      'Narayana Health City, Bommasandra, Bengaluru, Karnataka',
      'Christian Medical College, Vellore, Tamil Nadu',
      'Ruby Hall Clinic, Pune, Maharashtra',
      'Max Super Speciality Hospital, Saket, New Delhi, Delhi',
      'Lilavati Hospital, Bandra, Mumbai, Maharashtra',
      'Manipal Hospital, HAL Airport Road, Bengaluru, Karnataka',
      'BLK Super Speciality Hospital, Rajendra Place, New Delhi, Delhi',
      'Sankara Nethralaya, College Road, Chennai, Tamil Nadu',
      'Wockhardt Hospital, Cunningham Road, Bengaluru, Karnataka',
      'Hiranandani Hospital, Powai, Mumbai, Maharashtra',
      'Rainbow Children\'s Hospital, Banjara Hills, Hyderabad, Telangana',
      'Artemis Hospital, Sector 51, Gurugram, Haryana',
      'Yashoda Hospitals, Somajiguda, Hyderabad, Telangana'
    ];

    // Function to generate random doctor profiles
    const generateDoctorProfiles = (users, specialization) => {
      return users.map((user, index) => {
        // Get random rating between 3.5 and 5.0
        const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
        
        // Get random review count between 10 and 50
        const reviewCount = Math.floor(Math.random() * 40) + 10;
        
        // Get random experience between 3 and 20 years
        const experience = Math.floor(Math.random() * 17) + 3;
        
        // Get random fees between 800 and 2500 INR
        const fees = (Math.floor(Math.random() * 17) + 8) * 100;
        
        // Get random hospital address
        const address = hospitals[Math.floor(Math.random() * hospitals.length)];
        
        // Generate timings - each doctor will have 3-4 available days
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const shuffledDays = [...days].sort(() => 0.5 - Math.random());
        const availableDays = shuffledDays.slice(0, Math.floor(Math.random() * 2) + 3);
        
        const timings = days.map(day => {
          const isAvailable = availableDays.includes(day);
          return {
            day,
            startTime: isAvailable ? `0${Math.floor(Math.random() * 3) + 8}:00` : '09:00',
            endTime: isAvailable ? `${Math.floor(Math.random() * 3) + 16}:00` : '17:00',
            isAvailable
          };
        });
        
        // Add Sunday (usually not available)
        timings.push({
          day: 'Sunday',
          startTime: '09:00',
          endTime: '13:00',
          isAvailable: Math.random() < 0.2 // 20% chance of being available on Sunday
        });
        
        // Generate bio based on specialization
        let bio = '';
        switch (specialization) {
          case 'Cardiology':
            bio = `Experienced cardiologist with ${experience} years of practice specializing in heart disease prevention and treatment. Expert in cardiac procedures and managing complex heart conditions.`;
            break;
          case 'Dermatology':
            bio = `Board-certified dermatologist with ${experience} years of experience in treating skin disorders, cosmetic procedures, and dermatological surgeries.`;
            break;
          case 'Pediatrics':
            bio = `Compassionate pediatrician with ${experience} years of experience dedicated to providing comprehensive care for children from birth through adolescence.`;
            break;
          case 'Orthopedics':
            bio = `Skilled orthopedic surgeon with ${experience} years of experience specializing in sports injuries, joint replacements, and minimally invasive procedures.`;
            break;
          case 'Neurology':
            bio = `Neurologist with ${experience} years of clinical experience, expertise in treating headaches, epilepsy, stroke, and neurodegenerative disorders.`;
            break;
          case 'Ophthalmology':
            bio = `Experienced ophthalmologist with ${experience} years of practice specializing in comprehensive eye care, cataract surgery, and LASIK procedures.`;
            break;
          case 'Psychiatry':
            bio = `Dedicated psychiatrist with ${experience} years of experience specializing in mood disorders, anxiety, depression, and cognitive behavioral therapy.`;
            break;
          case 'Dentistry':
            bio = `Skilled dentist with ${experience} years of experience providing preventive care, restorative treatments, cosmetic dentistry, and oral surgery services.`;
            break;
          default:
            bio = `Medical professional with ${experience} years of experience dedicated to providing high-quality patient care.`;
        }
        
        return {
          user: user._id,
          specialization,
          experience,
          fees,
          timings,
          address,
          bio,
          rating,
          reviewCount
        };
      });
    };
    
    // Create doctor profiles by specialization
    let doctorProfiles = [];
    
    // Process 5 doctors for each specialization
    for (let i = 0; i < specializations.length; i++) {
      // Get 5 doctors for this specialization (starting from index i*5)
      const specializationDoctors = createdUsers.slice(i * 5, (i + 1) * 5);
      // Generate profiles for these doctors
      const profiles = generateDoctorProfiles(specializationDoctors, specializations[i]);
      // Add to the profiles array
      doctorProfiles = [...doctorProfiles, ...profiles];
    }
    
    const savedDoctorProfiles = await Doctor.insertMany(doctorProfiles);
    console.log(`Sample doctor profiles created: ${doctorProfiles.length} doctors`);
    
    // Create sample appointments
    console.log('Creating sample appointments...');
    
    // Define appointment reasons
    const appointmentReasons = [
      'Regular checkup',
      'Consultation for persistent cough',
      'Follow-up on previous treatment',
      'Chest pain and shortness of breath',
      'Skin rash examination',
      'Migraine and headaches',
      'Joint pain in the knee',
      'Annual eye examination',
      'Dental cleaning and check',
      'Anxiety and stress management',
      'Back pain treatment',
      'Prescription renewal',
      'Nutritional counseling',
      'Fever and body aches',
      'Pre-surgery consultation'
    ];
    
    // Function to get a random time in HH:MM format between two times
    const getRandomTime = (start, end) => {
      // Parse hours and minutes
      const [startHour, startMinute] = start.split(':').map(Number);
      const [endHour, endMinute] = end.split(':').map(Number);
      
      // Convert to minutes since midnight
      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;
      
      // Get random minutes between start and end
      const randomMinutes = Math.floor(Math.random() * (endMinutes - startMinutes)) + startMinutes;
      
      // Round to nearest 30 minutes (common for appointments)
      const roundedMinutes = Math.round(randomMinutes / 30) * 30;
      
      // Convert back to HH:MM format
      const hours = Math.floor(roundedMinutes / 60);
      const minutes = roundedMinutes % 60;
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };
    
    // Create appointments for each doctor with random patients
    const appointments = [];
    
    // Helper to get random appointment date
    const getRandomDate = (pastDays = 10, futureDays = 30) => {
      const today = new Date();
      const start = new Date(today);
      start.setDate(today.getDate() - pastDays);
      
      const end = new Date(today);
      end.setDate(today.getDate() + futureDays);
      
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };
    
    // Get appointment statuses based on date
    const getAppointmentStatus = (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (date < today) {
        // Past appointments are either completed or cancelled
        return Math.random() > 0.2 ? 'completed' : 'cancelled';
      } else if (date.toDateString() === today.toDateString()) {
        // Today's appointments are either confirmed or pending
        return Math.random() > 0.3 ? 'confirmed' : 'pending';
      } else {
        // Future appointments are mostly pending, some confirmed
        return Math.random() > 0.7 ? 'confirmed' : 'pending';
      }
    };
    
    // For each doctor, create 3-8 appointments
    for (const doctor of savedDoctorProfiles) {
      const numAppointments = Math.floor(Math.random() * 6) + 3; // 3-8 appointments
      
      for (let i = 0; i < numAppointments; i++) {
        // Get random patient
        const patient = createdPatients[Math.floor(Math.random() * createdPatients.length)];
        
        // Get random appointment date (past, present, or future)
        const appointmentDate = getRandomDate();
        
        // Get day of week for the appointment date
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][appointmentDate.getDay()];
        
        // Find if the doctor is available on this day
        const doctorTiming = doctor.timings.find(t => t.day === dayOfWeek && t.isAvailable);
        
        // If doctor is not available on this day, skip to next appointment
        if (!doctorTiming) continue;
        
        // Get random time during the doctor's available hours
        const appointmentTime = getRandomTime(doctorTiming.startTime, doctorTiming.endTime);
        
        // Get appointment status based on date
        const status = getAppointmentStatus(appointmentDate);
        
        // Get random reason
        const reason = appointmentReasons[Math.floor(Math.random() * appointmentReasons.length)];
        
        // Create appointment
        appointments.push({
          doctor: doctor._id,
          patient: patient._id,
          appointmentDate,
          appointmentTime,
          reason,
          status,
          fees: doctor.fees,
          isPaid: status === 'completed' || (status === 'confirmed' && Math.random() > 0.5)
        });
      }
    }
    
    await Appointment.insertMany(appointments);
    console.log(`Sample appointments created: ${appointments.length} appointments`);
    
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

createSampleData(); 