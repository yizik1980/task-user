import { getConnection, sql } from './config';
import { Task } from '@shared/models';

export class TaskRepository {
  static async getAllTasks(): Promise<Task[]> {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM Tasks ORDER BY dueDate ASC');
      return result.recordset as Task[];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  static async getTaskById(id: number): Promise<Task | null> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Tasks WHERE id = @id');
      return (result.recordset[0] as Task) || null;
    } catch (error) {
      console.error('Error fetching task by ID:', error);
      throw error;
    }
  }

  static async getTasksByUserId(userId: number): Promise<Task[]> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('userId', sql.Int, userId)
        .query('SELECT * FROM Tasks WHERE userId = @userId ORDER BY dueDate ASC');
      return result.recordset as Task[];
    } catch (error) {
      console.error('Error fetching tasks by user ID:', error);
      throw error;
    }
  }

  static async getTasksByUserIdAndStatus(userId: number, status: string): Promise<Task[]> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('userId', sql.Int, userId)
        .input('status', sql.NVarChar, status)
        .query('SELECT * FROM Tasks WHERE userId = @userId AND status = @status ORDER BY dueDate ASC');
      return result.recordset as Task[];
    } catch (error) {
      console.error('Error fetching tasks by user and status:', error);
      throw error;
    }
  }

  static async getTasksByStatus(status: string): Promise<Task[]> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('status', sql.NVarChar, status)
        .query('SELECT * FROM Tasks WHERE status = @status ORDER BY dueDate ASC');
      return result.recordset as Task[];
    } catch (error) {
      console.error('Error fetching tasks by status:', error);
      throw error;
    }
  }

  static async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('userId', sql.Int, task.userId)
        .input('title', sql.NVarChar, task.title)
        .input('description', sql.NVarChar, task.description || null)
        .input('status', sql.NVarChar, task.status || 'pending')
        .input('priority', sql.NVarChar, task.priority || 'medium')
        .input('dueDate', sql.DateTime, task.dueDate || null)
        .query(`
          INSERT INTO Tasks (userId, title, description, status, priority, dueDate)
          VALUES (@userId, @title, @description, @status, @priority, @dueDate);
          SELECT SCOPE_IDENTITY() as id;
        `);

      const newId = result.recordset[0].id;
      return (await this.getTaskById(newId)) as Task;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  static async updateTask(id: number, task: Partial<Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Task> {
    try {
      const pool = await getConnection();
      const updates: string[] = [];
      const request = pool.request().input('id', sql.Int, id);

      if (task.title !== undefined) {
        updates.push('title = @title');
        request.input('title', sql.NVarChar, task.title);
      }
      if (task.description !== undefined) {
        updates.push('description = @description');
        request.input('description', sql.NVarChar, task.description);
      }
      if (task.status !== undefined) {
        updates.push('status = @status');
        request.input('status', sql.NVarChar, task.status);
      }
      if (task.priority !== undefined) {
        updates.push('priority = @priority');
        request.input('priority', sql.NVarChar, task.priority);
      }
      if (task.dueDate !== undefined) {
        updates.push('dueDate = @dueDate');
        request.input('dueDate', sql.DateTime, task.dueDate);
      }
      if (task.completedAt !== undefined) {
        updates.push('completedAt = @completedAt');
        request.input('completedAt', sql.DateTime, task.completedAt);
      }

      updates.push('updatedAt = GETDATE()');

      if (updates.length > 1) {
        await request.query(`UPDATE Tasks SET ${updates.join(', ')} WHERE id = @id`);
      }

      return (await this.getTaskById(id)) as Task;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  static async deleteTask(id: number): Promise<boolean> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Tasks WHERE id = @id');
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  static async getPendingTasks(): Promise<Task[]> {
    try {
      const pool = await getConnection();
      const result = await pool.request().query("SELECT * FROM Tasks WHERE status = 'pending' ORDER BY dueDate ASC");
      return result.recordset as Task[];
    } catch (error) {
      console.error('Error fetching pending tasks:', error);
      throw error;
    }
  }

  static async getHighPriorityTasks(): Promise<Task[]> {
    try {
      const pool = await getConnection();
      const result = await pool.request().query("SELECT * FROM Tasks WHERE priority = 'high' AND status != 'completed' ORDER BY dueDate ASC");
      return result.recordset as Task[];
    } catch (error) {
      console.error('Error fetching high priority tasks:', error);
      throw error;
    }
  }

  static async getOverdueTasks(): Promise<Task[]> {
    try {
      const pool = await getConnection();
      const result = await pool.request().query("SELECT * FROM Tasks WHERE dueDate < GETDATE() AND status != 'completed' ORDER BY dueDate ASC");
      return result.recordset as Task[];
    } catch (error) {
      console.error('Error fetching overdue tasks:', error);
      throw error;
    }
  }

  static async completeTask(id: number): Promise<Task> {
    try {
      const pool = await getConnection();
      await pool
        .request()
        .input('id', sql.Int, id)
        .query("UPDATE Tasks SET status = 'completed', completedAt = GETDATE(), updatedAt = GETDATE() WHERE id = @id");

      return (await this.getTaskById(id)) as Task;
    } catch (error) {
      console.error('Error completing task:', error);
      throw error;
    }
  }
}
