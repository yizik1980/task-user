import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '@shared/models';
import { ApiService, ApiResponse } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private endpoint = '/tasks';

  constructor(private apiService: ApiService) {}

  getAllTasks(): Observable<ApiResponse<Task[]>> {
    return this.apiService.getAll<Task>(this.endpoint);
  }

  getTaskById(id: number): Observable<ApiResponse<Task>> {
    return this.apiService.getById<Task>(this.endpoint, id);
  }

  getTasksByUserId(userId: number): Observable<ApiResponse<Task[]>> {
    return this.apiService.customGet<Task[]>(`${this.endpoint}/user/${userId}`);
  }

  getTasksByUserIdAndStatus(userId: number, status: string): Observable<ApiResponse<Task[]>> {
    return this.apiService.customGet<Task[]>(`${this.endpoint}/user/${userId}/${status}`);
  }

  getPendingTasks(): Observable<ApiResponse<Task[]>> {
    return this.apiService.customGet<Task[]>(`${this.endpoint}/status/pending`);
  }

  getHighPriorityTasks(): Observable<ApiResponse<Task[]>> {
    return this.apiService.customGet<Task[]>(`${this.endpoint}/priority/high`);
  }

  getOverdueTasks(): Observable<ApiResponse<Task[]>> {
    return this.apiService.customGet<Task[]>(`${this.endpoint}/overdue`);
  }

  createTask(task: CreateTaskRequest): Observable<ApiResponse<Task>> {
    return this.apiService.create<Task>(this.endpoint, task);
  }

  updateTask(id: number, task: UpdateTaskRequest): Observable<ApiResponse<Task>> {
    return this.apiService.update<Task>(this.endpoint, id, task);
  }

  completeTask(id: number): Observable<ApiResponse<Task>> {
    return this.apiService.customPatch<Task>(`${this.endpoint}/${id}/complete`, {});
  }

  deleteTask(id: number): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(this.endpoint, id);
  }
}

