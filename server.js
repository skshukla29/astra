require("dotenv").config();
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const csrf = require("csurf");
const { connectDB } = require("./src/config/db");
const authRoutes = require("./src/routes/auth.routes");
const doctorRoutes = require("./src/routes/doctor.routes");
const pharmacyRoutes = require("./src/routes/pharmacy.routes");
const hospitalRoutes = require("./src/routes/hospital.routes");
const securityRoutes = require("./src/routes/security.routes");
const taskRoutes = require("./src/routes/task.routes");

const app = express();
const PORT = Number(process.env.PORT || 5000);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

connectDB();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(mongoSanitize());

const baseLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false
});

app.use("/api", baseLimiter);
app.use("/api/auth", authLimiter);

// Enforce HTTPS on production reverse proxy deployments.
app.use((req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";
  const forwardedProto = req.get("x-forwarded-proto");
  if (isProd && forwardedProto !== "https") {
    return res.redirect(`https://${req.headers.host}${req.originalUrl}`);
  }
  return next();
});

const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict"
  }
});

app.use("/api/security", csrfProtection, securityRoutes);
app.use("/api/auth", csrfProtection, authRoutes);
app.use("/api/doctors", csrfProtection, doctorRoutes);
app.use("/api/pharmacies", csrfProtection, pharmacyRoutes);
app.use("/api/hospitals", csrfProtection, hospitalRoutes);
app.use("/api/tasks", csrfProtection, taskRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "astra-backend" });
});

// Route browser traffic to frontend app so UI pages always render from React.
app.get(["/", "/doctors", "/patients", "/hospitals", "/pharmacies", "/auth", "/ai-demo", "/about", "/dashboard"], (req, res) => {
  return res.redirect(`${CLIENT_ORIGIN}${req.path}`);
});

app.use((err, _req, res, _next) => {
  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }
  return res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Astra backend running on http://localhost:${PORT}`);
});
