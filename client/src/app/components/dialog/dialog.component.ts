import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DialogAction, DialogConfig } from "src/app/modle/dialog";
import { DialogService } from "src/app/services/dialog.service";

interface DialogState {
  isOpen: boolean;
  config: DialogConfig;
}

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
  standalone: false,
})
export class DialogComponent implements OnInit, OnDestroy {
  isOpen = false;
  config: DialogConfig = {};
  actions: DialogAction[] = [];
  taskFormData: any = {
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  };

  private destroy$ = new Subject<void>();

  constructor(private dialogService: DialogService) {}

  ngOnInit(): void {
    this.dialogService
      .getDialogState()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state: DialogState) => {
        this.isOpen = state.isOpen;
        this.config = state.config;
        this.actions = state.config.actions || [];

        // If data contains formData, sync it
        if (state.config.data && state.config.data.formData) {
          this.taskFormData = state.config.data.formData;
        }
      });
  }

  close(): void {
    if (this.config.canClose !== false) {
      this.dialogService.close();
    }
  }

  onBackdropClick(): void {
    if (this.config.closeOnBackdropClick !== false) {
      this.close();
    }
  }

  /**
   * Handle action button click
   */
  onActionClick(action: DialogAction): void {
    if (action.callback) {
      action.callback(this.config.data);
    }
  }

  /**
   * Get action button class
   */
  getActionButtonClass(action: DialogAction): string {
    const baseClass = "dialog-action-btn";
    const typeClass = `dialog-action-btn--${action.type || "primary"}`;
    return `${baseClass} ${typeClass}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
