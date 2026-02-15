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
