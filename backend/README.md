# Doctor Appointment API

A RESTful API for a doctor appointment booking system built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies
   ```
   npm install
   ```

2. Create .env file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/doctor-appointment
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=30d
   ```

3. Run the server
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get single doctor
- `POST /api/doctors` - Create doctor profile (protected, doctors only)
- `PUT /api/doctors/:id` - Update doctor profile (protected, doctors only)
- `DELETE /api/doctors/:id` - Delete doctor profile (protected, admins only)

### Appointments
- `POST /api/appointments` - Book appointment (protected, patients only)
- `GET /api/appointments` - Get all appointments for logged in user (protected)
- `GET /api/appointments/:id` - Get single appointment (protected)
- `PUT /api/appointments/:id` - Update appointment status (protected)

## Models

### User
- name
- email
- password
- role (patient, doctor, admin)
- phoneNumber
- createdAt

### Doctor
- user (reference to User)
- specialization
- experience
- fees
- timings (array of available time slots)
- address
- bio
- rating
- reviewCount
- createdAt

### Appointment
- doctor (reference to Doctor)
- patient (reference to User)
- appointmentDate
- appointmentTime
- reason
- status (pending, confirmed, cancelled, completed)
- fees
- isPaid
- createdAt 