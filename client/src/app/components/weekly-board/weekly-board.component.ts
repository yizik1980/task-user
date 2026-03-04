import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from "@angular/core";
import { Task } from "@shared/models";
import { WeekDay } from "../day-card/day-card.component";

@Component({
  selector: "app-weekly-board",
  templateUrl: "./weekly-board.component.html",
  styleUrls: ["./weekly-board.component.css"],
  standalone: false,
})
export class WeeklyBoardComponent implements OnInit, OnChanges {
  @Input() tasks: Task[] = [];
  @Output() tasksChanged = new EventEmitter<void>();

  weekDays: WeekDay[] = [];
  currentDate: Date = new Date();
  weekStartDate: Date = new Date();
  monthYear: string = "";
  tasksByDate: Map<string, Task[]> = new Map();

  // Dialog state
  showCreateDialog = false;
  showViewDialog = false;
  showEditDialog = false;
  selectedDate: Date = new Date();
  selectedTask: Task | null = null;

  ngOnInit(): void {
    this.generateWeekDays();
    this.filterTasksForWeek();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["tasks"]) {
      this.filterTasksForWeek();
    }
  }

  getTasksForDay(day: WeekDay): Task[] {
    const key = this.dateToKey(day.fullDate);
    return this.tasksByDate.get(key) || [];
  }

  nextWeek(): void {
    this.currentDate = new Date(this.weekStartDate);
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.generateWeekDays();
    this.filterTasksForWeek();
  }

  previousWeek(): void {
    this.currentDate = new Date(this.weekStartDate);
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.generateWeekDays();
    this.filterTasksForWeek();
  }

  goToToday(): void {
    this.currentDate = new Date();
    this.generateWeekDays();
    this.filterTasksForWeek();
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
    this.tasksChanged.emit();
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
    this.tasksChanged.emit();
  }

  onTaskUpdatedFromView(task: Task): void {
    this.selectedTask = task;
    this.tasksChanged.emit();
  }

  onEditDialogClose(): void {
    this.showEditDialog = false;
    this.selectedTask = null;
  }

  onTaskUpdated(task: Task): void {
    this.showEditDialog = false;
    this.selectedTask = null;
    this.tasksChanged.emit();
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

  private filterTasksForWeek(): void {
    if (!this.weekDays.length) return;

    const weekStart = this.dateToKey(this.weekDays[0].fullDate);
    const weekEnd = this.dateToKey(this.weekDays[6].fullDate);

    this.tasksByDate = new Map();
    for (const task of this.tasks) {
      if (task.dueDate) {
        const key = this.dateToKey(new Date(task.dueDate));
        if (key >= weekStart && key <= weekEnd) {
          const existing = this.tasksByDate.get(key) || [];
          existing.push(task);
          this.tasksByDate.set(key, existing);
        }
      }
    }
  }

  private dateToKey(date: Date): string {
    return new Date(date).toISOString().split("T")[0];
  }
}
