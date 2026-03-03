import { Task } from "@/dto/task.dto";
import { getSupabaseClient } from "../supabase-connection";

const TABLE = "tasks";

function mapRow(row: any): Task {
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

function toDbRow(task: Partial<Task>): Record<string, any> {
  return {
    user_id: task.userId,
    due_date: task.dueDate ? task.dueDate.toISOString() : null,
    completed_at: task.completedAt ? task.completedAt.toISOString() : null,
    ...task,
  } as Record<string, any>;
}

export class TaskRepository {
  static async getTaskById(id: string): Promise<Task | null> {
    const { data, error } = await getSupabaseClient()
      .from(TABLE)
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return mapRow(data);
  }

  static async getAllTasks(): Promise<Task[]> {
    const { data, error } = await getSupabaseClient()
      .from(TABLE)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRow);
  }

  static async getUserTasks(userId: string): Promise<Task[]> {
    const { data, error } = await getSupabaseClient()
      .from(TABLE)
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRow);
  }

  // Alias used by tasks route
  static async getTasksByUserId(userId: string): Promise<Task[]> {
    return this.getUserTasks(userId);
  }

  static async getTasksByUserIdAndStatus(
    userId: string,
    status: string,
  ): Promise<Task[]> {
    const { data, error } = await getSupabaseClient()
      .from(TABLE)
      .select("*")
      .eq("user_id", userId)
      .eq("status", status)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRow);
  }

  static async getTasksByDateRange(
    startDate: Date,
    endDate: Date,
  ): Promise<Task[]> {
    const { data, error } = await getSupabaseClient()
      .from(TABLE)
      .select("*")
      .gte("due_date", startDate.toISOString())
      .lte("due_date", endDate.toISOString())
      .order("due_date", { ascending: true });
    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRow);
  }

  static async createTask(taskData: Omit<Task, "id">): Promise<Task> {
    const row = {
      ...toDbRow(taskData),
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await getSupabaseClient()
      .from(TABLE)
      .insert(row)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return mapRow(data);
  }

  static async updateTask(
    id: string,
    taskData: Partial<Task>,
  ): Promise<Task | null> {
    const row = {
      ...toDbRow(taskData),
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await getSupabaseClient()
      .from(TABLE)
      .update(row)
      .eq("id", id)
      .select()
      .single();
    if (error) return null;
    return mapRow(data);
  }

  static async completeTask(id: string): Promise<Task | null> {
    return this.updateTask(id, {
      status: "completed",
      completedAt: new Date(),
    });
  }

  static async deleteTask(id: string): Promise<boolean> {
    const { error } = await getSupabaseClient()
      .from(TABLE)
      .delete()
      .eq("id", id);
    return !error;
  }

  static async deleteUserTasks(userId: string): Promise<number> {
    const { data, error } = await getSupabaseClient()
      .from(TABLE)
      .delete()
      .eq("user_id", userId)
      .select("id");
    if (error) return 0;
    return (data ?? []).length;
  }
}
