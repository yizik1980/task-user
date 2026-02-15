import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getConnection, closeConnection } from './database/config';
import usersRouter from './routes/users';
import tasksRouter from './routes/tasks';
import authRouter from './routes/auth';
import { authMiddleware } from './middleware/auth.middleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running!', timestamp: new Date() });
});

app.get('/api/data', (req, res) => {
  res.json({
    message: 'Hello from Express backend',
    data: ['item1', 'item2', 'item3']
  });
});

// Authentication Routes (Public)
app.use('/api/auth', authRouter);

// Protected Routes (Require JWT)
app.use('/api/users', authMiddleware, usersRouter);
app.use('/api/tasks', authMiddleware, tasksRouter);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server and initialize database connection
const startServer = async () => {
  try {
    // Initialize database connection
    await getConnection();
    
    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
      console.log('Database connection established');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nClosing server...');
  await closeConnection();
  process.exit(0);
});

startServer();
