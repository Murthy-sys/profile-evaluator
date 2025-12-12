<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Resume Evaluator Application

This is a full-stack resume evaluation application built with NestJS (backend) and React (frontend).

## Technology Stack

### Backend
- NestJS with TypeScript
- MongoDB with Mongoose
- JWT Authentication with Passport
- PDF parsing for resume analysis
- Nodemailer for email notifications
- Multer for file uploads

### Frontend
- React with TypeScript
- Material-UI (MUI) for UI components
- React Router for navigation
- Axios for API requests
- Context API for authentication state

## Key Features
- Three user roles: User (Candidate), HR, and Payroll
- Resume upload and automatic analysis
- Score calculation based on skills, experience, education
- Email notifications to HR for high-scoring resumes
- Employee status management by HR
- Referral tracking and payment notifications to Payroll

## Code Practices
- Use TypeScript for type safety
- Follow NestJS best practices with modules, controllers, and services
- Use Material-UI components for consistent UI
- Implement proper error handling and validation
- Use environment variables for configuration
- Follow RESTful API conventions

## Important Notes
- Backend runs on port 3000
- Frontend runs on port 5173 (Vite default)
- Resume files are stored in backend/uploads directory
- Email configuration required in .env for notifications
- MongoDB connection required for backend to function
