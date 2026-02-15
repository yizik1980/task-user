# Weekly Board Completion Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the weekly board feature with backend-integrated task CRUD, task display on day cards, and dedicated view/edit/delete dialog components.

**Architecture:** Approach B — separate dialog components for create, view, and edit. DayCardComponent extracts day rendering as a dumb component. WeeklyBoardComponent orchestrates data fetching and dialog lifecycle. Backend gets a new date-range query endpoint.

**Tech Stack:** Angular 18 (NgModule, non-standalone components), Express.js, MongoDB, RxJS, TypeScript

**Important notes:**
- IDs in MongoDB are ObjectId strings (e.g. `"507f1f77bcf86cd799439011"`), but the shared models use `id: number`. The backend routes use `parseInt()` on path params. This mismatch exists from the SQL-to-MongoDB migration. Do NOT fix it in this plan — work with the existing patterns.
- The `currentUser.id` from `AuthService` is the userId needed for `createTask`.
- The existing `DialogComponent` + `DialogService` handle generic modals. The new dialog components will use this system for rendering.
- All new components use `standalone: false` and are declared in `AppModule`.

---

### Task 1: Backend — Add date-range query to TaskRepository

**Files:**
- Modify: `data-layer/src/repositories/task.repository.ts:41-44`

**Step 1: Add getTasksByDateRange method to TaskRepository**

Add this method after the existing `getAllTasks()` method in `task.repository.ts`:

```typescript
/**
 * Get tasks within a date range
 */
static async getTasksByDateRange(startDate: Date, endDate: Date): Promise<Task[]> {
  const collection = getCollection<Task>(this.collectionName);
  return await collection
    .find({
      dueDate: {
        $gte: startDate,
        $lte: endDate,
      },
    })
    .sort({ dueDate: 1 })
    .toArray();
}
```

**Step 2: Add dueDate index for performance**

In the existing `createIndexes()` method, add:

```typescript
// Index on dueDate for date range queries
await collection.createIndex({ dueDate: 1 });
```

**Step 3: Rebuild data-layer**

Run: `cd data-layer && npm run build`
Expected: Compiles without errors, `dist/` updated.

**Step 4: Commit**

```bash
git add data-layer/src/repositories/task.repository.ts
git commit -m "feat(data-layer): add getTasksByDateRange to TaskRepository"
```

---

### Task 2: Backend — Add date-range route to tasks API

**Files:**
- Modify: `backend/src/routes/tasks.ts:7-22`

**Step 1: Add query param support to GET /tasks**

Modify the existing `GET /` route handler to check for `startDate` and `endDate` query params. If present, use the new `getTasksByDateRange`. If absent, fall back to `getAllTasks`.

Replace the `GET /` handler with:

```typescript
// Get all tasks (with optional date range filter)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    let tasks;
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate as string);
      end.setHours(23, 59, 59, 999);
      tasks = await TaskRepository.getTasksByDateRange(start, end);
    } else {
      tasks = await TaskRepository.getAllTasks();
    }

    res.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch tasks",
    });
  }
});
```

**Step 2: Verify backend compiles**

Run: `cd backend && npx tsc --noEmit`
Expected: No errors.

**Step 3: Commit**

```bash
git add backend/src/routes/tasks.ts
git commit -m "feat(backend): add date-range query support to GET /tasks"
```

---

### Task 3: Frontend — Add getTasksByDateRange to TaskService

**Files:**
- Modify: `client/src/app/services/task.service.ts`

**Step 1: Add the method**

Add this method to `TaskService` after `getOverdueTasks()`:

```typescript
getTasksByDateRange(startDate: string, endDate: string): Observable<ApiResponse<Task[]>> {
  return this.apiService.customGet<Task[]>(
    `${this.endpoint}?startDate=${startDate}&endDate=${endDate}`
  );
}
```

**Step 2: Commit**

```bash
git add client/src/app/services/task.service.ts
git commit -m "feat(client): add getTasksByDateRange to TaskService"
```

---

### Task 4: Frontend — Create DayCardComponent (dumb/presentational)

**Files:**
- Create: `client/src/app/components/day-card/day-card.component.ts`
- Create: `client/src/app/components/day-card/day-card.component.html`
- Create: `client/src/app/components/day-card/day-card.component.css`

**Step 1: Create the component TypeScript**

Create `client/src/app/components/day-card/day-card.component.ts`:

```typescript
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Task } from "@shared/models";

export interface WeekDay {
  day: string;
  date: number;
  fullDate: Date;
  isToday: boolean;
  dayOfWeek: string;
}

@Component({
  selector: "app-day-card",
  templateUrl: "./day-card.component.html",
  styleUrls: ["./day-card.component.css"],
  standalone: false,
})
export class DayCardComponent {
  @Input() day!: WeekDay;
  @Input() tasks: Task[] = [];
  @Output() dayClick = new EventEmitter<WeekDay>();
  @Output() taskClick = new EventEmitter<Task>();

  onDayAreaClick(event: MouseEvent): void {
    this.dayClick.emit(this.day);
  }

  onTaskClick(event: MouseEvent, task: Task): void {
    event.stopPropagation();
    this.taskClick.emit(task);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  getPriorityClass(priority: string): string {
    return `priority-${priority || "medium"}`;
  }
}
```

**Step 2: Create the component HTML**

Create `client/src/app/components/day-card/day-card.component.html`:

```html
<div
  class="day-card"
  [class.today]="day.isToday"
  [title]="formatDate(day.fullDate)"
  (click)="onDayAreaClick($event)"
>
  <div class="day-header">
    <span class="day-name">{{ day.dayOfWeek.substring(0, 3) }}</span>
    <span class="day-date" [class.current-date]="day.isToday">
      {{ day.date }}
    </span>
  </div>

  <div class="day-content">
    <div class="tasks-list" *ngIf="tasks.length > 0">
      <div
        *ngFor="let task of tasks"
        class="task-item"
        [class.completed]="task.status === 'completed'"
        (click)="onTaskClick($event, task)"
      >
        <span class="priority-dot" [ngClass]="getPriorityClass(task.priority)"></span>
        <span class="task-title">{{ task.title }}</span>
      </div>
    </div>
    <div class="empty-state" *ngIf="tasks.length === 0">
      <p *ngIf="day.isToday" class="today-label">TODAY</p>
      <p *ngIf="!day.isToday" class="no-tasks">No tasks</p>
    </div>
  </div>

  <div class="day-footer">
    <span class="month-indicator">
      {{ formatDate(day.fullDate).split(",")[1]?.trim() }}
    </span>
  </div>
</div>
```

**Step 3: Create the component CSS**

Create `client/src/app/components/day-card/day-card.component.css`:

```css
.day-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  min-height: 180px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  cursor: pointer;
}

.day-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
}

.day-card.today {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.day-card.today .day-name,
.day-card.today .day-date,
.day-card.today .month-indicator {
  color: white;
}

.day-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
}

.day-card.today .day-header {
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
}

.day-name {
  font-weight: 600;
  font-size: 14px;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.day-card.today .day-name {
  color: white;
}

.day-date {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  min-width: 40px;
  text-align: right;
}

.day-date.current-date {
  background: #667eea;
  color: white;
  border-radius: 8px;
  padding: 2px 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.day-card.today .day-date.current-date {
  background: rgba(255, 255, 255, 0.3);
}

/* Task List */
.day-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 80px;
  overflow-y: auto;
  max-height: 200px;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 13px;
}

.task-item:hover {
  background: rgba(102, 126, 234, 0.1);
}

.day-card.today .task-item:hover {
  background: rgba(255, 255, 255, 0.15);
}

.task-item.completed .task-title {
  text-decoration: line-through;
  opacity: 0.6;
}

.priority-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.priority-high {
  background: #dc3545;
}

.priority-medium {
  background: #fd7e14;
}

.priority-low {
  background: #28a745;
}

.task-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}

.day-card.today .task-title {
  color: white;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.today-label {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
}

.no-tasks {
  color: #999;
  font-size: 13px;
}

.day-card.today .no-tasks {
  color: rgba(255, 255, 255, 0.7);
}

/* Day Footer */
.day-footer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 2px solid #f0f0f0;
  text-align: center;
}

.day-card.today .day-footer {
  border-top: 2px solid rgba(255, 255, 255, 0.2);
}

.month-indicator {
  font-size: 11px;
  color: #999;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.day-card.today .month-indicator {
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .day-card {
    min-height: 160px;
    padding: 12px;
  }
  .day-date {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .day-card {
    min-height: 140px;
    padding: 10px;
  }
  .day-date {
    font-size: 18px;
  }
  .day-name {
    font-size: 12px;
  }
}
```

**Step 4: Commit**

```bash
git add client/src/app/components/day-card/
git commit -m "feat(client): create DayCardComponent for task display"
```

---

### Task 5: Frontend — Create TaskCreationDialogComponent

**Files:**
- Create: `client/src/app/components/task-creation-dialog/task-creation-dialog.component.ts`
- Create: `client/src/app/components/task-creation-dialog/task-creation-dialog.component.html`
- Create: `client/src/app/components/task-creation-dialog/task-creation-dialog.component.css`

**Step 1: Create the component TypeScript**

Create `client/src/app/components/task-creation-dialog/task-creation-dialog.component.ts`:

```typescript
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { AuthService } from "../../services/auth.service";
import { CreateTaskRequest, Task, JWTPayload } from "@shared/models";

@Component({
  selector: "app-task-creation-dialog",
  templateUrl: "./task-creation-dialog.component.html",
  styleUrls: ["./task-creation-dialog.component.css"],
  standalone: false,
})
export class TaskCreationDialogComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() selectedDate: Date = new Date();
  @Output() closed = new EventEmitter<void>();
  @Output() taskCreated = new EventEmitter<Task>();

  formData = {
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  };

  saving = false;
  errorMessage = "";
  successMessage = "";
  private currentUser: JWTPayload | null = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
  ) {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["isOpen"] && this.isOpen) {
      this.resetForm();
      this.formData.dueDate = this.formatDateForInput(this.selectedDate);
    }
  }

  get dialogTitle(): string {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "short" };
    return `Create Task - ${this.selectedDate.toLocaleDateString("en-US", options)}`;
  }

  onSubmit(): void {
    if (!this.formData.title.trim()) {
      this.errorMessage = "Please enter a task title";
      return;
    }

    if (!this.currentUser) {
      this.errorMessage = "You must be logged in to create tasks";
      return;
    }

    this.saving = true;
    this.errorMessage = "";

    const taskData: CreateTaskRequest = {
      userId: this.currentUser.id,
      title: this.formData.title.trim(),
      description: this.formData.description.trim() || undefined,
      priority: this.formData.priority as "low" | "medium" | "high",
      dueDate: this.formData.dueDate,
    };

    this.taskService.createTask(taskData).subscribe({
      next: (response) => {
        this.saving = false;
        if (response.success && response.data) {
          this.successMessage = "Task created!";
          this.taskCreated.emit(response.data);
          setTimeout(() => {
            this.successMessage = "";
            this.resetForm();
            this.formData.dueDate = this.formatDateForInput(this.selectedDate);
          }, 1500);
        }
      },
      error: (err) => {
        this.saving = false;
        this.errorMessage = err.message || "Failed to create task";
      },
    });
  }

  onClose(): void {
    this.closed.emit();
  }

  onBackdropClick(): void {
    this.onClose();
  }

  private resetForm(): void {
    this.formData = {
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    };
    this.errorMessage = "";
    this.successMessage = "";
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split("T")[0];
  }
}
```

**Step 2: Create the component HTML**

Create `client/src/app/components/task-creation-dialog/task-creation-dialog.component.html`:

```html
<div class="dialog-overlay" *ngIf="isOpen" (click)="onBackdropClick()">
  <div class="dialog-container" (click)="$event.stopPropagation()">
    <div class="dialog-header">
      <h2 class="dialog-title">{{ dialogTitle }}</h2>
      <button class="dialog-close-btn" (click)="onClose()" title="Close">
        ✕
      </button>
    </div>

    <div class="dialog-content">
      <div class="success-banner" *ngIf="successMessage">
        {{ successMessage }}
      </div>
      <div class="error-banner" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <div class="task-form">
        <div class="form-group">
          <label for="create-title">Task Title *</label>
          <input
            id="create-title"
            type="text"
            [(ngModel)]="formData.title"
            placeholder="Enter task title"
            class="form-input"
            autofocus
            (keyup.enter)="onSubmit()"
          />
        </div>

        <div class="form-group">
          <label for="create-description">Description</label>
          <textarea
            id="create-description"
            [(ngModel)]="formData.description"
            placeholder="Enter task description"
            class="form-textarea"
            rows="3"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="create-priority">Priority</label>
            <select
              id="create-priority"
              [(ngModel)]="formData.priority"
              class="form-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div class="form-group">
            <label for="create-duedate">Due Date</label>
            <input
              id="create-duedate"
              type="date"
              [(ngModel)]="formData.dueDate"
              class="form-input"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="dialog-actions">
      <button class="dialog-action-btn dialog-action-btn--secondary" (click)="onClose()">
        Close
      </button>
      <button
        class="dialog-action-btn dialog-action-btn--primary"
        (click)="onSubmit()"
        [disabled]="saving"
      >
        {{ saving ? "Creating..." : "Create Task" }}
      </button>
    </div>
  </div>
</div>
```

**Step 3: Create the component CSS**

Create `client/src/app/components/task-creation-dialog/task-creation-dialog.component.css`:

Copy the dialog styles from `client/src/app/components/dialog/dialog.component.css` (overlay, container, header, content, actions, form styles). Then add:

```css
.success-banner {
  background: #d4edda;
  color: #155724;
  padding: 10px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-weight: 500;
}

.error-banner {
  background: #f8d7da;
  color: #721c24;
  padding: 10px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-weight: 500;
}
```

**Step 4: Commit**

```bash
git add client/src/app/components/task-creation-dialog/
git commit -m "feat(client): create TaskCreationDialogComponent"
```

---

### Task 6: Frontend — Create TaskViewDialogComponent

**Files:**
- Create: `client/src/app/components/task-view-dialog/task-view-dialog.component.ts`
- Create: `client/src/app/components/task-view-dialog/task-view-dialog.component.html`
- Create: `client/src/app/components/task-view-dialog/task-view-dialog.component.css`

**Step 1: Create the component TypeScript**

Create `client/src/app/components/task-view-dialog/task-view-dialog.component.ts`:

```typescript
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { DialogService } from "../../services/dialog.service";
import { Task } from "@shared/models";

@Component({
  selector: "app-task-view-dialog",
  templateUrl: "./task-view-dialog.component.html",
  styleUrls: ["./task-view-dialog.component.css"],
  standalone: false,
})
export class TaskViewDialogComponent {
  @Input() isOpen = false;
  @Input() task: Task | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() editRequested = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();

  deleting = false;
  toggling = false;

  constructor(
    private taskService: TaskService,
    private dialogService: DialogService,
  ) {}

  onClose(): void {
    this.closed.emit();
  }

  onBackdropClick(): void {
    this.onClose();
  }

  onEdit(): void {
    if (this.task) {
      this.editRequested.emit(this.task);
    }
  }

  onToggleComplete(): void {
    if (!this.task) return;
    this.toggling = true;

    const newStatus = this.task.status === "completed" ? "pending" : "completed";
    const completedAt = newStatus === "completed" ? new Date().toISOString() : null;

    this.taskService.updateTask(this.task.id, { status: newStatus, completedAt }).subscribe({
      next: (response) => {
        this.toggling = false;
        if (response.success && response.data) {
          this.taskUpdated.emit(response.data);
        }
      },
      error: () => {
        this.toggling = false;
        this.dialogService.error("Error", "Failed to update task status");
      },
    });
  }

  onDelete(): void {
    if (!this.task) return;

    this.dialogService.confirm("Delete Task", `Are you sure you want to delete "${this.task.title}"?`).subscribe((confirmed) => {
      if (confirmed && this.task) {
        this.deleting = true;
        this.taskService.deleteTask(this.task.id).subscribe({
          next: () => {
            this.deleting = false;
            this.taskDeleted.emit(this.task!);
          },
          error: () => {
            this.deleting = false;
            this.dialogService.error("Error", "Failed to delete task");
          },
        });
      }
    });
  }

  getPriorityClass(priority: string): string {
    return `priority-badge priority-${priority || "medium"}`;
  }

  getStatusClass(status: string): string {
    return `status-badge status-${status || "pending"}`;
  }
}
```

**Step 2: Create the component HTML**

Create `client/src/app/components/task-view-dialog/task-view-dialog.component.html`:

```html
<div class="dialog-overlay" *ngIf="isOpen && task" (click)="onBackdropClick()">
  <div class="dialog-container" (click)="$event.stopPropagation()">
    <div class="dialog-header">
      <h2 class="dialog-title">{{ task.title }}</h2>
      <button class="dialog-close-btn" (click)="onClose()" title="Close">
        ✕
      </button>
    </div>

    <div class="dialog-content">
      <div class="task-detail">
        <div class="detail-row">
          <span class="detail-label">Status</span>
          <span [ngClass]="getStatusClass(task.status)">{{ task.status }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Priority</span>
          <span [ngClass]="getPriorityClass(task.priority)">{{ task.priority }}</span>
        </div>
        <div class="detail-row" *ngIf="task.dueDate">
          <span class="detail-label">Due Date</span>
          <span>{{ task.dueDate | date: "mediumDate" }}</span>
        </div>
        <div class="detail-row" *ngIf="task.description">
          <span class="detail-label">Description</span>
          <p class="task-description">{{ task.description }}</p>
        </div>
        <div class="detail-row" *ngIf="task.completedAt">
          <span class="detail-label">Completed</span>
          <span>{{ task.completedAt | date: "medium" }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Created</span>
          <span>{{ task.createdAt | date: "medium" }}</span>
        </div>
      </div>
    </div>

    <div class="dialog-actions">
      <button
        class="dialog-action-btn dialog-action-btn--danger"
        (click)="onDelete()"
        [disabled]="deleting"
      >
        {{ deleting ? "Deleting..." : "Delete" }}
      </button>
      <button
        class="dialog-action-btn dialog-action-btn--secondary"
        (click)="onToggleComplete()"
        [disabled]="toggling"
      >
        {{ task.status === "completed" ? "Mark Pending" : "Mark Complete" }}
      </button>
      <button class="dialog-action-btn dialog-action-btn--primary" (click)="onEdit()">
        Edit
      </button>
    </div>
  </div>
</div>
```

**Step 3: Create the component CSS**

Create `client/src/app/components/task-view-dialog/task-view-dialog.component.css`:

Copy the base dialog styles from `dialog.component.css`. Then add:

```css
.task-detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 12px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.task-description {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

.priority-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
  width: fit-content;
}

.priority-high {
  background: #f8d7da;
  color: #721c24;
}

.priority-medium {
  background: #fff3cd;
  color: #856404;
}

.priority-low {
  background: #d4edda;
  color: #155724;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  text-transform: capitalize;
  width: fit-content;
}

.status-pending {
  background: #fff3cd;
  color: #856404;
}

.status-in-progress {
  background: #cce5ff;
  color: #004085;
}

.status-completed {
  background: #d4edda;
  color: #155724;
}
```

**Step 4: Commit**

```bash
git add client/src/app/components/task-view-dialog/
git commit -m "feat(client): create TaskViewDialogComponent"
```

---

### Task 7: Frontend — Create TaskEditDialogComponent

**Files:**
- Create: `client/src/app/components/task-edit-dialog/task-edit-dialog.component.ts`
- Create: `client/src/app/components/task-edit-dialog/task-edit-dialog.component.html`
- Create: `client/src/app/components/task-edit-dialog/task-edit-dialog.component.css`

**Step 1: Create the component TypeScript**

Create `client/src/app/components/task-edit-dialog/task-edit-dialog.component.ts`:

```typescript
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { DialogService } from "../../services/dialog.service";
import { Task, UpdateTaskRequest } from "@shared/models";

@Component({
  selector: "app-task-edit-dialog",
  templateUrl: "./task-edit-dialog.component.html",
  styleUrls: ["./task-edit-dialog.component.css"],
  standalone: false,
})
export class TaskEditDialogComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() task: Task | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<Task>();

  formData = {
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    dueDate: "",
  };

  saving = false;
  errorMessage = "";

  constructor(
    private taskService: TaskService,
    private dialogService: DialogService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["task"] && this.task) {
      this.formData = {
        title: this.task.title,
        description: this.task.description || "",
        priority: this.task.priority,
        status: this.task.status,
        dueDate: this.task.dueDate
          ? new Date(this.task.dueDate).toISOString().split("T")[0]
          : "",
      };
      this.errorMessage = "";
    }
  }

  onSubmit(): void {
    if (!this.formData.title.trim()) {
      this.errorMessage = "Please enter a task title";
      return;
    }

    if (!this.task) return;

    this.saving = true;
    this.errorMessage = "";

    const updateData: UpdateTaskRequest = {
      title: this.formData.title.trim(),
      description: this.formData.description.trim() || undefined,
      priority: this.formData.priority as "low" | "medium" | "high",
      status: this.formData.status as "pending" | "in-progress" | "completed",
      dueDate: this.formData.dueDate || null,
      completedAt: this.formData.status === "completed" ? new Date().toISOString() : null,
    };

    this.taskService.updateTask(this.task.id, updateData).subscribe({
      next: (response) => {
        this.saving = false;
        if (response.success && response.data) {
          this.taskUpdated.emit(response.data);
        }
      },
      error: (err) => {
        this.saving = false;
        this.errorMessage = err.message || "Failed to update task";
      },
    });
  }

  onClose(): void {
    this.closed.emit();
  }

  onBackdropClick(): void {
    this.onClose();
  }
}
```

**Step 2: Create the component HTML**

Create `client/src/app/components/task-edit-dialog/task-edit-dialog.component.html`:

```html
<div class="dialog-overlay" *ngIf="isOpen && task" (click)="onBackdropClick()">
  <div class="dialog-container" (click)="$event.stopPropagation()">
    <div class="dialog-header">
      <h2 class="dialog-title">Edit Task</h2>
      <button class="dialog-close-btn" (click)="onClose()" title="Close">
        ✕
      </button>
    </div>

    <div class="dialog-content">
      <div class="error-banner" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <div class="task-form">
        <div class="form-group">
          <label for="edit-title">Task Title *</label>
          <input
            id="edit-title"
            type="text"
            [(ngModel)]="formData.title"
            placeholder="Enter task title"
            class="form-input"
            (keyup.enter)="onSubmit()"
          />
        </div>

        <div class="form-group">
          <label for="edit-description">Description</label>
          <textarea
            id="edit-description"
            [(ngModel)]="formData.description"
            placeholder="Enter task description"
            class="form-textarea"
            rows="3"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="edit-priority">Priority</label>
            <select
              id="edit-priority"
              [(ngModel)]="formData.priority"
              class="form-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div class="form-group">
            <label for="edit-status">Status</label>
            <select
              id="edit-status"
              [(ngModel)]="formData.status"
              class="form-select"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="edit-duedate">Due Date</label>
          <input
            id="edit-duedate"
            type="date"
            [(ngModel)]="formData.dueDate"
            class="form-input"
          />
        </div>
      </div>
    </div>

    <div class="dialog-actions">
      <button class="dialog-action-btn dialog-action-btn--secondary" (click)="onClose()">
        Cancel
      </button>
      <button
        class="dialog-action-btn dialog-action-btn--primary"
        (click)="onSubmit()"
        [disabled]="saving"
      >
        {{ saving ? "Saving..." : "Save Changes" }}
      </button>
    </div>
  </div>
</div>
```

**Step 3: Create the component CSS**

Create `client/src/app/components/task-edit-dialog/task-edit-dialog.component.css`:

Same dialog base styles from `dialog.component.css`, plus the `.error-banner` from task-creation-dialog.

**Step 4: Commit**

```bash
git add client/src/app/components/task-edit-dialog/
git commit -m "feat(client): create TaskEditDialogComponent"
```

---

### Task 8: Frontend — Refactor WeeklyBoardComponent to orchestrate everything

**Files:**
- Modify: `client/src/app/components/weekly-board/weekly-board.component.ts`
- Modify: `client/src/app/components/weekly-board/weekly-board.component.html`
- Modify: `client/src/app/components/weekly-board/weekly-board.component.css`

**Step 1: Rewrite weekly-board.component.ts**

Replace the entire file with:

```typescript
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TaskService } from "../../services/task.service";
import { Task } from "@shared/models";
import { WeekDay } from "../day-card/day-card.component";

@Component({
  selector: "app-weekly-board",
  templateUrl: "./weekly-board.component.html",
  styleUrls: ["./weekly-board.component.css"],
  standalone: false,
})
export class WeeklyBoardComponent implements OnInit, OnDestroy {
  weekDays: WeekDay[] = [];
  currentDate: Date = new Date();
  weekStartDate: Date = new Date();
  monthYear: string = "";
  tasksByDate: Map<string, Task[]> = new Map();
  loadError = false;

  // Dialog state
  showCreateDialog = false;
  showViewDialog = false;
  showEditDialog = false;
  selectedDate: Date = new Date();
  selectedTask: Task | null = null;

  private destroy$ = new Subject<void>();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.generateWeekDays();
    this.fetchTasksForWeek();
  }

  getTasksForDay(day: WeekDay): Task[] {
    const key = this.dateToKey(day.fullDate);
    return this.tasksByDate.get(key) || [];
  }

  nextWeek(): void {
    this.currentDate = new Date(this.weekStartDate);
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.generateWeekDays();
    this.fetchTasksForWeek();
  }

  previousWeek(): void {
    this.currentDate = new Date(this.weekStartDate);
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.generateWeekDays();
    this.fetchTasksForWeek();
  }

  goToToday(): void {
    this.currentDate = new Date();
    this.generateWeekDays();
    this.fetchTasksForWeek();
  }

  onDayClick(day: WeekDay): void {
    this.selectedDate = day.fullDate;
    this.showCreateDialog = true;
  }

  onTaskClick(task: Task): void {
    this.selectedTask = task;
    this.showViewDialog = true;
  }

  onCreateDialogClose(): void {
    this.showCreateDialog = false;
  }

  onTaskCreated(task: Task): void {
    this.fetchTasksForWeek();
  }

  onViewDialogClose(): void {
    this.showViewDialog = false;
    this.selectedTask = null;
  }

  onEditRequested(task: Task): void {
    this.showViewDialog = false;
    this.selectedTask = task;
    this.showEditDialog = true;
  }

  onTaskDeleted(task: Task): void {
    this.showViewDialog = false;
    this.selectedTask = null;
    this.fetchTasksForWeek();
  }

  onTaskUpdatedFromView(task: Task): void {
    this.selectedTask = task;
    this.fetchTasksForWeek();
  }

  onEditDialogClose(): void {
    this.showEditDialog = false;
    this.selectedTask = null;
  }

  onTaskUpdated(task: Task): void {
    this.showEditDialog = false;
    this.selectedTask = null;
    this.fetchTasksForWeek();
  }

  retryFetch(): void {
    this.loadError = false;
    this.fetchTasksForWeek();
  }

  private generateWeekDays(): void {
    const reference = new Date(this.currentDate);
    const currentDayOfWeek = reference.getDay();
    const diff = reference.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1);
    const weekStart = new Date(reference);
    weekStart.setDate(diff);

    this.weekStartDate = new Date(weekStart);
    this.weekDays = [];

    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);

      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      this.weekDays.push({
        day: dayNames[i],
        date: date.getDate(),
        fullDate: new Date(date),
        isToday,
        dayOfWeek: dayNames[i],
      });
    }

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    this.monthYear = `${monthNames[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
  }

  private fetchTasksForWeek(): void {
    const startDate = this.formatDateForApi(this.weekDays[0].fullDate);
    const endDate = this.formatDateForApi(this.weekDays[6].fullDate);

    this.taskService
      .getTasksByDateRange(startDate, endDate)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.loadError = false;
          const tasks = response.data || [];
          this.tasksByDate = new Map();
          for (const task of tasks) {
            if (task.dueDate) {
              const key = this.dateToKey(new Date(task.dueDate));
              const existing = this.tasksByDate.get(key) || [];
              existing.push(task);
              this.tasksByDate.set(key, existing);
            }
          }
        },
        error: () => {
          this.loadError = true;
        },
      });
  }

  private dateToKey(date: Date): string {
    return new Date(date).toISOString().split("T")[0];
  }

  private formatDateForApi(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

**Step 2: Rewrite weekly-board.component.html**

Replace the entire file with:

```html
<div class="weekly-board-container">
  <div class="weekly-board-header">
    <div class="header-title">
      <h2>{{ monthYear }}</h2>
      <button class="today-btn" (click)="goToToday()" title="Go to current week">
        Today
      </button>
    </div>
    <div class="header-controls">
      <button class="nav-btn prev" (click)="previousWeek()" title="Previous week">
        <span>&larr;</span>
      </button>
      <span class="week-range">
        {{ weekDays[0]?.date }} - {{ weekDays[6]?.date }}
      </span>
      <button class="nav-btn next" (click)="nextWeek()" title="Next week">
        <span>&rarr;</span>
      </button>
    </div>
  </div>

  <div class="error-banner" *ngIf="loadError">
    Failed to load tasks.
    <button class="retry-btn" (click)="retryFetch()">Retry</button>
  </div>

  <div class="weekly-board">
    <app-day-card
      *ngFor="let day of weekDays"
      [day]="day"
      [tasks]="getTasksForDay(day)"
      (dayClick)="onDayClick($event)"
      (taskClick)="onTaskClick($event)"
    ></app-day-card>
  </div>
</div>

<app-task-creation-dialog
  [isOpen]="showCreateDialog"
  [selectedDate]="selectedDate"
  (closed)="onCreateDialogClose()"
  (taskCreated)="onTaskCreated($event)"
></app-task-creation-dialog>

<app-task-view-dialog
  [isOpen]="showViewDialog"
  [task]="selectedTask"
  (closed)="onViewDialogClose()"
  (editRequested)="onEditRequested($event)"
  (taskDeleted)="onTaskDeleted($event)"
  (taskUpdated)="onTaskUpdatedFromView($event)"
></app-task-view-dialog>

<app-task-edit-dialog
  [isOpen]="showEditDialog"
  [task]="selectedTask"
  (closed)="onEditDialogClose()"
  (taskUpdated)="onTaskUpdated($event)"
></app-task-edit-dialog>
```

**Step 3: Add error banner styles to weekly-board.component.css**

Add to the existing CSS file:

```css
.error-banner {
  background: rgba(220, 53, 69, 0.2);
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.retry-btn {
  background: white;
  color: #dc3545;
  border: none;
  padding: 6px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
```

**Step 4: Commit**

```bash
git add client/src/app/components/weekly-board/
git commit -m "feat(client): refactor WeeklyBoardComponent to orchestrate dialogs and display tasks"
```

---

### Task 9: Frontend — Register all new components in AppModule

**Files:**
- Modify: `client/src/app/app.module.ts`

**Step 1: Update AppModule**

Add imports and declarations for all new components:

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { UserService } from "./services/user.service";
import { TaskService } from "./services/task.service";
import { AuthService } from "./services/auth.service";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { LoginComponent } from "./components/login.component";
import { SignupComponent } from "./components/signup.component";
import { WeeklyBoardComponent } from "./components/weekly-board/weekly-board.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { DayCardComponent } from "./components/day-card/day-card.component";
import { TaskCreationDialogComponent } from "./components/task-creation-dialog/task-creation-dialog.component";
import { TaskViewDialogComponent } from "./components/task-view-dialog/task-view-dialog.component";
import { TaskEditDialogComponent } from "./components/task-edit-dialog/task-edit-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    WeeklyBoardComponent,
    DialogComponent,
    DayCardComponent,
    TaskCreationDialogComponent,
    TaskViewDialogComponent,
    TaskEditDialogComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    LoginComponent,
    SignupComponent,
  ],
  providers: [
    UserService,
    TaskService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

**Step 2: Verify the Angular app compiles**

Run: `cd client && npx ng build --configuration=development 2>&1 | head -20`
Expected: Build succeeds or shows only warnings (not errors).

**Step 3: Commit**

```bash
git add client/src/app/app.module.ts
git commit -m "feat(client): register all new weekly board components in AppModule"
```

---

### Task 10: Manual integration test

**Step 1: Start MongoDB**

Ensure MongoDB is running locally.

**Step 2: Start the backend**

Run: `cd backend && npm run dev`
Expected: Server starts on port 3000.

**Step 3: Start the Angular app**

Run: `cd client && ng serve`
Expected: App starts on port 4200.

**Step 4: Test the flow**

1. Log in with existing credentials
2. Weekly board should display with 7 day cards
3. Navigate weeks with arrows — verify tasks load per week
4. Click an empty day card — creation dialog opens
5. Create a task — form resets, dialog stays open for another
6. Close dialog — task appears on the day card
7. Click the task on the day card — view dialog opens
8. Click "Edit" — edit dialog opens with pre-filled data
9. Save changes — verify task updates on the board
10. Delete a task — verify it disappears from the board

**Step 5: Commit any fixes needed**

```bash
git add -A
git commit -m "fix: integration test fixes for weekly board"
```
