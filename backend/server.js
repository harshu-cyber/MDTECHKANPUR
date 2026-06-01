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
        connectSrc: ["'self'", "https://api.mdtechkanpur.com"], // Adjust to your production API domain
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);

// Configure strict B2B Cross-Origin Resource Sharing (CORS)
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5175";
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);
      
      if (origin === allowedOrigin || allowedOrigin === "*") {
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

// Production Health Check (No rate limiting or standard auth required, light payload)
app.get("/api/health", (req, res) => {
  res.status(200).json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    message: "MD TechKanpur API Server is running secure." 
  });
});

// Sample protected cookie endpoint to demonstrate secure configuration
app.get("/api/secure-session-test", (req, res) => {
  // Sets a secure HTTP-Only, SameSite cookie
  res.cookie("session_token", "secure_sample_value_12345", {
    httpOnly: true, // Inaccessible to client-side document.cookie (protects against XSS cookie theft)
    secure: isProduction, // Transmitted only over secure HTTPS connection
    sameSite: "strict", // Protects against Cross-Site Request Forgery (CSRF)
    maxAge: 3600000, // 1 hour
  });

  res.json({ message: "Secure session cookie configured successfully." });
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
// 6. Server Initialization
// ==========================================
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

process.on("SIGTERM", () => {
  logger.info("SIGTERM signal received. Initiating graceful shutdown of web services...");
  server.close(() => {
    logger.info("HTTP servers closed. Secure shutdown sequence complete.");
    process.exit(0);
  });
});
