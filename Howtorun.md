# Doctor Appointment System - Setup Guide

This guide will help you set up and run the Doctor Appointment system on your local machine.

## Prerequisites

- Node.js (v14 or higher)
- NPM (Node Package Manager)
- Internet connection (for MongoDB Atlas cloud database)

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

3. The application is configured to use MongoDB Atlas (cloud database). The database is already populated with sample data including doctor profiles and user accounts.

4. Start the backend server:
   ```
   npm run dev
   ```

5. The backend server should now be running on http://localhost:5000

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

1. The application uses MongoDB Atlas (cloud database) - no local MongoDB installation required.
2. The database is already populated with sample data and user accounts.
3. The backend and frontend need to run simultaneously for the application to work properly.

## Application Features

- User authentication (login/register) for both patients and doctors
- Doctor profiles with specializations and fees
- Appointment booking system
- Dashboard for doctors to manage appointments
- Patient dashboard to view and manage booked appointments

## Troubleshooting

1. If the database connection fails, check your internet connection as the app uses MongoDB Atlas (cloud database).
2. If you see error messages about ports being in use, ensure no other application is using ports 3000 or 5000.
3. If you encounter login issues, use the default credentials provided in the user accounts section.

## Uploading to GitHub

To upload this project to GitHub:

1. A `.gitignore` file has been created at the root of the project to exclude:
   - `node_modules` directories
   - Build files
   - Log files
   - Other unnecessary system files
   
   Note: Environment files (`.env`) are configured for the cloud database connection.

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

6. Anyone cloning your repository will need to run `npm install` in both the backend and frontend directories to install dependencies. The database is hosted on MongoDB Atlas and is already populated with data.
