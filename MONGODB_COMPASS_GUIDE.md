# MongoDB Compass Guide

## Connect to Your Local Database

### Step 1: Install MongoDB Compass (if not already installed)
Download from: https://www.mongodb.com/try/download/compass

### Step 2: Connection String
```
mongodb://localhost:27017/resume-evaluator
```

Or use the simplified connection:
- **Host:** localhost
- **Port:** 27017
- **Database:** resume-evaluator

### Step 3: Connect in MongoDB Compass
1. Open MongoDB Compass
2. In the connection string field, paste: `mongodb://localhost:27017`
3. Click "Connect"
4. You'll see all your databases in the left sidebar
5. Click on `resume-evaluator` database

---

## Database Collections

### 1. **users** Collection
This is where all user data is stored, including candidates, HR, and payroll users.

#### View All Users
```javascript
// In Compass, go to: resume-evaluator > users
// Click "Documents" tab to see all users
```

#### Filter Examples for Compass

**See all candidates (users who uploaded resumes):**
```json
{ "role": "user", "resumeScore": { "$exists": true } }
```

**See high-scoring candidates (score ≥ 70):**
```json
{ "role": "user", "resumeScore": { "$gte": 70 } }
```

**See HR users:**
```json
{ "role": "hr" }
```

**See Payroll users:**
```json
{ "role": "payroll" }
```

**See referred employees who became permanent:**
```json
{ 
  "referredBy": { "$exists": true, "$ne": null },
  "employeeStatus": "permanent"
}
```

**See employees in probation:**
```json
{ "employeeStatus": "probation" }
```

**See pending employees:**
```json
{ "employeeStatus": "pending" }
```

**See rejected employees:**
```json
{ "employeeStatus": "rejected" }
```

---

## How to Use Filters in MongoDB Compass

### Step-by-Step:
1. Open MongoDB Compass
2. Connect to your database
3. Click on `resume-evaluator` database
4. Click on `users` collection
5. Look for the "Filter" input box at the top
6. Copy any filter from above (the JSON code)
7. Paste it in the Filter box
8. Press Enter or click "Apply"

### Example Screenshot Guide:
```
┌─────────────────────────────────────────────────┐
│ Filter  { "role": "user" }          [Apply]    │
├─────────────────────────────────────────────────┤
│                                                 │
│  Document 1                                     │
│  {                                              │
│    "_id": "...",                                │
│    "fullName": "John Doe",                      │
│    "email": "john@example.com",                 │
│    "role": "user",                              │
│    "resumeScore": 85,                           │
│    ...                                          │
│  }                                              │
└─────────────────────────────────────────────────┘
```

---

## Common Queries for Your Dashboards

### For HR Dashboard Data:
Filter to see what HR sees:
```json
{ 
  "role": "user",
  "resumeScore": { "$exists": true }
}
```

Sort by score (descending):
- Click on the "Sort" option
- Use: `{ "resumeScore": -1 }`

### For Payroll Dashboard Data:
Filter to see what Payroll sees:
```json
{ 
  "referredBy": { "$exists": true, "$ne": null },
  "employeeStatus": "permanent"
}
```

---

## View User Details

### Click on any document to see full details:
- Personal info (name, email, phone)
- Role (user, hr, payroll)
- Resume score and top skills
- Employee status (pending, probation, permanent, rejected)
- Referral information (referredBy, referralPaid)
- Timestamps (createdAt, updatedAt)
- Resume file path

---

## Export Data (Optional)

### Export to JSON/CSV:
1. Apply your filter
2. Click "Export Data" button (top right)
3. Choose format: JSON or CSV
4. Select fields to export
5. Click "Export"

---

## Useful Aggregations

### Count by Status:
Go to "Aggregations" tab and use:
```json
[
  {
    "$group": {
      "_id": "$employeeStatus",
      "count": { "$sum": 1 }
    }
  }
]
```

### Average Resume Score:
```json
[
  {
    "$match": { "role": "user", "resumeScore": { "$exists": true } }
  },
  {
    "$group": {
      "_id": null,
      "averageScore": { "$avg": "$resumeScore" },
      "maxScore": { "$max": "$resumeScore" },
      "minScore": { "$min": "$resumeScore" }
    }
  }
]
```

---

## Troubleshooting

### Can't connect to MongoDB?
Check if MongoDB is running:
```bash
brew services list | grep mongodb
```

If not running:
```bash
brew services start mongodb-community
```

### Database is empty?
- Make sure the backend is running
- Register some users through the frontend
- Upload resumes as a candidate

### Connection refused?
- Verify port 27017 is not blocked
- Check MongoDB is installed: `mongod --version`

---

## Quick Reference

| What to View | Filter |
|-------------|--------|
| All Candidates | `{ "role": "user" }` |
| High Scorers (≥70) | `{ "resumeScore": { "$gte": 70 } }` |
| Pending Review | `{ "employeeStatus": "pending" }` |
| Permanent Employees | `{ "employeeStatus": "permanent" }` |
| Referral Payments Due | `{ "referredBy": { "$exists": true }, "employeeStatus": "permanent", "referralPaid": false }` |

---

## Sample Data Structure

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "$2b$10$...", // hashed
  "phone": "+1234567890",
  "role": "user",
  "resumeScore": 85,
  "topSkills": ["JavaScript", "React", "Node.js", "MongoDB", "TypeScript"],
  "resumePath": "uploads/abc123.pdf",
  "employeeStatus": "permanent",
  "referredBy": "jane.smith@company.com",
  "referralPaid": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-06-20T14:45:00.000Z",
  "__v": 0
}
```

---

## Need Help?
- MongoDB Compass Docs: https://docs.mongodb.com/compass/
- Your connection: `mongodb://localhost:27017/resume-evaluator`
- Database name: `resume-evaluator`
- Main collection: `users`
