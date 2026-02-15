import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, CreateUserRequest, UpdateUserRequest, UsersListResponse, UserResponse } from '@shared/models';
import { ApiService, ApiResponse } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = '/users';

  constructor(private apiService: ApiService) {}

  getAllUsers(): Observable<ApiResponse<User[]>> {
    return this.apiService.getAll<User>(this.endpoint);
  }

  getActiveUsers(): Observable<ApiResponse<User[]>> {
    return this.apiService.customGet<User[]>(`${this.endpoint}/active`);
  }

  getUserById(id: number): Observable<ApiResponse<User>> {
    return this.apiService.getById<User>(this.endpoint, id);
  }

  createUser(user: CreateUserRequest): Observable<ApiResponse<User>> {
    return this.apiService.create<User>(this.endpoint, user);
  }

  updateUser(id: number, user: UpdateUserRequest): Observable<ApiResponse<User>> {
    return this.apiService.update<User>(this.endpoint, id, user);
  }

  deleteUser(id: number): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(this.endpoint, id);
  }
}
