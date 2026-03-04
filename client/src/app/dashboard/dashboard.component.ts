import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { TaskService } from "../services/task.service";
import { AuthService } from "../services/auth.service";
import { User, Task, JWTPayload } from "@shared/models";
import { NEVER, Observable, Subject } from "rxjs";
import { filter, map, switchMap, takeUntil } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
  standalone: false,
})
export class DashboardComponent implements OnInit, OnDestroy {
  title = "Pohlim Monorepo";
  users: User[] = [];
  tasks$: Observable<Task[]> = new Observable<Task[]>();
  loading = false;
  activeTab: "users" | "tasks" = "users";
  currentUser: JWTPayload | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.tasks$ = this.authService.getCurrentUser().pipe(
      filter((user) => !!user),
      switchMap((user) => this.taskService.getTasksByUserId(user?.id)),
      filter((response) => !!response?.data),
      map((response) => {
        return response.data || [];
      }),
      takeUntil(this.destroy$),
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
