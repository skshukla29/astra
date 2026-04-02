const UserTask = require("../models/UserTask");
const User = require("../models/User");

async function listMyTasks(req, res) {
  const tasks = await UserTask.find({ userId: req.user.sub }).sort({ completed: 1, priority: -1, createdAt: -1 });
  return res.json(tasks);
}

async function createMyTask(req, res) {
  const { title, description, priority } = req.body;
  const task = await UserTask.create({
    userId: req.user.sub,
    title,
    description: description || "",
    priority: priority || "medium"
  });
  return res.status(201).json(task);
}

async function updateMyTask(req, res) {
  const { id } = req.params;
  const { completed } = req.body;

  const task = await UserTask.findOneAndUpdate(
    { _id: id, userId: req.user.sub },
    { completed: Boolean(completed) },
    { new: true }
  );

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  return res.json(task);
}

async function listAssignableUsers(_req, res) {
  const users = await User.find({ role: { $in: ["patient", "doctor", "hospital", "pharmacy"] } })
    .sort({ createdAt: -1 })
    .select("name email role");
  return res.json(users);
}

async function assignTaskByAdmin(req, res) {
  const { userId, title, description, priority } = req.body;

  const user = await User.findOne({ _id: userId, role: { $in: ["patient", "doctor", "hospital", "pharmacy"] } });
  if (!user) {
    return res.status(404).json({ error: "Target user not found" });
  }

  const task = await UserTask.create({
    userId,
    title,
    description: description || "",
    priority: priority || "medium"
  });

  return res.status(201).json(task);
}

module.exports = { listMyTasks, createMyTask, updateMyTask, listAssignableUsers, assignTaskByAdmin };
