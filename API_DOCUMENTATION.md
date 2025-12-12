# Resume Evaluator - API Documentation

## Base URL
```
http://localhost:3000
```

---

## Authentication APIs

### 1. Register User
Create a new user account (Candidate, HR, or Payroll)

**Endpoint:** `POST /auth/register`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "phone": "+1234567890",
  "role": "user",
  "address": "123 Main St, City, State, ZIP",
  "education": "Bachelor's in Computer Science",
  "experience": "5 years",
  "skills": ["JavaScript", "React", "Node.js"],
  "referredBy": "jane@example.com"
}
```

**Required Fields:**
- `fullName` (string)
- `email` (string, unique)
- `password` (string, min 6 characters)
- `phone` (string)
- `role` (enum: "user" | "hr" | "payroll")

**Optional Fields:**
- `address` (string)
- `education` (string)
- `experience` (string)
- `skills` (array of strings)
- `referredBy` (string, email of referrer)

**Success Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "675a1b2c3d4e5f6a7b8c9d0e",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "role": "user",
    "address": "123 Main St, City, State, ZIP",
    "education": "Bachelor's in Computer Science",
    "experience": "5 years",
    "skills": ["JavaScript", "React", "Node.js"],
    "referredBy": "jane@example.com",
    "employeeStatus": "pending",
    "referralPaid": false,
    "createdAt": "2025-12-12T01:30:00.000Z",
    "updatedAt": "2025-12-12T01:30:00.000Z"
  }
}
```

**Error Responses:**

`400 Bad Request` - Validation Error
```json
{
  "statusCode": 400,
  "message": "Email already exists",
  "error": "Bad Request"
}
```

`400 Bad Request` - Missing Fields
```json
{
  "statusCode": 400,
  "message": [
    "fullName should not be empty",
    "email must be an email"
  ],
  "error": "Bad Request"
}
```

---

### 2. Login User
Authenticate and get access token

**Endpoint:** `POST /auth/login`

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Required Fields:**
- `email` (string)
- `password` (string)

**Success Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "675a1b2c3d4e5f6a7b8c9d0e",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "phone": "+1234567890",
    "employeeStatus": "pending"
  }
}
```

**Error Responses:**

`401 Unauthorized` - Invalid Credentials
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

---

### 3. Get User Profile
Get currently authenticated user's profile

**Endpoint:** `GET /auth/profile`

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response:** `200 OK`
```json
{
  "_id": "675a1b2c3d4e5f6a7b8c9d0e",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "role": "user",
  "address": "123 Main St, City, State, ZIP",
  "education": "Bachelor's in Computer Science",
  "experience": "5 years",
  "skills": ["JavaScript", "React", "Node.js"],
  "referredBy": "jane@example.com",
  "resumePath": "uploads/abc123.pdf",
  "resumeScore": 85,
  "keySkills": ["JavaScript", "React", "Node.js", "AWS", "Docker"],
  "employeeStatus": "pending",
  "referralPaid": false,
  "createdAt": "2025-12-12T01:30:00.000Z",
  "updatedAt": "2025-12-12T01:35:00.000Z"
}
```

**Error Responses:**

`401 Unauthorized` - No Token or Invalid Token
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## Resume APIs

### 4. Upload Resume
Upload and analyze a PDF resume (User role only)

**Endpoint:** `POST /resume/upload`

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Content-Type": "multipart/form-data"
}
```

**Request Body (Form Data):**
```
resume: [PDF File] (max 5MB)
```

**Success Response:** `201 Created`
```json
{
  "message": "Resume uploaded and analyzed successfully",
  "score": 85,
  "skills": [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "AWS",
    "Docker",
    "MongoDB",
    "Git"
  ]
}
```

**Backend Console Logs (for score ≥70):**
```
📊 Resume Analysis: Score=85, Skills Found=8, Words=450
📊 Resume score (85) meets threshold (70). Sending email...
📧 Attempting to send email to HR: mmurthy7702@gmail.com
Email config: { host: 'smtp.gmail.com', port: 587, user: 'murthymalisetti@gmail.com' }
✅ Email sent successfully: <message-id>
```

**Scoring Breakdown:**
- **Skills (40 pts max)**: Each skill = 5 points (max 8 skills)
- **Experience (20 pts max)**: Each year = 2 points (max 10 years)
- **Education (20 pts max)**: PhD=20, Master=18, Bachelor=15, Diploma=10
- **Certifications (10 pts max)**: Each cert = 5 points (max 2)
- **Quality (10 pts max)**: Word count, email, phone, links, structure

**Error Responses:**

`400 Bad Request` - No File
```json
{
  "statusCode": 400,
  "message": "No file uploaded",
  "error": "Bad Request"
}
```

`400 Bad Request` - Wrong File Type
```json
{
  "statusCode": 400,
  "message": "Only PDF files are allowed",
  "error": "Bad Request"
}
```

`400 Bad Request` - Invalid PDF
```json
{
  "statusCode": 400,
  "message": "Failed to parse PDF file. Please ensure it is a valid PDF.",
  "error": "Bad Request"
}
```

`401 Unauthorized` - Not Logged In
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

### 5. Get All Users
Get list of all candidates (HR and Payroll only)

**Endpoint:** `GET /resume/all`

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Success Response:** `200 OK`
```json
[
  {
    "_id": "675a1b2c3d4e5f6a7b8c9d0e",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "role": "user",
    "address": "123 Main St",
    "education": "Bachelor's in CS",
    "experience": "5 years",
    "skills": ["JavaScript", "React"],
    "referredBy": "jane@example.com",
    "resumePath": "uploads/abc123.pdf",
    "resumeScore": 85,
    "keySkills": ["JavaScript", "React", "Node.js", "AWS", "Docker"],
    "employeeStatus": "pending",
    "joiningDate": null,
    "probationEndDate": null,
    "referralPaid": false,
    "createdAt": "2025-12-12T01:30:00.000Z",
    "updatedAt": "2025-12-12T01:35:00.000Z"
  },
  {
    "_id": "675a1b2c3d4e5f6a7b8c9d0f",
    "fullName": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "+1234567891",
    "role": "user",
    "resumeScore": 92,
    "keySkills": ["Python", "Django", "PostgreSQL", "AWS"],
    "employeeStatus": "probation",
    "joiningDate": "2025-11-01T00:00:00.000Z",
    "probationEndDate": "2026-02-01T00:00:00.000Z",
    "referralPaid": false,
    "createdAt": "2025-11-25T10:00:00.000Z",
    "updatedAt": "2025-12-01T14:30:00.000Z"
  }
]
```

**Error Responses:**

`401 Unauthorized` - Not Logged In
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

`403 Forbidden` - Wrong Role (Must be HR or Payroll)
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

---

### 6. Get User Details
Get detailed information about a specific user (HR and Payroll only)

**Endpoint:** `GET /resume/:id`

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**URL Parameters:**
- `id` (string) - MongoDB ObjectId of the user

**Example:**
```
GET /resume/675a1b2c3d4e5f6a7b8c9d0e
```

**Success Response:** `200 OK`
```json
{
  "_id": "675a1b2c3d4e5f6a7b8c9d0e",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "role": "user",
  "address": "123 Main St, City, State, ZIP",
  "education": "Bachelor's in Computer Science",
  "experience": "5 years",
  "skills": ["JavaScript", "React", "Node.js"],
  "referredBy": "jane@example.com",
  "resumePath": "uploads/abc123.pdf",
  "resumeScore": 85,
  "keySkills": ["JavaScript", "React", "Node.js", "AWS", "Docker"],
  "employeeStatus": "pending",
  "joiningDate": null,
  "probationEndDate": null,
  "referralPaid": false,
  "createdAt": "2025-12-12T01:30:00.000Z",
  "updatedAt": "2025-12-12T01:35:00.000Z"
}
```

**Error Responses:**

`404 Not Found` - User Does Not Exist
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

`401 Unauthorized` - Not Logged In
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

`403 Forbidden` - Wrong Role
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

---

### 7. Update Employee Status
Update candidate's employment status (HR only)

**Endpoint:** `PUT /resume/:id/status`

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Content-Type": "application/json"
}
```

**URL Parameters:**
- `id` (string) - MongoDB ObjectId of the user

**Request Body:**
```json
{
  "status": "probation",
  "joiningDate": "2025-12-15"
}
```

**Required Fields:**
- `status` (enum): "pending" | "probation" | "permanent" | "rejected"

**Optional Fields:**
- `joiningDate` (string, ISO date): Required only if status is "probation"

**Status Flow:**
1. **pending** → Initial status after registration
2. **probation** → Candidate joined (requires joiningDate)
   - Automatically sets probationEndDate = joiningDate + 3 months
3. **permanent** → Probation completed successfully
   - If candidate was referred, triggers referral payment email to Payroll
4. **rejected** → Candidate not selected

**Success Response:** `200 OK`

**Example 1: Set to Probation**
```json
{
  "message": "Employee status updated successfully",
  "user": {
    "_id": "675a1b2c3d4e5f6a7b8c9d0e",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "employeeStatus": "probation",
    "joiningDate": "2025-12-15T00:00:00.000Z",
    "probationEndDate": "2026-03-15T00:00:00.000Z",
    "resumeScore": 85
  }
}
```

**Example 2: Set to Permanent (with Referral)**
```json
{
  "message": "Employee status updated successfully",
  "user": {
    "_id": "675a1b2c3d4e5f6a7b8c9d0e",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "employeeStatus": "permanent",
    "joiningDate": "2025-12-15T00:00:00.000Z",
    "probationEndDate": "2026-03-15T00:00:00.000Z",
    "referredBy": "jane@example.com",
    "referralPaid": true,
    "resumeScore": 85
  }
}
```

**Backend Actions for "permanent" status:**
- Finds referrer by email
- Sends referral payment notification to Payroll
- Marks `referralPaid` as `true`

**Error Responses:**

`404 Not Found` - User Does Not Exist
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

`400 Bad Request` - Invalid Status
```json
{
  "statusCode": 400,
  "message": "Invalid status value",
  "error": "Bad Request"
}
```

`401 Unauthorized` - Not Logged In
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

`403 Forbidden` - Not HR Role
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

---

## Email Notifications

### Automatic Email Triggers

#### 1. High Score Resume Email
**Sent To:** HR (mmurthy7702@gmail.com)  
**Trigger:** When resume score ≥ 70  
**Email Content:**
```
Subject: New Resume Submission - John Doe

Body:
New Resume Submission

Candidate Name: John Doe
Email: john.doe@example.com
Phone: +1234567890
Resume Score: 85/100
Key Skills: JavaScript, React, Node.js, AWS, Docker
Referred By: jane@example.com
Education: Bachelor's in Computer Science
Experience: 5 years

Please review the candidate's profile in the system.
```

#### 2. Referral Payment Email
**Sent To:** Payroll (murthymalisetti@gmail.com)  
**Trigger:** When candidate status changed to "permanent" AND has referredBy field  
**Email Content:**
```
Subject: Referral Payment Due - Jane Smith

Body:
Referral Payment Notification

Referrer Name: Jane Smith
Candidate Name: John Doe
Candidate Email: john.doe@example.com

The candidate has successfully completed their probation period.
Please process the referral payment for Jane Smith.
```

#### 3. Welcome Email (if implemented)
**Sent To:** New user's email  
**Trigger:** After successful registration  
**Email Content:**
```
Subject: Welcome to Resume Evaluator

Body:
Welcome John Doe!

Thank you for registering with Resume Evaluator.
Please upload your resume to get started with the evaluation process.
```

---

## Data Models

### User Schema
```typescript
{
  _id: ObjectId,                    // Auto-generated MongoDB ID
  fullName: String,                 // Required
  email: String,                    // Required, unique
  password: String,                 // Required, hashed with bcrypt
  phone: String,                    // Required
  role: String,                     // Required: "user" | "hr" | "payroll"
  address: String,                  // Optional
  education: String,                // Optional
  experience: String,               // Optional
  skills: [String],                 // Optional, manual entry
  referredBy: String,               // Optional, referrer's email
  referralCode: String,             // Optional, unique code for referrals
  resumePath: String,               // Set after upload: "uploads/filename.pdf"
  resumeScore: Number,              // 0-100, set after analysis
  keySkills: [String],              // Auto-extracted from resume
  employeeStatus: String,           // Default: "pending"
  joiningDate: Date,                // Set when status = "probation"
  probationEndDate: Date,           // joiningDate + 3 months
  referralPaid: Boolean,            // Default: false
  createdAt: Date,                  // Auto-generated
  updatedAt: Date                   // Auto-updated
}
```

### Employee Status Values
```typescript
enum EmployeeStatus {
  PENDING = 'pending',       // Initial state
  PROBATION = 'probation',   // Joined, on probation
  PERMANENT = 'permanent',   // Probation completed
  REJECTED = 'rejected'      // Not selected
}
```

### User Role Values
```typescript
enum UserRole {
  USER = 'user',           // Candidate
  HR = 'hr',               // HR Manager
  PAYROLL = 'payroll'      // Payroll Team
}
```

---

## Authentication Flow

### 1. Register & Login
```
1. POST /auth/register → Get user object
2. POST /auth/login → Get access_token
3. Store token in localStorage/sessionStorage
4. Use token in Authorization header for all subsequent requests
```

### 2. Making Authenticated Requests
```
Headers: {
  "Authorization": "Bearer <access_token>",
  "Content-Type": "application/json"
}
```

### 3. Token Expiration
- Tokens expire after 7 days (configurable in .env: JWT_EXPIRATION)
- When expired, user must login again

---

## Resume Scoring Algorithm

### Scoring Breakdown (Max 100 points)

#### 1. Skills (40 points max)
- Each matching skill = 5 points
- Max 8 skills counted
- **Detected Skills:**
  - Technical: JavaScript, TypeScript, React, Angular, Vue, Node.js, Python, Java, C++, SQL, MongoDB, AWS, Docker, Kubernetes, Git, HTML, CSS, REST, GraphQL, Redis, Microservices
  - Soft: Leadership, Communication, Problem Solving

#### 2. Experience (20 points max)
- Each year of experience = 2 points
- Max 10 years counted
- **Patterns Matched:**
  - "5 years of experience"
  - "Experience: 5 years"
  - "5 years in Software Development"

#### 3. Education (20 points max)
- PhD/Doctorate = 20 points
- Master's/MBA = 18 points
- Bachelor's = 15 points
- Diploma = 10 points

#### 4. Certifications (10 points max)
- Each unique certification = 5 points
- Max 2 certifications counted
- Keywords: "certified", "certification"

#### 5. Resume Quality (10 points max)
- Word count (300-1000) = 3 points
- Has email = 2 points
- Has phone = 2 points
- Has LinkedIn/GitHub = 2 points
- Has proper sections = 1 point

### Example Score Calculation
```
Resume contains:
- Skills: JavaScript, React, Node.js, AWS, Docker, MongoDB (6 skills)
  → 6 × 5 = 30 points

- Experience: "5 years of experience"
  → 5 × 2 = 10 points

- Education: "Bachelor's in Computer Science"
  → 15 points

- Certification: "AWS Certified Solutions Architect"
  → 1 × 5 = 5 points

- Quality: 500 words, has email, phone, LinkedIn
  → 3 + 2 + 2 + 2 = 9 points

Total Score: 30 + 10 + 15 + 5 + 9 = 69 points
(Just below threshold, needs 1 more skill to trigger email!)
```

---

## Error Handling

### Common HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input/validation error
- `401 Unauthorized` - Not authenticated or invalid token
- `403 Forbidden` - Authenticated but lacks permission
- `404 Not Found` - Resource doesn't exist
- `500 Internal Server Error` - Server-side error

### Error Response Format
```json
{
  "statusCode": 400,
  "message": "Error description or array of validation errors",
  "error": "Error Type"
}
```

---

## Rate Limiting & File Size

### Upload Limits
- **File Size:** 5MB maximum
- **File Type:** PDF only
- **File Storage:** `backend/uploads/` directory

### API Rate Limits
Currently no rate limiting implemented. Consider adding for production:
- 100 requests per 15 minutes per IP
- 10 uploads per hour per user

---

## Environment Variables

### Backend (.env)
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/resume-evaluator
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRATION=7d

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=murthymalisetti@gmail.com
EMAIL_PASSWORD=amma@NANNA1994
EMAIL_FROM=murthymalisetti@gmail.com

HR_EMAIL=mmurthy7702@gmail.com
PAYROLL_EMAIL=murthymalisetti@gmail.com

RESUME_SCORE_THRESHOLD=70
```

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "role": "user",
    "education": "Bachelor in CS",
    "experience": "5 years"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Profile
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Upload Resume
```bash
curl -X POST http://localhost:3000/resume/upload \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "resume=@/path/to/resume.pdf"
```

### Get All Users (HR/Payroll)
```bash
curl -X GET http://localhost:3000/resume/all \
  -H "Authorization: Bearer YOUR_HR_TOKEN"
```

### Update Status (HR)
```bash
curl -X PUT http://localhost:3000/resume/USER_ID/status \
  -H "Authorization: Bearer YOUR_HR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "probation",
    "joiningDate": "2025-12-15"
  }'
```

---

## Testing with Postman

### Collection Setup

1. **Create Environment Variables:**
   - `base_url`: http://localhost:3000
   - `token`: (will be set after login)

2. **Pre-request Script for Authenticated Requests:**
```javascript
pm.request.headers.add({
  key: 'Authorization',
  value: 'Bearer ' + pm.environment.get('token')
});
```

3. **Tests Script for Login:**
```javascript
if (pm.response.code === 200) {
  var jsonData = pm.response.json();
  pm.environment.set('token', jsonData.access_token);
}
```

---

## Frontend API Integration

### Example: Upload Resume
```typescript
const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append('resume', file);
  
  const response = await axios.post('/resume/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.data;
};
```

### Example: Get All Candidates
```typescript
const getAllCandidates = async () => {
  const response = await axios.get('/resume/all', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  return response.data;
};
```

---

## Security Considerations

### Implemented
✅ Password hashing with bcrypt  
✅ JWT token authentication  
✅ Role-based access control (Guards)  
✅ CORS enabled for localhost:5173  
✅ File type validation (PDF only)  
✅ File size limit (5MB)  

### Recommended for Production
⚠️ Add rate limiting  
⚠️ Add request validation middleware  
⚠️ Use HTTPS  
⚠️ Add helmet for security headers  
⚠️ Add input sanitization  
⚠️ Add CSRF protection  
⚠️ Implement refresh tokens  
⚠️ Add logging and monitoring  

---

**Last Updated:** December 12, 2025  
**API Version:** 1.0.0  
**Documentation Version:** 1.0.0
