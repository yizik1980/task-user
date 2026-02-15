# SQL Server Database Setup Guide

## Prerequisites

- SQL Server 2019 or later
- SQL Server Management Studio (SSMS) or Azure Data Studio
- Node.js with mssql driver

## Database Setup

### Option 1: Using SQL Server Management Studio (SSMS)

1. Open SQL Server Management Studio
2. Connect to your SQL Server instance
3. Open a New Query window
4. Copy and paste the contents of `src/database/setup.sql`
5. Execute the script (F5)
6. Then copy and paste the contents of `src/database/tasks-setup.sql`
7. Execute the script (F5)

This will create:
- Database: `PohlimDB`
- Table: `Users` with sample data
- Table: `Tasks` with sample data

### Option 2: Using Command Line

If using `sqlcmd` tool:

```bash
sqlcmd -S <server_name> -U sa -P <password> -i src/database/setup.sql
sqlcmd -S <server_name> -U sa -P <password> -i src/database/tasks-setup.sql
```

## Database Configuration

Update `.env` file in the backend directory:

```env
DB_SERVER=localhost
DB_USER=sa
DB_PASSWORD=YourPassword@123
DB_NAME=PohlimDB
DB_TRUST_CERT=true
```

## Users Table Schema

```sql
CREATE TABLE Users (
    id INT PRIMARY KEY IDENTITY(1,1),
    email NVARCHAR(255) NOT NULL UNIQUE,
    username NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    firstName NVARCHAR(100),
    lastName NVARCHAR(100),
    phone NVARCHAR(20),
    address NVARCHAR(500),
    city NVARCHAR(100),
    country NVARCHAR(100),
    postalCode NVARCHAR(20),
    role NVARCHAR(50) DEFAULT 'user',
    isActive BIT DEFAULT 1,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);
```

## Tasks Table Schema

```sql
CREATE TABLE Tasks (
    id INT PRIMARY KEY IDENTITY(1,1),
    userId INT NOT NULL,
    title NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX),
    status NVARCHAR(50) DEFAULT 'pending',
    priority NVARCHAR(50) DEFAULT 'medium',
    dueDate DATETIME,
    completedAt DATETIME,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);
```

**Status values:** pending, in-progress, completed  
**Priority values:** low, medium, high

## API Endpoints

### Users Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/active` | Get active users only |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Tasks Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| GET | `/api/tasks/user/:userId` | Get all tasks for a user |
| GET | `/api/tasks/user/:userId/:status` | Get user tasks by status |
| GET | `/api/tasks/status/pending` | Get all pending tasks |
| GET | `/api/tasks/priority/high` | Get all high priority tasks |
| GET | `/api/tasks/overdue` | Get all overdue tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| PATCH | `/api/tasks/:id/complete` | Mark task as completed |
| DELETE | `/api/tasks/:id` | Delete task |

## Example Requests

### Create Task

```json
POST http://localhost:3000/api/tasks

{
  "userId": 1,
  "title": "Complete backend API",
  "description": "Finish implementing all API endpoints",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2026-02-25"
}
```

### Update Task

```json
PUT http://localhost:3000/api/tasks/1

{
  "status": "in-progress",
  "priority": "high"
}
```

### Complete Task

```
PATCH http://localhost:3000/api/tasks/1/complete
```

### Get User Tasks

```
GET http://localhost:3000/api/tasks/user/1
```

## Database Connection

The backend automatically establishes a connection to SQL Server on startup. Connection details are configured in `src/database/config.ts`.

## Next Steps

1. Run `src/database/setup.sql` to create database and users table
2. Run `src/database/tasks-setup.sql` to create tasks table
3. Update `.env` with your SQL Server credentials
4. Run `npm install --workspace=backend`
5. Start with `npm run backend:dev`
6. Test endpoints using Postman or curl
