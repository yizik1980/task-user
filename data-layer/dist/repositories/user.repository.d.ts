export interface User {
    id?: string;
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
    private static table;
    static getUserByEmail(email: string): Promise<User | null>;
    static getUserById(id: string): Promise<User | null>;
    static getAllUsers(): Promise<User[]>;
    static getActiveUsers(): Promise<User[]>;
    static createUser(userData: Omit<User, "id">): Promise<User>;
    static updateUser(id: string, userData: Partial<User>): Promise<User | null>;
    static deleteUser(id: string): Promise<boolean>;
}
//# sourceMappingURL=user.repository.d.ts.map