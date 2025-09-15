const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
let authTokens = {
  patient: '',
  doctor: '',
  admin: ''
};

// Test configuration
const testUsers = {
  patient: {
    name: 'Test Patient',
    email: 'testpatient@example.com',
    password: 'testpass123',
    phoneNumber: '+91 98765 12999',
    role: 'patient'
  },
  doctor: {
    email: 'rajesh.sharma@example.com',  // Using existing doctor
    password: 'doctor@123'  // Updated password
  }
};

// Color coding for console output
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

// Test helper function
async function testEndpoint(description, requestFn) {
  try {
    log.info(`Testing: ${description}`);
    const result = await requestFn();
    log.success(`${description} - SUCCESS`);
    return result;
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    log.error(`${description} - FAILED: ${errorMsg}`);
    if (error.response?.status === 500) {
      console.log('Server Error Details:', error.response.data);
    }
    return null;
  }
}

// Test functions
async function testServerConnectivity() {
  log.separator();
  log.info('1. TESTING SERVER CONNECTIVITY');
  log.separator();

  await testEndpoint('Basic server connectivity', async () => {
    const response = await axios.get(`${BASE_URL}/`);
    console.log('Response:', response.data);
    return response.data;
  });
}

async function testUserRegistration() {
  log.separator();
  log.info('2. TESTING USER REGISTRATION');
  log.separator();

  // Test patient registration
  const patientResult = await testEndpoint('Register new patient', async () => {
    const response = await axios.post(`${BASE_URL}/api/users/register`, testUsers.patient);
    console.log('Patient registered:', response.data.user.name, '|', response.data.user.email);
    authTokens.patient = response.data.user.token;
    return response.data;
  });

  // Test duplicate registration (should fail)
  await testEndpoint('Register duplicate user (should fail)', async () => {
    const response = await axios.post(`${BASE_URL}/api/users/register`, testUsers.patient);
    return response.data;
  });
}

async function testUserLogin() {
  log.separator();
  log.info('3. TESTING USER LOGIN');
  log.separator();

  // Test doctor login with updated password
  const doctorResult = await testEndpoint('Login as doctor with updated password', async () => {
    const response = await axios.post(`${BASE_URL}/api/users/login`, testUsers.doctor);
    console.log('Doctor logged in:', response.data.user.name, '|', response.data.user.role);
    authTokens.doctor = response.data.user.token;
    return response.data;
  });

  // Test patient login
  await testEndpoint('Login as patient', async () => {
    const loginData = {
      email: testUsers.patient.email,
      password: testUsers.patient.password
    };
    const response = await axios.post(`${BASE_URL}/api/users/login`, loginData);
    console.log('Patient logged in:', response.data.user.name, '|', response.data.user.role);
    authTokens.patient = response.data.user.token;
    return response.data;
  });

  // Test invalid credentials
  await testEndpoint('Login with invalid credentials (should fail)', async () => {
    const response = await axios.post(`${BASE_URL}/api/users/login`, {
      email: 'wrong@example.com',
      password: 'wrongpassword'
    });
    return response.data;
  });
}

async function testUserProfile() {
  log.separator();
  log.info('4. TESTING USER PROFILE ENDPOINTS');
  log.separator();

  // Test get user profile (patient)
  await testEndpoint('Get patient profile', async () => {
    const response = await axios.get(`${BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${authTokens.patient}` }
    });
    console.log('Patient profile:', response.data.user.name, '|', response.data.user.email);
    return response.data;
  });

  // Test get user profile (doctor)
  await testEndpoint('Get doctor profile', async () => {
    const response = await axios.get(`${BASE_URL}/api/users/profile`, {
      headers: { Authorization: `Bearer ${authTokens.doctor}` }
    });
    console.log('Doctor profile:', response.data.user.name, '|', response.data.user.email);
    return response.data;
  });

  // Test unauthorized access
  await testEndpoint('Get profile without auth (should fail)', async () => {
    const response = await axios.get(`${BASE_URL}/api/users/profile`);
    return response.data;
  });

  // Test update user profile
  await testEndpoint('Update patient profile', async () => {
    const updateData = {
      name: 'Updated Test Patient',
      phoneNumber: '+91 98765 99999'
    };
    const response = await axios.put(`${BASE_URL}/api/users/profile`, updateData, {
      headers: { Authorization: `Bearer ${authTokens.patient}` }
    });
    console.log('Updated profile name:', response.data.user.name);
    return response.data;
  });
}

async function testDoctorEndpoints() {
  log.separator();
  log.info('5. TESTING DOCTOR ENDPOINTS');
  log.separator();

  let doctorId = '';

  // Test get all doctors (public)
  const doctorsResult = await testEndpoint('Get all doctors (public)', async () => {
    const response = await axios.get(`${BASE_URL}/api/doctors`);
    console.log('Total doctors found:', response.data.total);
    if (response.data.data.length > 0) {
      doctorId = response.data.data[0]._id;
      console.log('First doctor:', response.data.data[0].user?.name);
    }
    return response.data;
  });

  // Test get doctors with search
  await testEndpoint('Search doctors by name', async () => {
    const response = await axios.get(`${BASE_URL}/api/doctors?search=Rajesh`);
    console.log('Search results:', response.data.count);
    return response.data;
  });

  // Test get doctors with specialization filter
  await testEndpoint('Filter doctors by specialization', async () => {
    const response = await axios.get(`${BASE_URL}/api/doctors?specialization=Cardiology`);
    console.log('Cardiology doctors:', response.data.count);
    return response.data;
  });

  // Test get single doctor
  if (doctorId) {
    await testEndpoint('Get single doctor profile', async () => {
      const response = await axios.get(`${BASE_URL}/api/doctors/${doctorId}`);
      console.log('Doctor details:', response.data.data.user?.name, '|', response.data.data.specialization);
      return response.data;
    });
  }

  // Test create doctor profile (should fail for patient)
  await testEndpoint('Create doctor profile as patient (should fail)', async () => {
    const doctorProfileData = {
      specialization: 'General Medicine',
      experience: 5,
      fees: 500,
      address: 'Test Address',
      bio: 'Test Doctor Bio',
      timings: [{
        day: 'Monday',
        startTime: '09:00',
        endTime: '17:00',
        isAvailable: true
      }]
    };
    const response = await axios.post(`${BASE_URL}/api/doctors`, doctorProfileData, {
      headers: { Authorization: `Bearer ${authTokens.patient}` }
    });
    return response.data;
  });
}

async function testAppointmentEndpoints() {
  log.separator();
  log.info('6. TESTING APPOINTMENT ENDPOINTS');
  log.separator();

  let appointmentId = '';
  let doctorId = '';

  // First get a doctor ID for appointment booking
  const doctorsResult = await axios.get(`${BASE_URL}/api/doctors`);
  if (doctorsResult.data.data.length > 0) {
    doctorId = doctorsResult.data.data[0]._id;
  }

  // Test book appointment as patient
  if (doctorId) {
    const bookingResult = await testEndpoint('Book appointment as patient', async () => {
      const appointmentData = {
        doctorId: doctorId,
        appointmentDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        appointmentTime: '10:00',
        reason: 'Regular checkup',
        paymentMethod: 'card',
        isPaid: true
      };
      const response = await axios.post(`${BASE_URL}/api/appointments`, appointmentData, {
        headers: { Authorization: `Bearer ${authTokens.patient}` }
      });
      appointmentId = response.data.data._id;
      console.log('Appointment booked with ID:', appointmentId);
      return response.data;
    });
  }

  // Test get appointments as patient
  await testEndpoint('Get patient appointments', async () => {
    const response = await axios.get(`${BASE_URL}/api/appointments`, {
      headers: { Authorization: `Bearer ${authTokens.patient}` }
    });
    console.log('Patient appointments count:', response.data.count);
    return response.data;
  });

  // Test get appointments as doctor
  await testEndpoint('Get doctor appointments', async () => {
    const response = await axios.get(`${BASE_URL}/api/appointments`, {
      headers: { Authorization: `Bearer ${authTokens.doctor}` }
    });
    console.log('Doctor appointments count:', response.data.count);
    return response.data;
  });

  // Test get single appointment
  if (appointmentId) {
    await testEndpoint('Get single appointment', async () => {
      const response = await axios.get(`${BASE_URL}/api/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${authTokens.patient}` }
      });
      console.log('Appointment status:', response.data.data.status);
      return response.data;
    });

    // Test update appointment status as patient (cancel)
    await testEndpoint('Cancel appointment as patient', async () => {
      const response = await axios.put(`${BASE_URL}/api/appointments/${appointmentId}`, 
        { status: 'cancelled' },
        { headers: { Authorization: `Bearer ${authTokens.patient}` } }
      );
      console.log('Appointment status updated to:', response.data.data.status);
      return response.data;
    });
  }

  // Test unauthorized appointment booking
  await testEndpoint('Book appointment as doctor (should fail)', async () => {
    const appointmentData = {
      doctorId: doctorId,
      appointmentDate: new Date(Date.now() + 86400000).toISOString(),
      appointmentTime: '11:00',
      reason: 'Test',
      paymentMethod: 'card',
      isPaid: false
    };
    const response = await axios.post(`${BASE_URL}/api/appointments`, appointmentData, {
      headers: { Authorization: `Bearer ${authTokens.doctor}` }
    });
    return response.data;
  });
}

async function testMiddleware() {
  log.separator();
  log.info('7. TESTING MIDDLEWARE');
  log.separator();

  // Test protected route without token
  await testEndpoint('Access protected route without token (should fail)', async () => {
    const response = await axios.get(`${BASE_URL}/api/users/profile`);
    return response.data;
  });

  // Test protected route with invalid token
  await testEndpoint('Access protected route with invalid token (should fail)', async () => {
    const response = await axios.get(`${BASE_URL}/api/users/profile`, {
      headers: { Authorization: 'Bearer invalidtoken123' }
    });
    return response.data;
  });

  // Test role-based authorization
  await testEndpoint('Patient trying to access admin route (should fail)', async () => {
    // Get a doctor ID first
    const doctorsResult = await axios.get(`${BASE_URL}/api/doctors`);
    const doctorId = doctorsResult.data.data[0]?._id;
    
    if (doctorId) {
      const response = await axios.delete(`${BASE_URL}/api/doctors/${doctorId}`, {
        headers: { Authorization: `Bearer ${authTokens.patient}` }
      });
      return response.data;
    }
  });
}

// Main test execution
async function runAllTests() {
  console.log(`${colors.blue}🚀 Starting Comprehensive API Testing...${colors.reset}\n`);
  
  try {
    await testServerConnectivity();
    await testUserRegistration();
    await testUserLogin();
    await testUserProfile();
    await testDoctorEndpoints();
    await testAppointmentEndpoints();
    await testMiddleware();

    log.separator();
    log.success('🎉 ALL API ENDPOINT TESTS COMPLETED!');
    log.info('Check the results above for detailed information about each endpoint.');
    
    console.log('\n📊 AUTH TOKENS COLLECTED:');
    console.log('Patient Token:', authTokens.patient ? 'Available' : 'Not Available');
    console.log('Doctor Token:', authTokens.doctor ? 'Available' : 'Not Available');
    
  } catch (error) {
    log.error(`Unexpected error during testing: ${error.message}`);
  }
}

// Check if axios is available
const axiosAvailable = () => {
  try {
    require('axios');
    return true;
  } catch (err) {
    return false;
  }
};

if (!axiosAvailable()) {
  console.log('❌ axios is required for testing. Installing...');
  console.log('Please run: npm install axios');
  process.exit(1);
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests };