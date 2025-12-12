# MongoDB Atlas Configuration Guide

## Current MongoDB Status

✅ **Local MongoDB** is already installed and running
- MongoDB Community 8.2.2 running on localhost:27017
- Database name: `resume-evaluator`
- Connection string in `.env`: `mongodb://localhost:27017/resume-evaluator`

## Your Application is Already Connected!

The backend is already configured to connect to MongoDB. Check the configuration:

### Backend Connection (.env file)
```
MONGODB_URI=mongodb://localhost:27017/resume-evaluator
```

### Mongoose Connection (app.module.ts)
The NestJS app automatically connects using the MONGODB_URI from .env

## Verify MongoDB Connection

1. **Check if MongoDB is running:**
```bash
brew services list | grep mongodb
```

2. **Connect to MongoDB shell:**
```bash
mongosh
```

3. **View databases:**
```javascript
show dbs
use resume-evaluator
show collections
```

4. **View users collection:**
```javascript
db.users.find().pretty()
```

## MongoDB Data Structure

### Users Collection
```javascript
{
  _id: ObjectId,
  fullName: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: "user" | "hr" | "payroll",
  address: String,
  education: String,
  experience: String,
  skills: [String],
  referredBy: String,
  referralCode: String,
  resumePath: String,
  resumeScore: Number (0-100),
  keySkills: [String],
  employeeStatus: "pending" | "probation" | "permanent" | "rejected",
  joiningDate: Date,
  probationEndDate: Date,
  referralPaid: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Optional: MongoDB Atlas (Cloud)

If you want to use cloud MongoDB instead of local:

1. **Create MongoDB Atlas Account** (free tier available)
   - Visit: https://www.mongodb.com/cloud/atlas
   - Create account and free cluster

2. **Get Connection String**
   - Format: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/resume-evaluator`

3. **Update .env**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/resume-evaluator
```

4. **Whitelist IP Address**
   - In Atlas dashboard, add 0.0.0.0/0 (allow all) or your specific IP

## Useful MongoDB Commands

### View all candidates
```javascript
use resume-evaluator
db.users.find({ role: "user" }).pretty()
```

### View candidates with resumes
```javascript
db.users.find({ resumeScore: { $exists: true } }).pretty()
```

### View high-scoring candidates
```javascript
db.users.find({ resumeScore: { $gte: 70 } }).pretty()
```

### Count total users
```javascript
db.users.countDocuments()
```

### Delete all test data (BE CAREFUL!)
```javascript
db.users.deleteMany({})
```

## Backup MongoDB Data

### Export database
```bash
mongodump --db=resume-evaluator --out=./backup
```

### Import database
```bash
mongorestore --db=resume-evaluator ./backup/resume-evaluator
```

## Troubleshooting

### MongoDB not running
```bash
brew services start mongodb-community
```

### Check MongoDB logs
```bash
tail -f /opt/homebrew/var/log/mongodb/mongo.log
```

### Reset MongoDB password
```bash
brew services restart mongodb-community
mongosh
use admin
db.changeUserPassword("admin", "newpassword")
```

##Your Current Setup is READY! 🎉

Just start the backend and frontend:
```bash
# Terminal 1 - Backend
cd backend && npm run start:dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```
