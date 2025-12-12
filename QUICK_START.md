# 🚀 Quick Start Guide - Resume Evaluator

## ✅ All Changes Implemented Successfully!

### What Was Changed:

1. **✉️ Email Configuration Updated**
   - New email: murthymalisetti@gmail.com
   - HR notifications go to: mmurthy7702@gmail.com
   - Password: amma@NANNA1994

2. **🎨 HR Dashboard Redesigned**
   - Modern purple gradient theme
   - Search & filter functionality
   - Sortable table (high to low score)
   - Stats dashboard (Total, High Scorers, Pending)
   - Only shows candidates who uploaded resumes
   - Header with logout button
   - Responsive design

3. **💾 MongoDB Already Configured**
   - Running locally on localhost:27017
   - Database: resume-evaluator
   - All data is being stored

---

## 🎯 Services Status

✅ **MongoDB**: Running on localhost:27017
✅ **Backend**: Starting on http://localhost:3000
✅ **Frontend**: Starting on http://localhost:5173

---

## 🧪 How to Test

### 1. Test User Flow (Candidate)

1. **Register a new candidate:**
   - Go to: http://localhost:5173/register
   - Fill in details (name, email, phone, etc.)
   - Select Role: **User**
   - Register

2. **Login and upload resume:**
   - Login with your credentials
   - Click "Choose PDF File"
   - Upload a resume with skills like:
     - JavaScript, React, Node.js, Python, AWS
     - 5+ years experience
     - Bachelor's degree
   - Click "Upload Resume"

3. **Check score:**
   - You'll see your score immediately
   - If score ≥ 70, HR gets an email!

### 2. Test HR Flow

1. **Register an HR user:**
   - Go to: http://localhost:5173/register
   - Fill in details
   - Select Role: **HR**
   - Register

2. **Login to HR Dashboard:**
   - Login with HR credentials
   - You'll see:
     - Total candidates counter
     - High scorers counter
     - Pending review counter
     - Search bar
     - Filter dropdown
     - Table with all candidates sorted by score

3. **Test features:**
   - **Search**: Type a name, email, or phone number
   - **Filter**: Select a status (Pending, Probation, etc.)
   - **Sort**: Click "Score" column header to toggle
   - **Update Status**: Click edit icon to change candidate status
   - **Refresh**: Click refresh button to reload

### 3. Test Email Notifications

1. **Upload a good resume** (with skills that will score ≥70)
2. **Check backend logs** for:
   ```
   📊 Resume Analysis: Score=75, Skills Found=8, Words=450
   📊 Resume score (75) meets threshold (70). Sending email...
   📧 Attempting to send email to HR: mmurthy7702@gmail.com
   ✅ Email sent successfully
   ```
3. **Check email** at mmurthy7702@gmail.com

---

## 📊 Resume Scoring Logic

To get a score ≥70, resume should have:

**Skills (40 points max):**
- Each skill = 5 points (JavaScript, React, Python, etc.)
- Need ~4-6 skills to get 20-30 points

**Experience (20 points max):**
- 5 years experience = 10 points
- 10+ years experience = 20 points

**Education (20 points max):**
- Bachelor's = 15 points
- Master's/PhD = 20 points

**Certifications (10 points max):**
- AWS Certified, etc. = 5 points each

**Quality (10 points max):**
- 300-1000 words = good
- Has email, phone, LinkedIn = bonus

**Example Good Resume:**
- 5 skills (JavaScript, React, Node, AWS, Docker) = 25 points
- 5 years experience = 10 points
- Bachelor's degree = 15 points
- AWS Certified = 5 points
- 500 words with contact info = 10 points
- **Total = 65 points** (close! add 1-2 more skills to hit 70)

---

## 🗄️ View MongoDB Data

```bash
# Open MongoDB shell
mongosh

# Switch to database
use resume-evaluator

# View all users
db.users.find().pretty()

# View only candidates with resumes
db.users.find({ resumeScore: { $exists: true } }).pretty()

# View high scorers
db.users.find({ resumeScore: { $gte: 70 } }).pretty()

# Count total users
db.users.countDocuments()
```

---

## 🎨 HR Dashboard Features

### Header
- App name: "Resume Evaluator - HR Portal"
- User name display (e.g., "John Doe (HR)")
- Logout button

### Stats Cards
1. **Total Candidates** - All users who uploaded resumes
2. **High Scorers** - Candidates with score ≥70
3. **Pending Review** - Candidates with status = pending

### Search & Filter Bar
- **Search**: Name, email, or phone
- **Status Filter**: All, Pending, Probation, Permanent, Rejected
- **Refresh Button**: Reload candidate list

### Table Columns
1. **Name** - With "Top Performer" badge if score ≥80
   - Shows "Referred by" if applicable
2. **Email** - Contact email
3. **Phone** - Contact number
4. **Score** - Color-coded with progress bar
   - Green: ≥80 (Excellent)
   - Orange: 70-79 (Good)
   - Red: <70 (Below threshold)
   - Sortable: Click to sort high→low or low→high
5. **Top Skills** - Shows top 3 skills + count
6. **Status** - Colored chip (Pending, Probation, etc.)
7. **Actions** - Edit button to update status

### Update Status Dialog
- Shows candidate name and email
- Dropdown to select new status
- Date picker for joining date (if Probation selected)
- Save/Cancel buttons

---

## 🔧 Troubleshooting

### Backend not starting
```bash
# Kill any process on port 3000
lsof -ti:3000 | xargs kill -9

# Restart
cd backend && npm run start:dev
```

### Frontend not starting
```bash
# Kill any process on port 5173
lsof -ti:5173 | xargs kill -9

# Restart
cd frontend && npm run dev
```

### MongoDB not running
```bash
brew services start mongodb-community
```

### Email not sending
1. Check backend logs for error message
2. Verify .env has correct email/password
3. Make sure resume score ≥70
4. Check spam folder

### HR Dashboard shows no candidates
1. Make sure candidates have uploaded resumes
2. Check backend logs for errors
3. Try clicking Refresh button
4. Check browser console for errors

---

## 📁 Key Files Modified

### Backend
- `backend/.env` - Email configuration
- `backend/src/services/resume.service.ts` - Improved analyzer
- `backend/src/services/email.service.ts` - Email logging
- `backend/src/main.ts` - CORS configuration

### Frontend
- `frontend/src/pages/HRDashboard.tsx` - Complete redesign

### Documentation
- `LATEST_CHANGES.md` - Summary of all changes
- `MONGODB_CONFIG.md` - MongoDB setup guide
- `QUICK_START.md` - This file

---

## 🎯 Current URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **MongoDB**: mongodb://localhost:27017

---

## ✨ Everything is Ready!

Your application is now running with:
- ✅ Updated email configuration
- ✅ Modern HR dashboard with search & filter
- ✅ MongoDB storing all data
- ✅ Improved resume analyzer
- ✅ All existing functionality preserved

**Go ahead and test it! 🚀**

Open http://localhost:5173 in your browser and start testing!
