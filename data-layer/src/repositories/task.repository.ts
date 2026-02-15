import { ObjectId } from "mongodb";
import { getCollection } from "../mongo-connection";

export interface Task {
  _id?: ObjectId;
  userId: string | ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  priority?: number;
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TaskRepository {
  private static collectionName = "tasks";

  /**
   * Get task by ID
   */
  static async getTaskById(id: string): Promise<Task | null> {
    const collection = getCollection<Task>(this.collectionName);
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  /**
   * Get all tasks for a user
   */
  static async getUserTasks(userId: string): Promise<Task[]> {
    const collection = getCollection<Task>(this.collectionName);
    return await collection
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();
  }

  /**
   * Get all tasks (admin)
   */
  static async getAllTasks(): Promise<Task[]> {
    const collection = getCollection<Task>(this.collectionName);
    return await collection.find({}).sort({ createdAt: -1 }).toArray();
  }

  /**
   * Get tasks within a date range
   */
  static async getTasksByDateRange(startDate: Date, endDate: Date): Promise<Task[]> {
    const collection = getCollection<Task>(this.collectionName);
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
  static async createTask(taskData: Omit<Task, "_id">): Promise<Task> {
    const collection = getCollection<Task>(this.collectionName);
    const now = new Date();
    const taskWithTimestamp = {
      ...taskData,
      userId: new ObjectId(taskData.userId as string),
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
  static async updateTask(
    id: string,
    taskData: Partial<Task>,
  ): Promise<Task | null> {
    const collection = getCollection<Task>(this.collectionName);
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...taskData,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );

    return result || null;
  }

  /**
   * Delete task
   */
  static async deleteTask(id: string): Promise<boolean> {
    const collection = getCollection<Task>(this.collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  /**
   * Delete all tasks for a user (cascade delete)
   */
  static async deleteUserTasks(userId: string): Promise<number> {
    const collection = getCollection<Task>(this.collectionName);
    const result = await collection.deleteMany({
      userId: new ObjectId(userId),
    });
    return result.deletedCount;
  }

  /**
   * Create indexes for performance
   */
  static async createIndexes(): Promise<void> {
    const collection = getCollection<Task>(this.collectionName);

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
