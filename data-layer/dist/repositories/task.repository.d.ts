import { ObjectId } from "mongodb";
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
export declare class TaskRepository {
    private static collectionName;
    /**
     * Get task by ID
     */
    static getTaskById(id: string): Promise<Task | null>;
    /**
     * Get all tasks for a user
     */
    static getUserTasks(userId: string): Promise<Task[]>;
    /**
     * Get all tasks (admin)
     */
    static getAllTasks(): Promise<Task[]>;
    /**
     * Get tasks within a date range
     */
    static getTasksByDateRange(startDate: Date, endDate: Date): Promise<Task[]>;
    /**
     * Create task
     */
    static createTask(taskData: Omit<Task, "_id">): Promise<Task>;
    /**
     * Update task
     */
    static updateTask(id: string, taskData: Partial<Task>): Promise<Task | null>;
    /**
     * Delete task
     */
    static deleteTask(id: string): Promise<boolean>;
    /**
     * Delete all tasks for a user (cascade delete)
     */
    static deleteUserTasks(userId: string): Promise<number>;
    /**
     * Create indexes for performance
     */
    static createIndexes(): Promise<void>;
}
//# sourceMappingURL=task.repository.d.ts.map