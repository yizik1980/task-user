import { MongoClient, Db, Collection, Document } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let mongoClient: MongoClient | null = null;
let database: Db | null = null;

/**
 * MongoDB configuration
 */
const config = {
  uri: process.env.MONGO_URI || "mongodb://localhost:27017/PohlimDB",
  dbName: process.env.MONGO_DB_NAME || "PohlimDB",
  username: process.env.MONGO_USERNAME || "",
  password: process.env.MONGO_PASSWORD || "",
};

/**
 * Print connection configuration (without password)
 */
function printConnectionConfig(): void {
  console.log("\n=== MongoDB Connection Configuration ===");
  console.log(`URI: ${config.uri}`);
  console.log(`Database: ${config.dbName}`);
  console.log("========================================\n");
}

/**
 * Connect to MongoDB
 */
export async function connectToMongo(): Promise<Db> {
  if (database) {
    return database;
  }

  try {
    printConnectionConfig();
    console.log("Attempting to connect to MongoDB...");

    mongoClient = new MongoClient(config.uri);
    await mongoClient.connect();

    database = mongoClient.db(config.dbName);

    // Verify connection
    await database.admin().ping();
    console.log("✅ MongoDB connection established successfully");

    return database;
  } catch (error: any) {
    console.error("\n❌ MongoDB connection error:");
    console.error(`Error Code: ${error.code}`);
    console.error(`Error Message: ${error.message}`);

    if (error.message.includes("connect ECONNREFUSED")) {
      console.error("\n⚠️  CONNECTION ERROR - MongoDB is not running");
      console.error("Possible causes:");
      console.error("1. MongoDB is not installed or running");
      console.error("2. MongoDB is running on a different host/port");
      console.error("3. Network connectivity issue");
      console.error("\nTo fix:");
      console.error("- Start MongoDB: mongod");
      console.error(
        "- Or use MongoDB Atlas cloud: https://www.mongodb.com/cloud/atlas",
      );
      console.error("- Update MONGO_URI in .env file");
    } else if (error.message.includes("authentication failed")) {
      console.error("\n⚠️  AUTHENTICATION ERROR");
      console.error("Incorrect username or password");
      console.error("Check MONGO_USERNAME and MONGO_PASSWORD in .env");
    }

    throw error;
  }
}

/**
 * Get database instance
 */
export function getDatabase(): Db {
  if (!database) {
    throw new Error("Database not initialized. Call connectToMongo() first.");
  }
  return database;
}

/**
 * Get collection from database
 */
export function getCollection<T extends Document>(
  collectionName: string,
): Collection<T> {
  const db = getDatabase();
  return db.collection<T>(collectionName);
}

/**
 * Close MongoDB connection
 */
export async function closeMongo(): Promise<void> {
  if (mongoClient) {
    try {
      await mongoClient.close();
      mongoClient = null;
      database = null;
      console.log("MongoDB connection closed");
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
    }
  }
}

/**
 * Check if connected
 */
export function isConnected(): boolean {
  return database !== null;
}

export { MongoClient };
