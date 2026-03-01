"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const supabase_connection_1 = require("../supabase-connection");
function mapRow(row) {
    return {
        id: row.id,
        userId: row.user_id,
        title: row.title,
        description: row.description ?? null,
        status: row.status,
        priority: row.priority,
        dueDate: row.due_date ? new Date(row.due_date) : null,
        completedAt: row.completed_at ? new Date(row.completed_at) : null,
        createdAt: row.created_at ? new Date(row.created_at) : undefined,
        updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
    };
}
function toDbRow(task) {
    const row = {};
    if (task.userId !== undefined)
        row.user_id = task.userId;
    if (task.title !== undefined)
        row.title = task.title;
    if (task.description !== undefined)
        row.description = task.description;
    if (task.status !== undefined)
        row.status = task.status;
    if (task.priority !== undefined)
        row.priority = task.priority;
    if (task.dueDate !== undefined)
        row.due_date = task.dueDate ? task.dueDate.toISOString() : null;
    if (task.completedAt !== undefined)
        row.completed_at = task.completedAt ? task.completedAt.toISOString() : null;
    return row;
}
class TaskRepository {
    static async getTaskById(id) {
        const { data, error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .select("*")
            .eq("id", id)
            .single();
        if (error)
            return null;
        return mapRow(data);
    }
    static async getAllTasks() {
        const { data, error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .select("*")
            .order("created_at", { ascending: false });
        if (error)
            throw new Error(error.message);
        return (data ?? []).map(mapRow);
    }
    static async getUserTasks(userId) {
        const { data, error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });
        if (error)
            throw new Error(error.message);
        return (data ?? []).map(mapRow);
    }
    // Alias used by tasks route
    static async getTasksByUserId(userId) {
        return this.getUserTasks(userId);
    }
    static async getTasksByUserIdAndStatus(userId, status) {
        const { data, error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .select("*")
            .eq("user_id", userId)
            .eq("status", status)
            .order("created_at", { ascending: false });
        if (error)
            throw new Error(error.message);
        return (data ?? []).map(mapRow);
    }
    static async getTasksByDateRange(startDate, endDate) {
        const { data, error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .select("*")
            .gte("due_date", startDate.toISOString())
            .lte("due_date", endDate.toISOString())
            .order("due_date", { ascending: true });
        if (error)
            throw new Error(error.message);
        return (data ?? []).map(mapRow);
    }
    static async createTask(taskData) {
        const row = {
            ...toDbRow(taskData),
            updated_at: new Date().toISOString(),
        };
        const { data, error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .insert(row)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return mapRow(data);
    }
    static async updateTask(id, taskData) {
        const row = {
            ...toDbRow(taskData),
            updated_at: new Date().toISOString(),
        };
        const { data, error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .update(row)
            .eq("id", id)
            .select()
            .single();
        if (error)
            return null;
        return mapRow(data);
    }
    static async completeTask(id) {
        return this.updateTask(id, {
            status: "completed",
            completedAt: new Date(),
        });
    }
    static async deleteTask(id) {
        const { error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .delete()
            .eq("id", id);
        return !error;
    }
    static async deleteUserTasks(userId) {
        const { data, error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .delete()
            .eq("user_id", userId)
            .select("id");
        if (error)
            return 0;
        return (data ?? []).length;
    }
}
exports.TaskRepository = TaskRepository;
TaskRepository.table = "tasks";
//# sourceMappingURL=task.repository.js.map