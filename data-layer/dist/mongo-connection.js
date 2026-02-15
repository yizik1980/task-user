"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoClient = exports.isConnected = exports.closeMongo = exports.getCollection = exports.getDatabase = exports.connectToMongo = void 0;
const mongodb_1 = require("mongodb");
Object.defineProperty(exports, "MongoClient", { enumerable: true, get: function () { return mongodb_1.MongoClient; } });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let mongoClient = null;
let database = null;
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
function printConnectionConfig() {
    console.log("\n=== MongoDB Connection Configuration ===");
    console.log(`URI: ${config.uri}`);
    console.log(`Database: ${config.dbName}`);
    console.log("========================================\n");
}
/**
 * Connect to MongoDB
 */
async function connectToMongo() {
    if (database) {
        return database;
    }
    try {
        printConnectionConfig();
        console.log("Attempting to connect to MongoDB...");
        mongoClient = new mongodb_1.MongoClient(config.uri);
        await mongoClient.connect();
        database = mongoClient.db(config.dbName);
        // Verify connection
        await database.admin().ping();
        console.log("✅ MongoDB connection established successfully");
        return database;
    }
    catch (error) {
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
            console.error("- Or use MongoDB Atlas cloud: https://www.mongodb.com/cloud/atlas");
            console.error("- Update MONGO_URI in .env file");
        }
        else if (error.message.includes("authentication failed")) {
            console.error("\n⚠️  AUTHENTICATION ERROR");
            console.error("Incorrect username or password");
            console.error("Check MONGO_USERNAME and MONGO_PASSWORD in .env");
        }
        throw error;
    }
}
exports.connectToMongo = connectToMongo;
/**
 * Get database instance
 */
function getDatabase() {
    if (!database) {
        throw new Error("Database not initialized. Call connectToMongo() first.");
    }
    return database;
}
exports.getDatabase = getDatabase;
/**
 * Get collection from database
 */
function getCollection(collectionName) {
    const db = getDatabase();
    return db.collection(collectionName);
}
exports.getCollection = getCollection;
/**
 * Close MongoDB connection
 */
async function closeMongo() {
    if (mongoClient) {
        try {
            await mongoClient.close();
            mongoClient = null;
            database = null;
            console.log("MongoDB connection closed");
        }
        catch (error) {
            console.error("Error closing MongoDB connection:", error);
        }
    }
}
exports.closeMongo = closeMongo;
/**
 * Check if connected
 */
function isConnected() {
    return database !== null;
}
exports.isConnected = isConnected;
//# sourceMappingURL=mongo-connection.js.map