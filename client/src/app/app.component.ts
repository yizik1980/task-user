import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { AuthService } from './services/auth.service';
import { User, Task, JWTPayload } from '@shared/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Pohlim Monorepo';
  users: User[] = [];
  tasks: Task[] = [];
  backendMessage = '';
  loading = false;
  activeTab: 'users' | 'tasks' = 'users';
  isAuthenticated = false;
  currentUser: JWTPayload | null = null;
  showSignup = false;

  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check authentication status
    this.authService.isAuthenticated()
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuth => {
        this.isAuthenticated = isAuth;
        if (isAuth) {
          this.fetchUsers();
          this.fetchTasks();
        }
      });

    // Get current user
    this.authService.getCurrentUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });
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
    this.isAuthenticated = false;
    this.currentUser = null;
    this.users = [];
    this.tasks = [];
  }

  switchToSignup(): void {
    this.showSignup = true;
  }

  switchToLogin(): void {
    this.showSignup = false;
  }

  onRegistrationSuccess(): void {
    // Check if user is authenticated after registration
    this.authService.isAuthenticated()
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuth => {
        this.isAuthenticated = isAuth;
        if (isAuth) {
          this.showSignup = false;
          this.fetchUsers();
          this.fetchTasks();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
