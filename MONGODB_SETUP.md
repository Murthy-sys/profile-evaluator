# MongoDB Local Setup Guide for macOS

## Option 1: Install MongoDB using Homebrew (Recommended)

### Step 1: Install Homebrew (if not already installed)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Step 2: Install MongoDB
```bash
# Tap the MongoDB Homebrew repository
brew tap mongodb/brew

# Install MongoDB Community Edition
brew install mongodb-community
```

### Step 3: Start MongoDB
```bash
# Start MongoDB as a service (will auto-start on login)
brew services start mongodb-community

# OR start MongoDB manually (just for current session)
mongod --config /usr/local/etc/mongod.conf
```

### Step 4: Verify MongoDB is Running
```bash
# Check if MongoDB process is running
pgrep -x mongod

# Connect to MongoDB shell to verify
mongosh

# You should see MongoDB shell prompt. Type 'exit' to quit
```

### Step 5: Configure MongoDB for Your App
Your app will connect to: `mongodb://localhost:27017/resume-evaluator`

This is already configured in `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/resume-evaluator
```

---

## Option 2: Manual Installation (Alternative)

### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest
   - Platform: macOS
   - Package: TGZ
3. Download and extract

### Step 2: Create Data Directory
```bash
sudo mkdir -p /usr/local/var/mongodb
sudo mkdir -p /usr/local/var/log/mongodb
sudo chown -R $(whoami) /usr/local/var/mongodb
sudo chown -R $(whoami) /usr/local/var/log/mongodb
```

### Step 3: Start MongoDB
```bash
mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork
```

---

## MongoDB Management Commands

### Start MongoDB
```bash
# As a service
brew services start mongodb-community

# Manually
mongod --config /usr/local/etc/mongod.conf
```

### Stop MongoDB
```bash
# Stop service
brew services stop mongodb-community

# Stop manual instance
mongosh admin --eval "db.shutdownServer()"
```

### Restart MongoDB
```bash
brew services restart mongodb-community
```

### Check Status
```bash
brew services list | grep mongodb
```

---

## Using MongoDB Shell (mongosh)

```bash
# Connect to MongoDB
mongosh

# Show all databases
show dbs

# Use your app database
use resume-evaluator

# Show collections
show collections

# View users
db.users.find().pretty()

# Exit
exit
```

---

## Troubleshooting

### MongoDB won't start
```bash
# Check logs
cat /usr/local/var/log/mongodb/mongo.log

# Remove lock file if exists
rm /usr/local/var/mongodb/mongod.lock

# Repair database
mongod --repair --dbpath /usr/local/var/mongodb
```

### Port 27017 already in use
```bash
# Find and kill process using port 27017
lsof -ti:27017 | xargs kill -9

# Start MongoDB again
brew services start mongodb-community
```

### Permission issues
```bash
# Fix permissions
sudo chown -R $(whoami) /usr/local/var/mongodb
sudo chown -R $(whoami) /usr/local/var/log/mongodb
```

---

## MongoDB Compass (GUI Tool) - Optional

For a visual interface to manage your database:

```bash
# Install MongoDB Compass
brew install --cask mongodb-compass

# Launch
open -a "MongoDB Compass"
```

Connection string: `mongodb://localhost:27017`

---

## Quick Test

After installation, test your setup:

```bash
# 1. Start MongoDB
brew services start mongodb-community

# 2. Verify it's running
mongosh --eval "db.version()"

# 3. Should show MongoDB version like: 7.0.x
```

---

## Next Steps

1. ✅ Install and start MongoDB (using steps above)
2. ✅ Verify MongoDB is running
3. ✅ Start your backend: `cd backend && npm run start:dev`
4. ✅ Start your frontend: `cd frontend && npm run dev`
5. ✅ Register a user at http://localhost:5173/register

---

## MongoDB for Resume Evaluator

Your application will automatically:
- Create the database: `resume-evaluator`
- Create the collection: `users`
- Store user data with resumes, scores, and status

No manual database setup needed! Just ensure MongoDB is running.

---

## Uninstall MongoDB (if needed)

```bash
# Stop MongoDB
brew services stop mongodb-community

# Uninstall
brew uninstall mongodb-community

# Remove data (optional)
rm -rf /usr/local/var/mongodb
rm -rf /usr/local/var/log/mongodb
```
