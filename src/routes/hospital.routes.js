const express = require("express");
const { body } = require("express-validator");
const { transferRecord } = require("../controllers/hospital.controller");
const { auth, authorise } = require("../middleware/auth.middleware");
const { validateRequest } = require("../middleware/validation.middleware");

const router = express.Router();

router.post(
  "/transfer-record",
  auth,
  authorise("hospital", "admin"),
  [
    body("fromHospital").trim().isLength({ min: 2, max: 120 }),
    body("toHospital").trim().isLength({ min: 2, max: 120 }),
    body("patientName").trim().isLength({ min: 2, max: 120 }),
    body("age").isInt({ min: 0, max: 130 }),
    body("diagnosis").trim().isLength({ min: 2, max: 240 }),
    body("reportName").trim().isLength({ min: 2, max: 120 })
  ],
  validateRequest,
  transferRecord
);

module.exports = router;
