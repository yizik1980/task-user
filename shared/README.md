# Shared Types & DTOs

This folder contains shared TypeScript interfaces and types that are used across both the client and server applications in this monorepo.

## Structure

```
shared/
├── src/
│   ├── models/
│   │   ├── User.ts         # User interface and request/response types
│   │   ├── Task.ts         # Task interface and request/response types
│   │   ├── ApiResponse.ts  # API response wrapper types
│   │   └── index.ts        # Barrel export
│   └── index.ts            # Main export
└── package.json
```

## Usage

### In Backend (Express)

Import shared types in your TypeScript files:

```typescript
import { User, Task, ApiResponse } from '../../shared/src/models';

// Use in your repository or service
class UserRepository {
  async getUser(id: number): Promise<User> {
    // ...
  }
}
```

### In Client (Angular)

Import shared types in your Angular components and services:

```typescript
import { User, Task, UserService } from '../../shared/src/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {
  users: User[];
  
  constructor(private userService: UserService) {}
}
```

## Available Types

### User Types

- **`User`** - Complete user object
- **`CreateUserRequest`** - Request body for creating a user
- **`UpdateUserRequest`** - Request body for updating a user
- **`UserResponse`** - Single user API response
- **`UsersListResponse`** - Multiple users API response

### Task Types

- **`Task`** - Complete task object
- **`TaskStatus`** - Type union: 'pending' | 'in-progress' | 'completed'
- **`TaskPriority`** - Type union: 'low' | 'medium' | 'high'
- **`CreateTaskRequest`** - Request body for creating a task
- **`UpdateTaskRequest`** - Request body for updating a task
- **`TaskResponse`** - Single task API response
- **`TasksListResponse`** - Multiple tasks API response

### API Response Types

- **`ApiResponse<T>`** - Generic API response wrapper
- **`ApiErrorResponse`** - Error response format
- **`ApiSuccessResponse<T>`** - Success response format
- **`ApiListResponse<T>`** - List response with count

## Example: Backend

```typescript
// backend/src/database/UserRepository.ts
import { User, CreateUserRequest } from '../../shared/src/models';

export class UserRepository {
  static async createUser(user: CreateUserRequest): Promise<User> {
    // Implementation
  }
}
```

## Example: Client Service

```typescript
// client/src/app/services/user.service.ts
import { User, UserResponse, UsersListResponse } from '../../../shared/src/models';

@Injectable()
export class UserService {
  getAllUsers(): Observable<UsersListResponse> {
    return this.http.get<UsersListResponse>(this.apiUrl);
  }

  createUser(user: CreateUserRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(this.apiUrl, user);
  }
}
```

## Best Practices

1. **Don't duplicate types** - Always use shared types instead of creating local versions
2. **Keep types synchronized** - When API contracts change, update the shared types
3. **Type safety** - Use these types in function signatures for better type safety
4. **Compile check** - Both client and server will compile-check against these types

## Type Definitions

### User Interface

```typescript
export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  postalCode: string | null;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Task Interface

```typescript
export interface Task {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
```

## Extending Types

To add new shared types:

1. Create a new file in `src/models/` (e.g., `NewType.ts`)
2. Define your interface(s)
3. Export from `src/models/index.ts`
4. Export from `src/index.ts`

Example:

```typescript
// shared/src/models/Post.ts
export interface Post {
  id: number;
  title: string;
  content: string;
  // ...
}

// shared/src/models/index.ts
export * from './Post';

// Now use in both client and server
import { Post } from '../../shared/src/models';
```
