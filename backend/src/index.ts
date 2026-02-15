import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongo, closeMongo } from "data-layer";
import usersRouter from "./routes/users";
import tasksRouter from "./routes/tasks";
import authRouter from "./routes/auth";
import { authMiddleware } from "./middleware/auth.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:4200", // Angular dev server
    "http://localhost:3000", // Local testing
    "http://127.0.0.1:4200",
    "http://127.0.0.1:3000",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Security Headers Middleware
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Allow referrer from same origin and subdomains
    res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");

    // Allow cross-origin requests
    res.setHeader("Access-Control-Allow-Origin", req.get("origin") || "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    res.setHeader("Access-Control-Max-Age", "3600");

    // Prevent clickjacking
    res.setHeader("X-Frame-Options", "SAMEORIGIN");

    // Enable MIME type sniffing protection
    res.setHeader("X-Content-Type-Options", "nosniff");

    // XSS Protection
    res.setHeader("X-XSS-Protection", "1; mode=block");

    next();
  },
);

// Preflight requests handler
app.options("*", cors(corsOptions));

// Routes
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running!", timestamp: new Date() });
});

app.get("/api/data", (req, res) => {
  res.json({
    message: "Hello from Express backend",
    data: ["item1", "item2", "item3"],
  });
});

// Authentication Routes (Public)
app.use("/api/auth", authRouter);

// Protected Routes (Require JWT)
app.use("/api/users", authMiddleware, usersRouter);
app.use("/api/tasks", authMiddleware, tasksRouter);

// Error handling
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  },
);

// Start server and initialize database connection
const startServer = async () => {
  try {
    console.log("\n╔════════════════════════════════════════╗");
    console.log("║       Starting Pohlim Backend Server     ║");
    console.log("╚════════════════════════════════════════╝\n");

    // Initialize MongoDB connection
    console.log("Step 1: Initializing MongoDB connection...");
    await connectToMongo();

    // Start Express server
    app.listen(PORT, () => {
      console.log("\n✅ Backend server started successfully!");
      console.log(`📍 API URL: http://localhost:${PORT}`);
      console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
      console.log("\n✨ Server is ready to accept requests\n");
    });
  } catch (error: any) {
    console.error("\n❌ Failed to start server\n");
    console.error("🔧 MongoDB Connection Issue Detected:");
    console.error(
      "   Check if MongoDB is running and connection string is correct\n",
    );
    console.error("📋 Next Steps:");
    console.error(
      "   1. Start MongoDB: mongod or docker run -d -p 27017:27017 mongo",
    );
    console.error("   2. Check .env for MONGO_URI configuration");
    console.error("   3. Run: cd data-layer && npm run test-db\n");
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n\n🛑 Shutting down server...");
  await closeMongo();
  console.log("✅ Server closed gracefully\n");
  process.exit(0);
});

startServer();
