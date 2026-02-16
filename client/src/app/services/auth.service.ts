import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import {
  LoginRequest,
  LoginResponse,
  JWTPayload,
  AuthResponse,
  CreateUserRequest,
} from "@shared/models";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:3000/api/auth";
  private tokenKey = "auth_token";
  private isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());
  private currentUser$ = new BehaviorSubject<JWTPayload | null>(
    this.getStoredUser(),
  );

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            this.setToken(response.data.token);
            const payload: JWTPayload = {
              id: response.data.user.id,
              email: response.data.user.email,
              updatedAt: new Date(),
            };
            this.setUser(payload);
            this.isAuthenticated$.next(true);
          }
        }),
      );
  }

  register(userData: CreateUserRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            // Auto-login user after registration
            this.setToken(response.data.token);
            const payload: JWTPayload = {
              id: response.data.user.id,
              email: response.data.user.email,
              updatedAt: new Date(),
            };
            this.setUser(payload);
            this.isAuthenticated$.next(true);
          }
        }),
      );
  }

  logout(): void {
    this.removeToken();
    this.removeUser();
    this.isAuthenticated$.next(false);
    this.currentUser$.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  public getStoredUser(): JWTPayload | null {
    const userStr = localStorage.getItem("auth_user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  private setUser(user: JWTPayload): void {
    localStorage.setItem("auth_user", JSON.stringify(user));
    this.currentUser$.next(user);
  }

  private removeUser(): void {
    localStorage.removeItem("auth_user");
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  getCurrentUser(): Observable<JWTPayload | null> {
    return this.currentUser$.asObservable();
  }

  verifyToken(token: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/verify`, { token });
  }

  refreshToken(token: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/refresh`, { token })
      .pipe(
        tap((response) => {
          if (response.success && response.data) {
            this.setToken(response.data.token);
          }
        }),
      );
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      this.verifyToken(token).subscribe({
        next: (response) => {
          if (response.success) {
            this.isAuthenticated$.next(true);
          } else {
            this.logout();
          }
        },
        error: () => {
          this.logout();
        },
      });
    }
  }
}
