#!/bin/bash

echo "🔄 Restarting Resume Evaluator..."

# Kill old processes
echo "🛑 Stopping old processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null
lsof -ti:5174 | xargs kill -9 2>/dev/null

sleep 2

# Check MongoDB
echo "📊 Checking MongoDB..."
if ! brew services list | grep mongodb-community | grep started > /dev/null; then
    echo "🚀 Starting MongoDB..."
    brew services start mongodb-community
    sleep 3
fi

echo "✅ MongoDB is running!"
echo ""
echo "🚀 Services ready!"
echo "   - MongoDB: localhost:27017"
echo "   - Backend will run on: http://localhost:3000"
echo "   - Frontend will run on: http://localhost:5173"
echo ""
echo "📝 Now run these commands in separate terminals:"
echo ""
echo "Terminal 1 (Backend):"
echo "   cd backend && npm run start:dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "   cd frontend && npm run dev"
echo ""
echo "Or use VS Code tasks: Start Backend and Start Frontend"
