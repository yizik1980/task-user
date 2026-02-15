# Project Structure & Reference Guide

## Quick Reference

### Getting Started
```bash
# 1. Test database connection
cd backend && npm run test-db

# 2. Initialize database (creates tables)
npm run init-db

# 3. Start backend
npm run dev

# 4. Start frontend (new terminal)
cd client && npm start
```

---

## Project Structure

```
c:\github\pohlim-test\
├── backend/                          # Express.js backend
│   ├── src/
│   │   ├── database/
│   │   │   ├── config.ts            # 🔧 Database connection config
│   │   │   ├── init-db.ts           # 📝 Create tables script
│   │   │   ├── test-connection.ts   # 🧪 Test DB connection
│   │   │   ├── UserRepository.ts    # Data access layer
│   │   │   ├── TaskRepository.ts
│   │   │   ├── setup.sql            # Create database
│   │   │   └── tasks-setup.sql      # Create tasks table
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts   # JWT verification
│   │   ├── routes/
│   │   │   ├── auth.ts              # Login, register, verify
│   │   │   ├── users.ts             # User CRUD
│   │   │   └── tasks.ts             # Task CRUD
│   │   ├── services/
│   │   │   ├── JwtService.ts        # Token generation
│   │   │   └── PasswordService.ts   # Bcrypt hashing
│   │   └── index.ts                 # Main server file
│   ├── .env                         # 🔑 Configuration (credentials)
│   ├── package.json                 # Backend dependencies
│   └── tsconfig.json                # TypeScript config
│
├── client/                          # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── services/
│   │   │   │   ├── http.service.ts  # Low-level HTTP wrapper
│   │   │   │   ├── api.service.ts   # CRUD operations
│   │   │   │   ├── auth.service.ts  # Authentication
│   │   │   │   ├── user.service.ts  # User API
│   │   │   │   └── task.service.ts  # Task API
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts  # Inject JWT token
│   │   │   ├── components/
│   │   │   │   ├── login.component.ts
│   │   │   │   └── signup.component.ts
│   │   │   └── app.component.ts     # Root component
│   │   └── main.ts
│   ├── angular.json                 # Angular config
│   └── package.json                 # Frontend dependencies
│
├── shared/                          # Shared types
│   ├── models/
│   │   ├── User.ts
│   │   └── Task.ts
│   └── package.json
│
├── QUICK_START.md                   # ⚡ Start here!
├── DATABASE_SETUP.md                # 📊 Database guide
├── SQL_SERVER_TROUBLESHOOTING.md    # 🔧 Connection issues
└── package.json                     # Root workspace
```

---

## Important Files

### Backend Configuration
| File | Purpose | Edit? |
|------|---------|-------|
| `backend/.env` | Database credentials | ✅ Yes, set to your DB credentials |
| `backend/src/database/config.ts` | Connection config | 🔍 Review only |
| `backend/src/index.ts` | Server setup | 🔍 Review only |

### Frontend Configuration
| File | Purpose | Edit? |
|------|---------|-------|
| `client/src/app/app.component.ts` | Root component | 🔍 Review only |
| `client/src/app/services/auth.service.ts` | Auth logic | 🔍 Review only |
| `client/tsconfig.json` | Path aliases (@shared/) | 🔍 Review only |

### Database
| File | Purpose | When Needed |
|------|---------|-------------|
| `backend/src/database/test-connection.ts` | Diagnose connection | Test connection with `npm run test-db` |
| `backend/src/database/init-db.ts` | Create database | Setup with `npm run init-db` |
| `backend/src/database/setup.sql` | Create database | Manual setup only |
| `backend/src/database/tasks-setup.sql` | Create tables | Manual setup only |

---

## Important Commands

### Backend
```bash
cd backend

npm run dev             # Start with hot reload
npm run build           # Compile to dist/
npm run start           # Run compiled version
npm run test-db         # Test database connection
npm run init-db         # Create database and tables
npm test                # Run tests
```

### Frontend
```bash
cd client

npm start               # Start dev server (http://localhost:4200)
npm run build           # Build for production
npm test                # Run tests
npm run lint            # Check code style
```

### Database (SQL Server)
```bash
# Test connection with sqlcmd
sqlcmd -S localhost -U sa -P YourPassword@123

# Check SQL Server version
sqlcmd -S localhost -U sa -P YourPassword@123 -Q "SELECT @@VERSION"

# Connect to PohlimDB
sqlcmd -S localhost -U sa -P YourPassword@123 -d PohlimDB
```

---

## Environment Variables (.env)

Located in `backend/.env`:

```env
# Server
PORT=3000
NODE_ENV=development

# Database - EDIT THESE!
DB_SERVER=localhost              # Your SQL Server host
DB_USER=sa                        # Your SQL Server username
DB_PASSWORD=YourPassword@123      # Your SQL Server password
DB_NAME=PohlimDB
DB_PORT=1433
DB_TRUST_CERT=true

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRY=24h
```

---

## Common Tasks

### 1. Fix "Cannot Connect to Database"
```bash
# Step 1: Test connection
cd backend && npm run test-db

# Step 2: If test fails, read:
# - SQL_SERVER_TROUBLESHOOTING.md
# - DATABASE_SETUP.md

# Step 3: Fix and try again
npm run test-db
```

### 2. Set Up New Database
```bash
cd backend
npm run init-db        # Auto-creates everything
```

### 3. Reset Everything
```bash
# Option 1: Drop and recreate database (SQL Server)
sqlcmd -S localhost -U sa -P YourPassword@123
> DROP DATABASE PohlimDB;
> GO
> EXIT

# Option 2: Run init script again
cd backend && npm run init-db
```

### 4. View Database Contents
```bash
# Connect with SSMS or sqlcmd
sqlcmd -S localhost -U sa -P YourPassword@123 -d PohlimDB

# View tables
SELECT * FROM Users;
GO

SELECT * FROM Tasks;
GO
```

---

## API Endpoints

### Authentication (Public)
```
POST   /api/auth/register    - Create new user
POST   /api/auth/login       - Get JWT token
POST   /api/auth/verify      - Verify JWT token
POST   /api/auth/refresh     - Refresh JWT token
POST   /api/auth/logout      - Clear session
```

### Users (Protected)
```
GET    /api/users            - Get all users
GET    /api/users/:id        - Get user by ID
PUT    /api/users/:id        - Update user
DELETE /api/users/:id        - Delete user
```

### Tasks (Protected)
```
GET    /api/tasks            - Get all tasks
GET    /api/tasks/:id        - Get task by ID
POST   /api/tasks            - Create task
PUT    /api/tasks/:id        - Update task
PATCH  /api/tasks/:id        - Partial update
DELETE /api/tasks/:id        - Delete task
```

### Health Check
```
GET    /api/health           - Server status (public)
GET    /api/data             - Sample data (public)
```

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | Angular | 18.0+ |
| **Backend** | Express.js | 4.18+ |
| **Language** | TypeScript | 5.0+ |
| **Database** | SQL Server | 2019+ |
| **Auth** | JWT | jsonwebtoken 9.0+ |
| **Password** | Bcrypt | 5.1+ |

---

## Troubleshooting Guides

### Issue: ESOCKET Error
**Symptoms**: Backend won't start, "Connection refused"
**Solution**: See [SQL_SERVER_TROUBLESHOOTING.md](SQL_SERVER_TROUBLESHOOTING.md#common-esocket-error-fixes)

### Issue: ELOGIN Error
**Symptoms**: "Login failed" when connecting
**Solution**: Check credentials in `.env` match SQL Server

### Issue: CORS Errors
**Symptoms**: "No 'Access-Control-Allow-Origin' header"
**Solution**: Already fixed! No action needed.

### Issue: 401 Unauthorized
**Symptoms**: API returns 401 after successful login
**Solution**: Check JWT token is stored and sent in Authorization header

---

## File Editing Checklist

**DO Edit:**
- ✅ `backend/.env` - Your database credentials
- ✅ Application code in `backend/src` (if extending features)
- ✅ Components in `client/src` (if extending features)

**DON'T Edit:**
- ❌ `backend/src/database/config.ts` - Already configured
- ❌ `backend/src/index.ts` - Server setup is complete
- ❌ `client/src/app/app.component.ts` - Already wired up
- ❌ Path configs in `tsconfig.json` - Already set

---

## Next Steps

1. ✅ Follow [QUICK_START.md](QUICK_START.md)
2. ✅ Test with `npm run test-db`
3. ✅ Set up database with `npm run init-db`
4. ✅ Start backend: `npm run dev`
5. ✅ Start frontend: `npm start`
6. ✅ Login/register and test the app!

---

## Support Resources

| Issue | Resource |
|-------|----------|
| Database connection | [DATABASE_SETUP.md](DATABASE_SETUP.md) |
| SQL Server errors | [SQL_SERVER_TROUBLESHOOTING.md](SQL_SERVER_TROUBLESHOOTING.md) |
| Getting started | [QUICK_START.md](QUICK_START.md) |
| File structure | This file |
| HTTP services | [client/src/app/services/HTTP_SERVICE_GUIDE.md](client/src/app/services/HTTP_SERVICE_GUIDE.md) |

---
