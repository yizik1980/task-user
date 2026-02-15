export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiListResponse<T> extends ApiResponse<T[]> {
  count: number;
}
