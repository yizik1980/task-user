import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { User, Task, JWTPayload } from '@shared/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = 'Pohlim Monorepo';
  users: User[] = [];
  tasks: Task[] = [];
  loading = false;
  activeTab: 'users' | 'tasks' = 'users';
  currentUser: JWTPayload | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    this.fetchUsers();
    this.fetchTasks();
  }

  fetchUsers(): void {
    this.loading = true;
    this.userService.getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.users = response.data || [];
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching users:', error);
          this.loading = false;
        }
      );
  }

  fetchTasks(): void {
    this.loading = true;
    this.taskService.getAllTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.tasks = response.data || [];
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching tasks:', error);
          this.loading = false;
        }
      );
  }

  switchTab(tab: 'users' | 'tasks'): void {
    this.activeTab = tab;
    if (tab === 'users') {
      this.fetchUsers();
    } else {
      this.fetchTasks();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
