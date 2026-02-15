"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_connection_1 = require("../mongo-connection");
class UserRepository {
    /**
     * Get user by email
     */
    static async getUserByEmail(email) {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        return await collection.findOne({ email });
    }
    /**
     * Get user by ID
     */
    static async getUserById(id) {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        return await collection.findOne({ _id: new mongodb_1.ObjectId(id) });
    }
    /**
     * Get all users
     */
    static async getAllUsers() {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        return await collection.find({}).toArray();
    }
    /**
     * Create user
     */
    static async createUser(userData) {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        const now = new Date();
        const userWithTimestamp = {
            ...userData,
            createdAt: now,
            updatedAt: now,
        };
        const result = await collection.insertOne(userWithTimestamp);
        return {
            ...userWithTimestamp,
            _id: result.insertedId,
        };
    }
    /**
     * Update user
     */
    static async updateUser(id, userData) {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        const result = await collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, {
            $set: {
                ...userData,
                updatedAt: new Date(),
            },
        }, { returnDocument: "after" });
        return result || null;
    }
    /**
     * Delete user
     */
    static async deleteUser(id) {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        const result = await collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return result.deletedCount > 0;
    }
    /**
     * Create indexes for performance
     */
    static async createIndexes() {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        // Unique index on email
        await collection.createIndex({ email: 1 }, { unique: true });
        // Index on isActive for queries
        await collection.createIndex({ isActive: 1 });
        console.log("✅ User collection indexes created");
    }
}
exports.UserRepository = UserRepository;
UserRepository.collectionName = "users";
//# sourceMappingURL=user.repository.js.map