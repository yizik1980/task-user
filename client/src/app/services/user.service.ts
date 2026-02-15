import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CreateUserRequest, UpdateUserRequest, UsersListResponse, UserResponse } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UsersListResponse> {
    return this.http.get<UsersListResponse>(this.apiUrl);
  }

  getActiveUsers(): Observable<UsersListResponse> {
    return this.http.get<UsersListResponse>(`${this.apiUrl}/active`);
  }

  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/${id}`);
  }

  createUser(user: CreateUserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUrl, user);
  }

  updateUser(id: number, user: UpdateUserRequest): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`${this.apiUrl}/${id}`);
  }
}
