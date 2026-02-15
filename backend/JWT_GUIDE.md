# JWT Authentication Guide

This application uses JWT (JSON Web Tokens) for secure authentication between the client and server.

## Overview

JWT tokens contain the following user information:
- **id**: User ID
- **email**: User email
- **updatedAt**: Last update timestamp

Tokens expire after **24 hours** and must be refreshed.

## Backend Setup

### Configuration

Update `.env` file in the backend directory:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRY=24h
```

⚠️ **Important**: Change `JWT_SECRET` to a strong random value in production!

### Generating a Secure Secret

```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RNGCryptoServiceProvider]::new().GetBytes(32))
```

## API Endpoints

### Login

**POST** `/api/auth/login`

Request:
```json
{
  "email": "john.doe@example.com",
  "password": "hashed_password_1"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "john.doe@example.com",
      "username": "johndoe",
      "firstName": "John",
      "lastName": "Doe",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h"
  },
  "message": "Login successful"
}
```

### Verify Token

**POST** `/api/auth/verify`

Request:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "john.doe@example.com",
    "updatedAt": "2026-02-15T12:00:00Z"
  },
  "message": "Token is valid"
}
```

### Refresh Token

**POST** `/api/auth/refresh`

Request:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h"
  },
  "message": "Token refreshed"
}
```

### Protected Routes

The following routes require JWT authentication:
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

#### Using Protected Routes

Add the token to the `Authorization` header:

```bash
curl -H "Authorization: Bearer <token>" \
  http://localhost:3000/api/users
```

## Client Implementation (Angular)

### Authentication Service

The `AuthService` handles all authentication logic:

```typescript
import { AuthService } from './services/auth.service';

constructor(private authService: AuthService) {}

// Login
this.authService.login({
  email: 'user@example.com',
  password: 'password'
}).subscribe(response => {
  if (response.success) {
    console.log('Login successful!');
  }
});

// Get current authentication status
this.authService.isAuthenticated().subscribe(isAuth => {
  console.log('Is authenticated:', isAuth);
});

// Get current user
this.authService.getCurrentUser().subscribe(user => {
  console.log('Current user:', user);
});

// Logout
this.authService.logout();
```

### HTTP Interceptor

The `AuthInterceptor` automatically adds the JWT token to all HTTP requests:

```typescript
// All HTTP requests will automatically include:
// Authorization: Bearer <token>
```

### Token Storage

Tokens are stored in `localStorage`:
- Key: `auth_token` - The JWT token
- Key: `auth_user` - Current user object (email, id, updatedAt)

## Password Hashing

Passwords are hashed using **bcrypt** with 10 salt rounds for security. Never store plain text passwords!

## Security Best Practices

1. **Always use HTTPS** in production to prevent token interception
2. **Keep JWT_SECRET secure** - Use environment variables, never commit to git
3. **Rotate secrets regularly** - Change JWT_SECRET periodically
4. **Validate tokens** - Always verify tokens on the server
5. **Use HTTPS Only** - Set secure cookies flag in production
6. **Token expiration** - Tokens expire after 24 hours for security
7. **Refresh tokens** - Implement refresh token rotation for long sessions

## JWT Payload Structure

```typescript
interface JWTPayload {
  id: number;              // User ID
  email: string;           // User email
  updatedAt: Date;         // Last update timestamp
  iat?: number;            // Issued at (unix timestamp)
  exp?: number;            // Expiration time (unix timestamp)
}
```

## Testing with Postman

### 1. Login and Get Token

```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "hashed_password_1"
}
```

Copy the token from the response.

### 2. Use Token to Access Protected Route

```
GET http://localhost:3000/api/users
Authorization: Bearer <paste_token_here>
```

### 3. Refresh Token

```
POST http://localhost:3000/api/auth/refresh
Content-Type: application/json

{
  "token": "<your_token>"
}
```

## Troubleshooting

### "Invalid email or password"
- Check database for user with provided email
- Verify password hash matches

### "User account is inactive"
- Check user's `isActive` status in database
- Reactivate user if needed

### "Invalid or expired token"
- Token has expired (after 24 hours)
- Token has been tampered with
- Use refresh endpoint to get new token

### "Authorization header missing"
- Token not included in request headers
- Check Authorization header format: `Bearer <token>`

## Sample Test Credentials

The database includes sample users for testing:

| Email | Password | Role |
|-------|----------|------|
| john.doe@example.com | hashed_password_1 | admin |
| jane.smith@example.com | hashed_password_2 | user |
| mike.johnson@example.com | hashed_password_3 | user |

⚠️ **Note**: Passwords in the database are pre-hashed. For real usage, hash passwords during user creation.
