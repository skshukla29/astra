const express = require("express");
const { body, query } = require("express-validator");
const { registerDoctorProfile, updateDoctorProfile, searchDoctors } = require("../controllers/doctor.controller");
const { auth, authorise } = require("../middleware/auth.middleware");
const { validateRequest } = require("../middleware/validation.middleware");

const router = express.Router();

const doctorValidators = [
  body("qualification").trim().isLength({ min: 2, max: 120 }),
  body("specialization").trim().isLength({ min: 2, max: 80 }),
  body("experience").isInt({ min: 0, max: 60 }),
  body("fees").isFloat({ min: 0, max: 100000 }),
  body("contactInfo").trim().isLength({ min: 6, max: 120 }),
  body("location").trim().isLength({ min: 2, max: 120 })
];

router.post("/profile", auth, authorise("doctor"), doctorValidators, validateRequest, registerDoctorProfile);
router.put("/profile", auth, authorise("doctor"), doctorValidators, validateRequest, updateDoctorProfile);
router.get(
  "/search",
  [query("specialization").optional().trim().isLength({ max: 80 }), query("location").optional().trim().isLength({ max: 80 })],
  validateRequest,
  searchDoctors
);

module.exports = router;
