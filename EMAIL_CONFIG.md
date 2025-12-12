# 📧 Email Configuration Complete!

## Current Setup

### Email Flow:
```
FROM: test@resumeEvaluation.com
  ↓
TO: murthy7702@gmail.com
```

### SMTP Configuration:
- **SMTP Server:** Gmail (smtp.gmail.com:587)
- **Authentication:** murthy7702@gmail.com
- **Sender Address:** test@resumeEvaluation.com
- **Recipient:** murthy7702@gmail.com

---

## 🔐 FINAL STEP: Add Gmail App Password

### Quick Steps:

1. **Get Gmail App Password**
   - Visit: https://myaccount.google.com/apppasswords
   - Sign in with murthy7702@gmail.com
   - Enable 2-Step Verification (if needed)
   - Create App Password:
     - App: Mail
     - Device: Other (Custom name) → "Resume Evaluator"
   - Copy the 16-character password

2. **Update .env File**
   - Open: backend/.env
   - Find: EMAIL_PASSWORD=your-app-password
   - Replace with: EMAIL_PASSWORD=abcdefghijklmnop (no spaces)
   - Save the file

3. **Restart Backend**
   - Stop the backend task
   - Start it again

---

## 📬 When Emails Are Sent

### Email #1: High Score Resume
**FROM:** test@resumeEvaluation.com  
**TO:** murthy7702@gmail.com  
**WHEN:** User uploads resume with score ≥ 70

### Email #2: Referral Payment
**FROM:** test@resumeEvaluation.com  
**TO:** murthy7702@gmail.com  
**WHEN:** HR marks referred employee as PERMANENT

---

## ✅ Checklist

- [x] Email FROM: test@resumeEvaluation.com
- [x] Email TO: murthy7702@gmail.com
- [x] SMTP configured
- [ ] Add Gmail App Password to backend/.env
- [ ] Restart backend
- [ ] Test by uploading resume

