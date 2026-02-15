import {
  DialogService,
  TaskService,
  UserService
} from "./chunk-CRENEFZN.js";
import {
  AuthService,
  CommonModule,
  DatePipe,
  DefaultValueAccessor,
  EventEmitter,
  FormsModule,
  NgClass,
  NgControlStatus,
  NgForOf,
  NgIf,
  NgModel,
  NgSelectOption,
  Router,
  RouterModule,
  SelectControlValueAccessor,
  Subject,
  takeUntil,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6V5F7FDL.js";

// src/app/components/day-card/day-card.component.ts
function DayCardComponent_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275listener("click", function DayCardComponent_div_7_div_1_Template_div_click_0_listener($event) {
      const task_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onTaskClick($event, task_r2));
    });
    \u0275\u0275element(1, "span", 12);
    \u0275\u0275elementStart(2, "span", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("completed", task_r2.status === "completed");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r2.getPriorityClass(task_r2.priority));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r2.title);
  }
}
function DayCardComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275template(1, DayCardComponent_div_7_div_1_Template, 4, 4, "div", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.tasks);
  }
}
function DayCardComponent_div_8_p_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "TODAY");
    \u0275\u0275elementEnd();
  }
}
function DayCardComponent_div_8_p_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1, "No tasks");
    \u0275\u0275elementEnd();
  }
}
function DayCardComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275template(1, DayCardComponent_div_8_p_1_Template, 2, 0, "p", 15)(2, DayCardComponent_div_8_p_2_Template, 2, 0, "p", 16);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.day.isToday);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r2.day.isToday);
  }
}
var DayCardComponent = class _DayCardComponent {
  constructor() {
    this.tasks = [];
    this.dayClick = new EventEmitter();
    this.taskClick = new EventEmitter();
  }
  onDayAreaClick(event) {
    this.dayClick.emit(this.day);
  }
  onTaskClick(event, task) {
    event.stopPropagation();
    this.taskClick.emit(task);
  }
  formatDate(date) {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  }
  getPriorityClass(priority) {
    return `priority-${priority || "medium"}`;
  }
  static {
    this.\u0275fac = function DayCardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DayCardComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DayCardComponent, selectors: [["app-day-card"]], inputs: { day: "day", tasks: "tasks" }, outputs: { dayClick: "dayClick", taskClick: "taskClick" }, decls: 13, vars: 13, consts: [[1, "day-card", 3, "click", "title"], [1, "day-header"], [1, "day-name"], [1, "day-date"], [1, "day-content"], ["class", "tasks-list", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "day-footer"], [1, "month-indicator"], [1, "tasks-list"], ["class", "task-item", 3, "completed", "click", 4, "ngFor", "ngForOf"], [1, "task-item", 3, "click"], [1, "priority-dot", 3, "ngClass"], [1, "task-title"], [1, "empty-state"], ["class", "today-label", 4, "ngIf"], ["class", "no-tasks", 4, "ngIf"], [1, "today-label"], [1, "no-tasks"]], template: function DayCardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275listener("click", function DayCardComponent_Template_div_click_0_listener($event) {
          return ctx.onDayAreaClick($event);
        });
        \u0275\u0275elementStart(1, "div", 1)(2, "span", 2);
        \u0275\u0275text(3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 4);
        \u0275\u0275template(7, DayCardComponent_div_7_Template, 2, 1, "div", 5)(8, DayCardComponent_div_8_Template, 3, 2, "div", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 7)(10, "span", 8);
        \u0275\u0275text(11);
        \u0275\u0275pipe(12, "date");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275classProp("today", ctx.day.isToday);
        \u0275\u0275property("title", ctx.formatDate(ctx.day.fullDate));
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.day.dayOfWeek.substring(0, 3));
        \u0275\u0275advance();
        \u0275\u0275classProp("current-date", ctx.day.isToday);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.day.date, " ");
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.tasks.length > 0);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.tasks.length === 0);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(12, 10, ctx.formatDate(ctx.day.fullDate), "MMM"), " ");
      }
    }, dependencies: [NgClass, NgForOf, NgIf, DatePipe], styles: ["\n\n.day-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  min-height: 180px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n  border: 2px solid transparent;\n  position: relative;\n  cursor: pointer;\n}\n.day-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-6px) scale(1.02);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);\n}\n.day-card.today[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border-color: rgba(255, 255, 255, 0.3);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);\n}\n.day-card.today[_ngcontent-%COMP%]   .day-name[_ngcontent-%COMP%], \n.day-card.today[_ngcontent-%COMP%]   .day-date[_ngcontent-%COMP%], \n.day-card.today[_ngcontent-%COMP%]   .month-indicator[_ngcontent-%COMP%] {\n  color: white;\n}\n.day-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n  padding-bottom: 12px;\n  border-bottom: 2px solid #f0f0f0;\n}\n.day-card.today[_ngcontent-%COMP%]   .day-header[_ngcontent-%COMP%] {\n  border-bottom: 2px solid rgba(255, 255, 255, 0.2);\n}\n.day-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  color: #667eea;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.day-card.today[_ngcontent-%COMP%]   .day-name[_ngcontent-%COMP%] {\n  color: white;\n}\n.day-date[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  color: #333;\n  min-width: 40px;\n  text-align: right;\n}\n.day-date.current-date[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n  border-radius: 8px;\n  padding: 2px 8px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.day-card.today[_ngcontent-%COMP%]   .day-date.current-date[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.3);\n}\n.day-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 80px;\n  overflow-y: auto;\n  max-height: 200px;\n}\n.tasks-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.task-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 4px 8px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: background 0.2s ease;\n  font-size: 13px;\n}\n.task-item[_ngcontent-%COMP%]:hover {\n  background: rgba(102, 126, 234, 0.1);\n}\n.day-card.today[_ngcontent-%COMP%]   .task-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15);\n}\n.task-item.completed[_ngcontent-%COMP%]   .task-title[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  opacity: 0.6;\n}\n.priority-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.priority-high[_ngcontent-%COMP%] {\n  background: #dc3545;\n}\n.priority-medium[_ngcontent-%COMP%] {\n  background: #fd7e14;\n}\n.priority-low[_ngcontent-%COMP%] {\n  background: #28a745;\n}\n.task-title[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: #333;\n}\n.day-card.today[_ngcontent-%COMP%]   .task-title[_ngcontent-%COMP%] {\n  color: white;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex: 1;\n}\n.today-label[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.25);\n  color: white;\n  padding: 8px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: bold;\n  letter-spacing: 1px;\n}\n.no-tasks[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 13px;\n}\n.day-card.today[_ngcontent-%COMP%]   .no-tasks[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.7);\n}\n.day-footer[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  padding-top: 12px;\n  border-top: 2px solid #f0f0f0;\n  text-align: center;\n}\n.day-card.today[_ngcontent-%COMP%]   .day-footer[_ngcontent-%COMP%] {\n  border-top: 2px solid rgba(255, 255, 255, 0.2);\n}\n.month-indicator[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #999;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.day-card.today[_ngcontent-%COMP%]   .month-indicator[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n}\n@media (max-width: 768px) {\n  .day-card[_ngcontent-%COMP%] {\n    min-height: 160px;\n    padding: 12px;\n  }\n  .day-date[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n@media (max-width: 480px) {\n  .day-card[_ngcontent-%COMP%] {\n    min-height: 140px;\n    padding: 10px;\n  }\n  .day-date[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .day-name[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n/*# sourceMappingURL=day-card.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DayCardComponent, { className: "DayCardComponent", filePath: "src\\app\\components\\day-card\\day-card.component.ts", lineNumber: 18 });
})();

// src/app/components/task-creation-dialog/task-creation-dialog.component.ts
function TaskCreationDialogComponent_div_0_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.successMessage, " ");
  }
}
function TaskCreationDialogComponent_div_0_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage, " ");
  }
}
function TaskCreationDialogComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function TaskCreationDialogComponent_div_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackdropClick());
    });
    \u0275\u0275elementStart(1, "div", 2);
    \u0275\u0275listener("click", function TaskCreationDialogComponent_div_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 3)(3, "h2", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 5);
    \u0275\u0275listener("click", function TaskCreationDialogComponent_div_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275text(6, " \u2715 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 6);
    \u0275\u0275template(8, TaskCreationDialogComponent_div_0_div_8_Template, 2, 1, "div", 7)(9, TaskCreationDialogComponent_div_0_div_9_Template, 2, 1, "div", 8);
    \u0275\u0275elementStart(10, "div", 9)(11, "div", 10)(12, "label", 11);
    \u0275\u0275text(13, "Task Title *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function TaskCreationDialogComponent_div_0_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.title, $event) || (ctx_r1.formData.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function TaskCreationDialogComponent_div_0_Template_input_keyup_enter_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 10)(16, "label", 13);
    \u0275\u0275text(17, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "textarea", 14);
    \u0275\u0275twoWayListener("ngModelChange", function TaskCreationDialogComponent_div_0_Template_textarea_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.description, $event) || (ctx_r1.formData.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 15)(20, "div", 10)(21, "label", 16);
    \u0275\u0275text(22, "Priority");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "select", 17);
    \u0275\u0275twoWayListener("ngModelChange", function TaskCreationDialogComponent_div_0_Template_select_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.priority, $event) || (ctx_r1.formData.priority = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(24, "option", 18);
    \u0275\u0275text(25, "Low");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 19);
    \u0275\u0275text(27, "Medium");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "option", 20);
    \u0275\u0275text(29, "High");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "div", 10)(31, "label", 21);
    \u0275\u0275text(32, "Due Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "input", 22);
    \u0275\u0275twoWayListener("ngModelChange", function TaskCreationDialogComponent_div_0_Template_input_ngModelChange_33_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.dueDate, $event) || (ctx_r1.formData.dueDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(34, "div", 23)(35, "button", 24);
    \u0275\u0275listener("click", function TaskCreationDialogComponent_div_0_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275text(36, " Close ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 25);
    \u0275\u0275listener("click", function TaskCreationDialogComponent_div_0_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.dialogTitle);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.successMessage);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.errorMessage);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.priority);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.dueDate);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving ? "Creating..." : "Create Task", " ");
  }
}
var TaskCreationDialogComponent = class _TaskCreationDialogComponent {
  constructor(taskService, authService) {
    this.taskService = taskService;
    this.authService = authService;
    this.isOpen = false;
    this.selectedDate = /* @__PURE__ */ new Date();
    this.closed = new EventEmitter();
    this.taskCreated = new EventEmitter();
    this.formData = {
      title: "",
      description: "",
      priority: "medium",
      dueDate: ""
    };
    this.saving = false;
    this.errorMessage = "";
    this.successMessage = "";
    this.currentUser = null;
    this.destroy$ = new Subject();
    this.authService.getCurrentUser().pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.currentUser = user;
    });
  }
  ngOnChanges(changes) {
    if (changes["isOpen"] && this.isOpen) {
      this.resetForm();
      this.formData.dueDate = this.formatDateForInput(this.selectedDate);
    }
  }
  get dialogTitle() {
    const options = { weekday: "long", day: "numeric", month: "short" };
    return `Create Task - ${this.selectedDate.toLocaleDateString("en-US", options)}`;
  }
  onSubmit() {
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
    const taskData = {
      userId: this.currentUser.id,
      title: this.formData.title.trim(),
      description: this.formData.description.trim() || void 0,
      priority: this.formData.priority,
      dueDate: this.formData.dueDate
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
      }
    });
  }
  onClose() {
    this.closed.emit();
  }
  onBackdropClick() {
    this.onClose();
  }
  resetForm() {
    this.formData = {
      title: "",
      description: "",
      priority: "medium",
      dueDate: ""
    };
    this.errorMessage = "";
    this.successMessage = "";
  }
  formatDateForInput(date) {
    return date.toISOString().split("T")[0];
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.\u0275fac = function TaskCreationDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TaskCreationDialogComponent)(\u0275\u0275directiveInject(TaskService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaskCreationDialogComponent, selectors: [["app-task-creation-dialog"]], inputs: { isOpen: "isOpen", selectedDate: "selectedDate" }, outputs: { closed: "closed", taskCreated: "taskCreated" }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "dialog-overlay", 3, "click", 4, "ngIf"], [1, "dialog-overlay", 3, "click"], [1, "dialog-container", 3, "click"], [1, "dialog-header"], [1, "dialog-title"], ["title", "Close", 1, "dialog-close-btn", 3, "click"], [1, "dialog-content"], ["class", "success-banner", 4, "ngIf"], ["class", "error-banner", 4, "ngIf"], [1, "task-form"], [1, "form-group"], ["for", "create-title"], ["id", "create-title", "type", "text", "placeholder", "Enter task title", "autofocus", "", 1, "form-input", 3, "ngModelChange", "keyup.enter", "ngModel"], ["for", "create-description"], ["id", "create-description", "placeholder", "Enter task description", "rows", "3", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-row"], ["for", "create-priority"], ["id", "create-priority", 1, "form-select", 3, "ngModelChange", "ngModel"], ["value", "low"], ["value", "medium"], ["value", "high"], ["for", "create-duedate"], ["id", "create-duedate", "type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "dialog-actions"], [1, "dialog-action-btn", "dialog-action-btn--secondary", 3, "click"], [1, "dialog-action-btn", "dialog-action-btn--primary", 3, "click", "disabled"], [1, "success-banner"], [1, "error-banner"]], template: function TaskCreationDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TaskCreationDialogComponent_div_0_Template, 39, 9, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.isOpen);
      }
    }, dependencies: [NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.dialog-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.dialog-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  max-width: 550px;\n  width: 90%;\n  max-height: 90vh;\n  overflow: auto;\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 24px;\n  border-bottom: 2px solid #f0f0f0;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 12px 12px 0 0;\n}\n.dialog-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: white;\n  flex: 1;\n}\n.dialog-close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: white;\n  font-size: 24px;\n  cursor: pointer;\n  padding: 0;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  transition: all 0.3s ease;\n}\n.dialog-close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.2);\n  transform: scale(1.15);\n}\n.dialog-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  color: #333;\n  line-height: 1.6;\n}\n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #f0f0f0;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n.dialog-action-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  min-width: 100px;\n}\n.dialog-action-btn--primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.dialog-action-btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n  transform: translateY(-2px);\n}\n.dialog-action-btn--secondary[_ngcontent-%COMP%] {\n  background: #f0f0f0;\n  color: #333;\n  border: 1px solid #ddd;\n}\n.dialog-action-btn--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e5e5e5;\n  border-color: #999;\n}\n.dialog-action-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.task-form[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-weight: 600;\n  color: #333;\n  font-size: 13px;\n}\n.form-input[_ngcontent-%COMP%], \n.form-textarea[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n  transition: border-color 0.3s ease, box-shadow 0.3s ease;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus, \n.form-textarea[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.success-banner[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n  padding: 10px 16px;\n  border-radius: 6px;\n  margin-bottom: 16px;\n  font-weight: 500;\n}\n.error-banner[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n  padding: 10px 16px;\n  border-radius: 6px;\n  margin-bottom: 16px;\n  font-weight: 500;\n}\n@media (max-width: 600px) {\n  .dialog-container[_ngcontent-%COMP%] {\n    width: 95%;\n    max-height: 85vh;\n  }\n  .dialog-header[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .dialog-title[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .dialog-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .dialog-actions[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n    gap: 8px;\n  }\n  .dialog-action-btn[_ngcontent-%COMP%] {\n    padding: 8px 16px;\n    font-size: 13px;\n    min-width: 80px;\n  }\n}\n/*# sourceMappingURL=task-creation-dialog.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaskCreationDialogComponent, { className: "TaskCreationDialogComponent", filePath: "src\\app\\components\\task-creation-dialog\\task-creation-dialog.component.ts", lineNumber: 14 });
})();

// src/app/components/task-view-dialog/task-view-dialog.component.ts
function TaskViewDialogComponent_div_0_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "span", 9);
    \u0275\u0275text(2, "Due Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, ctx_r1.task.dueDate, "mediumDate"));
  }
}
function TaskViewDialogComponent_div_0_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "span", 9);
    \u0275\u0275text(2, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 16);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.task.description);
  }
}
function TaskViewDialogComponent_div_0_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "span", 9);
    \u0275\u0275text(2, "Completed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, ctx_r1.task.completedAt, "medium"));
  }
}
function TaskViewDialogComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function TaskViewDialogComponent_div_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackdropClick());
    });
    \u0275\u0275elementStart(1, "div", 2);
    \u0275\u0275listener("click", function TaskViewDialogComponent_div_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 3)(3, "h2", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 5);
    \u0275\u0275listener("click", function TaskViewDialogComponent_div_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275text(6, " \u2715 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 6)(8, "div", 7)(9, "div", 8)(10, "span", 9);
    \u0275\u0275text(11, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 10);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 8)(15, "span", 9);
    \u0275\u0275text(16, "Priority");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 10);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(19, TaskViewDialogComponent_div_0_div_19_Template, 6, 4, "div", 11)(20, TaskViewDialogComponent_div_0_div_20_Template, 5, 1, "div", 11)(21, TaskViewDialogComponent_div_0_div_21_Template, 6, 4, "div", 11);
    \u0275\u0275elementStart(22, "div", 8)(23, "span", 9);
    \u0275\u0275text(24, "Created");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(28, "div", 12)(29, "button", 13);
    \u0275\u0275listener("click", function TaskViewDialogComponent_div_0_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDelete());
    });
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "button", 14);
    \u0275\u0275listener("click", function TaskViewDialogComponent_div_0_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onToggleComplete());
    });
    \u0275\u0275text(32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "button", 15);
    \u0275\u0275listener("click", function TaskViewDialogComponent_div_0_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onEdit());
    });
    \u0275\u0275text(34, " Edit ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.task.title);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngClass", ctx_r1.getStatusClass(ctx_r1.task.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.task.status);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", ctx_r1.getPriorityClass(ctx_r1.task.priority));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.task.priority);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.task.dueDate);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.task.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.task.completedAt);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(27, 13, ctx_r1.task.createdAt, "medium"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.deleting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.deleting ? "Deleting..." : "Delete", " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.toggling);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.task.status === "completed" ? "Mark Pending" : "Mark Complete", " ");
  }
}
var TaskViewDialogComponent = class _TaskViewDialogComponent {
  constructor(taskService, dialogService) {
    this.taskService = taskService;
    this.dialogService = dialogService;
    this.isOpen = false;
    this.task = null;
    this.closed = new EventEmitter();
    this.editRequested = new EventEmitter();
    this.taskDeleted = new EventEmitter();
    this.taskUpdated = new EventEmitter();
    this.deleting = false;
    this.toggling = false;
  }
  onClose() {
    this.closed.emit();
  }
  onBackdropClick() {
    this.onClose();
  }
  onEdit() {
    if (this.task) {
      this.editRequested.emit(this.task);
    }
  }
  onToggleComplete() {
    if (!this.task)
      return;
    this.toggling = true;
    const newStatus = this.task.status === "completed" ? "pending" : "completed";
    const completedAt = newStatus === "completed" ? (/* @__PURE__ */ new Date()).toISOString() : null;
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
      }
    });
  }
  onDelete() {
    if (!this.task)
      return;
    this.dialogService.confirm("Delete Task", `Are you sure you want to delete "${this.task.title}"?`).subscribe((confirmed) => {
      if (confirmed && this.task) {
        this.deleting = true;
        this.taskService.deleteTask(this.task.id).subscribe({
          next: () => {
            this.deleting = false;
            this.taskDeleted.emit(this.task);
          },
          error: () => {
            this.deleting = false;
            this.dialogService.error("Error", "Failed to delete task");
          }
        });
      }
    });
  }
  getPriorityClass(priority) {
    return `priority-badge priority-${priority || "medium"}`;
  }
  getStatusClass(status) {
    return `status-badge status-${status || "pending"}`;
  }
  static {
    this.\u0275fac = function TaskViewDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TaskViewDialogComponent)(\u0275\u0275directiveInject(TaskService), \u0275\u0275directiveInject(DialogService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaskViewDialogComponent, selectors: [["app-task-view-dialog"]], inputs: { isOpen: "isOpen", task: "task" }, outputs: { closed: "closed", editRequested: "editRequested", taskDeleted: "taskDeleted", taskUpdated: "taskUpdated" }, decls: 1, vars: 1, consts: [["class", "dialog-overlay", 3, "click", 4, "ngIf"], [1, "dialog-overlay", 3, "click"], [1, "dialog-container", 3, "click"], [1, "dialog-header"], [1, "dialog-title"], ["title", "Close", 1, "dialog-close-btn", 3, "click"], [1, "dialog-content"], [1, "task-detail"], [1, "detail-row"], [1, "detail-label"], [3, "ngClass"], ["class", "detail-row", 4, "ngIf"], [1, "dialog-actions"], [1, "dialog-action-btn", "dialog-action-btn--danger", 3, "click", "disabled"], [1, "dialog-action-btn", "dialog-action-btn--secondary", 3, "click", "disabled"], [1, "dialog-action-btn", "dialog-action-btn--primary", 3, "click"], [1, "task-description"]], template: function TaskViewDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TaskViewDialogComponent_div_0_Template, 35, 16, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.isOpen && ctx.task);
      }
    }, dependencies: [NgClass, NgIf, DatePipe], styles: ["\n\n.dialog-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.dialog-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  max-width: 500px;\n  width: 90%;\n  max-height: 90vh;\n  overflow: auto;\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 24px;\n  border-bottom: 2px solid #f0f0f0;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 12px 12px 0 0;\n}\n.dialog-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: white;\n  flex: 1;\n}\n.dialog-close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: white;\n  font-size: 24px;\n  cursor: pointer;\n  padding: 0;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  transition: all 0.3s ease;\n}\n.dialog-close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.2);\n  transform: scale(1.15);\n}\n.dialog-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  color: #333;\n  line-height: 1.6;\n}\n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #f0f0f0;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n.dialog-action-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  min-width: 100px;\n}\n.dialog-action-btn--primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.dialog-action-btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n  transform: translateY(-2px);\n}\n.dialog-action-btn--secondary[_ngcontent-%COMP%] {\n  background: #f0f0f0;\n  color: #333;\n  border: 1px solid #ddd;\n}\n.dialog-action-btn--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e5e5e5;\n  border-color: #999;\n}\n.dialog-action-btn--danger[_ngcontent-%COMP%] {\n  background: #dc3545;\n  color: white;\n}\n.dialog-action-btn--danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #c82333;\n  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);\n  transform: translateY(-2px);\n}\n.dialog-action-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.task-detail[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.detail-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #999;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.task-description[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #555;\n  line-height: 1.6;\n}\n.priority-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 13px;\n  font-weight: 600;\n  text-transform: capitalize;\n  width: fit-content;\n}\n.priority-high[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n}\n.priority-medium[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n.priority-low[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 12px;\n  border-radius: 12px;\n  font-size: 13px;\n  font-weight: 600;\n  text-transform: capitalize;\n  width: fit-content;\n}\n.status-pending[_ngcontent-%COMP%] {\n  background: #fff3cd;\n  color: #856404;\n}\n.status-in-progress[_ngcontent-%COMP%] {\n  background: #cce5ff;\n  color: #004085;\n}\n.status-completed[_ngcontent-%COMP%] {\n  background: #d4edda;\n  color: #155724;\n}\n@media (max-width: 600px) {\n  .dialog-container[_ngcontent-%COMP%] {\n    width: 95%;\n    max-height: 85vh;\n  }\n  .dialog-header[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .dialog-title[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .dialog-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .dialog-actions[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n    gap: 8px;\n  }\n  .dialog-action-btn[_ngcontent-%COMP%] {\n    padding: 8px 16px;\n    font-size: 13px;\n    min-width: 80px;\n  }\n}\n/*# sourceMappingURL=task-view-dialog.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaskViewDialogComponent, { className: "TaskViewDialogComponent", filePath: "src\\app\\components\\task-view-dialog\\task-view-dialog.component.ts", lineNumber: 12 });
})();

// src/app/components/task-edit-dialog/task-edit-dialog.component.ts
function TaskEditDialogComponent_div_0_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage, " ");
  }
}
function TaskEditDialogComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function TaskEditDialogComponent_div_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackdropClick());
    });
    \u0275\u0275elementStart(1, "div", 2);
    \u0275\u0275listener("click", function TaskEditDialogComponent_div_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 3)(3, "h2", 4);
    \u0275\u0275text(4, "Edit Task");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 5);
    \u0275\u0275listener("click", function TaskEditDialogComponent_div_0_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275text(6, " \u2715 ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 6);
    \u0275\u0275template(8, TaskEditDialogComponent_div_0_div_8_Template, 2, 1, "div", 7);
    \u0275\u0275elementStart(9, "div", 8)(10, "div", 9)(11, "label", 10);
    \u0275\u0275text(12, "Task Title *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 11);
    \u0275\u0275twoWayListener("ngModelChange", function TaskEditDialogComponent_div_0_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.title, $event) || (ctx_r1.formData.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function TaskEditDialogComponent_div_0_Template_input_keyup_enter_13_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 9)(15, "label", 12);
    \u0275\u0275text(16, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 13);
    \u0275\u0275twoWayListener("ngModelChange", function TaskEditDialogComponent_div_0_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.description, $event) || (ctx_r1.formData.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 14)(19, "div", 9)(20, "label", 15);
    \u0275\u0275text(21, "Priority");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "select", 16);
    \u0275\u0275twoWayListener("ngModelChange", function TaskEditDialogComponent_div_0_Template_select_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.priority, $event) || (ctx_r1.formData.priority = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(23, "option", 17);
    \u0275\u0275text(24, "Low");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "option", 18);
    \u0275\u0275text(26, "Medium");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "option", 19);
    \u0275\u0275text(28, "High");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 9)(30, "label", 20);
    \u0275\u0275text(31, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "select", 21);
    \u0275\u0275twoWayListener("ngModelChange", function TaskEditDialogComponent_div_0_Template_select_ngModelChange_32_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.status, $event) || (ctx_r1.formData.status = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(33, "option", 22);
    \u0275\u0275text(34, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 23);
    \u0275\u0275text(36, "In Progress");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "option", 24);
    \u0275\u0275text(38, "Completed");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(39, "div", 9)(40, "label", 25);
    \u0275\u0275text(41, "Due Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function TaskEditDialogComponent_div_0_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.formData.dueDate, $event) || (ctx_r1.formData.dueDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(43, "div", 27)(44, "button", 28);
    \u0275\u0275listener("click", function TaskEditDialogComponent_div_0_Template_button_click_44_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onClose());
    });
    \u0275\u0275text(45, " Cancel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "button", 29);
    \u0275\u0275listener("click", function TaskEditDialogComponent_div_0_Template_button_click_46_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r1.errorMessage);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.priority);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.status);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.formData.dueDate);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving ? "Saving..." : "Save Changes", " ");
  }
}
var TaskEditDialogComponent = class _TaskEditDialogComponent {
  constructor(taskService, dialogService) {
    this.taskService = taskService;
    this.dialogService = dialogService;
    this.isOpen = false;
    this.task = null;
    this.closed = new EventEmitter();
    this.taskUpdated = new EventEmitter();
    this.formData = {
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
      dueDate: ""
    };
    this.saving = false;
    this.errorMessage = "";
  }
  ngOnChanges(changes) {
    if (changes["task"] && this.task) {
      this.formData = {
        title: this.task.title,
        description: this.task.description || "",
        priority: this.task.priority,
        status: this.task.status,
        dueDate: this.task.dueDate ? new Date(this.task.dueDate).toISOString().split("T")[0] : ""
      };
      this.errorMessage = "";
    }
  }
  onSubmit() {
    if (!this.formData.title.trim()) {
      this.errorMessage = "Please enter a task title";
      return;
    }
    if (!this.task)
      return;
    this.saving = true;
    this.errorMessage = "";
    const updateData = {
      title: this.formData.title.trim(),
      description: this.formData.description.trim() || void 0,
      priority: this.formData.priority,
      status: this.formData.status,
      dueDate: this.formData.dueDate || null,
      completedAt: this.formData.status === "completed" ? (/* @__PURE__ */ new Date()).toISOString() : null
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
      }
    });
  }
  onClose() {
    this.closed.emit();
  }
  onBackdropClick() {
    this.onClose();
  }
  static {
    this.\u0275fac = function TaskEditDialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TaskEditDialogComponent)(\u0275\u0275directiveInject(TaskService), \u0275\u0275directiveInject(DialogService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaskEditDialogComponent, selectors: [["app-task-edit-dialog"]], inputs: { isOpen: "isOpen", task: "task" }, outputs: { closed: "closed", taskUpdated: "taskUpdated" }, features: [\u0275\u0275NgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "dialog-overlay", 3, "click", 4, "ngIf"], [1, "dialog-overlay", 3, "click"], [1, "dialog-container", 3, "click"], [1, "dialog-header"], [1, "dialog-title"], ["title", "Close", 1, "dialog-close-btn", 3, "click"], [1, "dialog-content"], ["class", "error-banner", 4, "ngIf"], [1, "task-form"], [1, "form-group"], ["for", "edit-title"], ["id", "edit-title", "type", "text", "placeholder", "Enter task title", 1, "form-input", 3, "ngModelChange", "keyup.enter", "ngModel"], ["for", "edit-description"], ["id", "edit-description", "placeholder", "Enter task description", "rows", "3", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-row"], ["for", "edit-priority"], ["id", "edit-priority", 1, "form-select", 3, "ngModelChange", "ngModel"], ["value", "low"], ["value", "medium"], ["value", "high"], ["for", "edit-status"], ["id", "edit-status", 1, "form-select", 3, "ngModelChange", "ngModel"], ["value", "pending"], ["value", "in-progress"], ["value", "completed"], ["for", "edit-duedate"], ["id", "edit-duedate", "type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "dialog-actions"], [1, "dialog-action-btn", "dialog-action-btn--secondary", 3, "click"], [1, "dialog-action-btn", "dialog-action-btn--primary", 3, "click", "disabled"], [1, "error-banner"]], template: function TaskEditDialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TaskEditDialogComponent_div_0_Template, 48, 8, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.isOpen && ctx.task);
      }
    }, dependencies: [NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.dialog-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.dialog-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  max-width: 550px;\n  width: 90%;\n  max-height: 90vh;\n  overflow: auto;\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 24px;\n  border-bottom: 2px solid #f0f0f0;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 12px 12px 0 0;\n}\n.dialog-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: white;\n  flex: 1;\n}\n.dialog-close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: white;\n  font-size: 24px;\n  cursor: pointer;\n  padding: 0;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  transition: all 0.3s ease;\n}\n.dialog-close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.2);\n  transform: scale(1.15);\n}\n.dialog-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  color: #333;\n  line-height: 1.6;\n}\n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #f0f0f0;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n.dialog-action-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  min-width: 100px;\n}\n.dialog-action-btn--primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.dialog-action-btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n  transform: translateY(-2px);\n}\n.dialog-action-btn--secondary[_ngcontent-%COMP%] {\n  background: #f0f0f0;\n  color: #333;\n  border: 1px solid #ddd;\n}\n.dialog-action-btn--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e5e5e5;\n  border-color: #999;\n}\n.dialog-action-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.task-form[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-weight: 600;\n  color: #333;\n  font-size: 13px;\n}\n.form-input[_ngcontent-%COMP%], \n.form-textarea[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n  transition: border-color 0.3s ease, box-shadow 0.3s ease;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus, \n.form-textarea[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n.error-banner[_ngcontent-%COMP%] {\n  background: #f8d7da;\n  color: #721c24;\n  padding: 10px 16px;\n  border-radius: 6px;\n  margin-bottom: 16px;\n  font-weight: 500;\n}\n@media (max-width: 600px) {\n  .dialog-container[_ngcontent-%COMP%] {\n    width: 95%;\n    max-height: 85vh;\n  }\n  .dialog-header[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .dialog-title[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .dialog-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .dialog-actions[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n    gap: 8px;\n  }\n  .dialog-action-btn[_ngcontent-%COMP%] {\n    padding: 8px 16px;\n    font-size: 13px;\n    min-width: 80px;\n  }\n}\n/*# sourceMappingURL=task-edit-dialog.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaskEditDialogComponent, { className: "TaskEditDialogComponent", filePath: "src\\app\\components\\task-edit-dialog\\task-edit-dialog.component.ts", lineNumber: 12 });
})();

// src/app/components/weekly-board/weekly-board.component.ts
function WeeklyBoardComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14);
    \u0275\u0275text(1, " Failed to load tasks. ");
    \u0275\u0275elementStart(2, "button", 15);
    \u0275\u0275listener("click", function WeeklyBoardComponent_div_16_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.retryFetch());
    });
    \u0275\u0275text(3, "Retry");
    \u0275\u0275elementEnd()();
  }
}
function WeeklyBoardComponent_app_day_card_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-day-card", 16);
    \u0275\u0275listener("dayClick", function WeeklyBoardComponent_app_day_card_18_Template_app_day_card_dayClick_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onDayClick($event));
    })("taskClick", function WeeklyBoardComponent_app_day_card_18_Template_app_day_card_taskClick_0_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onTaskClick($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const day_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("day", day_r4)("tasks", ctx_r1.getTasksForDay(day_r4));
  }
}
var WeeklyBoardComponent = class _WeeklyBoardComponent {
  constructor(taskService) {
    this.taskService = taskService;
    this.weekDays = [];
    this.currentDate = /* @__PURE__ */ new Date();
    this.weekStartDate = /* @__PURE__ */ new Date();
    this.monthYear = "";
    this.tasksByDate = /* @__PURE__ */ new Map();
    this.loadError = false;
    this.showCreateDialog = false;
    this.showViewDialog = false;
    this.showEditDialog = false;
    this.selectedDate = /* @__PURE__ */ new Date();
    this.selectedTask = null;
    this.destroy$ = new Subject();
  }
  ngOnInit() {
    this.generateWeekDays();
    this.fetchTasksForWeek();
  }
  getTasksForDay(day) {
    const key = this.dateToKey(day.fullDate);
    return this.tasksByDate.get(key) || [];
  }
  nextWeek() {
    this.currentDate = new Date(this.weekStartDate);
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.generateWeekDays();
    this.fetchTasksForWeek();
  }
  previousWeek() {
    this.currentDate = new Date(this.weekStartDate);
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.generateWeekDays();
    this.fetchTasksForWeek();
  }
  goToToday() {
    this.currentDate = /* @__PURE__ */ new Date();
    this.generateWeekDays();
    this.fetchTasksForWeek();
  }
  onDayClick(day) {
    this.selectedDate = day.fullDate;
    this.showCreateDialog = true;
  }
  onTaskClick(task) {
    this.selectedTask = task;
    this.showViewDialog = true;
  }
  onCreateDialogClose() {
    this.showCreateDialog = false;
  }
  onTaskCreated(task) {
    this.fetchTasksForWeek();
  }
  onViewDialogClose() {
    this.showViewDialog = false;
    this.selectedTask = null;
  }
  onEditRequested(task) {
    this.showViewDialog = false;
    this.selectedTask = task;
    this.showEditDialog = true;
  }
  onTaskDeleted(task) {
    this.showViewDialog = false;
    this.selectedTask = null;
    this.fetchTasksForWeek();
  }
  onTaskUpdatedFromView(task) {
    this.selectedTask = task;
    this.fetchTasksForWeek();
  }
  onEditDialogClose() {
    this.showEditDialog = false;
    this.selectedTask = null;
  }
  onTaskUpdated(task) {
    this.showEditDialog = false;
    this.selectedTask = null;
    this.fetchTasksForWeek();
  }
  retryFetch() {
    this.loadError = false;
    this.fetchTasksForWeek();
  }
  generateWeekDays() {
    const reference = new Date(this.currentDate);
    const currentDayOfWeek = reference.getDay();
    const diff = reference.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1);
    const weekStart = new Date(reference);
    weekStart.setDate(diff);
    this.weekStartDate = new Date(weekStart);
    this.weekDays = [];
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const today = /* @__PURE__ */ new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      this.weekDays.push({
        day: dayNames[i],
        date: date.getDate(),
        fullDate: new Date(date),
        isToday,
        dayOfWeek: dayNames[i]
      });
    }
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    this.monthYear = `${monthNames[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
  }
  fetchTasksForWeek() {
    const startDate = this.formatDateForApi(this.weekDays[0].fullDate);
    const endDate = this.formatDateForApi(this.weekDays[6].fullDate);
    this.taskService.getTasksByDateRange(startDate, endDate).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response) => {
        this.loadError = false;
        const tasks = response.data || [];
        this.tasksByDate = /* @__PURE__ */ new Map();
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
      }
    });
  }
  dateToKey(date) {
    return new Date(date).toISOString().split("T")[0];
  }
  formatDateForApi(date) {
    return date.toISOString().split("T")[0];
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.\u0275fac = function WeeklyBoardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _WeeklyBoardComponent)(\u0275\u0275directiveInject(TaskService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _WeeklyBoardComponent, selectors: [["app-weekly-board"]], decls: 22, vars: 11, consts: [[1, "weekly-board-container"], [1, "weekly-board-header"], [1, "header-title"], ["title", "Go to current week", 1, "today-btn", 3, "click"], [1, "header-controls"], ["title", "Previous week", 1, "nav-btn", "prev", 3, "click"], [1, "week-range"], ["title", "Next week", 1, "nav-btn", "next", 3, "click"], ["class", "error-banner", 4, "ngIf"], [1, "weekly-board"], [3, "day", "tasks", "dayClick", "taskClick", 4, "ngFor", "ngForOf"], [3, "closed", "taskCreated", "isOpen", "selectedDate"], [3, "closed", "editRequested", "taskDeleted", "taskUpdated", "isOpen", "task"], [3, "closed", "taskUpdated", "isOpen", "task"], [1, "error-banner"], [1, "retry-btn", 3, "click"], [3, "dayClick", "taskClick", "day", "tasks"]], template: function WeeklyBoardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h2");
        \u0275\u0275text(4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "button", 3);
        \u0275\u0275listener("click", function WeeklyBoardComponent_Template_button_click_5_listener() {
          return ctx.goToToday();
        });
        \u0275\u0275text(6, " Today ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 4)(8, "button", 5);
        \u0275\u0275listener("click", function WeeklyBoardComponent_Template_button_click_8_listener() {
          return ctx.previousWeek();
        });
        \u0275\u0275elementStart(9, "span");
        \u0275\u0275text(10, "\u2190");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "span", 6);
        \u0275\u0275text(12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "button", 7);
        \u0275\u0275listener("click", function WeeklyBoardComponent_Template_button_click_13_listener() {
          return ctx.nextWeek();
        });
        \u0275\u0275elementStart(14, "span");
        \u0275\u0275text(15, "\u2192");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(16, WeeklyBoardComponent_div_16_Template, 4, 0, "div", 8);
        \u0275\u0275elementStart(17, "div", 9);
        \u0275\u0275template(18, WeeklyBoardComponent_app_day_card_18_Template, 1, 2, "app-day-card", 10);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "app-task-creation-dialog", 11);
        \u0275\u0275listener("closed", function WeeklyBoardComponent_Template_app_task_creation_dialog_closed_19_listener() {
          return ctx.onCreateDialogClose();
        })("taskCreated", function WeeklyBoardComponent_Template_app_task_creation_dialog_taskCreated_19_listener($event) {
          return ctx.onTaskCreated($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "app-task-view-dialog", 12);
        \u0275\u0275listener("closed", function WeeklyBoardComponent_Template_app_task_view_dialog_closed_20_listener() {
          return ctx.onViewDialogClose();
        })("editRequested", function WeeklyBoardComponent_Template_app_task_view_dialog_editRequested_20_listener($event) {
          return ctx.onEditRequested($event);
        })("taskDeleted", function WeeklyBoardComponent_Template_app_task_view_dialog_taskDeleted_20_listener($event) {
          return ctx.onTaskDeleted($event);
        })("taskUpdated", function WeeklyBoardComponent_Template_app_task_view_dialog_taskUpdated_20_listener($event) {
          return ctx.onTaskUpdatedFromView($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "app-task-edit-dialog", 13);
        \u0275\u0275listener("closed", function WeeklyBoardComponent_Template_app_task_edit_dialog_closed_21_listener() {
          return ctx.onEditDialogClose();
        })("taskUpdated", function WeeklyBoardComponent_Template_app_task_edit_dialog_taskUpdated_21_listener($event) {
          return ctx.onTaskUpdated($event);
        });
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.monthYear);
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate2(" ", ctx.weekDays[0].date, " - ", ctx.weekDays[6].date, " ");
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.loadError);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.weekDays);
        \u0275\u0275advance();
        \u0275\u0275property("isOpen", ctx.showCreateDialog)("selectedDate", ctx.selectedDate);
        \u0275\u0275advance();
        \u0275\u0275property("isOpen", ctx.showViewDialog)("task", ctx.selectedTask);
        \u0275\u0275advance();
        \u0275\u0275property("isOpen", ctx.showEditDialog)("task", ctx.selectedTask);
      }
    }, dependencies: [NgForOf, NgIf, DayCardComponent, TaskCreationDialogComponent, TaskViewDialogComponent, TaskEditDialogComponent], styles: ["\n\n.weekly-board-container[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 16px;\n  padding: 24px;\n  margin-bottom: 32px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);\n}\n.weekly-board-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.header-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n.header-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: white;\n  margin: 0;\n  font-size: 28px;\n  font-weight: 600;\n}\n.today-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  border: 2px solid rgba(255, 255, 255, 0.4);\n  padding: 8px 16px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  transition: all 0.3s ease;\n}\n.today-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.3);\n  border-color: white;\n  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);\n}\n.header-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  color: white;\n  font-weight: 500;\n}\n.nav-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.15);\n  color: white;\n  border: none;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  cursor: pointer;\n  font-size: 18px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n}\n.nav-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.25);\n  transform: scale(1.1);\n}\n.nav-btn.prev[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n.nav-btn.next[_ngcontent-%COMP%] {\n  margin-left: 8px;\n}\n.week-range[_ngcontent-%COMP%] {\n  min-width: 80px;\n  text-align: center;\n  font-size: 14px;\n}\n.weekly-board[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 12px;\n}\n.day-card[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  min-height: 180px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n  border: 2px solid transparent;\n  position: relative;\n  cursor: pointer;\n}\n.day-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-6px) scale(1.02);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);\n}\n.day-card.today[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border-color: rgba(255, 255, 255, 0.3);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);\n}\n.day-card.today[_ngcontent-%COMP%]   .day-name[_ngcontent-%COMP%], \n.day-card.today[_ngcontent-%COMP%]   .day-date[_ngcontent-%COMP%], \n.day-card.today[_ngcontent-%COMP%]   .month-indicator[_ngcontent-%COMP%] {\n  color: white;\n}\n.day-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n  padding-bottom: 12px;\n  border-bottom: 2px solid #f0f0f0;\n}\n.day-card.today[_ngcontent-%COMP%]   .day-header[_ngcontent-%COMP%] {\n  border-bottom: 2px solid rgba(255, 255, 255, 0.2);\n}\n.day-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n  color: #667eea;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.day-card.today[_ngcontent-%COMP%]   .day-name[_ngcontent-%COMP%] {\n  color: white;\n}\n.day-date[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: bold;\n  color: #333;\n  min-width: 40px;\n  text-align: right;\n}\n.day-date.current-date[_ngcontent-%COMP%] {\n  background: #667eea;\n  color: white;\n  border-radius: 8px;\n  padding: 2px 8px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.day-card.today[_ngcontent-%COMP%]   .day-date.current-date[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.3);\n}\n.day-content[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 80px;\n}\n.day-indicator[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.today-label[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  padding: 8px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: bold;\n  letter-spacing: 1px;\n  display: inline-block;\n}\n.day-card.today[_ngcontent-%COMP%]   .today-label[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.25);\n  color: white;\n}\n.tasks-placeholder[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 13px;\n  text-align: center;\n}\n.day-card.today[_ngcontent-%COMP%]   .tasks-placeholder[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.7);\n}\n.day-footer[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  padding-top: 12px;\n  border-top: 2px solid #f0f0f0;\n  text-align: center;\n}\n.day-card.today[_ngcontent-%COMP%]   .day-footer[_ngcontent-%COMP%] {\n  border-top: 2px solid rgba(255, 255, 255, 0.2);\n}\n.month-indicator[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: #999;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.day-card.today[_ngcontent-%COMP%]   .month-indicator[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.8);\n}\n@media (max-width: 768px) {\n  .weekly-board-container[_ngcontent-%COMP%] {\n    padding: 16px;\n    margin-bottom: 24px;\n  }\n  .weekly-board-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .header-title[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .header-controls[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n  }\n  .weekly-board[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n    gap: 10px;\n  }\n  .day-card[_ngcontent-%COMP%] {\n    min-height: 160px;\n    padding: 12px;\n  }\n  .day-date[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n@media (max-width: 480px) {\n  .weekly-board[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(7, 1fr);\n    gap: 8px;\n  }\n  .day-card[_ngcontent-%COMP%] {\n    min-height: 140px;\n    padding: 10px;\n  }\n  .day-date[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .day-name[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .today-label[_ngcontent-%COMP%] {\n    padding: 6px 10px;\n    font-size: 10px;\n  }\n}\n.error-banner[_ngcontent-%COMP%] {\n  background: rgba(220, 53, 69, 0.2);\n  color: white;\n  padding: 12px 16px;\n  border-radius: 8px;\n  margin-bottom: 16px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.retry-btn[_ngcontent-%COMP%] {\n  background: white;\n  color: #dc3545;\n  border: none;\n  padding: 6px 16px;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: 600;\n}\n/*# sourceMappingURL=weekly-board.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(WeeklyBoardComponent, { className: "WeeklyBoardComponent", filePath: "src\\app\\components\\weekly-board\\weekly-board.component.ts", lineNumber: 14 });
})();

// src/app/dashboard/dashboard.component.ts
function DashboardComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 4)(2, "div", 5)(3, "span", 6);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 7)(6, "h2", 8);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 9)(9, "span", 10)(10, "strong");
    \u0275\u0275text(11, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 10)(14, "strong");
    \u0275\u0275text(15, "Last Updated:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 11)(19, "button", 12)(20, "span");
    \u0275\u0275text(21, "\uF464");
    \u0275\u0275elementEnd();
    \u0275\u0275text(22, " Profile ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "button", 13)(24, "span");
    \u0275\u0275text(25, "\u2699\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275text(26, " Settings ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "button", 14);
    \u0275\u0275listener("click", function DashboardComponent_div_1_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.logout());
    });
    \u0275\u0275elementStart(28, "span");
    \u0275\u0275text(29, "\u2197\uFE0F");
    \u0275\u0275elementEnd();
    \u0275\u0275text(30, " Logout ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.currentUser.email.charAt(0).toUpperCase());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Welcome, ", ctx_r1.currentUser.email, "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.currentUser.email, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(17, 4, ctx_r1.currentUser.updatedAt, "short"), " ");
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(userService, taskService, authService, router) {
    this.userService = userService;
    this.taskService = taskService;
    this.authService = authService;
    this.router = router;
    this.title = "Pohlim Monorepo";
    this.users = [];
    this.tasks = [];
    this.loading = false;
    this.activeTab = "users";
    this.currentUser = null;
    this.destroy$ = new Subject();
  }
  ngOnInit() {
    this.authService.getCurrentUser().pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.currentUser = user;
    });
    this.fetchUsers();
    this.fetchTasks();
  }
  fetchUsers() {
    this.loading = true;
    this.userService.getAllUsers().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.users = response.data || [];
      this.loading = false;
    }, (error) => {
      console.error("Error fetching users:", error);
      this.loading = false;
    });
  }
  fetchTasks() {
    this.loading = true;
    this.taskService.getAllTasks().pipe(takeUntil(this.destroy$)).subscribe((response) => {
      this.tasks = response.data || [];
      this.loading = false;
    }, (error) => {
      console.error("Error fetching tasks:", error);
      this.loading = false;
    });
  }
  switchTab(tab) {
    this.activeTab = tab;
    if (tab === "users") {
      this.fetchUsers();
    } else {
      this.fetchTasks();
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardComponent)(\u0275\u0275directiveInject(UserService), \u0275\u0275directiveInject(TaskService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 10, vars: 2, consts: [[1, "container"], ["class", "user-header", 4, "ngIf"], [1, "header-content"], [1, "user-header"], [1, "user-header-content"], [1, "user-avatar"], [1, "avatar-letter"], [1, "user-details"], [1, "user-name"], [1, "user-meta"], [1, "meta-item"], [1, "user-actions"], ["title", "View Profile", 1, "profile-btn"], ["title", "Settings", 1, "settings-btn"], ["title", "Logout", 1, "logout-btn-header", 3, "click"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, DashboardComponent_div_1_Template, 31, 7, "div", 1);
        \u0275\u0275elementStart(2, "header")(3, "div", 2)(4, "div")(5, "h1");
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p");
        \u0275\u0275text(8, "Manage Users & Tasks");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275element(9, "app-weekly-board");
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.currentUser);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.title);
      }
    }, dependencies: [NgIf, WeeklyBoardComponent, DatePipe], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n.user-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 12px;\n  padding: 24px;\n  margin-bottom: 24px;\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 24px;\n  flex-wrap: wrap;\n}\n.user-header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  flex: 1;\n  min-width: 300px;\n}\n.user-avatar[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 3px solid rgba(255, 255, 255, 0.3);\n  flex-shrink: 0;\n}\n.avatar-letter[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 36px;\n  font-weight: bold;\n}\n.user-details[_ngcontent-%COMP%] {\n  color: white;\n  flex: 1;\n}\n.user-name[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  font-size: 24px;\n  font-weight: 600;\n  color: white;\n}\n.user-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  flex-wrap: wrap;\n}\n.meta-item[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: rgba(255, 255, 255, 0.9);\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.meta-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: white;\n  font-weight: 600;\n}\n.user-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}\n.profile-btn[_ngcontent-%COMP%], \n.settings-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  padding: 10px 16px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  white-space: nowrap;\n}\n.profile-btn[_ngcontent-%COMP%]:hover, \n.settings-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.3);\n  border-color: white;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\n}\n.logout-btn-header[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.2);\n  color: white;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  padding: 10px 16px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  white-space: nowrap;\n}\n.logout-btn-header[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.3);\n  border-color: white;\n  transform: translateY(-2px);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);\n}\nheader[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 2rem 0;\n  border-bottom: 2px solid #007bff;\n  margin-bottom: 2rem;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  gap: 2rem;\n}\n.header-content[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%]:first-child {\n  flex: 1;\n  text-align: left;\n}\nheader[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #007bff;\n  font-size: 2.5rem;\n  margin-bottom: 0.5rem;\n}\nheader[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 1.1rem;\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\dashboard\\dashboard.component.ts", lineNumber: 16 });
})();

// src/app/dashboard/dashboard-routing.module.ts
var routes = [
  { path: "", component: DashboardComponent }
];
var DashboardRoutingModule = class _DashboardRoutingModule {
  static {
    this.\u0275fac = function DashboardRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/dashboard/dashboard.module.ts
var DashboardModule = class _DashboardModule {
  static {
    this.\u0275fac = function DashboardModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _DashboardModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      CommonModule,
      FormsModule,
      DashboardRoutingModule
    ] });
  }
};
export {
  DashboardModule
};
//# sourceMappingURL=dashboard.module-7RTS5NRT.js.map
