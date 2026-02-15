import { ObjectId } from "mongodb";
import { getCollection } from "../mongo-connection";

export interface User {
  _id?: ObjectId;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  city?: string | null;
  country?: string | null;
  address?: string | null;
  postalCode?: string | null;
  role: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserRepository {
  private static collectionName = "users";

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<User | null> {
    const collection = getCollection<User>(this.collectionName);
    return await collection.findOne({ email });
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: string): Promise<User | null> {
    const collection = getCollection<User>(this.collectionName);
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  /**
   * Get all users
   */
  static async getAllUsers(): Promise<User[]> {
    const collection = getCollection<User>(this.collectionName);
    return await collection.find({}).toArray();
  }

  /**
   * Create user
   */
  static async createUser(userData: Omit<User, "_id">): Promise<User> {
    const collection = getCollection<User>(this.collectionName);
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
  static async updateUser(
    id: string,
    userData: Partial<User>,
  ): Promise<User | null> {
    const collection = getCollection<User>(this.collectionName);
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...userData,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" },
    );

    return result || null;
  }

  /**
   * Delete user
   */
  static async deleteUser(id: string): Promise<boolean> {
    const collection = getCollection<User>(this.collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  /**
   * Create indexes for performance
   */
  static async createIndexes(): Promise<void> {
    const collection = getCollection<User>(this.collectionName);

    // Unique index on email
    await collection.createIndex({ email: 1 }, { unique: true });

    // Index on isActive for queries
    await collection.createIndex({ isActive: 1 });

    console.log("✅ User collection indexes created");
  }
}
