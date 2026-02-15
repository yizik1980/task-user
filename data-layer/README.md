# Data Layer - MongoDB

Centralized data access layer for the Pohlim application using MongoDB.

## 📦 Structure

```
data-layer/
├── src/
│   ├── mongo-connection.ts      # MongoDB connection setup
│   ├── repositories/
│   │   ├── user.repository.ts   # User CRUD operations
│   │   └── task.repository.ts   # Task CRUD operations
│   ├── index.ts                 # Exports all modules
│   └── test-connection.ts       # Test MongoDB connection
├── .env                          # MongoDB configuration
├── package.json
└── tsconfig.json
```

## 🚀 Setup

### Install MongoDB

**Option 1: Local MongoDB (Windows)**

```bash
# Download and install from:
# https://www.mongodb.com/try/download/community

# Start MongoDB:
mongod
```

**Option 2: MongoDB with Docker**

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option 3: MongoDB Atlas (Cloud)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update .env: `MONGO_URI=mongodb+srv://username:password@...`

### Install Dependencies

```bash
cd data-layer
npm install
```

### Configure MongoDB

Edit `.env`:

```env
MONGO_URI=mongodb://localhost:27017/PohlimDB
MONGO_DB_NAME=PohlimDB
```

### Test Connection

```bash
npm run test-db
```

Should output:

```
✅ MongoDB connection established successfully
✅ User collection indexes created
✅ Task collection indexes created
✅ All tests passed!
```

## 📚 Usage

### In Backend

Update `backend/package.json`:

```json
{
  "dependencies": {
    "data-layer": "file:../data-layer"
  }
}
```

Import and use:

```typescript
import { UserRepository, TaskRepository, connectToMongo } from "data-layer";

// In your route handler or service:
const user = await UserRepository.getUserByEmail("test@example.com");
const tasks = await TaskRepository.getUserTasks(userId);
```

## 📖 API Reference

### User Repository

```typescript
// Get by email
UserRepository.getUserByEmail(email: string)

// Get by ID
UserRepository.getUserById(id: string)

// Get all users
UserRepository.getAllUsers()

// Create user
UserRepository.createUser(userData: Omit<User, '_id'>)

// Update user
UserRepository.updateUser(id: string, userData: Partial<User>)

// Delete user
UserRepository.deleteUser(id: string)

// Create indexes
UserRepository.createIndexes()
```

### Task Repository

```typescript
// Get by ID
TaskRepository.getTaskById(id: string)

// Get user's tasks
TaskRepository.getUserTasks(userId: string)

// Get all tasks
TaskRepository.getAllTasks()

// Create task
TaskRepository.createTask(taskData: Omit<Task, '_id'>)

// Update task
TaskRepository.updateTask(id: string, taskData: Partial<Task>)

// Delete task
TaskRepository.deleteTask(id: string)

// Delete user's tasks
TaskRepository.deleteUserTasks(userId: string)

// Create indexes
TaskRepository.createIndexes()
```

### Mongo Connection

```typescript
// Connect to MongoDB
connectToMongo(): Promise<Db>

// Get database instance
getDatabase(): Db

// Get collection
getCollection<T>(collectionName: string): Collection<T>

// Close connection
closeMongo(): Promise<void>

// Check if connected
isConnected(): boolean
```

## 🔄 MongoDB Atlas Connection

To use MongoDB Atlas instead of local MongoDB:

1. Create MongoDB Atlas account
2. Create a cluster
3. Get connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.mongodb.net/PohlimDB?retryWrites=true&w=majority
   ```
4. Update `.env`:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/PohlimDB?retryWrites=true&w=majority
   ```
5. Test: `npm run test-db`

## 🐛 Troubleshooting

### ECONNREFUSED error

- MongoDB is not running
- Start with: `mongod` or `docker run -d -p 27017:27017 mongo`

### Authentication failed

- Check MONGO_USERNAME and MONGO_PASSWORD in .env
- Or use connection string with credentials in MONGO_URI

### Database not found

- MongoDB automatically creates database on first use
- Just run a query to create it

## 📊 Collections

### users

```typescript
{
  _id: ObjectId,
  email: string,
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  phone?: string,
  city?: string,
  country?: string,
  address?: string,
  postalCode?: string,
  role: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### tasks

```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  title: string,
  description?: string,
  completed: boolean,
  priority?: number,
  dueDate?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Building

```bash
npm run build
```

Creates `dist/` folder with compiled JavaScript and type definitions.

---
