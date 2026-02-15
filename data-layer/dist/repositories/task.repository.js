"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_connection_1 = require("../mongo-connection");
class TaskRepository {
    /**
     * Get task by ID
     */
    static async getTaskById(id) {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        return await collection.findOne({ _id: new mongodb_1.ObjectId(id) });
    }
    /**
     * Get all tasks for a user
     */
    static async getUserTasks(userId) {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        return await collection
            .find({ userId: new mongodb_1.ObjectId(userId) })
            .sort({ createdAt: -1 })
            .toArray();
    }
    /**
     * Get all tasks (admin)
     */
    static async getAllTasks() {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        return await collection.find({}).sort({ createdAt: -1 }).toArray();
    }
    /**
     * Get tasks within a date range
     */
    static async getTasksByDateRange(startDate, endDate) {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        return await collection
            .find({
            dueDate: {
                $gte: startDate,
                $lte: endDate,
            },
        })
            .sort({ dueDate: 1 })
            .toArray();
    }
    /**
     * Create task
     */
    static async createTask(taskData) {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        const now = new Date();
        const taskWithTimestamp = {
            ...taskData,
            userId: new mongodb_1.ObjectId(taskData.userId),
            completed: false,
            createdAt: now,
            updatedAt: now,
        };
        const result = await collection.insertOne(taskWithTimestamp);
        return {
            ...taskWithTimestamp,
            _id: result.insertedId,
        };
    }
    /**
     * Update task
     */
    static async updateTask(id, taskData) {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        const result = await collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, {
            $set: {
                ...taskData,
                updatedAt: new Date(),
            },
        }, { returnDocument: "after" });
        return result || null;
    }
    /**
     * Delete task
     */
    static async deleteTask(id) {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        const result = await collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return result.deletedCount > 0;
    }
    /**
     * Delete all tasks for a user (cascade delete)
     */
    static async deleteUserTasks(userId) {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        const result = await collection.deleteMany({
            userId: new mongodb_1.ObjectId(userId),
        });
        return result.deletedCount;
    }
    /**
     * Create indexes for performance
     */
    static async createIndexes() {
        const collection = (0, mongo_connection_1.getCollection)(this.collectionName);
        // Index on userId for user task queries
        await collection.createIndex({ userId: 1 });
        // Index on completed status
        await collection.createIndex({ completed: 1 });
        // Compound index for user + completed
        await collection.createIndex({ userId: 1, completed: 1 });
        // Index on dueDate for date range queries
        await collection.createIndex({ dueDate: 1 });
        console.log("✅ Task collection indexes created");
    }
}
exports.TaskRepository = TaskRepository;
TaskRepository.collectionName = "tasks";
//# sourceMappingURL=task.repository.js.map