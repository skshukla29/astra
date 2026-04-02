const express = require("express");
const { body, param } = require("express-validator");
const { auth, authorise } = require("../middleware/auth.middleware");
const { validateRequest } = require("../middleware/validation.middleware");
const { listMyTasks, createMyTask, updateMyTask, listAssignableUsers, assignTaskByAdmin } = require("../controllers/task.controller");

const router = express.Router();

router.get("/my", auth, listMyTasks);

router.post(
  "/my",
  auth,
  [
    body("title").trim().isLength({ min: 2, max: 120 }),
    body("description").optional().trim().isLength({ max: 400 }),
    body("priority").optional().isIn(["low", "medium", "high"])
  ],
  validateRequest,
  createMyTask
);

router.patch(
  "/:id",
  auth,
  [param("id").isMongoId(), body("completed").isBoolean()],
  validateRequest,
  updateMyTask
);

router.get("/admin/users", auth, authorise("admin"), listAssignableUsers);

router.post(
  "/admin/assign",
  auth,
  authorise("admin"),
  [
    body("userId").isMongoId(),
    body("title").trim().isLength({ min: 2, max: 120 }),
    body("description").optional().trim().isLength({ max: 400 }),
    body("priority").optional().isIn(["low", "medium", "high"])
  ],
  validateRequest,
  assignTaskByAdmin
);

module.exports = router;
