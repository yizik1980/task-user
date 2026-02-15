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
