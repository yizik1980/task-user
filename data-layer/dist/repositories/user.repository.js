"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const supabase_connection_1 = require("../supabase-connection");
function mapRow(row) {
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
function toDbRow(user) {
    const row = {};
    if (user.email !== undefined)
        row.email = user.email;
    if (user.username !== undefined)
        row.username = user.username;
    if (user.password !== undefined)
        row.password = user.password;
    if (user.firstName !== undefined)
        row.first_name = user.firstName;
    if (user.lastName !== undefined)
        row.last_name = user.lastName;
    if (user.phone !== undefined)
        row.phone = user.phone;
    if (user.city !== undefined)
        row.city = user.city;
    if (user.country !== undefined)
        row.country = user.country;
    if (user.address !== undefined)
        row.address = user.address;
    if (user.postalCode !== undefined)
        row.postal_code = user.postalCode;
    if (user.role !== undefined)
        row.role = user.role;
    if (user.isActive !== undefined)
        row.is_active = user.isActive;
    return row;
}
class UserRepository {
    static async getUserByEmail(email) {
        const { data, error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .select("*")
            .eq("email", email)
            .single();
        if (error)
            return null;
        return mapRow(data);
    }
    static async getUserById(id) {
        const { data, error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .select("*")
            .eq("id", id)
            .single();
        if (error)
            return null;
        return mapRow(data);
    }
    static async getAllUsers() {
        const { data, error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .select("*")
            .order("created_at", { ascending: false });
        if (error)
            throw new Error(error.message);
        return (data ?? []).map(mapRow);
    }
    static async getActiveUsers() {
        const { data, error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .select("*")
            .eq("is_active", true)
            .order("created_at", { ascending: false });
        if (error)
            throw new Error(error.message);
        return (data ?? []).map(mapRow);
    }
    static async createUser(userData) {
        const row = {
            ...toDbRow(userData),
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
    static async updateUser(id, userData) {
        const row = {
            ...toDbRow(userData),
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
    static async deleteUser(id) {
        const { error } = await (0, supabase_connection_1.getSupabaseClient)()
            .from(this.table)
            .delete()
            .eq("id", id);
        return !error;
    }
}
exports.UserRepository = UserRepository;
UserRepository.table = "users";
//# sourceMappingURL=user.repository.js.map