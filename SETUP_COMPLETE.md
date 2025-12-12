# Resume Evaluator - Setup Complete! 🎉

## ✅ Project Status

**Backend**: ✅ Compiled successfully  
**Frontend**: ✅ Compiled successfully  

All compilation errors have been fixed!

## 🚀 Quick Start Guide

### Prerequisites
- MongoDB running on `localhost:27017` (or update connection string in `.env`)
- Node.js v20.17.0+ 
- npm installed

### Step 1: Start MongoDB
Make sure MongoDB is running:
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or manually
mongod --dbpath /path/to/data/db
```

### Step 2: Configure Email (Optional but Recommended)
Edit `backend/.env` file with your email credentials:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
HR_EMAIL=hr@company.com
PAYROLL_EMAIL=payroll@company.com
```

**For Gmail**: You need to create an [App Password](https://myaccount.google.com/apppasswords)

### Step 3: Start the Application

**Option A: Use VS Code Tasks (Recommended)**
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type "Run Task"
3. Select "Start Full Application"

This will start both backend and frontend in separate terminals.

**Option B: Manual Start**

Terminal 1 - Backend:
```bash
cd backend
npm run start:dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### Step 4: Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 📋 Features Implemented

### ✅ User Role Features
- Registration with referral support
- Login/Logout
- Resume upload (PDF only)
- Automatic resume analysis and scoring
- View personal resume score and detected skills
- Track application status

### ✅ HR Role Features
- View all candidates in table format
- See resume scores and key skills
- Update employee status:
  - Pending → Probation (with joining date)
  - Probation → Permanent
  - Rejected
- Automatic email notifications for high-scoring resumes (score ≥ 70)

### ✅ Payroll Role Features
- View employees who completed probation
- Track referral payments
- Automatic email notifications when referrals complete probation

### ✅ Resume Analysis Algorithm
Scores based on:
- **Technical Skills** (40 points): JavaScript, TypeScript, React, Python, AWS, Docker, etc.
- **Experience** (20 points): Years of experience detected from resume
- **Education** (20 points): Master's/PhD, Bachelor's, or Diploma
- **Certifications** (10 points): Certification keywords
- **Resume Quality** (10 points): Word count and structure

**Total Score**: 0-100

## 🎯 Default Test Accounts

You can create accounts with different roles:

**User/Candidate**:
- Register with role: "User/Candidate"
- Upload resume after login

**HR Account**:
- Register with role: "HR"
- View and manage all candidates

**Payroll Account**:
- Register with role: "Payroll"
- View referral payment status

## 📁 Project Structure

```
resume-evaluator/
├── backend/
│   ├── src/
│   │   ├── auth/              # Authentication (JWT, Guards, Strategy)
│   │   ├── controllers/       # Resume controller
│   │   ├── dto/              # Data transfer objects
│   │   ├── modules/          # Resume module
│   │   ├── schemas/          # MongoDB user schema
│   │   ├── services/         # Resume & Email services
│   │   └── app.module.ts     # Main module
│   ├── uploads/              # Uploaded PDF resumes
│   └── .env                  # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── context/          # Auth context provider
│   │   ├── hooks/            # useAuth hook
│   │   ├── pages/            # All page components
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── UserDashboard.tsx
│   │   │   ├── HRDashboard.tsx
│   │   │   └── PayrollDashboard.tsx
│   │   ├── services/         # API service
│   │   └── App.tsx           # Main app with routing
│   └── .env                  # (Optional) Frontend env vars
│
└── README.md                 # This file
```

## 🔐 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `GET /auth/profile` - Get user profile (Protected)

### Resume Management
- `POST /resume/upload` - Upload resume (Protected, User)
- `GET /resume/all` - Get all candidates (Protected, HR/Payroll)
- `GET /resume/:id` - Get user details (Protected, HR/Payroll)
- `PUT /resume/:id/status` - Update employee status (Protected, HR)

## 🎨 UI/UX Features
- Material-UI modern design
- Responsive layout (mobile-friendly)
- Role-based dashboard routing
- Real-time form validation
- Loading states and error handling
- File upload with progress feedback

## 🔄 Workflow Example

1. **Candidate Registers** → Account created with "Pending" status
2. **Candidate Uploads Resume** → System analyzes and scores resume
3. **High Score (≥70)** → Email sent to HR automatically
4. **HR Reviews** → Updates status to "Probation" with joining date
5. **Probation Period** → System calculates probation end date (3 months)
6. **HR Approves** → Updates status to "Permanent"
7. **Has Referral?** → Email sent to Payroll for referral payment
8. **Payroll Processes** → Payment marked as complete

## 🛠️ Technologies Used

### Backend
- NestJS - Progressive Node.js framework
- MongoDB - NoSQL database
- Mongoose - ODM for MongoDB
- JWT - Authentication
- Passport - Auth middleware
- pdf-parse - PDF text extraction
- Nodemailer - Email sending
- class-validator - Validation
- Multer - File uploads

### Frontend
- React 18 - UI library
- TypeScript - Type safety
- Material-UI (MUI) - Component library
- React Router - Navigation
- Axios - HTTP client
- Vite - Build tool

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution**: Make sure MongoDB is running on port 27017

### Email Not Sending
**Solution**: Check `.env` email configuration and use Gmail App Password

### Port Already in Use
```
Error: Port 3000 is already in use
```
**Solution**: Kill the process using port 3000 or change `PORT` in `.env`

### PDF Upload Failing
**Solution**: Ensure file size is under 5MB and format is PDF

## 📝 Next Steps / Future Enhancements

- [ ] Add admin dashboard
- [ ] Implement resume download feature
- [ ] Add interview scheduling
- [ ] Create analytics dashboard
- [ ] Add bulk operations for HR
- [ ] Implement email templates
- [ ] Add notification system
- [ ] Support multiple file formats
- [ ] Add resume comparison feature
- [ ] Implement AI-powered skill matching

## 📄 License
MIT

## 👥 Support
For issues or questions, please create an issue in the repository.

---

**Happy Hiring! 🎉**
