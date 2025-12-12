# Resume Evaluator

A full-stack web application for evaluating resumes with role-based access control (User, HR, Payroll).

## Features

### User Features
- Register and login
- Upload resume (PDF format)
- Automatic resume analysis and scoring
- View resume score and detected key skills
- Referral system support

### HR Features
- View all candidates
- See resume scores and skills
- Update employee status (Pending, Probation, Permanent, Rejected)
- Set joining dates for probation period
- Automatic email notifications for high-scoring resumes

### Payroll Features
- View employees who completed probation
- Track referral payment status
- Automatic email notifications for referral payments

## Tech Stack

### Backend
- NestJS (Node.js framework)
- MongoDB (Database)
- JWT Authentication
- PDF parsing for resume analysis
- Nodemailer for email notifications

### Frontend
- React with TypeScript
- Material-UI for UI components
- React Router for navigation
- Axios for API calls
- Context API for state management

## Setup Instructions

### Prerequisites
- Node.js (v20.17.0 or higher)
- MongoDB (running locally or remote connection)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```env
     MONGODB_URI=mongodb://localhost:27017/resume-evaluator
     JWT_SECRET=your-secret-key
     EMAIL_HOST=smtp.gmail.com
     EMAIL_PORT=587
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASSWORD=your-app-password
     HR_EMAIL=hr@company.com
     PAYROLL_EMAIL=payroll@company.com
     ```

4. Start the backend server:
   ```bash
   npm run start:dev
   ```

   The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## Usage

1. **Registration**:
   - Go to `http://localhost:5173/register`
   - Fill in your details
   - Select your role (User, HR, or Payroll)
   - Optionally enter a referrer's email

2. **User Workflow**:
   - Login with your credentials
   - Upload your resume (PDF format)
   - View your resume score and detected skills
   - Track your application status

3. **HR Workflow**:
   - Login with HR credentials
   - View all candidates with scores
   - Update candidate status
   - Set joining dates for probation period
   - Receive emails for high-scoring candidates

4. **Payroll Workflow**:
   - Login with Payroll credentials
   - View employees who completed probation
   - Track referral payments
   - Receive notifications for pending referral payments

## Resume Scoring Algorithm

The resume is analyzed based on:
- **Technical Skills** (max 40 points): JavaScript, Python, React, Node.js, etc.
- **Years of Experience** (max 20 points): Extracted from resume text
- **Education** (max 20 points): Master's, Bachelor's, Diploma
- **Certifications** (max 10 points): Detected certification keywords
- **Resume Quality** (max 10 points): Based on word count and structure

**Total Score**: 0-100

Resumes scoring above the threshold (default: 70) trigger automatic email notifications to HR.

## Email Notifications

1. **To HR**: When a candidate's resume scores above the threshold
2. **To Payroll**: When an employee completes probation (referral payment due)

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login
- `GET /auth/profile` - Get user profile (protected)

### Resume Management
- `POST /resume/upload` - Upload resume (protected, User role)
- `GET /resume/all` - Get all users (protected, HR/Payroll roles)
- `GET /resume/:id` - Get user details (protected, HR/Payroll roles)
- `PUT /resume/:id/status` - Update employee status (protected, HR role)

## Project Structure

```
backend/
├── src/
│   ├── auth/              # Authentication module
│   ├── controllers/       # Resume controller
│   ├── dto/              # Data transfer objects
│   ├── modules/          # Resume module
│   ├── schemas/          # MongoDB schemas
│   ├── services/         # Resume and Email services
│   └── app.module.ts     # Main app module
├── uploads/              # Uploaded resumes
└── .env                  # Environment variables

frontend/
├── src/
│   ├── context/          # Auth context
│   ├── pages/            # React pages/components
│   ├── services/         # API services
│   └── App.tsx           # Main app component
```

## Development

- Backend runs in watch mode with hot reload
- Frontend has fast refresh enabled
- MongoDB must be running for the app to work

## Notes

- Make sure MongoDB is running before starting the backend
- Configure email settings in `.env` for email notifications to work
- Default admin accounts can be created by registering with the respective roles
- Uploaded resumes are stored in the `backend/uploads` directory

## License

MIT
