# Email Setup Instructions

The resume score will be sent to: **murthy7702@gmail.com**

## ⚡ Quick Setup (5 Minutes)

### Step 1: Create Gmail App Password

1. **Visit Google Account Security**
   - 🔗 Direct link: https://myaccount.google.com/apppasswords
   - Sign in with **murthy7702@gmail.com**

2. **Enable 2-Step Verification** (if not already enabled)
   - If you see "2-Step Verification is off", click to enable it first
   - Follow the on-screen instructions
   - Come back to App passwords after enabling 2FA

3. **Generate App Password**
   - App type: Select "Mail"
   - Device: Select "Other (Custom name)"
   - Name it: **Resume Evaluator**
   - Click **Generate**
   - You'll see a 16-character password like: `abcd efgh ijkl mnop`

4. **Copy the Password**
   - Copy the entire 16-character password
   - **IMPORTANT:** Remove all spaces when you paste it
   - Example: `abcdefghijklmnop`

### Step 2: Update Backend Configuration

1. **Open the file:** `backend/.env`

2. **Find this line:**
   ```
   EMAIL_PASSWORD=your-app-password
   ```

3. **Replace it with:**
   ```
   EMAIL_PASSWORD=abcdefghijklmnop
   ```
   (Use your actual 16-character password without spaces)

4. **Save the file** (Cmd+S or Ctrl+S)

### Step 3: Restart the Backend

**Option A - Using VS Code Tasks:**
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type: "Tasks: Terminate Task"
3. Select "Start Backend"
4. Press `Cmd+Shift+P` again
5. Type: "Tasks: Run Task"
6. Select "Start Backend"

**Option B - Using Terminal:**
```bash
# Stop the current backend (Ctrl+C in the backend terminal)
# Then restart:
cd backend && npm run start:dev
```

## Current Email Configuration

```
EMAIL_USER=murthy7702@gmail.com
HR_EMAIL=murthy7702@gmail.com
PAYROLL_EMAIL=murthy7702@gmail.com
RESUME_SCORE_THRESHOLD=70
```

## When Emails Are Sent:

1. **Resume Score Email** - Sent to HR (murthy7702@gmail.com) when:
   - A user uploads a resume
   - The calculated score is ≥ 70 points

2. **Referral Payment Email** - Sent to Payroll (murthy7702@gmail.com) when:
   - An employee who was referred completes probation
   - HR changes their status to "PERMANENT"

## Testing Without Email

The application will work fine without email configuration. You just won't receive email notifications. All resume scores are still visible in the HR Dashboard.
