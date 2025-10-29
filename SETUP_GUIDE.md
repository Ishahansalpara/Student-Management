# Student Management System - Complete Setup Guide

This guide will walk you through setting up and running the Student Management System from scratch.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Quick Start](#quick-start)
3. [Detailed Setup Instructions](#detailed-setup-instructions)
4. [Running the Application](#running-the-application)
5. [Testing the Application](#testing-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Project Structure](#project-structure)

## System Requirements

### Minimum Requirements
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB free space

### Required Software

#### Backend Requirements
- **.NET SDK 6.0 or higher**
  - Download from: https://dotnet.microsoft.com/download
  - Verify installation: `dotnet --version`

#### Frontend Requirements
- **Node.js 16.0 or higher**
  - Download from: https://nodejs.org/
  - Verify installation: `node --version` and `npm --version`

#### Optional
- **Git** (for cloning the repository)
- **Docker & Docker Compose** (for containerized deployment)
- **Visual Studio Code** or **Visual Studio** (recommended IDEs)

## Quick Start

If you want to get up and running quickly:

\`\`\`bash
# 1. Clone the repository
git clone <repository-url>
cd student-management-system

# 2. Start Backend
cd Backend
dotnet restore
dotnet ef database update
dotnet run

# 3. In a new terminal, start Frontend
cd Frontend
npm install
npm run dev

# 4. Open browser to http://localhost:5173
\`\`\`

**Default Credentials:**
- Admin: `admin@sms.com` / `Admin@123`
- Professor: `prof1@sms.com` / `Prof@123`
- Student: `student1@sms.com` / `Student@123`

## Detailed Setup Instructions

### Step 1: Clone or Extract the Repository

\`\`\`bash
# If using Git
git clone <repository-url>
cd student-management-system

# Or extract the ZIP file and navigate to the directory
\`\`\`

### Step 2: Backend Setup

#### 2.1 Navigate to Backend Directory

\`\`\`bash
cd Backend
\`\`\`

#### 2.2 Restore NuGet Packages

\`\`\`bash
dotnet restore
\`\`\`

This downloads all required dependencies specified in the `.csproj` file.

#### 2.3 Create and Seed the Database

\`\`\`bash
# Apply Entity Framework migrations
dotnet ef database update

# This will:
# - Create the SQLite database (studentmanagement.db)
# - Create all tables
# - Seed dummy data automatically
\`\`\`

**What gets seeded:**
- 1 Admin user
- 2 Professor users
- 5 Student users
- 2 Courses
- 3 Subjects
- 2 Class Groups
- Attendance records for all students
- Mark records for all students

#### 2.4 Verify Backend Setup

\`\`\`bash
# Check if database was created
ls -la studentmanagement.db  # On Linux/Mac
dir studentmanagement.db    # On Windows
\`\`\`

#### 2.5 Run the Backend Server

\`\`\`bash
dotnet run
\`\`\`

**Expected Output:**
\`\`\`
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to exit.
\`\`\`

**Verify Backend is Running:**
- Open browser: http://localhost:5000/swagger
- You should see the Swagger API documentation

### Step 3: Frontend Setup

#### 3.1 Open New Terminal and Navigate to Frontend

\`\`\`bash
cd Frontend
\`\`\`

#### 3.2 Install Dependencies

\`\`\`bash
npm install
\`\`\`

This installs all packages listed in `package.json`.

#### 3.3 Start Development Server

\`\`\`bash
npm run dev
\`\`\`

**Expected Output:**
\`\`\`
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
\`\`\`

#### 3.4 Access the Application

Open your browser and navigate to: **http://localhost:5173**

You should see the login page.

### Step 4: Verify Everything is Working

1. **Backend API**: http://localhost:5000/swagger
2. **Frontend**: http://localhost:5173
3. **Login with test credentials** (see below)

## Running the Application

### Development Mode

#### Terminal 1 - Backend
\`\`\`bash
cd Backend
dotnet run
\`\`\`

#### Terminal 2 - Frontend
\`\`\`bash
cd Frontend
npm run dev
\`\`\`

### Production Build

#### Build Backend
\`\`\`bash
cd Backend
dotnet publish -c Release -o ./publish
\`\`\`

#### Build Frontend
\`\`\`bash
cd Frontend
npm run build
\`\`\`

### Using Docker

#### Prerequisites
- Docker Desktop installed and running

#### Run with Docker Compose
\`\`\`bash
# From project root
docker-compose up

# Or run specific service
docker-compose up backend
docker-compose up frontend

# Stop services
docker-compose down
\`\`\`

**Access Points:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Testing the Application

### Test Credentials

#### Admin Account
\`\`\`
Email: admin@sms.com
Password: Admin@123
\`\`\`

**Admin Capabilities:**
- View all students, professors, courses, and class groups
- Create, update, and delete students
- Create, update, and delete professors
- Create, update, and delete courses
- Create, update, and delete class groups

#### Professor Accounts
\`\`\`
Email: prof1@sms.com
Password: Prof@123

Email: prof2@sms.com
Password: Prof@123
\`\`\`

**Professor Capabilities:**
- View their profile
- View assigned courses and class groups
- View students in their class groups
- Record attendance for students
- Record marks for students
- View attendance and marks records

#### Student Accounts
\`\`\`
Email: student1@sms.com
Password: Student@123

Email: student2@sms.com
Password: Student@123

Email: student3@sms.com
Password: Student@123

Email: student4@sms.com
Password: Student@123

Email: student5@sms.com
Password: Student@123
\`\`\`

**Student Capabilities:**
- View their profile
- View their attendance records
- View their marks and grades
- View their enrolled courses

### Testing Workflow

#### 1. Test Admin Functions
\`\`\`
1. Login as admin@sms.com / Admin@123
2. Navigate to Student Management
3. View all students
4. Try creating a new student
5. Try updating a student
6. Try deleting a student
\`\`\`

#### 2. Test Professor Functions
\`\`\`
1. Login as prof1@sms.com / Prof@123
2. View your courses and class groups
3. View students in your class groups
4. Record attendance for a student
5. Record marks for a student
6. View attendance and marks records
\`\`\`

#### 3. Test Student Functions
\`\`\`
1. Login as student1@sms.com / Student@123
2. View your profile
3. View your attendance records
4. View your marks and grades
5. View your enrolled courses
\`\`\`

#### 4. Test Authentication
\`\`\`
1. Try logging in with wrong credentials
2. Try accessing admin pages as a student
3. Try accessing professor pages as a student
4. Logout and verify redirect to login page
\`\`\`

## Troubleshooting

### Backend Issues

#### Issue: "Port 5000 already in use"

**Solution 1: Use a different port**
\`\`\`bash
dotnet run --urls "http://localhost:5001"
\`\`\`

**Solution 2: Kill the process using port 5000**
\`\`\`bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Linux/Mac
lsof -i :5000
kill -9 <PID>
\`\`\`

#### Issue: "Database error" or "Cannot open database file"

**Solution:**
\`\`\`bash
# Delete the old database
rm studentmanagement.db  # Linux/Mac
del studentmanagement.db # Windows

# Recreate it
dotnet ef database update
\`\`\`

#### Issue: "Entity Framework migration error"

**Solution:**
\`\`\`bash
# Remove migrations and start fresh
dotnet ef migrations remove
dotnet ef migrations add InitialCreate
dotnet ef database update
\`\`\`

#### Issue: "Swagger page not loading"

**Solution:**
1. Verify backend is running: `dotnet run`
2. Check if port 5000 is correct
3. Try: http://localhost:5000/swagger/index.html

### Frontend Issues

#### Issue: "Port 5173 already in use"

**Solution:**
\`\`\`bash
# Vite will automatically use the next available port
npm run dev

# Or specify a port
npm run dev -- --port 5174
\`\`\`

#### Issue: "Cannot connect to backend API"

**Solution:**
1. Verify backend is running on http://localhost:5000
2. Check `Frontend/src/services/api.js` for correct API URL
3. Check browser console for CORS errors
4. Verify CORS is enabled in `Backend/Program.cs`

#### Issue: "npm install fails"

**Solution:**
\`\`\`bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
\`\`\`

#### Issue: "Blank page or 404 errors"

**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check browser console for errors (F12)
4. Verify frontend is running: http://localhost:5173

### Common CORS Errors

**Error:** "Access to XMLHttpRequest blocked by CORS policy"

**Solution:**
1. Ensure backend is running
2. Check CORS configuration in `Backend/Program.cs`
3. Verify frontend URL is in allowed origins
4. Restart backend after any changes

### Database Issues

#### Issue: "Duplicate key error"

**Solution:**
\`\`\`bash
# Reset database completely
dotnet ef database drop
dotnet ef database update
\`\`\`

#### Issue: "Foreign key constraint failed"

**Solution:**
1. Check data relationships
2. Ensure referenced records exist
3. Reset database if needed

### Authentication Issues

#### Issue: "Invalid token" or "Unauthorized"

**Solution:**
1. Clear browser localStorage: `localStorage.clear()`
2. Logout and login again
3. Check JWT secret in `appsettings.json`

#### Issue: "Cannot login"

**Solution:**
1. Verify credentials are correct
2. Check if user account is active
3. Verify backend is running
4. Check browser console for errors

## Project Structure

\`\`\`
student-management-system/
├── Backend/
│   ├── Controllers/
│   │   ├── AdminController.cs
│   │   ├── AuthController.cs
│   │   ├── ProfessorController.cs
│   │   ├── StudentController.cs
│   │   └── SubjectController.cs
│   ├── Models/
│   │   └── User.cs (contains all models)
│   ├── Services/
│   │   ├── AuthService.cs
│   │   └── JwtService.cs
│   ├── DTOs/
│   │   ├── AuthDTOs.cs
│   │   ├── StudentDTOs.cs
│   │   ├── CourseDTOs.cs
│   │   ├── ClassGroupDTOs.cs
│   │   ├── AttendanceDTOs.cs
│   │   ├── MarkDTOs.cs
│   │   └── SubjectDTOs.cs
│   ├── Data/
│   │   ├── ApplicationDbContext.cs
│   │   └── DbSeeder.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── StudentManagementSystem.csproj
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── admin/
│   │   │   ├── professor/
│   │   │   └── student/
│   │   ├── components/
│   │   │   └── PrivateRoute.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── docker-compose.yml
├── README.md
└── SETUP_GUIDE.md
\`\`\`

## Next Steps

1. **Customize the application** for your needs
2. **Add more test data** using the admin panel
3. **Deploy to production** (see DEPLOYMENT.md)
4. **Configure email notifications** (optional)
5. **Set up automated backups** (optional)

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the README.md
3. Check browser console (F12) for errors
4. Check backend logs in terminal

## Additional Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)
- [React Documentation](https://react.dev/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [JWT Authentication](https://jwt.io/)
