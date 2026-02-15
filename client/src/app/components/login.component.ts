import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '@shared/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent implements OnInit {
  @Output() switchToSignup = new EventEmitter<void>();

  email = '';
  password = '';
  loading = false;
  error = '';
  success = false;
  showPassword = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Redirect if already logged in
    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        // In a real app, use router to navigate to dashboard
        console.log('Already authenticated');
      }
    });
  }

  onSubmit(): void {
    // Clear previous messages
    this.error = '';
    this.success = false;

    // Validation
    if (!this.email || !this.password) {
      this.error = 'Email and password are required';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.error = 'Please enter a valid email address';
      return;
    }

    this.loading = true;

    const credentials: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        if (response.success) {
          this.success = true;
          this.error = '';
          this.email = '';
          this.password = '';
          // Redirect to dashboard (requires router)
          setTimeout(() => {
            console.log('Login successful, redirecting...');
          }, 1500);
        } else {
          this.error = response.error || 'Login failed';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Login failed. Please try again.';
        this.loading = false;
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  navigateToSignup(): void {
    this.switchToSignup.emit();
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
