#!/bin/bash

echo "🚀 Resume Evaluator - Quick Start Script"
echo "========================================"
echo ""

# Check if MongoDB is running
echo "📊 Checking MongoDB status..."
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB is NOT running"
    echo "Starting MongoDB..."
    brew services start mongodb-community 2>/dev/null || mongod --fork --logpath /tmp/mongodb.log --dbpath /tmp/mongodb-data 2>/dev/null || echo "⚠️  Please start MongoDB manually"
fi

echo ""
echo "📝 Please ensure you have configured backend/.env file"
echo "   Especially email settings for notifications to work"
echo ""
echo "🎯 Starting application..."
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Start backend
echo "🔧 Starting Backend (Port 3000)..."
cd backend
npm run start:dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Frontend (Port 5173)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Application started successfully!"
echo ""
echo "📍 Access Points:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3000"
echo ""
echo "📚 Quick Guide:"
echo "   1. Register an account at http://localhost:5173/register"
echo "   2. Choose your role (User, HR, or Payroll)"
echo "   3. Login and start using the application"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for processes
wait
