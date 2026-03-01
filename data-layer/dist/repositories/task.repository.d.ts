export interface Task {
    id?: string;
    userId: string;
    title: string;
    description?: string | null;
    status: string;
    priority: string;
    dueDate?: Date | null;
    completedAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class TaskRepository {
    private static table;
    static getTaskById(id: string): Promise<Task | null>;
    static getAllTasks(): Promise<Task[]>;
    static getUserTasks(userId: string): Promise<Task[]>;
    static getTasksByUserId(userId: string): Promise<Task[]>;
    static getTasksByUserIdAndStatus(userId: string, status: string): Promise<Task[]>;
    static getTasksByDateRange(startDate: Date, endDate: Date): Promise<Task[]>;
    static createTask(taskData: Omit<Task, "id">): Promise<Task>;
    static updateTask(id: string, taskData: Partial<Task>): Promise<Task | null>;
    static completeTask(id: string): Promise<Task | null>;
    static deleteTask(id: string): Promise<boolean>;
    static deleteUserTasks(userId: string): Promise<number>;
}
//# sourceMappingURL=task.repository.d.ts.map