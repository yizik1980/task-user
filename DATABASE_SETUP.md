# Database Setup Guide

## Overview

This application uses **SQL Server** as the database. This guide will help you set up your database connection and resolve any connection issues.

---

## Prerequisites

### Required
- **SQL Server 2019+** (Express, Standard, or Enterprise)
- **Node.js 18+**
- **.env file** configured with database credentials (see below)

### Installation

#### Windows
1. Download [SQL Server Express](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
2. Run the installer and choose "SQLEXPRESS" as the instance name
3. Choose authentication: **Mixed Mode**
4. Set SA password (e.g., `YourPassword@123`)

#### macOS
Use Docker:
```bash
docker run -e "ACCEPT_EULA=Y" \
  -e "SA_PASSWORD=YourPassword@123" \
  -p 1433:1433 \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

#### Linux
Follow [Microsoft SQL Server on Linux installation](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-ubuntu)

---

## Configuration

### Step 1: Update `.env` file

Edit `backend/.env`:

```env
# Database Configuration
DB_SERVER=localhost          # SQL Server host
DB_PORT=1433                 # SQL Server port (default)
DB_USER=sa                   # Default admin user
DB_PASSWORD=YourPassword@123 # Your SA password
DB_NAME=PohlimDB             # Database name
DB_TRUST_CERT=true          # For self-signed certificates
```

**⚠️ Important**: The credentials must match your SQL Server installation!

### Step 2: Verify Connection

Test your connection configuration:

```bash
cd backend
npm run test-db
```

This will show:
- ✅ SQL Server version
- ✅ Database status
- ✅ Tables created
- ❌ Any connection errors

### Step 3: Initialize Database

If database and tables don't exist, create them:

```bash
npm run init-db
```

This script will:
1. Create the `PohlimDB` database
2. Create the `Users` table
3. Create the `Tasks` table
4. Create necessary indexes
5. Verify everything is set up correctly

---

## Database Schema

### Users Table
```sql
id INT PRIMARY KEY IDENTITY(1,1)
email NVARCHAR(255) UNIQUE NOT NULL
username NVARCHAR(100)
password NVARCHAR(255) NOT NULL
firstName NVARCHAR(100)
lastName NVARCHAR(100)
createdAt DATETIME DEFAULT GETDATE()
updatedAt DATETIME DEFAULT GETDATE()
```

### Tasks Table
```sql
id INT PRIMARY KEY IDENTITY(1,1)
userId INT NOT NULL (FOREIGN KEY to Users)
title NVARCHAR(255) NOT NULL
description NVARCHAR(MAX)
completed BIT DEFAULT 0
priority INT DEFAULT 0
dueDate DATETIME
createdAt DATETIME DEFAULT GETDATE()
updatedAt DATETIME DEFAULT GETDATE()
```

---

## Running the Application

Once your database is set up:

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend  
cd client
npm start
```

Expected console output:

**Backend:**
```
✅ Backend server started successfully!
📍 API URL: http://localhost:3000
✨ Server is ready to accept requests
```

**Frontend:**
```
✅ Compiled successfully
ℹ｜wds｜: Project is running at http://localhost:4200
```

---

## Troubleshooting

### ESOCKET Error
**Problem**: Cannot connect to SQL Server
**Solution**: 
1. Run `npm run test-db` to diagnose
2. Ensure SQL Server is running (check Services on Windows)
3. Verify server address and port in `.env`
4. Check firewall isn't blocking port 1433

See [SQL_SERVER_TROUBLESHOOTING.md](../SQL_SERVER_TROUBLESHOOTING.md) for detailed fixes.

### ELOGIN Error
**Problem**: Authentication failed
**Solution**:
1. Verify username in `DB_USER` matches SQL Server user
2. Verify password in `DB_PASSWORD` matches
3. Test with sqlcmd: `sqlcmd -S localhost -U sa -P YourPassword@123`

### EDATABASE Error
**Problem**: Database doesn't exist
**Solution**:
1. Run `npm run init-db` to create database and tables
2. Or manually run: `sqlcmd -S localhost -U sa -P YourPassword@123 -i scripts/setup.sql`

---

## Manual Database Setup

If you prefer to set up manually or want to understand the process:

### 1. Create Database
```sql
CREATE DATABASE PohlimDB;
GO
```

### 2. Create Tables
```sql
USE PohlimDB;
GO

-- Users table
CREATE TABLE Users (
  id INT PRIMARY KEY IDENTITY(1,1),
  email NVARCHAR(255) UNIQUE NOT NULL,
  username NVARCHAR(100),
  password NVARCHAR(255) NOT NULL,
  firstName NVARCHAR(100),
  lastName NVARCHAR(100),
  createdAt DATETIME DEFAULT GETDATE(),
  updatedAt DATETIME DEFAULT GETDATE()
);

-- Tasks table
CREATE TABLE Tasks (
  id INT PRIMARY KEY IDENTITY(1,1),
  userId INT NOT NULL,
  title NVARCHAR(255) NOT NULL,
  description NVARCHAR(MAX),
  completed BIT DEFAULT 0,
  priority INT DEFAULT 0,
  dueDate DATETIME,
  createdAt DATETIME DEFAULT GETDATE(),
  updatedAt DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE UNIQUE INDEX IX_Users_Email ON Users(email);
CREATE INDEX IX_Tasks_UserId ON Tasks(userId);
CREATE INDEX IX_Tasks_Completed ON Tasks(completed);
GO
```

### 3. Run with SSMS
1. Open SQL Server Management Studio (SSMS)
2. Connect with: Server=`localhost`, Login=`sa`, Password=`YourPassword@123`
3. Open and execute the scripts in `backend/scripts/` folder
4. Verify tables exist: right-click database → refresh → expand Tables

---

## Helpful Commands

```bash
# Test database connection
npm run test-db

# Initialize/create database
npm run init-db

# Connect to SQL Server via command line
sqlcmd -S localhost -U sa -P YourPassword@123

# Get SQL Server version
sqlcmd -S localhost -U sa -P YourPassword@123 -Q "SELECT @@VERSION"

# List databases
sqlcmd -S localhost -U sa -P YourPassword@123 -Q "SELECT name FROM sys.databases"

# List tables in PohlimDB
sqlcmd -S localhost -U sa -P YourPassword@123 -d PohlimDB -Q "SELECT name FROM sys.tables"
```

---

## Connection String Reference

If you need to connect with other tools or drivers:

```
Server=localhost,1433;Database=PohlimDB;User Id=sa;Password=YourPassword@123;Encrypt=false;TrustServerCertificate=true;
```

### For Azure SQL
```
Server=yourserver.database.windows.net,1433;Database=PohlimDB;User Id=user@server;Password=YourPassword123;Encrypt=true;TrustServerCertificate=false;
```

---

## Environment-Specific Configuration

### Development (localhost)
```env
DB_SERVER=localhost
DB_USER=sa
DB_PASSWORD=YourPassword@123
```

### Docker Local
```env
DB_SERVER=host.docker.internal    # On Windows/macOS
DB_SERVER=172.17.0.1              # On Linux
```

### Production (Azure SQL)
```env
DB_SERVER=yourserver.database.windows.net
DB_USER=user@server
DB_PASSWORD=ProductionPassword123
DB_TRUST_CERT=false
```

---

## Performance Tips

1. **Indexes**: Already created on `email`, `userId`, and `completed` fields
2. **Connection Pooling**: Configured with min=0, max=10 in `src/database/config.ts`
3. **Connection Timeout**: Set to 15 seconds (adjustable if needed)
4. **Keep-Alive**: Enabled for long-running connections

---

## Need Help?

1. **Quick Start**: See [QUICK_START.md](../QUICK_START.md)
2. **Detailed Troubleshooting**: See [SQL_SERVER_TROUBLESHOOTING.md](../SQL_SERVER_TROUBLESHOOTING.md)
3. **Database Config**: Check `backend/src/database/config.ts`
4. **Test Connection Script**: Run `npm run test-db` from backend folder

---
