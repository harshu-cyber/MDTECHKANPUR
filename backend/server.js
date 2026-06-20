import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import winston from "winston";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Inquiry from "./models/Inquiry.js";
import Application from "./models/Application.js";
import Member from "./models/Member.js";
import Task from "./models/Task.js";

// Resolve directory paths for logging in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === "production";

// ==========================================
// 1. Winston Enterprise Logger Configuration
// ==========================================
const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "md-tech-backend" },
  transports: [
    // Write all errors to logs/error.log
    new winston.transports.File({ 
      filename: path.join(__dirname, "logs", "error.log"), 
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write all logs to logs/app.log
    new winston.transports.File({ 
      filename: path.join(__dirname, "logs", "app.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// If not in production, log to console with vibrant formatting
if (!isProduction) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

// ==========================================
// 2. Base Server Security Hardening
// ==========================================

// Explicitly disable x-powered-by header (prevents server technology scanning)
app.disable("x-powered-by");

// Trust proxy settings (required to get correct client IP for rate limiting behind Nginx/Cloudflare)
app.set("trust proxy", 1);

// Apply Helmet middleware (automatically sets secure headers: HSTS, CSP, XSS Filter, clickjacking shield)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://mdtechkanpur.tech"], // Adjust to your production API domain
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// Configure dynamic CORS to allow localhost, Vercel deployments, and the configured custom domain
const allowedOrigins = [
  "https://mdtechkanpur.tech",
  "https://www.mdtechkanpur.tech",
];

const corsOriginEnv = process.env.CORS_ORIGIN;
if (corsOriginEnv) {
  corsOriginEnv.split(",").forEach(o => {
    const trimmed = o.trim();
    if (trimmed) allowedOrigins.push(trimmed);
  });
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);
      
      const isAllowed = allowedOrigins.includes(origin) || 
                        allowedOrigins.includes("*") ||
                        origin.endsWith(".vercel.app") ||
                        origin.startsWith("http://localhost:") ||
                        origin.startsWith("http://127.0.0.1:");
                        
      if (isAllowed) {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked request from unauthorized origin: ${origin}`);
        callback(new Error("Not allowed by CORS policy"));
      }
    },
    credentials: true, // Allow cookies to be sent across origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    maxAge: 86400, // Preflight cache lifespan: 24 hours
  })
);

// Apply global rate limiting to prevent brute-force and Denial of Service (DoS)
const limiterWindowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "900000", 10);
const limiterMax = parseInt(process.env.RATE_LIMIT_MAX || "100", 10);

const rateLimiter = rateLimit({
  windowMs: limiterWindowMs,
  max: limiterMax,
  standardHeaders: true, // Return standard rate limit info headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
  message: {
    status: 429,
    message: "Too many requests from this IP address. Please try again after 15 minutes.",
  },
  handler: (req, res, next, options) => {
    logger.warn(`Rate limit exceeded by client IP: ${req.ip} on route: ${req.originalUrl}`);
    res.status(options.statusCode).send(options.message);
  },
});

app.use("/api", rateLimiter);

// Limit JSON and URL-encoded body payload sizes (protects memory from buffer overflow/large entity attacks)
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Secure Cookie Parser with secure signing keys
const cookieSecret = process.env.COOKIE_SECRET || "fallback_local_signing_secret_key";
app.use(cookieParser(cookieSecret));

// ==========================================
// 3. HTTP Request Logging (Morgan + Winston)
// ==========================================
const morganFormat = isProduction ? "combined" : "dev";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// ==========================================
// 4. API Endpoints
// ==========================================

// --- Middlewares ---
const requireAuth = (req, res, next) => {
  const session = req.signedCookies.admin_session;
  if (!session) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }
  try {
    req.user = typeof session === "string" ? JSON.parse(session) : session;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid session." });
  }
};

const requireAdmin = (req, res, next) => {
  requireAuth(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden. Admin privileges required." });
    }
    next();
  });
};

// --- Auth Endpoints ---
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const envEmail = process.env.ADMIN_EMAIL || "admin@mdtech.com";
    const envPassword = process.env.ADMIN_PASSWORD || "MDTechKanpur@2026";

    if (email.toLowerCase() === envEmail.toLowerCase() && password === envPassword) {
      const userData = { role: "admin", email: envEmail, name: "Root Administrator" };
      res.cookie("admin_session", userData, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        signed: true,
      });
      return res.json({ success: true, user: userData });
    }

    // Check team member
    const member = await Member.findOne({ email: email.toLowerCase() });
    if (member && member.mobile === password) {
      const userData = {
        role: "staff",
        email: member.email,
        name: member.name,
        position: member.position,
        memberId: member._id,
      };
      res.cookie("admin_session", userData, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        signed: true,
      });
      return res.json({ success: true, user: userData });
    }

    return res.status(401).json({ error: "Invalid credentials. Please verify your username and password." });
  } catch (err) {
    logger.error("Authentication error: %s", err.stack || err.message);
    res.status(500).json({ error: "Internal server error during authentication." });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("admin_session", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.json({ success: true, message: "Logged out successfully." });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ success: true, user: req.user });
});

// Production Health Check (No rate limiting or standard auth required, light payload)
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    message: "MD TechKanpur API Server is running secure." 
  });
});

app.get("/api/secure-session-test", (req, res) => {
  res.cookie("session_token", "secure_sample_value_12345", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
  });
  res.json({ message: "Secure session cookie configured successfully." });
});

// --- Inquiries API ---
app.post("/api/inquiries", async (req, res) => {
  try {
    const { companyName, contactName, email, phone, productId, message } = req.body;
    if (!contactName || !email || !phone || !productId || !message) {
      return res.status(400).json({ error: "Missing required inquiry fields." });
    }
    const newInquiry = new Inquiry({ companyName, contactName, email, phone, productId, message });
    await newInquiry.save();
    res.status(201).json({ success: true, inquiry: newInquiry });
  } catch (err) {
    logger.error("Inquiry submission failure: %s", err.stack || err.message);
    res.status(500).json({ error: "Failed to submit inquiry." });
  }
});

app.get("/api/inquiries", requireAdmin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ timestamp: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inquiries." });
  }
});

app.put("/api/inquiries/:id", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "replied", "closed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!inquiry) return res.status(404).json({ error: "Inquiry not found." });
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ error: "Failed to update inquiry." });
  }
});

app.delete("/api/inquiries/:id", requireAdmin, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ error: "Inquiry not found." });
    res.json({ success: true, message: "Inquiry deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete inquiry." });
  }
});

// --- Careers/Applications API ---
app.post("/api/applications", async (req, res) => {
  try {
    const { name, email, mobile, position, experience, cvLink, message } = req.body;
    if (!name || !email || !mobile || !position || !experience || !cvLink) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const newApp = new Application({ name, email, mobile, position, experience, cvLink, message });
    await newApp.save();
    res.status(201).json({ success: true, application: newApp });
  } catch (err) {
    logger.error("Application submission failure: %s", err.stack || err.message);
    res.status(500).json({ error: "Failed to submit job application." });
  }
});

app.get("/api/applications", requireAdmin, async (req, res) => {
  try {
    const apps = await Application.find().sort({ date: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications." });
  }
});

app.put("/api/applications/:id", requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Shortlisted", "Hired", "Rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }
    const appRecord = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!appRecord) return res.status(404).json({ error: "Application not found." });
    res.json(appRecord);
  } catch (err) {
    res.status(500).json({ error: "Failed to update application." });
  }
});

app.delete("/api/applications/:id", requireAdmin, async (req, res) => {
  try {
    const appRecord = await Application.findByIdAndDelete(req.params.id);
    if (!appRecord) return res.status(404).json({ error: "Application not found." });
    res.json({ success: true, message: "Application deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete application." });
  }
});

// --- Team Members API ---
app.get("/api/members", requireAuth, async (req, res) => {
  try {
    const members = await Member.find().sort({ hiredDate: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch team members." });
  }
});

app.post("/api/members", requireAdmin, async (req, res) => {
  try {
    const { name, email, mobile, position, hiredDate, applicationId } = req.body;
    if (!name || !email || !mobile || !position) {
      return res.status(400).json({ error: "Missing required member fields." });
    }

    const existing = await Member.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ error: "A member with this email is already registered." });
    }

    const newMember = new Member({ name, email, mobile, position, hiredDate });
    await newMember.save();

    if (applicationId) {
      await Application.findByIdAndUpdate(applicationId, { status: "Hired", addedToTeam: true });
    }

    res.status(201).json({ success: true, member: newMember });
  } catch (err) {
    logger.error("Failed to add member: %s", err.stack || err.message);
    res.status(500).json({ error: "Failed to register team member." });
  }
});

app.delete("/api/members/:id", requireAdmin, async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: "Member not found." });

    await Application.findOneAndUpdate(
      { email: member.email },
      { addedToTeam: false }
    );

    res.json({ success: true, message: "Member removed and credentials revoked." });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove team member." });
  }
});

// --- Work Assignments / Tasks API ---
app.get("/api/tasks", requireAuth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "staff") {
      query = {
        $or: [
          { assignTo: "all" },
          { memberId: req.user.memberId }
        ]
      };
    }
    const tasks = await Task.find(query).sort({ assignedDate: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
});

app.post("/api/tasks", requireAdmin, async (req, res) => {
  try {
    const { title, description, priority, assignTo, memberId, dueDate } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Task title is required." });
    }

    let assignedToName = "All Team Members";
    if (assignTo === "member") {
      if (!memberId) {
        return res.status(400).json({ error: "Member ID is required for specific assignment." });
      }
      const member = await Member.findById(memberId);
      if (!member) {
        return res.status(404).json({ error: "Assigned member not found." });
      }
      assignedToName = member.name;
    }

    const newTask = new Task({
      title,
      description,
      priority,
      assignTo,
      memberId: assignTo === "member" ? memberId : undefined,
      assignedToName,
      dueDate: dueDate ? new Date(dueDate) : undefined
    });

    await newTask.save();
    res.status(201).json({ success: true, task: newTask });
  } catch (err) {
    logger.error("Failed to create task: %s", err.stack || err.message);
    res.status(500).json({ error: "Failed to assign task." });
  }
});

app.put("/api/tasks/:id", requireAuth, async (req, res) => {
  try {
    const { completionStatus } = req.body;
    if (!["Pending", "Completed"].includes(completionStatus)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found." });

    if (req.user.role === "staff") {
      if (task.assignTo === "member" && task.memberId.toString() !== req.user.memberId.toString()) {
        return res.status(403).json({ error: "Forbidden. You are not authorized to update this task." });
      }
    }

    task.completionStatus = completionStatus;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task status." });
  }
});

app.delete("/api/tasks/:id", requireAdmin, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found." });
    res.json({ success: true, message: "Task deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task." });
  }
});

// Catch-all 404 handler for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ status: 404, message: "Requested endpoint not found." });
});

// ==========================================
// 5. Secure Production Error Handler
// ==========================================
app.use((err, req, res, next) => {
  // Log full error stack internally via Winston
  logger.error("Unhandled server exception caught: %s", err.stack || err.message);

  // Return sanitized, non-revealing error page to client (OWASP Best Practice)
  const statusCode = err.status || 500;
  const clientResponse = {
    status: statusCode,
    message: isProduction 
      ? "An internal server error occurred. Please contact systems administrator." 
      : err.message,
  };

  // If in development mode, include stack trace for easier debugging
  if (!isProduction) {
    clientResponse.stack = err.stack;
  }

  res.status(statusCode).json(clientResponse);
});

// ==========================================
// 6. MongoDB Database Connection & Server Initialization
// ==========================================
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mdtechkanpur";

// Configure strictQuery to prepare for Mongoose deprecations
mongoose.set("strictQuery", true);

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    logger.info(`MongoDB connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    logger.error(`Database connection failure: ${error.stack || error.message}`);
    // If in production, terminate process immediately because database is critical
    if (isProduction) {
      process.exit(1);
    }
  }
};

// Start both Database connection and Web server
await connectDatabase();

const server = app.listen(port, () => {
  logger.info(`Secure production server initiated on port ${port} [Environment: ${isProduction ? "production" : "development"}]`);
});

// Handle uncaught exceptions and graceful shutdowns
process.on("uncaughtException", (error) => {
  logger.error("CRITICAL: Uncaught Exception thrown: %s", error.stack || error.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("CRITICAL: Unhandled Promise Rejection at: %O, reason: %s", promise, reason);
});

process.on("SIGTERM", async () => {
  logger.info("SIGTERM signal received. Initiating graceful shutdown of services...");
  try {
    await mongoose.connection.close();
    logger.info("MongoDB connection closed gracefully.");
  } catch (err) {
    logger.error("Error during MongoDB disconnection: %s", err.message);
  }
  server.close(() => {
    logger.info("HTTP servers closed. Secure shutdown sequence complete.");
    process.exit(0);
  });
});
