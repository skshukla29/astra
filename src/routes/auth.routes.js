const express = require("express");
const { body } = require("express-validator");
const { register, login, refresh, logout, me } = require("../controllers/auth.controller");
const { auth } = require("../middleware/auth.middleware");
const { validateRequest } = require("../middleware/validation.middleware");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2, max: 80 }),
    body("email").isEmail().normalizeEmail(),
    body("password").isStrongPassword({ minLength: 8 }),
    body("role").isIn(["doctor", "patient", "hospital", "pharmacy", "admin"]),
    body("adminCode").optional().trim().isLength({ min: 6, max: 120 })
  ],
  validateRequest,
  register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 8 }), body("doctorOtp").optional().isLength({ min: 6, max: 6 })],
  validateRequest,
  login
);
router.get("/me", auth, me);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
