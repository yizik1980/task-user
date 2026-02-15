# 📚 Pohlim Monorepo - Complete Guide

A production-ready monorepo with **Angular 18** frontend, **Express.js** backend, **TypeScript**, **SQL Server**, and **JWT authentication**.

![Status](https://img.shields.io/badge/Status-Ready%20for%20Setup-blue)
![Angular](https://img.shields.io/badge/Angular-18.0-red)
![Express](https://img.shields.io/badge/Express-4.18-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2019+-orange)

---

## 🚀 Start Here!

### New to this project?

1. **[QUICK_START.md](QUICK_START.md)** - Get running in 5 minutes ⚡
2. Run: `npm run test-db` - Check database connection
3. Run: `npm run init-db` - Create database tables
4. Start backend: `npm run dev` (from `backend/` folder)
5. Start frontend: `npm start` (from `client/` folder)

---

## 📖 Documentation

| Document | Purpose | Read This If... |
|----------|---------|------------------|
| **[QUICK_START.md](QUICK_START.md)** | Quick setup guide | You want to get running NOW |
| **[DATABASE_SETUP.md](DATABASE_SETUP.md)** | Complete database guide | You need to understand the database |
| **[SQL_SERVER_TROUBLESHOOTING.md](SQL_SERVER_TROUBLESHOOTING.md)** | Error fixing guide | You get ESOCKET or connection errors |
| **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** | File organization | You need to find where code lives |
| **[HTTP_SERVICE_GUIDE](client/src/app/services/HTTP_SERVICE_GUIDE.md)** | HTTP architecture | You want to add new API calls |

---

## ⚡ Quick Commands

```bash
# Database Setup
npm run test-db      # Test SQL Server connection (from backend/)
npm run init-db      # Create database and tables (from backend/)

# Running the App
npm run dev          # Start backend (from backend/)
npm start            # Start frontend (from client/)

# Build for Production
npm run build        # Build backend (from backend/)
npm run build        # Build frontend (from client/)
```

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────┐
│     Angular Client (http://localhost:4200)       │
│  • Login & Registration UI                       │
│  • Dashboard with Tasks                          │
│  • HTTP services for API calls                   │
└──────────────────┬───────────────────────────────┘
                   │ HTTP + JWT Token
                   ↓
┌──────────────────────────────────────────────────┐
│     Express Backend (http://localhost:3000)      │
│  • /api/auth - Login, register, token verify     │
│  • /api/users - User CRUD (protected)            │
│  • /api/tasks - Task CRUD (protected)            │
│  • JWT middleware for authorization              │
└──────────────────┬───────────────────────────────┘
                   │ SQL Connection
                   ↓
┌──────────────────────────────────────────────────┐
│     SQL Server Database (localhost:1433)         │
│  • Users table - Email, password, profile        │
│  • Tasks table - User's todo items               │
└──────────────────────────────────────────────────┘
```

---

## 🎯 Key Features

✅ **Frontend**
- Angular 18 with standalone components
- Modern, responsive UI
- Automatic JWT token injection via interceptor
- Loading states and error handling
- Generic HTTP service for all API calls

✅ **Backend**
- Express.js with TypeScript
- JWT authentication (24-hour tokens)
- Password hashing with bcrypt
- Proper CORS configuration
- Database connection pooling
- Repository pattern for data access

✅ **Database**
- SQL Server 2019+
- Users table with email/password
- Tasks table with foreign key to Users
- Automatic indexes for performance
- Connection pooling enabled

✅ **Security**
- Passwords hashed with bcrypt (cost factor 10)
- JWT tokens with expiration
- CORS configured with explicit origins
- XSS protection headers
- SQL injection prevention via parameterized queries

---

## 📋 Project Structure

```
pohlim-test/
├── backend/                          # Express.js server
│   ├── src/
│   │   ├── database/
│   │   │   ├── config.ts            # 🔧 Database connection
│   │   │   ├── test-connection.ts   # 🧪 Test DB
│   │   │   ├── init-db.ts           # 📝 Create tables
│   │   │   ├── UserRepository.ts    # Data access
│   │   │   └── TaskRepository.ts
│   │   ├── routes/
│   │   │   ├── auth.ts              # Login, register
│   │   │   ├── users.ts             # User CRUD
│   │   │   └── tasks.ts             # Task CRUD
│   │   ├── middleware/               # JWT verification
│   │   ├── services/                 # JWT, Bcrypt services
│   │   └── index.ts                 # Main server
│   ├── .env                         # 🔑 Database config
│   └── package.json
│
├── client/                           # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/
│   │   │   │   ├── http.service.ts  # HTTP wrapper
│   │   │   │   ├── api.service.ts   # CRUD service
│   │   │   │   ├── auth.service.ts  # Auth logic
│   │   │   │   └── user/task.service
│   │   │   ├── components/
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor # JWT injection
│   │   │   └── app.component.ts
│   │   └── main.ts
│   └── package.json
│
├── shared/                           # Shared types
│   ├── models/User.ts
│   └── models/Task.ts
│
├── QUICK_START.md                   # ⚡ Start here!
├── DATABASE_SETUP.md                # 📊 Database guide
├── SQL_SERVER_TROUBLESHOOTING.md    # 🔧 Error fixes
└── PROJECT_STRUCTURE.md             # 📁 File organization
```

---

## 🔧 Configuration

### Backend (.env)

```env
# Server
PORT=3000
NODE_ENV=development

# Database - EDIT THESE!
DB_SERVER=localhost              # SQL Server host
DB_PORT=1433                     # SQL Server port
DB_USER=sa                        # SQL Server user
DB_PASSWORD=YourPassword@123      # Your actual password!
DB_NAME=PohlimDB                 # Database name
DB_TRUST_CERT=true               # For self-signed certs

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRY=24h
```

### Frontend

Angular is configured to call backend at:
- Development: `http://localhost:3000/api`
- Built-in path aliases: `@shared/*` for shared models

---

## 🚦 Getting Started (Step by Step)

### Step 1: Verify Database Connection
```bash
cd backend
npm run test-db
```
✅ Should show "Connection successful!"

### Step 2: Initialize Database
```bash
npm run init-db
```
✅ Should create database and tables

### Step 3: Start Backend
```bash
npm run dev
```
✅ Should show "Backend server started successfully!"

### Step 4: Start Frontend
```bash
cd ../client
npm start
```
✅ Should open http://localhost:4200

### Step 5: Test the Application
1. Register a new account
2. Login with your account
3. Create a task
4. Mark it complete
5. Logout

---

## 🛠️ Common Tasks

### Add a new API endpoint
1. Create route in `backend/src/routes/`
2. Create corresponding service in `client/src/app/services/`
3. Use `ApiService` for CRUD operations
4. See [HTTP_SERVICE_GUIDE](client/src/app/services/HTTP_SERVICE_GUIDE.md)

### Fix database connection error
1. Run `npm run test-db` (from backend/)
2. Read the error message
3. Check [SQL_SERVER_TROUBLESHOOTING.md](SQL_SERVER_TROUBLESHOOTING.md)
4. Apply the fix suggested in the guide

### Reset the database
```bash
# Option 1: Via SQL Server Management Studio
# Drop PohlimDB and recreate

# Option 2: Via command line
npm run init-db
```

### Deploy to production
1. Set `NODE_ENV=production`
2. Generate new `JWT_SECRET`
3. Update `DB_SERVER` to production SQL Server
4. Update CORS origins in `backend/src/index.ts`
5. Build: `npm run build` (both backend and client)
6. Deploy built files to cloud

---

## 📊 API Endpoints

### Authentication (Public)
```
POST   /api/auth/register    - Create new user
POST   /api/auth/login       - Get JWT token
POST   /api/auth/verify      - Verify JWT token
POST   /api/auth/refresh     - Refresh JWT token
POST   /api/auth/logout      - Clear session
```

### Users (Protected - requires JWT)
```
GET    /api/users            - Get all users
GET    /api/users/:id        - Get user by ID
PUT    /api/users/:id        - Update user
DELETE /api/users/:id        - Delete user
```

### Tasks (Protected - requires JWT)
```
GET    /api/tasks            - Get all tasks
GET    /api/tasks/:id        - Get task by ID
POST   /api/tasks            - Create task
PUT    /api/tasks/:id        - Update task
PATCH  /api/tasks/:id        - Partial update
DELETE /api/tasks/:id        - Delete task
```

### Health Check (Public)
```
GET    /api/health           - Server status
GET    /api/data             - Sample data
```

---

## ⚠️ Troubleshooting

### "Connection refused" / ESOCKET Error
- **Cause**: SQL Server not running
- **Fix**: See [QUICK_START.md](QUICK_START.md#issue-connection-refused-or-esocket-error)

### "Login failed" / ELOGIN Error
- **Cause**: Wrong username/password in `.env`
- **Fix**: Verify database credentials match your SQL Server setup

### Database not found / EDATABASE Error
- **Cause**: Database hasn't been created
- **Fix**: Run `npm run init-db` from backend folder

### 401 Unauthorized on API calls
- **Cause**: JWT token not being sent to backend
- **Fix**: Make sure you're logged in first, then check Network tab in DevTools

### CORS errors
- **Note**: Already configured! Should work out of the box
- **If still having issues**: Check that backend runs on port 3000, frontend on 4200

---

## 🎓 Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Angular | 18.0+ |
| Backend | Express.js | 4.18+ |
| Language | TypeScript | 5.0+ |
| Database | SQL Server | 2019+ |
| Authentication | JWT | jsonwebtoken 9.0+ |
| Password Hashing | bcrypt | 5.1+ |
| HTTP Client | HttpClient | Angular 18 |

---

## 📚 Need Help?

| Topic | Read This |
|-------|-----------|
| Quick start | [QUICK_START.md](QUICK_START.md) |
| Database setup | [DATABASE_SETUP.md](DATABASE_SETUP.md) |
| Connection errors | [SQL_SERVER_TROUBLESHOOTING.md](SQL_SERVER_TROUBLESHOOTING.md) |
| File locations | [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) |
| HTTP services | [HTTP_SERVICE_GUIDE](client/src/app/services/HTTP_SERVICE_GUIDE.md) |

---

## ✅ Pre-Deployment Checklist

- [ ] Database connection tested: `npm run test-db` ✅
- [ ] Database initialized: `npm run init-db` ✅
- [ ] Backend starts: `npm run dev` ✅
- [ ] Frontend starts: `npm start` ✅
- [ ] Can register new user ✅
- [ ] Can login ✅
- [ ] Can create/edit/delete tasks ✅
- [ ] Can logout ✅
- [ ] JWT_SECRET changed from default ✅
- [ ] CORS origins updated for prod domain ✅

---

## 📝 License

ISC

---

## 🎉 Ready to Go!

Your application is fully configured and ready to run. Follow the **[QUICK_START.md](QUICK_START.md)** guide to get started in 5 minutes! 🚀

