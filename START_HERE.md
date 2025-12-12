# ⚠️ IMPORTANT: Start MongoDB First!

## Quick Start Guide

### 1. Start MongoDB

**Before running the application, you MUST start MongoDB:**

```bash
# Option 1: Using Homebrew (if installed)
brew services start mongodb-community

# Option 2: Manual start
mongod --dbpath /usr/local/var/mongodb

# Option 3: If MongoDB not installed, install it first:
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### 2. Verify MongoDB is Running

```bash
# Check if MongoDB process is running
pgrep -x mongod

# OR connect to MongoDB shell
mongosh
```

### 3. Start the Application

#### Option A: Using VS Code Tasks (Recommended)
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Tasks: Run Task"
3. Select "Start Full Application"

#### Option B: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000

---

## 📝 First Time Setup

1. **Configure Email (Optional but recommended for notifications)**
   ```bash
   cd backend
   nano .env
   ```
   
   Update these fields:
   ```env
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=your-app-password
   HR_EMAIL=hr@example.com
   PAYROLL_EMAIL=payroll@example.com
   ```

2. **Create Test Users**
   
   Register three users with different roles:
   - User/Candidate
   - HR
   - Payroll

3. **Test the Flow**
   - Login as User → Upload Resume
   - Login as HR → View Candidates → Update Status
   - Login as Payroll → View Referral Payments

---

## 🐛 Common Issues

### "Cannot connect to MongoDB"
**Solution:** Start MongoDB first (see step 1 above)

### "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### "Port 5173 already in use"
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Registration fails
1. Check if MongoDB is running
2. Check backend terminal for errors
3. Open browser console (F12) to see detailed error

---

## 📧 Email Setup (Gmail)

1. Enable 2-Factor Authentication in Gmail
2. Generate App Password:
   - Go to: https://myaccount.google.com/security
   - Select "2-Step Verification"
   - Scroll to "App passwords"
   - Generate password for "Mail"
3. Use this password in `backend/.env` as `EMAIL_PASSWORD`

---

## ✅ Project Status

All components have been created and configured:

✅ Backend (NestJS)
- Authentication with JWT
- User management with roles
- Resume upload and analysis
- Email notifications
- MongoDB integration

✅ Frontend (React)
- Login/Register pages
- Role-based dashboards (User, HR, Payroll)
- Resume upload with scoring
- Material-UI components

✅ Features
- PDF parsing and analysis
- Automatic scoring algorithm
- Email notifications
- Referral tracking

---

## 🎯 Next: Test the Application!

1. Start MongoDB
2. Start Backend
3. Start Frontend
4. Register a user
5. Upload a resume
6. Check the score!

**Need Help?** Check the full README.md and SETUP_COMPLETE.md files.
