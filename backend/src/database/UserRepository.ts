import { getConnection, sql } from './config';
import { User } from '@shared/models';

export class UserRepository {
  static async getAllUsers(): Promise<User[]> {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM Users');
      return result.recordset as User[];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  static async getUserById(id: number): Promise<User | null> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM Users WHERE id = @id');
      return (result.recordset[0] as User) || null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('email', sql.NVarChar, email)
        .query('SELECT * FROM Users WHERE email = @email');
      return (result.recordset[0] as User) || null;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  }

  static async getUserByUsername(username: string): Promise<User | null> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('username', sql.NVarChar, username)
        .query('SELECT * FROM Users WHERE username = @username');
      return (result.recordset[0] as User) || null;
    } catch (error) {
      console.error('Error fetching user by username:', error);
      throw error;
    }
  }

  static async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('email', sql.NVarChar, user.email)
        .input('username', sql.NVarChar, user.username)
        .input('password', sql.NVarChar, user.password)
        .input('firstName', sql.NVarChar, user.firstName || null)
        .input('lastName', sql.NVarChar, user.lastName || null)
        .input('phone', sql.NVarChar, user.phone || null)
        .input('address', sql.NVarChar, user.address || null)
        .input('city', sql.NVarChar, user.city || null)
        .input('country', sql.NVarChar, user.country || null)
        .input('postalCode', sql.NVarChar, user.postalCode || null)
        .input('role', sql.NVarChar, user.role || 'user')
        .input('isActive', sql.Bit, user.isActive ? 1 : 0)
        .query(`
          INSERT INTO Users (email, username, password, firstName, lastName, phone, address, city, country, postalCode, role, isActive)
          VALUES (@email, @username, @password, @firstName, @lastName, @phone, @address, @city, @country, @postalCode, @role, @isActive);
          SELECT SCOPE_IDENTITY() as id;
        `);
      
      const newId = result.recordset[0].id;
      return (await this.getUserById(newId)) as User;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async updateUser(id: number, user: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    try {
      const pool = await getConnection();
      const updates: string[] = [];
      const request = pool.request().input('id', sql.Int, id);

      if (user.email !== undefined) {
        updates.push('email = @email');
        request.input('email', sql.NVarChar, user.email);
      }
      if (user.username !== undefined) {
        updates.push('username = @username');
        request.input('username', sql.NVarChar, user.username);
      }
      if (user.password !== undefined) {
        updates.push('password = @password');
        request.input('password', sql.NVarChar, user.password);
      }
      if (user.firstName !== undefined) {
        updates.push('firstName = @firstName');
        request.input('firstName', sql.NVarChar, user.firstName);
      }
      if (user.lastName !== undefined) {
        updates.push('lastName = @lastName');
        request.input('lastName', sql.NVarChar, user.lastName);
      }
      if (user.phone !== undefined) {
        updates.push('phone = @phone');
        request.input('phone', sql.NVarChar, user.phone);
      }
      if (user.address !== undefined) {
        updates.push('address = @address');
        request.input('address', sql.NVarChar, user.address);
      }
      if (user.city !== undefined) {
        updates.push('city = @city');
        request.input('city', sql.NVarChar, user.city);
      }
      if (user.country !== undefined) {
        updates.push('country = @country');
        request.input('country', sql.NVarChar, user.country);
      }
      if (user.postalCode !== undefined) {
        updates.push('postalCode = @postalCode');
        request.input('postalCode', sql.NVarChar, user.postalCode);
      }
      if (user.role !== undefined) {
        updates.push('role = @role');
        request.input('role', sql.NVarChar, user.role);
      }
      if (user.isActive !== undefined) {
        updates.push('isActive = @isActive');
        request.input('isActive', sql.Bit, user.isActive ? 1 : 0);
      }

      updates.push('updatedAt = GETDATE()');

      if (updates.length > 1) {
        await request.query(`UPDATE Users SET ${updates.join(', ')} WHERE id = @id`);
      }

      return (await this.getUserById(id)) as User;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  static async deleteUser(id: number): Promise<boolean> {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input('id', sql.Int, id)
        .query('DELETE FROM Users WHERE id = @id');
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  static async getActiveUsers(): Promise<User[]> {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM Users WHERE isActive = 1');
      return result.recordset as User[];
    } catch (error) {
      console.error('Error fetching active users:', error);
      throw error;
    }
  }
}
