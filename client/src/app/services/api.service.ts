import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, HttpOptions } from './http.service';

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Generic API service for CRUD operations
 * Provides common patterns for API interactions
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpService: HttpService) {}

  /**
   * Get all items from an endpoint
   */
  getAll<T = any>(endpoint: string, options?: HttpOptions): Observable<ApiResponse<T[]>> {
    return this.httpService.get<ApiResponse<T[]>>(endpoint, options);
  }

  /**
   * Get a single item by ID
   */
  getById<T = any>(endpoint: string, id: number | string, options?: HttpOptions): Observable<ApiResponse<T>> {
    return this.httpService.get<ApiResponse<T>>(`${endpoint}/${id}`, options);
  }

  /**
   * Create a new item
   */
  create<T = any>(endpoint: string, data: any, options?: HttpOptions): Observable<ApiResponse<T>> {
    return this.httpService.post<ApiResponse<T>>(endpoint, data, options);
  }

  /**
   * Update an existing item
   */
  update<T = any>(endpoint: string, id: number | string, data: any, options?: HttpOptions): Observable<ApiResponse<T>> {
    return this.httpService.put<ApiResponse<T>>(`${endpoint}/${id}`, data, options);
  }

  /**
   * Update an existing item (partial update)
   */
  partialUpdate<T = any>(endpoint: string, id: number | string, data: any, options?: HttpOptions): Observable<ApiResponse<T>> {
    return this.httpService.patch<ApiResponse<T>>(`${endpoint}/${id}`, data, options);
  }

  /**
   * Delete an item
   */
  delete<T = any>(endpoint: string, id: number | string, options?: HttpOptions): Observable<ApiResponse<T>> {
    return this.httpService.delete<ApiResponse<T>>(`${endpoint}/${id}`, options);
  }

  /**
   * Execute custom GET request
   */
  customGet<T = any>(endpoint: string, options?: HttpOptions): Observable<ApiResponse<T>> {
    return this.httpService.get<ApiResponse<T>>(endpoint, options);
  }

  /**
   * Execute custom POST request
   */
  customPost<T = any>(endpoint: string, data?: any, options?: HttpOptions): Observable<ApiResponse<T>> {
    return this.httpService.post<ApiResponse<T>>(endpoint, data || {}, options);
  }

  /**
   * Execute custom PUT request
   */
  customPut<T = any>(endpoint: string, data?: any, options?: HttpOptions): Observable<ApiResponse<T>> {
    return this.httpService.put<ApiResponse<T>>(endpoint, data || {}, options);
  }

  /**
   * Execute custom PATCH request
   */
  customPatch<T = any>(endpoint: string, data?: any, options?: HttpOptions): Observable<ApiResponse<T>> {
    return this.httpService.patch<ApiResponse<T>>(endpoint, data || {}, options);
  }

  /**
   * Execute custom DELETE request
   */
  customDelete<T = any>(endpoint: string, options?: HttpOptions): Observable<ApiResponse<T>> {
    return this.httpService.delete<ApiResponse<T>>(endpoint, options);
  }

  /**
   * Get loading state
   */
  getLoading(): Observable<boolean> {
    return this.httpService.getLoading();
  }

  /**
   * Check if loading
   */
  isLoading(): boolean {
    return this.httpService.isLoading();
  }
}
