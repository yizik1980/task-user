import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, CreateTaskRequest, UpdateTaskRequest, TasksListResponse, TaskResponse } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<TasksListResponse> {
    return this.http.get<TasksListResponse>(this.apiUrl);
  }

  getTaskById(id: number): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.apiUrl}/${id}`);
  }

  getTasksByUserId(userId: number): Observable<TasksListResponse> {
    return this.http.get<TasksListResponse>(`${this.apiUrl}/user/${userId}`);
  }

  getTasksByUserIdAndStatus(userId: number, status: string): Observable<TasksListResponse> {
    return this.http.get<TasksListResponse>(`${this.apiUrl}/user/${userId}/${status}`);
  }

  getPendingTasks(): Observable<TasksListResponse> {
    return this.http.get<TasksListResponse>(`${this.apiUrl}/status/pending`);
  }

  getHighPriorityTasks(): Observable<TasksListResponse> {
    return this.http.get<TasksListResponse>(`${this.apiUrl}/priority/high`);
  }

  getOverdueTasks(): Observable<TasksListResponse> {
    return this.http.get<TasksListResponse>(`${this.apiUrl}/overdue`);
  }

  createTask(task: CreateTaskRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.apiUrl, task);
  }

  updateTask(id: number, task: UpdateTaskRequest): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.apiUrl}/${id}`, task);
  }

  completeTask(id: number): Observable<TaskResponse> {
    return this.http.patch<TaskResponse>(`${this.apiUrl}/${id}/complete`, {});
  }

  deleteTask(id: number): Observable<TaskResponse> {
    return this.http.delete<TaskResponse>(`${this.apiUrl}/${id}`);
  }
}
