import {
  DialogService,
  TaskService,
  UserService
} from "./chunk-CRENEFZN.js";
import {
  AuthService,
  BrowserModule,
  CommonModule,
  DefaultValueAccessor,
  FormsModule,
  HTTP_INTERCEPTORS,
  HttpClientModule,
  NgClass,
  NgControlStatus,
  NgForOf,
  NgIf,
  NgModel,
  NgSelectOption,
  Router,
  RouterModule,
  RouterOutlet,
  SelectControlValueAccessor,
  Subject,
  catchError,
  platformBrowser,
  takeUntil,
  throwError,
  ɵNgSelectMultipleOption,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6V5F7FDL.js";

// src/app/components/dialog/dialog.component.ts
var _c0 = ["*"];
function DialogComponent_div_0_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 10);
    \u0275\u0275listener("click", function DialogComponent_div_0_button_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.close());
    });
    \u0275\u0275text(1, " \u2715 ");
    \u0275\u0275elementEnd();
  }
}
function DialogComponent_div_0_p_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.config.message, " ");
  }
}
function DialogComponent_div_0_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13)(2, "label", 14);
    \u0275\u0275text(3, "Task Title *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function DialogComponent_div_0_div_8_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.taskFormData.title, $event) || (ctx_r1.taskFormData.title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 13)(6, "label", 16);
    \u0275\u0275text(7, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "textarea", 17);
    \u0275\u0275twoWayListener("ngModelChange", function DialogComponent_div_0_div_8_Template_textarea_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.taskFormData.description, $event) || (ctx_r1.taskFormData.description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 18)(10, "div", 13)(11, "label", 19);
    \u0275\u0275text(12, "Priority");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "select", 20);
    \u0275\u0275twoWayListener("ngModelChange", function DialogComponent_div_0_div_8_Template_select_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.taskFormData.priority, $event) || (ctx_r1.taskFormData.priority = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(14, "option", 21);
    \u0275\u0275text(15, "Low");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "option", 22);
    \u0275\u0275text(17, "Medium");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "option", 23);
    \u0275\u0275text(19, "High");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 13)(21, "label", 24);
    \u0275\u0275text(22, "Due Date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 25);
    \u0275\u0275twoWayListener("ngModelChange", function DialogComponent_div_0_div_8_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.taskFormData.dueDate, $event) || (ctx_r1.taskFormData.dueDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.taskFormData.title);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.taskFormData.description);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.taskFormData.priority);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.taskFormData.dueDate);
  }
}
function DialogComponent_div_0_div_10_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function DialogComponent_div_0_div_10_button_1_Template_button_click_0_listener() {
      const action_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onActionClick(action_r6));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", ctx_r1.getActionButtonClass(action_r6))("disabled", action_r6.disabled || false);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", action_r6.label, " ");
  }
}
function DialogComponent_div_0_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275template(1, DialogComponent_div_0_div_10_button_1_Template, 2, 3, "button", 27);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.actions);
  }
}
function DialogComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275listener("click", function DialogComponent_div_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onBackdropClick());
    });
    \u0275\u0275elementStart(1, "div", 2);
    \u0275\u0275listener("click", function DialogComponent_div_0_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 3)(3, "h2", 4);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, DialogComponent_div_0_button_5_Template, 2, 0, "button", 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 6);
    \u0275\u0275template(7, DialogComponent_div_0_p_7_Template, 2, 1, "p", 7)(8, DialogComponent_div_0_div_8_Template, 24, 4, "div", 8);
    \u0275\u0275projection(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, DialogComponent_div_0_div_10_Template, 2, 1, "div", 9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.config.title || "Dialog");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.config.canClose !== false);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.config.message);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.config.isTaskForm);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.actions.length > 0);
  }
}
var DialogComponent = class _DialogComponent {
  constructor(dialogService) {
    this.dialogService = dialogService;
    this.isOpen = false;
    this.config = {};
    this.actions = [];
    this.taskFormData = {
      title: "",
      description: "",
      priority: "medium",
      dueDate: ""
    };
    this.destroy$ = new Subject();
  }
  ngOnInit() {
    this.dialogService.getDialogState().pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.isOpen = state.isOpen;
      this.config = state.config;
      this.actions = state.config.actions || [];
      if (state.config.data && state.config.data.formData) {
        this.taskFormData = state.config.data.formData;
      }
    });
  }
  close() {
    if (this.config.canClose !== false) {
      this.dialogService.close();
    }
  }
  onBackdropClick() {
    if (this.config.closeOnBackdropClick !== false) {
      this.close();
    }
  }
  /**
   * Handle action button click
   */
  onActionClick(action) {
    if (action.callback) {
      action.callback(this.config.data);
    }
  }
  /**
   * Get action button class
   */
  getActionButtonClass(action) {
    const baseClass = "dialog-action-btn";
    const typeClass = `dialog-action-btn--${action.type || "primary"}`;
    return `${baseClass} ${typeClass}`;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  static {
    this.\u0275fac = function DialogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DialogComponent)(\u0275\u0275directiveInject(DialogService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DialogComponent, selectors: [["app-dialog"]], ngContentSelectors: _c0, decls: 1, vars: 1, consts: [["class", "dialog-overlay", 3, "click", 4, "ngIf"], [1, "dialog-overlay", 3, "click"], [1, "dialog-container", 3, "click"], [1, "dialog-header"], [1, "dialog-title"], ["class", "dialog-close-btn", "title", "Close", 3, "click", 4, "ngIf"], [1, "dialog-content"], ["class", "dialog-message", 4, "ngIf"], ["class", "task-form", 4, "ngIf"], ["class", "dialog-actions", 4, "ngIf"], ["title", "Close", 1, "dialog-close-btn", 3, "click"], [1, "dialog-message"], [1, "task-form"], [1, "form-group"], ["for", "task-title"], ["id", "task-title", "type", "text", "placeholder", "Enter task title", "autofocus", "", 1, "form-input", 3, "ngModelChange", "ngModel"], ["for", "task-description"], ["id", "task-description", "placeholder", "Enter task description", "rows", "3", 1, "form-textarea", 3, "ngModelChange", "ngModel"], [1, "form-row"], ["for", "task-priority"], ["id", "task-priority", 1, "form-select", 3, "ngModelChange", "ngModel"], ["value", "low"], ["value", "medium"], ["value", "high"], ["for", "task-duedate"], ["id", "task-duedate", "type", "date", 1, "form-input", 3, "ngModelChange", "ngModel"], [1, "dialog-actions"], [3, "ngClass", "disabled", "click", 4, "ngFor", "ngForOf"], [3, "click", "ngClass", "disabled"]], template: function DialogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275projectionDef();
        \u0275\u0275template(0, DialogComponent_div_0_Template, 11, 5, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.isOpen);
      }
    }, dependencies: [NgClass, NgForOf, NgIf, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ["\n\n.dialog-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: _ngcontent-%COMP%_fadeIn 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.dialog-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  max-width: 500px;\n  width: 90%;\n  max-height: 90vh;\n  overflow: auto;\n  animation: _ngcontent-%COMP%_slideUp 0.3s ease;\n}\n@keyframes _ngcontent-%COMP%_slideUp {\n  from {\n    transform: translateY(50px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n.dialog-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 24px;\n  border-bottom: 2px solid #f0f0f0;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  border-radius: 12px 12px 0 0;\n}\n.dialog-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 20px;\n  font-weight: 600;\n  color: white;\n  flex: 1;\n}\n.dialog-close-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: white;\n  font-size: 24px;\n  cursor: pointer;\n  padding: 0;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  transition: all 0.3s ease;\n}\n.dialog-close-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.2);\n  transform: scale(1.15);\n}\n.dialog-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  color: #333;\n  line-height: 1.6;\n}\n.dialog-message[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  color: #555;\n  word-wrap: break-word;\n}\n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  padding: 16px 24px;\n  border-top: 1px solid #f0f0f0;\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n.dialog-action-btn[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border: none;\n  border-radius: 6px;\n  font-size: 14px;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  min-width: 100px;\n}\n.dialog-action-btn--primary[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n}\n.dialog-action-btn--primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);\n  transform: translateY(-2px);\n}\n.dialog-action-btn--secondary[_ngcontent-%COMP%] {\n  background: #f0f0f0;\n  color: #333;\n  border: 1px solid #ddd;\n}\n.dialog-action-btn--secondary[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e5e5e5;\n  border-color: #999;\n}\n.dialog-action-btn--danger[_ngcontent-%COMP%] {\n  background: #dc3545;\n  color: white;\n}\n.dialog-action-btn--danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #c82333;\n  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);\n  transform: translateY(-2px);\n}\n.dialog-action-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.task-form[_ngcontent-%COMP%] {\n  margin-top: 16px;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 6px;\n  font-weight: 600;\n  color: #333;\n  font-size: 13px;\n}\n.form-input[_ngcontent-%COMP%], \n.form-textarea[_ngcontent-%COMP%], \n.form-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px;\n  border: 1px solid #ddd;\n  border-radius: 6px;\n  font-size: 14px;\n  font-family: inherit;\n  transition: border-color 0.3s ease, box-shadow 0.3s ease;\n}\n.form-input[_ngcontent-%COMP%]:focus, \n.form-textarea[_ngcontent-%COMP%]:focus, \n.form-select[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-textarea[_ngcontent-%COMP%] {\n  resize: vertical;\n}\n@media (max-width: 600px) {\n  .dialog-container[_ngcontent-%COMP%] {\n    width: 95%;\n    max-height: 85vh;\n  }\n  .dialog-header[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .dialog-title[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n  .dialog-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .dialog-actions[_ngcontent-%COMP%] {\n    padding: 12px 16px;\n    gap: 8px;\n  }\n  .dialog-action-btn[_ngcontent-%COMP%] {\n    padding: 8px 16px;\n    font-size: 13px;\n    min-width: 80px;\n  }\n}\n/*# sourceMappingURL=dialog.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DialogComponent, { className: "DialogComponent", filePath: "src\\app\\components\\dialog\\dialog.component.ts", lineNumber: 19 });
})();

// src/app/app.component.ts
var AppComponent = class _AppComponent {
  static {
    this.\u0275fac = function AppComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275element(0, "app-dialog")(1, "router-outlet");
      }
    }, dependencies: [RouterOutlet, DialogComponent] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src\\app\\app.component.ts", lineNumber: 9 });
})();

// src/app/guards/auth.guard.ts
var AuthGuard = class _AuthGuard {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  canActivate() {
    const token = this.authService.getToken();
    if (token) {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }
  static {
    this.\u0275fac = function AuthGuard_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthGuard)(\u0275\u0275inject(AuthService), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthGuard, factory: _AuthGuard.\u0275fac, providedIn: "root" });
  }
};

// src/app/app-routing.module.ts
var routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "",
    loadChildren: () => import("./auth.module-O4J25JPS.js").then((m) => m.AuthModule)
  },
  {
    path: "dashboard",
    loadChildren: () => import("./dashboard.module-7RTS5NRT.js").then((m) => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "dashboard" }
];
var AppRoutingModule = class _AppRoutingModule {
  static {
    this.\u0275fac = function AppRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forRoot(routes), RouterModule] });
  }
};

// src/app/interceptors/auth.interceptor.ts
var AuthInterceptor = class _AuthInterceptor {
  constructor(authService) {
    this.authService = authService;
  }
  intercept(req, next) {
    const token = this.authService.getToken();
    let modifiedReq = req.clone({
      withCredentials: true,
      setHeaders: {
        "Content-Type": "application/json"
      }
    });
    if (token) {
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
    }
    return next.handle(modifiedReq).pipe(catchError((error) => {
      if (error.status === 0) {
        console.error("CORS Error or Network Error:", error);
      } else if (error.status === 401) {
        this.authService.logout();
      }
      return throwError(() => error);
    }));
  }
  static {
    this.\u0275fac = function AuthInterceptor_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthInterceptor)(\u0275\u0275inject(AuthService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthInterceptor, factory: _AuthInterceptor.\u0275fac });
  }
};

// src/app/app.module.ts
var AppModule = class _AppModule {
  static {
    this.\u0275fac = function AppModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AppModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AppModule, bootstrap: [AppComponent] });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ providers: [
      UserService,
      TaskService,
      AuthService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ], imports: [
      BrowserModule,
      CommonModule,
      HttpClientModule,
      FormsModule,
      AppRoutingModule
    ] });
  }
};

// src/main.ts
platformBrowser().bootstrapModule(AppModule).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
