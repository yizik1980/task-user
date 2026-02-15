import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Clone request with proper CORS headers
    let modifiedReq = req.clone({
      withCredentials: true,
      setHeaders: {
        'Content-Type': 'application/json',
      }
    });

    // Add authorization token if available
    if (token) {
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          // Network error or CORS issue
          console.error('CORS Error or Network Error:', error);
        } else if (error.status === 401) {
          // Unauthorized - clear auth and redirect to login
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}

