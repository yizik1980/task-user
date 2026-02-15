import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'YourPassword@123',
  database: process.env.DB_NAME || 'PohlimDB',
  server: process.env.DB_SERVER || 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: process.env.DB_TRUST_CERT === 'true' || true,
    enableKeepAlive: true,
  },
};

let connectionPool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool> {
  if (connectionPool) {
    return connectionPool;
  }

  try {
    connectionPool = new sql.ConnectionPool(config);
    await connectionPool.connect();
    console.log('Database connection established');
    return connectionPool;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export async function closeConnection(): Promise<void> {
  if (connectionPool) {
    await connectionPool.close();
    connectionPool = null;
    console.log('Database connection closed');
  }
}

export { sql };
