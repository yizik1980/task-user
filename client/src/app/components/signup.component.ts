import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CreateUserRequest } from '@shared/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SignupComponent {
  @Output() switchToLogin = new EventEmitter<void>();

  firstName = '';
  lastName = '';
  email = '';
  username = '';
  password = '';
  confirmPassword = '';
  phone = '';
  city = '';
  country = '';
  loading = false;
  error = '';
  success = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private authService: AuthService) {}

  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword && this.password.length > 0;
  }

  get isFormValid(): boolean {
    return (
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.email.trim() !== '' &&
      this.username.trim() !== '' &&
      this.password.length >= 6 &&
      this.passwordsMatch
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    if (!this.isFormValid) {
      this.error = 'Please fill in all required fields correctly';
      return;
    }

    this.loading = true;
    this.error = '';

    const createUserRequest: CreateUserRequest = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim(),
      username: this.username.trim(),
      password: this.password,
      phone: this.phone.trim() || undefined,
      city: this.city.trim() || undefined,
      country: this.country.trim() || undefined
    };

    this.authService.register(createUserRequest).subscribe({
      next: (response) => {
        this.success = true;
        this.error = '';
        
        // Reset form
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.username = '';
        this.password = '';
        this.confirmPassword = '';
        this.phone = '';
        this.city = '';
        this.country = '';
        this.loading = false;

        // Switch to login after 2 seconds
        setTimeout(() => {
          this.switchToLogin.emit();
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Registration failed. Please try again.';
        console.error('Registration error:', err);
      }
    });
  }

  navigateToLogin(): void {
    this.switchToLogin.emit();
  }
}
