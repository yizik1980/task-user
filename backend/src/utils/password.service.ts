import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export class PasswordService {
  static async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.error('Error comparing password:', error);
      return false;
    }
  }
}
