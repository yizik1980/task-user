# Quick Start Guide - Resolving Database Connection

## The Problem
Your backend is getting an **ESOCKET** error when trying to connect to SQL Server. This means the database connection failed.

## The Solution (3 Steps)

### Step 1: Diagnose the Issue

Run the connection test to see what's wrong:

```bash
cd backend
npm run test-db
```

This will show you:
- ✅ If SQL Server is running
- ✅ If credentials are correct
- ✅ If database exists
- ❌ Exact problem if connection fails

### Step 2: Fix Common Issues

Based on the test output, here are the most common fixes:

#### Issue: "Connection refused" or ESOCKET error

**On Windows:**
1. Open `Services` (press `Win + R`, type `services.msc`)
2. Look for **"SQL Server (SQLEXPRESS)"** 
3. If it shows as "Stopped", right-click and select "Start"
4. Check that Status shows "Started" ✅

**On macOS (with Docker):**
```bash
# Start SQL Server in Docker
docker run -e "ACCEPT_EULA=Y" \
  -e "SA_PASSWORD=YourPassword@123" \
  -p 1433:1433 \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

**On Linux:**
```bash
sudo service mssql-server start
```

#### Issue: "Login failed for user 'sa'"

Check your credentials in `backend/.env`:
```env
DB_USER=sa                       # Must match SQL Server username
DB_PASSWORD=YourPassword@123     # Must match your SQL Server password
```

Verify credentials work with sqlcmd:
```bash
sqlcmd -S localhost -U sa -P YourPassword@123
# You should see: 1>
# Type this: SELECT @@VERSION;
# Press: GO
# Exit: EXIT
```

#### Issue: Database 'PohlimDB' does not exist

Create the database and tables:

```bash
# Run this to create everything automatically:
npm run init-db

# OR manually run SQL scripts:
sqlcmd -S localhost -U sa -P YourPassword@123 -i scripts/setup.sql
sqlcmd -S localhost -U sa -P YourPassword@123 -d PohlimDB -i scripts/tasks-setup.sql
```

### Step 3: Verify Everything Works

After fixing the issue, test again:

```bash
npm run test-db
```

Expected output:
```
✅ Connection successful!
✅ Query successful!
✅ Database 'PohlimDB' exists
✅ Found 2 tables:
   - Users
   - Tasks
✅ All diagnostics complete!
```

## Start Your Application

Once the test passes:

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd client
npm start
```

You should see:
- **Backend**: `✅ Backend server started successfully!`
- **Frontend**: Angular app opens at `http://localhost:4200`

---

## Need More Help?

- **See detailed troubleshooting**: Read [SQL_SERVER_TROUBLESHOOTING.md](SQL_SERVER_TROUBLESHOOTING.md)
- **Connection string format**: [Connection Strings](SQL_SERVER_TROUBLESHOOTING.md#connection-string-reference)
- **Debug output**: Enable verbose logging in `backend/src/database/config.ts`

---

## TL;DR (Quick Checklist)

- [ ] Run `npm run test-db` (from backend folder)
- [ ] If it fails, follow the error message suggestions
- [ ] If SQL Server isn't running, start it using Services.msc (Windows) or relevant command
- [ ] If database doesn't exist, run `npm run init-db`
- [ ] Run `npm run test-db` again - should show all green ✅
- [ ] Start backend with `npm run dev`
- [ ] Start frontend with `npm start`
- [ ] Login/Register and test the app!

---
