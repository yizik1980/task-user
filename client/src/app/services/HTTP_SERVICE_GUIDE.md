# Generic HTTP Service Usage Guide

## Overview

The application provides two main generic services for making API requests:

1. **HttpService** - Low-level HTTP client wrapper
2. **ApiService** - High-level service with common CRUD patterns

## HttpService

The `HttpService` is a wrapper around Angular's `HttpClient` that provides:
- Convenient methods for GET, POST, PUT, PATCH, DELETE
- Automatic loading state management
- Global error handling
- Support for custom options (headers, params, etc.)

### Basic Usage Examples

#### GET Request
```typescript
import { HttpService } from './services/http.service';

constructor(private httpService: HttpService) {}

// Simple GET request
this.httpService.get<User[]>('/users').subscribe(
  (users) => console.log(users),
  (error) => console.error(error)
);

// GET with query parameters
import { HttpParams } from '@angular/common/http';

const params = new HttpParams()
  .set('page', '1')
  .set('limit', '10');

this.httpService.get<User[]>('/users', { params }).subscribe(
  (data) => console.log(data)
);
```

#### POST Request
```typescript
const userData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com'
};

this.httpService.post<User>('/users', userData).subscribe(
  (newUser) => console.log('Created:', newUser),
  (error) => console.error('Error:', error)
);
```

#### PUT Request (Full Update)
```typescript
const updatedData = {
  firstName: 'Jane',
  lastName: 'Smith'
};

this.httpService.put<User>('/users/1', updatedData).subscribe(
  (user) => console.log('Updated:', user)
);
```

#### PATCH Request (Partial Update)
```typescript
const partialData = { firstName: 'Jane' };

this.httpService.patch<User>('/users/1', partialData).subscribe(
  (user) => console.log('Patched:', user)
);
```

#### DELETE Request
```typescript
this.httpService.delete<void>('/users/1').subscribe(
  () => console.log('Deleted successfully')
);
```

#### Custom Headers
```typescript
import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
  'X-Custom-Header': 'custom-value'
});

this.httpService.get<User>('/users/1', { headers }).subscribe(
  (user) => console.log(user)
);
```

#### With Custom Base URL
```typescript
// Make request to external API (not /api)
this.httpService.getWithCustomUrl<ExternalData>(
  'https://api.example.com/data'
).subscribe((data) => console.log(data));
```

## ApiService

The `ApiService` provides high-level CRUD methods that work with the standard API response format.

### Response Format

All responses follow this format:
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### CRUD Operations

#### Get All Items
```typescript
import { ApiService } from './services/api.service';

constructor(private apiService: ApiService) {}

// Get all users
this.apiService.getAll<User>('/users').subscribe(
  (response) => {
    if (response.success) {
      console.log('Users:', response.data);
    }
  }
);
```

#### Get Single Item
```typescript
// Get user by ID
this.apiService.getById<User>('/users', 1).subscribe(
  (response) => {
    if (response.success) {
      console.log('User:', response.data);
    }
  }
);
```

#### Create Item
```typescript
const newUser = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com'
};

this.apiService.create<User>('/users', newUser).subscribe(
  (response) => {
    if (response.success) {
      console.log('Created:', response.data);
    } else {
      console.error(response.error);
    }
  }
);
```

#### Update Item
```typescript
const updates = {
  firstName: 'Jane',
  email: 'jane@example.com'
};

this.apiService.update<User>('/users', 1, updates).subscribe(
  (response) => {
    if (response.success) {
      console.log('Updated:', response.data);
    }
  }
);
```

#### Partial Update
```typescript
const updates = { firstName: 'Jane' };

this.apiService.partialUpdate<User>('/users', 1, updates).subscribe(
  (response) => {
    if (response.success) {
      console.log('Updated:', response.data);
    }
  }
);
```

#### Delete Item
```typescript
this.apiService.delete('/users', 1).subscribe(
  (response) => {
    if (response.success) {
      console.log('Deleted successfully');
    }
  }
);
```

## Loading State Management

Both services provide loading state tracking:

```typescript
// Check loading state
this.apiService.getLoading().subscribe((isLoading) => {
  console.log('Is loading:', isLoading);
});

// Direct check
if (this.apiService.isLoading()) {
  console.log('Request in progress');
}

// Use in component
loading$ = this.apiService.getLoading();

// In template
<div *ngIf="loading$ | async">Loading...</div>
```

## Error Handling

Errors are automatically caught and formatted:

```typescript
this.apiService.getAll<User>('/users').subscribe({
  next: (response) => {
    if (response.success) {
      console.log('Success:', response.data);
    }
  },
  error: (error) => {
    console.error('Status:', error.status);
    console.error('Message:', error.message);
    console.error('Details:', error.error);
  }
});
```

## Refactoring Existing Services

Services like `UserService`, `TaskService`, and `AuthService` can be simplified using `ApiService`:

### Before (Without Generic Service)
```typescript
constructor(private http: HttpClient) {}

getAllUsers(): Observable<ApiResponse<User[]>> {
  return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/users`)
    .pipe(
      catchError(error => {
        // Error handling
        return throwError(() => error);
      })
    );
}
```

### After (Using ApiService)
```typescript
constructor(private apiService: ApiService) {}

getAllUsers(): Observable<ApiResponse<User[]>> {
  return this.apiService.getAll<User>('/users');
}
```

## Custom Requests

For endpoints that don't follow standard patterns:

```typescript
// Custom GET
this.apiService.customGet<any>('/auth/verify').subscribe(...);

// Custom POST
this.apiService.customPost<any>('/auth/login', credentials).subscribe(...);

// Custom PATCH
this.apiService.customPatch<any>('/users/1/profile', updates).subscribe(...);

// Custom DELETE
this.apiService.customDelete<any>('/temp-data').subscribe(...);
```

## Best Practices

1. **Use ApiService for standard CRUD** - Reduces boilerplate
2. **Use HttpService for custom requests** - More control when needed
3. **Always handle errors** - Check response.success and error fields
4. **Type your responses** - Use generics for type safety
5. **Subscribe in components** - Keep services focused on business logic
6. **Use loading state** - Disable buttons/inputs during requests
7. **Unsubscribe** - Use `takeUntil` or AsyncPipe to prevent memory leaks

## Examples in Components

### User List Component
```typescript
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading$ = this.apiService.getLoading();

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getAll<User>('/users').subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.data || [];
        }
      },
      error: (error) => console.error(error)
    });
  }

  deleteUser(id: number) {
    this.apiService.delete('/users', id).subscribe({
      next: (response) => {
        if (response.success) {
          this.loadUsers(); // Refresh list
        }
      }
    });
  }
}
```

### User Form Component
```typescript
export class UserFormComponent {
  constructor(private apiService: ApiService) {}

  saveUser(userData: CreateUserRequest) {
    if (!userData.id) {
      // Create new
      this.apiService.create<User>('/users', userData).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('User created:', response.data);
          }
        }
      });
    } else {
      // Update existing
      this.apiService.update<User>('/users', userData.id, userData).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('User updated:', response.data);
          }
        }
      });
    }
  }
}
```
