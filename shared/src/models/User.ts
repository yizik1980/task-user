export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  postalCode: string | null;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  role?: string;
  isActive?: boolean;
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  role?: string;
  isActive?: boolean;
}

export interface UserResponse {
  success: boolean;
  data?: User;
  error?: string;
  message?: string;
}

export interface UsersListResponse {
  success: boolean;
  data: User[];
  count: number;
  error?: string;
}
