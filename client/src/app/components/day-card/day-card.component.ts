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
