import { CommonModule } from "@angular/common";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
export interface TaskFormData {
  title: string;
  description: string;
  priority: string;
  dueDate: string;
  selectedDate: Date;
}

@Component({
  selector: "app-task-form",
  templateUrl: "./task-form.component.html",
  styleUrls: ["./task-form.component.css"],
  imports: [FormsModule],
  standalone: false,
})
export class TaskFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<TaskFormData>();

  formData: TaskFormData = {
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    selectedDate: new Date(),
  };

  selectedDate: Date = new Date();
  minDate: string = "";

  constructor() {}

  ngOnInit(): void {
    this.selectedDate = this.formData.selectedDate;
    this.minDate = this.getCurrentDateString();
    this.formData.dueDate = this.getCurrentDateString();
  }

  private getCurrentDateString(): string {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  validateForm(): boolean {
    if (!this.formData.title || this.formData.title.trim() === "") {
      return false;
    }
    return true;
  }

  getFormData(): TaskFormData {
    return this.formData;
  }
}
