# 📧 Enable Email Notifications

## Current Status
✅ Resume upload is working
✅ Score calculation is working
❌ Email notifications are NOT working (need Gmail App Password)

## Why Emails Are Not Sending
The application needs a Gmail App Password to send emails. Without it, email sending will fail silently.

---

## Quick Setup (3 Minutes)

### Step 1: Create Gmail App Password

1. **Open this link in your browser:**
   ```
   https://myaccount.google.com/apppasswords
   ```

2. **Sign in with:** murthy7702@gmail.com

3. **If you see "App passwords unavailable":**
   - You need to enable 2-Step Verification first
   - Go to: https://myaccount.google.com/signinoptions/two-step-verification
   - Click "Get Started" and follow the steps
   - Come back to App passwords page

4. **Create the App Password:**
   - App: Select "Mail"
   - Device: Select "Other (Custom name)"
   - Type: `Resume Evaluator`
   - Click "Generate"

5. **Copy the Password:**
   You'll see something like: `abcd efgh ijkl mnop`
   
   **IMPORTANT:** Copy this password NOW! You won't see it again.

---

### Step 2: Update Backend Configuration

1. **Open file:** `backend/.env`

2. **Find this line:**
   ```
   EMAIL_PASSWORD=your-app-password
   ```

3. **Replace with:** (remove all spaces)
   ```
   EMAIL_PASSWORD=abcdefghijklmnop
   ```

4. **Save the file** (Cmd+S or Ctrl+S)

---

### Step 3: Restart Backend

**Option A - VS Code:**
- Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
- Type: `Tasks: Restart Running Task`
- Select "Start Backend"

**Option B - Terminal:**
```bash
# Stop the backend (Ctrl+C in backend terminal)
cd backend
npm run start:dev
```

---

## Test Email Notifications

### Test 1: Resume Upload Email
1. Go to http://localhost:5173
2. Login as a regular user
3. Upload a PDF resume
4. If score ≥ 70, email will be sent to murthy7702@gmail.com

### Test 2: Check Backend Logs
After uploading, check the backend terminal for:
- ✅ Success: "Email sent successfully"
- ❌ Error: "Authentication failed" or "Connection error"

---

## Email Configuration Summary

```
FROM: test@resumeEvaluation.com
TO: murthy7702@gmail.com
SMTP: Gmail (smtp.gmail.com:587)
AUTH: murthy7702@gmail.com + App Password
```

### What Emails Are Sent?

1. **High Score Resume Alert**
   - Triggered when: Resume uploaded with score ≥ 70
   - Sent to: murthy7702@gmail.com
   - Contains: Candidate details, score, skills

2. **Referral Payment Notification**
   - Triggered when: HR marks referred employee as PERMANENT
   - Sent to: murthy7702@gmail.com
   - Contains: Referrer name, employee details

---

## Troubleshooting

### "Authentication failed"
- Double-check the app password in `.env`
- Make sure you removed ALL spaces
- Verify you're using App Password, not regular Gmail password

### "Connection timeout"
- Check your internet connection
- Some networks block port 587
- Try changing to port 465:
  ```
  EMAIL_PORT=465
  ```

### Email goes to Spam
- Add test@resumeEvaluation.com to your contacts
- Or change FROM address to match Gmail:
  ```
  EMAIL_FROM=Resume Evaluator <murthy7702@gmail.com>
  ```

### Still not working?
- Restart the backend server
- Check backend logs for error messages
- Verify 2-Step Verification is enabled on Gmail

---

## Current .env Configuration

```properties
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=murthy7702@gmail.com
EMAIL_PASSWORD=your-app-password    👈 UPDATE THIS!
EMAIL_FROM=Resume Evaluator <test@resumeEvaluation.com>

HR_EMAIL=murthy7702@gmail.com
PAYROLL_EMAIL=murthy7702@gmail.com
RESUME_SCORE_THRESHOLD=70
```

---

## Next Steps

1. ✅ Get Gmail App Password
2. ✅ Update `backend/.env`
3. ✅ Restart backend
4. ✅ Test by uploading a resume
5. ✅ Check murthy7702@gmail.com inbox!

**Once configured, emails will be sent automatically!** 📧
