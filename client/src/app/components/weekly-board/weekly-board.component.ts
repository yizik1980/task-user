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
