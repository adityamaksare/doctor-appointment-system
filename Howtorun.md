# Doctor Appointment System - Setup Guide

This guide will help you set up and run the Doctor Appointment system on your local machine.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running locally)
- NPM (Node Package Manager)

## Project Structure

The project is divided into two main directories:
- `backend`: Node.js API with Express
- `frontend`: React application

## Setting Up the Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. The `.env` file is already included in the repository with the following content:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/doctor-appointment
   JWT_SECRET=your_jwt_secret_key
   ```

4. Seed the database with sample data (IMPORTANT):
   ```
   node seed.js
   ```
   
   **Note:** This step is crucial as it populates your database with sample doctor profiles and user accounts. Without running the seed script, you'll have an empty database with no doctors to browse or book appointments with.

5. Start the backend server:
   ```
   npm run dev
   ```

6. The backend server should now be running on http://localhost:5000

## Setting Up the Frontend

1. Open a new terminal window/tab and navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

4. The frontend application should now be running on http://localhost:3000

## Default User Accounts

### Patient Account
- Email: aditya@gmail.com
- Password: password123

### Doctor Account
- Email: rajesh.sharma@example.com
- Password: password123

## Important Notes

1. Make sure MongoDB is running on your system before starting the backend.
2. If you encounter any issues with the login process, you can reset user passwords by running:
   ```
   cd backend
   node resetPassword.js       # For patient account
   node resetDoctorPassword.js # For doctor account
   ```

3. The backend and frontend need to run simultaneously for the application to work properly.

## Application Features

- User authentication (login/register) for both patients and doctors
- Doctor profiles with specializations and fees
- Appointment booking system
- Dashboard for doctors to manage appointments
- Patient dashboard to view and manage booked appointments

## Troubleshooting

1. If MongoDB fails to connect, ensure the MongoDB service is running on your system.
2. If you see error messages about ports being in use, ensure no other application is using ports 3000 or 5000.
3. If you encounter login issues, verify the credentials or use the password reset scripts mentioned above.

## Uploading to GitHub

To upload this project to GitHub:

1. A `.gitignore` file has been created at the root of the project to exclude:
   - `node_modules` directories
   - Build files
   - Log files
   - Other unnecessary system files
   
   Note: Environment files (`.env`) and the database seed file (`seed.js`) are intentionally included in the repository for easier setup.

2. Initialize Git, add files, and commit:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. Create a new repository on GitHub (do not initialize with README or .gitignore)

4. Connect your local repository to GitHub:
   ```
   git remote add origin https://github.com/your-username/repository-name.git
   git branch -M main
   git push -u origin main
   ```

5. All necessary project files will be uploaded while `node_modules` and other excluded files will be ignored.

6. Anyone cloning your repository will need to run `npm install` in both the backend and frontend directories to install dependencies, but they won't need to create `.env` files as they are included in the repository. 