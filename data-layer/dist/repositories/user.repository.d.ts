import { ObjectId } from "mongodb";
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
export declare class UserRepository {
    private static collectionName;
    /**
     * Get user by email
     */
    static getUserByEmail(email: string): Promise<User | null>;
    /**
     * Get user by ID
     */
    static getUserById(id: string): Promise<User | null>;
    /**
     * Get all users
     */
    static getAllUsers(): Promise<User[]>;
    /**
     * Create user
     */
    static createUser(userData: Omit<User, "_id">): Promise<User>;
    /**
     * Update user
     */
    static updateUser(id: string, userData: Partial<User>): Promise<User | null>;
    /**
     * Delete user
     */
    static deleteUser(id: string): Promise<boolean>;
    /**
     * Create indexes for performance
     */
    static createIndexes(): Promise<void>;
}
//# sourceMappingURL=user.repository.d.ts.map