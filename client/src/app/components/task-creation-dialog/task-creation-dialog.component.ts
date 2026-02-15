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
