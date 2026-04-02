const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserTask = require("../models/UserTask");
const { getDefaultTasksForRole } = require("../config/defaultTasks");

function signAccessToken(user) {
  return jwt.sign({ sub: String(user._id), role: user.role, email: user.email }, process.env.JWT_SECRET || "dev_jwt_secret", {
    expiresIn: "1h"
  });
}

function signRefreshToken(user) {
  return jwt.sign({ sub: String(user._id) }, process.env.JWT_REFRESH_SECRET || "dev_refresh_secret", {
    expiresIn: "7d"
  });
}

function setAuthCookies(res, accessToken, refreshToken) {
  const secure = process.env.NODE_ENV === "production";
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
    path: "/"
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/api/auth/refresh"
  });
}

async function register(req, res) {
  const { name, email, password, role, firebaseUid, adminCode } = req.body;

  if (role === "admin") {
    const requiredAdminCode = process.env.ADMIN_REGISTRATION_CODE || "ASTRA_ADMIN_2026";
    if (adminCode !== requiredAdminCode) {
      return res.status(403).json({ error: "Invalid admin registration code" });
    }
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ error: "Email already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash, role, firebaseUid });

  const defaultTasks = getDefaultTasksForRole(role).map((task) => ({
    userId: user._id,
    title: task.title,
    description: task.description,
    priority: task.priority
  }));

  if (defaultTasks.length) {
    await UserTask.insertMany(defaultTasks);
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  setAuthCookies(res, accessToken, refreshToken);

  return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

async function login(req, res) {
  const { email, password, doctorOtp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  if (user.role === "doctor") {
    const requiredOtp = process.env.DOCTOR_2FA_CODE || "123456";
    if (!doctorOtp || doctorOtp !== requiredOtp) {
      return res.status(401).json({ error: "Doctor 2FA code is required" });
    }
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  setAuthCookies(res, accessToken, refreshToken);

  return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

async function refresh(req, res) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "Missing refresh token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET || "dev_refresh_secret");
    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ error: "Invalid refresh token" });

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    setAuthCookies(res, accessToken, refreshToken);
    return res.json({ ok: true });
  } catch (_error) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
}

function logout(_req, res) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken", { path: "/api/auth/refresh" });
  return res.json({ ok: true });
}

async function me(req, res) {
  const user = await User.findById(req.user.sub).select("name email role");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

module.exports = { register, login, refresh, logout, me };
