# 🚀 Quick Email Setup Guide

## Get Your Gmail App Password NOW! ⚡

### 📱 Step-by-Step (Takes 3 minutes)

#### 1️⃣ Open This Link
🔗 **Click here:** https://myaccount.google.com/apppasswords

**Sign in with:** murthy7702@gmail.com

---

#### 2️⃣ Enable 2-Step Verification (If Not Already On)
- If you see "2-Step Verification is off"
- Click "Get Started"
- Add your phone number
- Verify with code
- ✅ Done!

---

#### 3️⃣ Create App Password
Back on the App Passwords page:

1. **Select app:** Choose "Mail" from dropdown
2. **Select device:** Choose "Other (Custom name)"
3. **Name it:** Type `Resume Evaluator`
4. Click **GENERATE** button

📋 **You'll see a 16-character password like:**
```
abcd efgh ijkl mnop
```

**⚠️ COPY THIS - You won't see it again!**

---

#### 4️⃣ Update Your .env File

Open: `backend/.env`

**Find this line:**
```
EMAIL_PASSWORD=your-app-password
```

**Change to:** (paste your password WITHOUT spaces)
```
EMAIL_PASSWORD=abcdefghijklmnop
```

**Save the file!** (Cmd+S)

---

#### 5️⃣ Restart Backend

In VS Code:
1. Stop the backend (if running)
2. Start it again from Tasks menu

**OR in Terminal:**
```bash
cd backend
npm run start:dev
```

---

## ✅ Test It!

1. Go to http://localhost:5173
2. Login as a user
3. Upload a resume
4. If score ≥ 70, you'll get an email at **murthy7702@gmail.com**! 📧

---

## 📧 When Are Emails Sent?

### Email #1: Resume Score Notification
- **To:** murthy7702@gmail.com (HR)
- **When:** User uploads resume with score ≥ 70
- **Contains:** 
  - Candidate name
  - Resume score
  - Key skills found
  - Email and phone

### Email #2: Referral Payment Notification
- **To:** murthy7702@gmail.com (Payroll)
- **When:** HR changes employee status to "PERMANENT" (and they were referred)
- **Contains:**
  - Referrer name
  - New employee name
  - Payment notification

---

## 🔒 Security Note

- App passwords are safer than your main Gmail password
- They only work with the app (Resume Evaluator)
- You can revoke them anytime at: https://myaccount.google.com/apppasswords

---

## ❓ Troubleshooting

### "App Passwords option not available"
→ You need to enable 2-Step Verification first

### "Authentication failed" in backend logs
→ Double-check you removed ALL spaces from the password

### "Connection timeout"
→ Check your internet connection
→ Some networks block port 587 - try port 465 (update .env: EMAIL_PORT=465)

---

## 🎯 Current Configuration

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=murthy7702@gmail.com
EMAIL_FROM=Resume Evaluator <murthy7702@gmail.com>

HR_EMAIL=murthy7702@gmail.com
PAYROLL_EMAIL=murthy7702@gmail.com
RESUME_SCORE_THRESHOLD=70
```

All notifications go to: **murthy7702@gmail.com**
