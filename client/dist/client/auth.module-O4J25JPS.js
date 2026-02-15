import {
  AuthService,
  CommonModule,
  DefaultValueAccessor,
  FormsModule,
  MinLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgIf,
  NgModel,
  RequiredValidator,
  Router,
  RouterModule,
  ɵNgNoValidate,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6V5F7FDL.js";

// src/app/components/login.component.ts
function LoginComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 4);
    \u0275\u0275element(2, "path", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function LoginComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 4);
    \u0275\u0275element(2, "path", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Login successful! Redirecting...");
    \u0275\u0275elementEnd()();
  }
}
function LoginComponent__svg_svg_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 4);
    \u0275\u0275element(1, "path", 30);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent__svg_svg_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 4);
    \u0275\u0275element(1, "path", 31);
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Sign In");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_span_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "span", 32);
    \u0275\u0275text(2, " Signing in... ");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.email = "";
    this.password = "";
    this.loading = false;
    this.error = "";
    this.success = false;
    this.showPassword = false;
  }
  ngOnInit() {
    this.authService.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {
        this.router.navigate(["/dashboard"]);
      }
    });
  }
  onSubmit() {
    this.error = "";
    this.success = false;
    if (!this.email || !this.password) {
      this.error = "Email and password are required";
      return;
    }
    if (!this.isValidEmail(this.email)) {
      this.error = "Please enter a valid email address";
      return;
    }
    this.loading = true;
    const credentials = {
      email: this.email,
      password: this.password
    };
    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = true;
          this.error = "";
          this.email = "";
          this.password = "";
          setTimeout(() => {
            this.router.navigate(["/dashboard"]);
          }, 1500);
        } else {
          this.error = response.error || "Login failed";
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || "Login failed. Please try again.";
        this.loading = false;
      }
    });
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  navigateToSignup() {
    this.router.navigate(["/signup"]);
  }
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 43, vars: 16, consts: [[1, "login-center"], [1, "login-container"], [1, "login-header"], [1, "logo"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"], [1, "login-form", 3, "ngSubmit"], ["class", "alert alert-error", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], [1, "form-group"], ["for", "email", 1, "form-label"], ["type", "email", "id", "email", "name", "email", "placeholder", "you@example.com", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled"], ["for", "password", 1, "form-label"], [1, "password-input-group"], ["id", "password", "name", "password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "required", "", 1, "form-input", 3, "ngModelChange", "type", "ngModel", "disabled"], ["type", "button", 1, "password-toggle", 3, "click", "disabled"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "fill", "currentColor", 4, "ngIf"], [1, "form-actions"], [1, "checkbox"], ["type", "checkbox", 3, "disabled"], ["href", "#", 1, "forgot-password"], ["type", "submit", 1, "submit-btn", 3, "disabled"], [4, "ngIf"], [1, "signup-link"], ["href", "#", 3, "click"], [1, "login-footer"], [1, "alert", "alert-error"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"], [1, "alert", "alert-success"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"], ["d", "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"], ["d", "M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm5.31-5.78l1.15 1.15c.31-.02.65-.03 1.02-.03 5 0 9.27 3.11 11 7.5-.9 2.35-2.54 4.35-4.64 5.7l.98.98c.5-.32.99-.67 1.46-1.04.5-.39.97-.8 1.42-1.24-.43.56-.9 1.1-1.4 1.62.34-.26.67-.55.99-.86-.34.34-.69.66-1.04.97.37-.28.73-.58 1.08-.9-.37.37-.77.71-1.17 1.03.41-.23.81-.49 1.2-.76zM12 9c-1.66 0-3 1.34-3 3 0 .35.07.69.18 1.02l2.85-2.85c-.33-.11-.67-.17-1.03-.17z"], [1, "spinner"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(4, "svg", 4);
        \u0275\u0275element(5, "path", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "h1");
        \u0275\u0275text(7, "Welcome Back");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p");
        \u0275\u0275text(9, "Sign in to your account");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "form", 6);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_10_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275template(11, LoginComponent_div_11_Template, 5, 1, "div", 7)(12, LoginComponent_div_12_Template, 5, 0, "div", 8);
        \u0275\u0275elementStart(13, "div", 9)(14, "label", 10);
        \u0275\u0275text(15, "Email Address");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "input", 11);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_16_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "div", 9)(18, "label", 12);
        \u0275\u0275text(19, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 13)(21, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_21_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "button", 15);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_22_listener() {
          return ctx.togglePasswordVisibility();
        });
        \u0275\u0275template(23, LoginComponent__svg_svg_23_Template, 2, 0, "svg", 16)(24, LoginComponent__svg_svg_24_Template, 2, 0, "svg", 16);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(25, "div", 17)(26, "label", 18);
        \u0275\u0275element(27, "input", 19);
        \u0275\u0275elementStart(28, "span");
        \u0275\u0275text(29, "Remember me");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "a", 20);
        \u0275\u0275text(31, "Forgot password?");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(32, "button", 21);
        \u0275\u0275template(33, LoginComponent_span_33_Template, 2, 0, "span", 22)(34, LoginComponent_span_34_Template, 3, 0, "span", 22);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "div", 23)(36, "p");
        \u0275\u0275text(37, "Don't have an account? ");
        \u0275\u0275elementStart(38, "a", 24);
        \u0275\u0275listener("click", function LoginComponent_Template_a_click_38_listener($event) {
          ctx.navigateToSignup();
          return $event.preventDefault();
        });
        \u0275\u0275text(39, "Sign up here");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(40, "div", 25)(41, "p");
        \u0275\u0275text(42, "\xA9 2026 Pohlim Monorepo. All rights reserved.");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.success);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.email);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(5);
        \u0275\u0275property("type", ctx.showPassword ? "text" : "password");
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showPassword);
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(5);
        \u0275\u0275classProp("loading", ctx.loading);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ['\n\n.login-center[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    Oxygen,\n    Ubuntu,\n    Cantarell,\n    "Helvetica Neue",\n    sans-serif;\n  padding: 1rem;\n}\n.login-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);\n  width: 100%;\n  max-width: 420px;\n  padding: 2.5rem;\n}\n.login-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.logo[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  margin: 0 auto 1rem;\n  color: #667eea;\n  animation: _ngcontent-%COMP%_slideDown 0.6s ease-out;\n}\n.logo[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.login-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  color: #1a202c;\n  margin: 0 0 0.5rem;\n  font-weight: 700;\n}\n.login-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #718096;\n  font-size: 0.95rem;\n  margin: 0;\n}\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1.25rem;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 0.9rem;\n  animation: _ngcontent-%COMP%_slideInDown 0.4s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.alert[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  flex-shrink: 0;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background-color: #fee;\n  color: #c33;\n  border: 1px solid #fcc;\n}\n.alert-error[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #c33;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background-color: #efe;\n  color: #3c3;\n  border: 1px solid #cfc;\n}\n.alert-success[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  color: #3c3;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #2d3748;\n  font-size: 0.95rem;\n}\n.form-input[_ngcontent-%COMP%] {\n  padding: 0.75rem 1rem;\n  border: 2px solid #e2e8f0;\n  border-radius: 8px;\n  font-size: 1rem;\n  transition: all 0.3s ease;\n  font-family: inherit;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-input[_ngcontent-%COMP%]:disabled {\n  background-color: #f7fafc;\n  color: #a0aec0;\n  cursor: not-allowed;\n}\n.password-input-group[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.password-input-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding-right: 2.75rem;\n}\n.password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  background: none;\n  border: none;\n  color: #718096;\n  cursor: pointer;\n  padding: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: color 0.3s ease;\n}\n.password-toggle[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #667eea;\n}\n.password-toggle[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.password-toggle[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 0.9rem;\n  gap: 1rem;\n}\n.checkbox[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  cursor: pointer;\n  color: #4a5568;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.checkbox[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  cursor: pointer;\n  accent-color: #667eea;\n}\n.forgot-password[_ngcontent-%COMP%] {\n  color: #667eea;\n  text-decoration: none;\n  font-weight: 500;\n  transition: color 0.3s ease;\n}\n.forgot-password[_ngcontent-%COMP%]:hover {\n  color: #5568d3;\n  text-decoration: underline;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  padding: 0.875rem 1rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n  margin-top: 0.5rem;\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);\n}\n.submit-btn[_ngcontent-%COMP%]:active:not(:disabled) {\n  transform: translateY(0);\n}\n.submit-btn[_ngcontent-%COMP%]:disabled, \n.submit-btn.loading[_ngcontent-%COMP%] {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.spinner[_ngcontent-%COMP%] {\n  display: inline-block;\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top-color: white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.signup-link[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.9rem;\n  color: #4a5568;\n  margin-top: 1rem;\n}\n.signup-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #667eea;\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.3s ease;\n}\n.signup-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #5568d3;\n  text-decoration: underline;\n}\n.test-credentials[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  padding-top: 1.5rem;\n  border-top: 1px solid #e2e8f0;\n}\n.test-credentials[_ngcontent-%COMP%]   details[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.test-credentials[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%] {\n  color: #667eea;\n  font-weight: 500;\n  font-size: 0.9rem;\n  padding: 0.5rem;\n  border-radius: 4px;\n  transition: background-color 0.3s ease;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.test-credentials[_ngcontent-%COMP%]   summary[_ngcontent-%COMP%]:hover {\n  background-color: #f7fafc;\n}\n.credentials-list[_ngcontent-%COMP%] {\n  margin-top: 1rem;\n  display: grid;\n  gap: 0.75rem;\n  background-color: #f7fafc;\n  padding: 1rem;\n  border-radius: 8px;\n}\n.credential-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 0.75rem;\n  font-size: 0.85rem;\n}\n.credential-item[_ngcontent-%COMP%]   .label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #4a5568;\n  min-width: 70px;\n}\n.credential-item[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #2d3748;\n  word-break: break-all;\n  font-family:\n    "Monaco",\n    "Courier New",\n    monospace;\n  background-color: white;\n  padding: 0.25rem 0.5rem;\n  border-radius: 4px;\n  flex: 1;\n}\n.login-footer[_ngcontent-%COMP%] {\n  margin-top: 2rem;\n  text-align: center;\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 0.85rem;\n}\n.login-footer[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n@media (max-width: 480px) {\n  .login-container[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .login-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .logo[_ngcontent-%COMP%] {\n    width: 50px;\n    height: 50px;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .credentials-list[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\components\\login.component.ts", lineNumber: 15 });
})();

// src/app/components/signup.component.ts
function SignupComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 4);
    \u0275\u0275element(2, "path", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
function SignupComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 4);
    \u0275\u0275element(2, "path", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Account created! Logging you in...");
    \u0275\u0275elementEnd()();
  }
}
function SignupComponent__svg_svg_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 4);
    \u0275\u0275element(1, "path", 42);
    \u0275\u0275elementEnd();
  }
}
function SignupComponent__svg_svg_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 4);
    \u0275\u0275element(1, "path", 43);
    \u0275\u0275elementEnd();
  }
}
function SignupComponent__svg_svg_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 4);
    \u0275\u0275element(1, "path", 42);
    \u0275\u0275elementEnd();
  }
}
function SignupComponent__svg_svg_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 4);
    \u0275\u0275element(1, "path", 43);
    \u0275\u0275elementEnd();
  }
}
function SignupComponent_span_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Create Account");
    \u0275\u0275elementEnd();
  }
}
function SignupComponent_span_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275element(1, "span", 44);
    \u0275\u0275text(2, " Creating account... ");
    \u0275\u0275elementEnd();
  }
}
var SignupComponent = class _SignupComponent {
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.username = "";
    this.password = "";
    this.confirmPassword = "";
    this.phone = "";
    this.city = "";
    this.country = "";
    this.loading = false;
    this.error = "";
    this.success = false;
    this.showPassword = false;
    this.showConfirmPassword = false;
  }
  get passwordsMatch() {
    return this.password === this.confirmPassword && this.password.length > 0;
  }
  get isFormValid() {
    return this.firstName.trim() !== "" && this.lastName.trim() !== "" && this.email.trim() !== "" && this.username.trim() !== "" && this.password.length >= 6 && this.passwordsMatch;
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  onSubmit() {
    if (!this.isFormValid) {
      this.error = "Please fill in all required fields correctly";
      return;
    }
    this.loading = true;
    this.error = "";
    const createUserRequest = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim(),
      username: this.username.trim(),
      password: this.password,
      phone: this.phone.trim() || void 0,
      city: this.city.trim() || void 0,
      country: this.country.trim() || void 0
    };
    this.authService.register(createUserRequest).subscribe({
      next: (response) => {
        console.log("Registration successful:", response);
        this.success = true;
        this.error = "";
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(["/dashboard"]);
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || "Registration failed. Please try again.";
        console.error("Registration error:", err);
      }
    });
  }
  navigateToLogin() {
    this.router.navigate(["/login"]);
  }
  static {
    this.\u0275fac = function SignupComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SignupComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SignupComponent, selectors: [["app-signup"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 74, vars: 37, consts: [[1, "signup-center"], [1, "signup-container"], [1, "signup-header"], [1, "logo"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"], [1, "signup-form", 3, "ngSubmit"], ["class", "alert alert-error", 4, "ngIf"], ["class", "alert alert-success", 4, "ngIf"], [1, "form-row"], [1, "form-group"], ["for", "firstName", 1, "form-label"], ["type", "text", "id", "firstName", "name", "firstName", "placeholder", "John", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled"], ["for", "lastName", 1, "form-label"], ["type", "text", "id", "lastName", "name", "lastName", "placeholder", "Doe", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled"], ["for", "email", 1, "form-label"], ["type", "email", "id", "email", "name", "email", "placeholder", "john@example.com", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled"], ["for", "username", 1, "form-label"], ["type", "text", "id", "username", "name", "username", "placeholder", "johndoe24", "required", "", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled"], ["for", "password", 1, "form-label"], [1, "password-input-group"], ["id", "password", "name", "password", "placeholder", "At least 6 characters", "minlength", "6", "required", "", 1, "form-input", 3, "ngModelChange", "type", "ngModel", "disabled"], ["type", "button", 1, "password-toggle", 3, "click", "disabled"], ["xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 24 24", "fill", "currentColor", 4, "ngIf"], [1, "password-requirement"], ["for", "confirmPassword", 1, "form-label"], ["id", "confirmPassword", "name", "confirmPassword", "placeholder", "Repeat password", "required", "", 1, "form-input", 3, "ngModelChange", "type", "ngModel", "disabled"], ["for", "phone", 1, "form-label"], ["type", "tel", "id", "phone", "name", "phone", "placeholder", "+1 (555) 000-0000", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled"], ["for", "city", 1, "form-label"], ["type", "text", "id", "city", "name", "city", "placeholder", "New York", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled"], ["for", "country", 1, "form-label"], ["type", "text", "id", "country", "name", "country", "placeholder", "United States", 1, "form-input", 3, "ngModelChange", "ngModel", "disabled"], ["type", "submit", 1, "submit-btn", 3, "disabled"], [4, "ngIf"], [1, "login-link"], ["href", "#", 3, "click"], [1, "signup-footer"], [1, "alert", "alert-error"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"], [1, "alert", "alert-success"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"], ["d", "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"], ["d", "M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm5.31-5.78l1.15 1.15c.31-.02.65-.03 1.02-.03 5 0 9.27 3.11 11 7.5-.9 2.35-2.54 4.35-4.64 5.7l.98.98c.5-.32.99-.67 1.46-1.04.5-.39.97-.8 1.42-1.24-.43.56-.9 1.1-1.4 1.62.34-.26.67-.55.99-.86-.34.34-.69.66-1.04.97.37-.28.73-.58 1.08-.9-.37.37-.77.71-1.17 1.03.41-.23.81-.49 1.2-.76zM12 9c-1.66 0-3 1.34-3 3 0 .35.07.69.18 1.02l2.85-2.85c-.33-.11-.67-.17-1.03-.17z"], [1, "spinner"]], template: function SignupComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(4, "svg", 4);
        \u0275\u0275element(5, "path", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "h1");
        \u0275\u0275text(7, "Create Account");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p");
        \u0275\u0275text(9, "Join us today and get started");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "form", 6);
        \u0275\u0275listener("ngSubmit", function SignupComponent_Template_form_ngSubmit_10_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275template(11, SignupComponent_div_11_Template, 5, 1, "div", 7)(12, SignupComponent_div_12_Template, 5, 0, "div", 8);
        \u0275\u0275elementStart(13, "div", 9)(14, "div", 10)(15, "label", 11);
        \u0275\u0275text(16, "First Name");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "input", 12);
        \u0275\u0275twoWayListener("ngModelChange", function SignupComponent_Template_input_ngModelChange_17_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.firstName, $event) || (ctx.firstName = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 10)(19, "label", 13);
        \u0275\u0275text(20, "Last Name");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function SignupComponent_Template_input_ngModelChange_21_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.lastName, $event) || (ctx.lastName = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(22, "div", 10)(23, "label", 15);
        \u0275\u0275text(24, "Email Address");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "input", 16);
        \u0275\u0275twoWayListener("ngModelChange", function SignupComponent_Template_input_ngModelChange_25_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 10)(27, "label", 17);
        \u0275\u0275text(28, "Username");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(29, "input", 18);
        \u0275\u0275twoWayListener("ngModelChange", function SignupComponent_Template_input_ngModelChange_29_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.username, $event) || (ctx.username = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "div", 10)(31, "label", 19);
        \u0275\u0275text(32, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "div", 20)(34, "input", 21);
        \u0275\u0275twoWayListener("ngModelChange", function SignupComponent_Template_input_ngModelChange_34_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(35, "button", 22);
        \u0275\u0275listener("click", function SignupComponent_Template_button_click_35_listener() {
          return ctx.togglePasswordVisibility();
        });
        \u0275\u0275template(36, SignupComponent__svg_svg_36_Template, 2, 0, "svg", 23)(37, SignupComponent__svg_svg_37_Template, 2, 0, "svg", 23);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "small", 24);
        \u0275\u0275text(39, " At least 6 characters ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(40, "div", 10)(41, "label", 25);
        \u0275\u0275text(42, "Confirm Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "div", 20)(44, "input", 26);
        \u0275\u0275twoWayListener("ngModelChange", function SignupComponent_Template_input_ngModelChange_44_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.confirmPassword, $event) || (ctx.confirmPassword = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "button", 22);
        \u0275\u0275listener("click", function SignupComponent_Template_button_click_45_listener() {
          return ctx.toggleConfirmPasswordVisibility();
        });
        \u0275\u0275template(46, SignupComponent__svg_svg_46_Template, 2, 0, "svg", 23)(47, SignupComponent__svg_svg_47_Template, 2, 0, "svg", 23);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "small", 24);
        \u0275\u0275text(49, " Passwords must match ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(50, "div", 9)(51, "div", 10)(52, "label", 27);
        \u0275\u0275text(53, "Phone (Optional)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "input", 28);
        \u0275\u0275twoWayListener("ngModelChange", function SignupComponent_Template_input_ngModelChange_54_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.phone, $event) || (ctx.phone = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(55, "div", 10)(56, "label", 29);
        \u0275\u0275text(57, "City (Optional)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "input", 30);
        \u0275\u0275twoWayListener("ngModelChange", function SignupComponent_Template_input_ngModelChange_58_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.city, $event) || (ctx.city = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(59, "div", 10)(60, "label", 31);
        \u0275\u0275text(61, "Country (Optional)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(62, "input", 32);
        \u0275\u0275twoWayListener("ngModelChange", function SignupComponent_Template_input_ngModelChange_62_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.country, $event) || (ctx.country = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(63, "button", 33);
        \u0275\u0275template(64, SignupComponent_span_64_Template, 2, 0, "span", 34)(65, SignupComponent_span_65_Template, 3, 0, "span", 34);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(66, "div", 35)(67, "p");
        \u0275\u0275text(68, "Already have an account? ");
        \u0275\u0275elementStart(69, "a", 36);
        \u0275\u0275listener("click", function SignupComponent_Template_a_click_69_listener($event) {
          ctx.navigateToLogin();
          return $event.preventDefault();
        });
        \u0275\u0275text(70, "Sign in here");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(71, "div", 37)(72, "p");
        \u0275\u0275text(73, "\xA9 2026 Pohlim Monorepo. All rights reserved.");
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(11);
        \u0275\u0275property("ngIf", ctx.error);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.success);
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.firstName);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.lastName);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.email);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.username);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(5);
        \u0275\u0275property("type", ctx.showPassword ? "text" : "password");
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275classProp("valid", ctx.password.length >= 6);
        \u0275\u0275advance(6);
        \u0275\u0275property("type", ctx.showConfirmPassword ? "text" : "password");
        \u0275\u0275twoWayProperty("ngModel", ctx.confirmPassword);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.showConfirmPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showConfirmPassword);
        \u0275\u0275advance();
        \u0275\u0275classProp("valid", ctx.passwordsMatch);
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.phone);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.city);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.country);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275classProp("loading", ctx.loading);
        \u0275\u0275property("disabled", !ctx.isFormValid || ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MinLengthValidator, NgModel, NgForm], styles: ["\n\n.signup-center[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding: 2rem;\n}\n.signup-container[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);\n  width: 100%;\n  max-width: 450px;\n  padding: 2.5rem;\n  animation: _ngcontent-%COMP%_slideInDown 0.5s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideInDown {\n  from {\n    opacity: 0;\n    transform: translateY(-30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.signup-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.logo[_ngcontent-%COMP%] {\n  width: 60px;\n  height: 60px;\n  margin: 0 auto 1rem;\n  color: #667eea;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #f0f2ff;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_slideDown 0.6s ease-out;\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.signup-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 1.8rem;\n  margin-bottom: 0.5rem;\n}\n.signup-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 0.95rem;\n}\n.signup-form[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n}\n.alert[_ngcontent-%COMP%] {\n  padding: 1rem;\n  border-radius: 8px;\n  margin-bottom: 1.5rem;\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 0.9rem;\n  animation: _ngcontent-%COMP%_slideDown 0.4s ease-out;\n}\n.alert[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  flex-shrink: 0;\n}\n.alert-error[_ngcontent-%COMP%] {\n  background-color: #f8d7da;\n  color: #721c24;\n  border: 1px solid #f5c6cb;\n}\n.alert-success[_ngcontent-%COMP%] {\n  background-color: #d4edda;\n  color: #155724;\n  border: 1px solid #c3e6cb;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 1rem;\n  margin-bottom: 1rem;\n}\n.form-group[_ngcontent-%COMP%] {\n  margin-bottom: 1.25rem;\n}\n.form-group[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.form-label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 0.5rem;\n  color: #333;\n  font-weight: 600;\n  font-size: 0.9rem;\n}\n.form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.75rem 1rem;\n  border: 2px solid #e0e0e0;\n  border-radius: 6px;\n  font-size: 0.95rem;\n  transition: all 0.3s ease;\n  box-sizing: border-box;\n}\n.form-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #667eea;\n  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);\n}\n.form-input[_ngcontent-%COMP%]:disabled {\n  background-color: #f5f5f5;\n  color: #999;\n  cursor: not-allowed;\n}\n.password-input-group[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n}\n.password-input-group[_ngcontent-%COMP%]   .form-input[_ngcontent-%COMP%] {\n  padding-right: 2.5rem;\n}\n.password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  transform: translateY(-50%);\n  background: none;\n  border: none;\n  cursor: pointer;\n  color: #999;\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  transition: color 0.3s ease;\n}\n.password-toggle[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: #667eea;\n}\n.password-toggle[_ngcontent-%COMP%]:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.password-toggle[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n.password-requirement[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 0.4rem;\n  font-size: 0.8rem;\n  color: #999;\n  transition: color 0.3s ease;\n}\n.password-requirement.valid[_ngcontent-%COMP%] {\n  color: #28a745;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 0.875rem;\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  border: none;\n  border-radius: 6px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  margin-top: 1.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 0.5rem;\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);\n}\n.submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.submit-btn.loading[_ngcontent-%COMP%] {\n  opacity: 0.8;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(255, 255, 255, 0.3);\n  border-top: 2px solid white;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.login-link[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 1.5rem;\n  font-size: 0.9rem;\n  color: #666;\n}\n.login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #667eea;\n  text-decoration: none;\n  font-weight: 600;\n  transition: color 0.3s ease;\n}\n.login-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  color: #764ba2;\n  text-decoration: underline;\n}\n.signup-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 2rem;\n  color: rgba(255, 255, 255, 0.8);\n  font-size: 0.9rem;\n}\n@media (max-width: 480px) {\n  .signup-container[_ngcontent-%COMP%] {\n    padding: 1.5rem;\n  }\n  .signup-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .form-input[_ngcontent-%COMP%] {\n    padding: 0.65rem 0.9rem;\n    font-size: 0.9rem;\n  }\n}\n@keyframes _ngcontent-%COMP%_slideDown {\n  from {\n    opacity: 0;\n    transform: translateY(-20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n/*# sourceMappingURL=signup.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SignupComponent, { className: "SignupComponent", filePath: "src\\app\\components\\signup.component.ts", lineNumber: 15 });
})();

// src/app/auth/auth-routing.module.ts
var routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "", redirectTo: "login", pathMatch: "full" }
];
var AuthRoutingModule = class _AuthRoutingModule {
  static {
    this.\u0275fac = function AuthRoutingModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthRoutingModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthRoutingModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
  }
};

// src/app/auth/auth.module.ts
var AuthModule = class _AuthModule {
  static {
    this.\u0275fac = function AuthModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _AuthModule });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [
      AuthRoutingModule,
      LoginComponent,
      SignupComponent
    ] });
  }
};
export {
  AuthModule
};
//# sourceMappingURL=auth.module-O4J25JPS.js.map
