import {
  BehaviorSubject,
  HttpClient,
  Observable,
  __spreadValues,
  catchError,
  finalize,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6V5F7FDL.js";

// src/app/services/dialog.service.ts
var DialogService = class _DialogService {
  constructor() {
    this.dialogState$ = new BehaviorSubject({
      isOpen: false,
      config: {}
    });
  }
  open(config) {
    this.dialogState$.next({
      isOpen: true,
      config: __spreadValues({
        canClose: true,
        closeOnBackdropClick: true
      }, config)
    });
    return this.getDialogState();
  }
  close() {
    this.dialogState$.next({
      isOpen: false,
      config: {}
    });
  }
  getDialogState() {
    return this.dialogState$.asObservable();
  }
  isOpen() {
    return this.dialogState$.value.isOpen;
  }
  getConfig() {
    return this.dialogState$.value.config;
  }
  confirm(title, message) {
    return new Observable((observer) => {
      this.open({
        title,
        message,
        actions: [
          {
            label: "Cancel",
            type: "secondary",
            callback: () => {
              observer.next(false);
              observer.complete();
              this.close();
            }
          },
          {
            label: "Confirm",
            type: "primary",
            callback: () => {
              observer.next(true);
              observer.complete();
              this.close();
            }
          }
        ]
      });
    });
  }
  alert(title, message) {
    return new Observable((observer) => {
      this.open({
        title,
        message,
        actions: [
          {
            label: "OK",
            type: "primary",
            callback: () => {
              observer.next();
              observer.complete();
              this.close();
            }
          }
        ]
      });
    });
  }
  success(title, message) {
    return new Observable((observer) => {
      this.open({
        title,
        message,
        actions: [
          {
            label: "OK",
            type: "primary",
            callback: () => {
              observer.next();
              observer.complete();
              this.close();
            }
          }
        ]
      });
    });
  }
  error(title, message) {
    return new Observable((observer) => {
      this.open({
        title,
        message,
        actions: [
          {
            label: "Close",
            type: "danger",
            callback: () => {
              observer.next();
              observer.complete();
              this.close();
            }
          }
        ]
      });
    });
  }
  static {
    this.\u0275fac = function DialogService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DialogService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DialogService, factory: _DialogService.\u0275fac, providedIn: "root" });
  }
};

// src/app/services/http.service.ts
var HttpService = class _HttpService {
  constructor(http) {
    this.http = http;
    this.loading$ = new BehaviorSubject(false);
    this.baseUrl = "http://localhost:3000/api";
  }
  /**
   * Get loading state as observable
   */
  getLoading() {
    return this.loading$.asObservable();
  }
  /**
   * Check if any request is in progress
   */
  isLoading() {
    return this.loading$.value;
  }
  /**
   * Generic GET request
   */
  get(endpoint, options) {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.get(`${this.baseUrl}${endpoint}`, httpOptions).pipe(finalize(() => this.loading$.next(false)), catchError(this.handleError));
  }
  /**
   * Generic POST request
   */
  post(endpoint, body = {}, options) {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.post(`${this.baseUrl}${endpoint}`, body, httpOptions).pipe(finalize(() => this.loading$.next(false)), catchError(this.handleError));
  }
  /**
   * Generic PUT request
   */
  put(endpoint, body = {}, options) {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.put(`${this.baseUrl}${endpoint}`, body, httpOptions).pipe(finalize(() => this.loading$.next(false)), catchError(this.handleError));
  }
  /**
   * Generic PATCH request
   */
  patch(endpoint, body = {}, options) {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.patch(`${this.baseUrl}${endpoint}`, body, httpOptions).pipe(finalize(() => this.loading$.next(false)), catchError(this.handleError));
  }
  /**
   * Generic DELETE request
   */
  delete(endpoint, options) {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.delete(`${this.baseUrl}${endpoint}`, httpOptions).pipe(finalize(() => this.loading$.next(false)), catchError(this.handleError));
  }
  /**
   * Request with custom base URL
   */
  getWithCustomUrl(url, options) {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.get(url, httpOptions).pipe(finalize(() => this.loading$.next(false)), catchError(this.handleError));
  }
  /**
   * POST request with custom base URL
   */
  postWithCustomUrl(url, body = {}, options) {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.post(url, body, httpOptions).pipe(finalize(() => this.loading$.next(false)), catchError(this.handleError));
  }
  /**
   * Build HTTP request options
   */
  buildHttpRequestOptions(options) {
    const builtOptions = {};
    if (options?.headers) {
      builtOptions.headers = options.headers;
    }
    if (options?.params) {
      builtOptions.params = options.params;
    }
    if (options?.withCredentials !== void 0) {
      builtOptions.withCredentials = options.withCredentials;
    }
    return builtOptions;
  }
  /**
   * Error handler
   */
  handleError(error) {
    let errorMessage = "An error occurred";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.error?.error) {
        errorMessage = error.error.error;
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}
Message: ${error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => ({
      status: error.status,
      message: errorMessage,
      error: error.error
    }));
  }
  /**
   * Set custom base URL
   */
  setBaseUrl(url) {
    this.baseUrl = url;
  }
  /**
   * Get current base URL
   */
  getBaseUrl() {
    return this.baseUrl;
  }
  static {
    this.\u0275fac = function HttpService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HttpService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _HttpService, factory: _HttpService.\u0275fac, providedIn: "root" });
  }
};

// src/app/services/api.service.ts
var ApiService = class _ApiService {
  constructor(httpService) {
    this.httpService = httpService;
  }
  /**
   * Get all items from an endpoint
   */
  getAll(endpoint, options) {
    return this.httpService.get(endpoint, options);
  }
  /**
   * Get a single item by ID
   */
  getById(endpoint, id, options) {
    return this.httpService.get(`${endpoint}/${id}`, options);
  }
  /**
   * Create a new item
   */
  create(endpoint, data, options) {
    return this.httpService.post(endpoint, data, options);
  }
  /**
   * Update an existing item
   */
  update(endpoint, id, data, options) {
    return this.httpService.put(`${endpoint}/${id}`, data, options);
  }
  /**
   * Update an existing item (partial update)
   */
  partialUpdate(endpoint, id, data, options) {
    return this.httpService.patch(`${endpoint}/${id}`, data, options);
  }
  /**
   * Delete an item
   */
  delete(endpoint, id, options) {
    return this.httpService.delete(`${endpoint}/${id}`, options);
  }
  /**
   * Execute custom GET request
   */
  customGet(endpoint, options) {
    return this.httpService.get(endpoint, options);
  }
  /**
   * Execute custom POST request
   */
  customPost(endpoint, data, options) {
    return this.httpService.post(endpoint, data || {}, options);
  }
  /**
   * Execute custom PUT request
   */
  customPut(endpoint, data, options) {
    return this.httpService.put(endpoint, data || {}, options);
  }
  /**
   * Execute custom PATCH request
   */
  customPatch(endpoint, data, options) {
    return this.httpService.patch(endpoint, data || {}, options);
  }
  /**
   * Execute custom DELETE request
   */
  customDelete(endpoint, options) {
    return this.httpService.delete(endpoint, options);
  }
  /**
   * Get loading state
   */
  getLoading() {
    return this.httpService.getLoading();
  }
  /**
   * Check if loading
   */
  isLoading() {
    return this.httpService.isLoading();
  }
  static {
    this.\u0275fac = function ApiService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ApiService)(\u0275\u0275inject(HttpService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
  }
};

// src/app/services/user.service.ts
var UserService = class _UserService {
  constructor(apiService) {
    this.apiService = apiService;
    this.endpoint = "/users";
  }
  getAllUsers() {
    return this.apiService.getAll(this.endpoint);
  }
  getActiveUsers() {
    return this.apiService.customGet(`${this.endpoint}/active`);
  }
  getUserById(id) {
    return this.apiService.getById(this.endpoint, id);
  }
  createUser(user) {
    return this.apiService.create(this.endpoint, user);
  }
  updateUser(id, user) {
    return this.apiService.update(this.endpoint, id, user);
  }
  deleteUser(id) {
    return this.apiService.delete(this.endpoint, id);
  }
  static {
    this.\u0275fac = function UserService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _UserService)(\u0275\u0275inject(ApiService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserService, factory: _UserService.\u0275fac, providedIn: "root" });
  }
};

// src/app/services/task.service.ts
var TaskService = class _TaskService {
  constructor(apiService) {
    this.apiService = apiService;
    this.endpoint = "/tasks";
  }
  getAllTasks() {
    return this.apiService.getAll(this.endpoint);
  }
  getTaskById(id) {
    return this.apiService.getById(this.endpoint, id);
  }
  getTasksByUserId(userId) {
    return this.apiService.customGet(`${this.endpoint}/user/${userId}`);
  }
  getTasksByUserIdAndStatus(userId, status) {
    return this.apiService.customGet(`${this.endpoint}/user/${userId}/${status}`);
  }
  getPendingTasks() {
    return this.apiService.customGet(`${this.endpoint}/status/pending`);
  }
  getHighPriorityTasks() {
    return this.apiService.customGet(`${this.endpoint}/priority/high`);
  }
  getOverdueTasks() {
    return this.apiService.customGet(`${this.endpoint}/overdue`);
  }
  getTasksByDateRange(startDate, endDate) {
    return this.apiService.customGet(`${this.endpoint}?startDate=${startDate}&endDate=${endDate}`);
  }
  createTask(task) {
    return this.apiService.create(this.endpoint, task);
  }
  updateTask(id, task) {
    return this.apiService.update(this.endpoint, id, task);
  }
  completeTask(id) {
    return this.apiService.customPatch(`${this.endpoint}/${id}/complete`, {});
  }
  deleteTask(id) {
    return this.apiService.delete(this.endpoint, id);
  }
  static {
    this.\u0275fac = function TaskService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TaskService)(\u0275\u0275inject(ApiService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TaskService, factory: _TaskService.\u0275fac, providedIn: "root" });
  }
};

export {
  DialogService,
  UserService,
  TaskService
};
//# sourceMappingURL=chunk-CRENEFZN.js.map
