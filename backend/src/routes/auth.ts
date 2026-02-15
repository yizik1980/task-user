import { Router, Request, Response } from "express";
import { UserRepository } from "data-layer";
import { JwtService } from "../utils/jwt.service";
import { PasswordService } from "../utils/password.service";
import { LoginRequest, LoginResponse, CreateUserRequest } from "@shared/models";

const router = Router();

// Login endpoint
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginRequest;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    // Find user by email
    const user = await UserRepository.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: "User account is inactive",
      });
    }

    // Compare password
    const isPasswordValid = await PasswordService.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = JwtService.generateToken({
      id: user.id,
      email: user.email,
      updatedAt: user.updatedAt,
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        token,
        expiresIn: "24h",
      },
      message: "Login successful",
    } as LoginResponse);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Login failed",
    });
  }
});

// Register endpoint
router.post("/register", async (req: Request, res: Response) => {
  try {
    const userData = req.body as CreateUserRequest;

    // Validation
    if (
      !userData.email ||
      !userData.password ||
      !userData.username ||
      !userData.firstName ||
      !userData.lastName
    ) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
      });
    }

    // Check if email already exists
    const existingUser = await UserRepository.getUserByEmail(userData.email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await PasswordService.hashPassword(
      userData.password,
    );

    // Create user
    const newUser = await UserRepository.createUser({
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      password: hashedPassword,
      phone: userData.phone || null,
      city: userData.city || null,
      country: userData.country || null,
      address: null,
      postalCode: null,
      role: "user",
      isActive: true,
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        },
        token: JwtService.generateToken({
          id: newUser.id,
          email: newUser.email,
          updatedAt: newUser.updatedAt,
        }),
        expiresIn: "24h",
      },
      message: "User registered successfully. Welcome!",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
});

// Verify token endpoint
router.post("/verify", (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: "Token is required",
      });
    }

    const decoded = JwtService.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: "Invalid or expired token",
      });
    }

    res.json({
      success: true,
      data: decoded,
      message: "Token is valid",
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({
      success: false,
      error: "Token verification failed",
    });
  }
});

// Refresh token endpoint
router.post("/refresh", (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: "Token is required",
      });
    }

    const decoded = JwtService.decodeToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        error: "Invalid token",
      });
    }

    // Generate new token with updated data
    const newToken = JwtService.generateToken({
      id: decoded.id,
      email: decoded.email,
      updatedAt: new Date(),
    });

    res.json({
      success: true,
      data: {
        token: newToken,
        expiresIn: "24h",
      },
      message: "Token refreshed",
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({
      success: false,
      error: "Token refresh failed",
    });
  }
});

export default router;
