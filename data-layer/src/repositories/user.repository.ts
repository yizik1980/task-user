import { getSupabaseClient } from "../supabase-connection";

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

function mapRow(row: any): User {
  return {
    id: row.id,
    email: row.email,
    username: row.username,
    password: row.password,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone ?? null,
    city: row.city ?? null,
    country: row.country ?? null,
    address: row.address ?? null,
    postalCode: row.postal_code ?? null,
    role: row.role,
    isActive: row.is_active,
    createdAt: row.created_at ? new Date(row.created_at) : undefined,
    updatedAt: row.updated_at ? new Date(row.updated_at) : undefined,
  };
}

function toDbRow(user: Partial<User>): Record<string, any> {
  const row: Record<string, any> = {};
  if (user.email !== undefined) row.email = user.email;
  if (user.username !== undefined) row.username = user.username;
  if (user.password !== undefined) row.password = user.password;
  if (user.firstName !== undefined) row.first_name = user.firstName;
  if (user.lastName !== undefined) row.last_name = user.lastName;
  if (user.phone !== undefined) row.phone = user.phone;
  if (user.city !== undefined) row.city = user.city;
  if (user.country !== undefined) row.country = user.country;
  if (user.address !== undefined) row.address = user.address;
  if (user.postalCode !== undefined) row.postal_code = user.postalCode;
  if (user.role !== undefined) row.role = user.role;
  if (user.isActive !== undefined) row.is_active = user.isActive;
  return row;
}

export class UserRepository {
  private static table = "users";

  static async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await getSupabaseClient()
      .from(this.table)
      .select("*")
      .eq("email", email)
      .single();
    if (error) return null;
    return mapRow(data);
  }

  static async getUserById(id: string): Promise<User | null> {
    const { data, error } = await getSupabaseClient()
      .from(this.table)
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return mapRow(data);
  }

  static async getAllUsers(): Promise<User[]> {
    const { data, error } = await getSupabaseClient()
      .from(this.table)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRow);
  }

  static async getActiveUsers(): Promise<User[]> {
    const { data, error } = await getSupabaseClient()
      .from(this.table)
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map(mapRow);
  }

  static async createUser(userData: Omit<User, "id">): Promise<User> {
    const row = {
      ...toDbRow(userData),
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await getSupabaseClient()
      .from(this.table)
      .insert(row)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return mapRow(data);
  }

  static async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    const row = {
      ...toDbRow(userData),
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await getSupabaseClient()
      .from(this.table)
      .update(row)
      .eq("id", id)
      .select()
      .single();
    if (error) return null;
    return mapRow(data);
  }

  static async deleteUser(id: string): Promise<boolean> {
    const { error } = await getSupabaseClient()
      .from(this.table)
      .delete()
      .eq("id", id);
    return !error;
  }
}
