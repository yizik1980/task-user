import { MongoClient, Db, Collection, Document } from "mongodb";
/**
 * Connect to MongoDB
 */
export declare function connectToMongo(): Promise<Db>;
/**
 * Get database instance
 */
export declare function getDatabase(): Db;
/**
 * Get collection from database
 */
export declare function getCollection<T extends Document>(collectionName: string): Collection<T>;
/**
 * Close MongoDB connection
 */
export declare function closeMongo(): Promise<void>;
/**
 * Check if connected
 */
export declare function isConnected(): boolean;
export { MongoClient };
//# sourceMappingURL=mongo-connection.d.ts.map