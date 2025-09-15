# 🚀 Render Deployment Guide

## 📋 Overview
This guide will help you deploy your full-stack Doctor Appointment System to Render as a **single Web Service**.

## 🎯 Deployment Architecture
- **Single Web Service**: Hosts both React frontend and Express backend
- **Static Files**: React build served by Express server
- **API Routes**: All `/api/*` requests handled by Express
- **Database**: MongoDB Atlas (external)

## 🛠 Pre-deployment Setup

### 1. Project Structure
```
doctor-appointment-system/
├── package.json (root - for deployment)
├── render.yaml (deployment config)
├── backend/
│   ├── server.js (updated to serve React)
│   └── package.json
└── frontend/
    ├── src/utils/api.js (updated for production)
    └── package.json
```

### 2. Key Changes Made
- ✅ **server.js**: Added static file serving for React build
- ✅ **api.js**: Updated baseURL for production
- ✅ **package.json**: Root package.json with deployment scripts
- ✅ **render.yaml**: Render configuration file

## 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment - single service"
git push origin main
```

### Step 2: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### Step 3: Create Web Service

**Option A: Using render.yaml (Recommended)**
1. In Render Dashboard, click **"New"** → **"Blueprint"**
2. Connect your GitHub repository
3. Render will automatically detect `render.yaml`
4. Click **"Apply"**

**Option B: Manual Setup**
1. In Render Dashboard, click **"New"** → **"Web Service"**
2. Connect your GitHub repository: `doctor-appointment-system`
3. Configure the service:
   - **Name**: `doctor-appointment-system`
   - **Runtime**: `Node`
   - **Build Command**: `npm run install-all && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### Step 4: Set Environment Variables
In your Render service dashboard, add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` (Render sets this automatically) |
| `MONGO_URI` | `mongodb+srv://your-connection-string` |
| `JWT_SECRET` | `your-secret-key` (or let Render generate) |
| `JWT_EXPIRES_IN` | `30d` |

### Step 5: Deploy
- Render will automatically build and deploy your application
- Build process will:
  1. Install backend dependencies
  2. Install frontend dependencies  
  3. Build React app (`npm run build`)
  4. Start Express server (`npm start`)

## 🌐 How It Works

### Production Flow:
1. **Static Files**: React build files served from `/frontend/build`
2. **API Routes**: All `/api/*` requests handled by Express backend
3. **React Router**: All other routes (`/*`) serve `index.html` for client-side routing
4. **Database**: MongoDB Atlas connection via environment variable

### URL Structure:
- **Frontend**: `https://your-app.onrender.com/` (React app)
- **API**: `https://your-app.onrender.com/api/` (Express routes)

## 📊 Build Process
```bash
# Render executes these commands:
npm run install-all     # Install both frontend & backend deps
npm run build          # Build React app
npm start             # Start Express server (serves API + static files)
```

## 🔧 Local Development vs Production

### Development:
- Frontend: `http://localhost:3000` (React dev server)
- Backend: `http://localhost:5000` (Express server)
- API calls: `http://localhost:5000/api`

### Production:
- Everything: `https://your-app.onrender.com`
- Frontend: Served as static files from Express
- Backend: Same Express server
- API calls: `/api` (relative URLs)

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check that all dependencies are in `package.json` files
   - Verify build commands work locally

2. **500 Server Error**
   - Check environment variables (especially `MONGO_URI`)
   - Check Render logs for detailed error messages

3. **API Calls Fail**
   - Verify frontend is using correct API baseURL
   - Check CORS settings in backend

4. **React Router Not Working**
   - Ensure the `app.get('*')` catch-all route is in place
   - Check that static file serving is configured correctly

### Checking Logs:
1. Go to your Render service dashboard
2. Click on **"Logs"** tab
3. Monitor build and runtime logs

## 💰 Pricing
- **Free Tier**: 750 hours per month, sleeps after 15 minutes of inactivity
- **Paid Plans**: Start at $7/month for always-on service

## ✅ Benefits of Single Service Approach
- ✅ **Simpler deployment** (one service to manage)
- ✅ **Lower cost** (free tier covers everything)
- ✅ **No CORS issues** (same origin)
- ✅ **Single domain** for everything
- ✅ **Easier SSL setup**

## 🎉 You're Done!
Once deployed, your full-stack application will be available at:
`https://your-app-name.onrender.com`

Both your React frontend and Express API will be served from the same URL! 🚀