const express = require("express");
const { body } = require("express-validator");
const { registerPharmacy } = require("../controllers/pharmacy.controller");
const { auth, authorise } = require("../middleware/auth.middleware");
const { validateRequest } = require("../middleware/validation.middleware");

const router = express.Router();

router.post(
  "/register",
  auth,
  authorise("pharmacy", "admin"),
  [
    body("shopName").trim().isLength({ min: 2, max: 120 }),
    body("address").trim().isLength({ min: 8, max: 240 }),
    body("pinCode").matches(/^\d{6}$/),
    body("contactInfo").trim().isLength({ min: 6, max: 120 }),
    body("latitude").isFloat({ min: -90, max: 90 }),
    body("longitude").isFloat({ min: -180, max: 180 })
  ],
  validateRequest,
  registerPharmacy
);

module.exports = router;
