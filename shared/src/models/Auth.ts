export interface JWTPayload {
  id: number;
  email: string;
  updatedAt: Date;
  iat?: number;
  exp?: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    user: {
      id: number;
      email: string;
      username: string;
      firstName: string | null;
      lastName: string | null;
      role: string;
    };
    token: string;
    expiresIn: string;
  };
  error?: string;
  message?: string;
}

export interface AuthResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}
