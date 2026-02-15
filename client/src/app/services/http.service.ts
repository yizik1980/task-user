import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string };
  params?: HttpParams | { [param: string]: string | string[] };
  responseType?: 'json' | 'text' | 'blob';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private loading$ = new BehaviorSubject<boolean>(false);
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /**
   * Get loading state as observable
   */
  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  /**
   * Check if any request is in progress
   */
  isLoading(): boolean {
    return this.loading$.value;
  }

  /**
   * Generic GET request
   */
  get<T = any>(endpoint: string, options?: HttpOptions): Observable<T> {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, httpOptions).pipe(
      finalize(() => this.loading$.next(false)),
      catchError(this.handleError)
    );
  }

  /**
   * Generic POST request
   */
  post<T = any>(endpoint: string, body: any = {}, options?: HttpOptions): Observable<T> {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, httpOptions).pipe(
      finalize(() => this.loading$.next(false)),
      catchError(this.handleError)
    );
  }

  /**
   * Generic PUT request
   */
  put<T = any>(endpoint: string, body: any = {}, options?: HttpOptions): Observable<T> {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, httpOptions).pipe(
      finalize(() => this.loading$.next(false)),
      catchError(this.handleError)
    );
  }

  /**
   * Generic PATCH request
   */
  patch<T = any>(endpoint: string, body: any = {}, options?: HttpOptions): Observable<T> {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, body, httpOptions).pipe(
      finalize(() => this.loading$.next(false)),
      catchError(this.handleError)
    );
  }

  /**
   * Generic DELETE request
   */
  delete<T = any>(endpoint: string, options?: HttpOptions): Observable<T> {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, httpOptions).pipe(
      finalize(() => this.loading$.next(false)),
      catchError(this.handleError)
    );
  }

  /**
   * Request with custom base URL
   */
  getWithCustomUrl<T = any>(url: string, options?: HttpOptions): Observable<T> {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.get<T>(url, httpOptions).pipe(
      finalize(() => this.loading$.next(false)),
      catchError(this.handleError)
    );
  }

  /**
   * POST request with custom base URL
   */
  postWithCustomUrl<T = any>(url: string, body: any = {}, options?: HttpOptions): Observable<T> {
    this.loading$.next(true);
    const httpOptions = this.buildHttpRequestOptions(options);
    return this.http.post<T>(url, body, httpOptions).pipe(
      finalize(() => this.loading$.next(false)),
      catchError(this.handleError)
    );
  }

  /**
   * Build HTTP request options
   */
  private buildHttpRequestOptions(options?: HttpOptions): { headers?: HttpHeaders | { [header: string]: string }; params?: HttpParams | { [param: string]: string | string[] }; withCredentials?: boolean } {
    const builtOptions: any = {};

    if (options?.headers) {
      builtOptions.headers = options.headers;
    }

    if (options?.params) {
      builtOptions.params = options.params;
    }

    if (options?.withCredentials !== undefined) {
      builtOptions.withCredentials = options.withCredentials;
    }

    return builtOptions;
  }

  /**
   * Error handler
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.error?.error) {
        errorMessage = error.error.error;
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
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
  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  /**
   * Get current base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}
