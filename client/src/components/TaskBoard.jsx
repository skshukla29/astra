import { useEffect, useState } from "react";
import { apiGet, apiPatch, apiPost } from "../api";
import ToastContainer, { useToast } from "./Toast";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium" });
  const [loading, setLoading] = useState(true);
  const { toasts, show, remove } = useToast();

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await apiGet("/api/tasks/my");
      setTasks(data);
    } catch (error) {
      show(error.message, "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function toggleTask(task) {
    try {
      const updated = await apiPatch(`/api/tasks/${task._id}`, { completed: !task.completed });
      setTasks((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
      show(task.completed ? "Task marked pending" : "Task completed!", "success");
    } catch (error) {
      show(error.message, "error");
    }
  }

  async function onCreateTask(event) {
    event.preventDefault();
    const toastId = show("Creating task...", "loading", 0);
    try {
      const created = await apiPost("/api/tasks/my", newTask);
      setTasks((prev) => [created, ...prev]);
      setNewTask({ title: "", description: "", priority: "medium" });
      remove(toastId);
      show("Task added.", "success");
    } catch (error) {
      remove(toastId);
      show(error.message, "error");
    }
  }

  return (
    <section className="panel">
      <h3>Assigned Work</h3>
      {loading && <p className="small"><span className="spinner" /> Loading tasks...</p>}
      <form className="form-grid" onSubmit={onCreateTask}>
        <label>
          Task Title
          <input
            name="title"
            value={newTask.title}
            onChange={(event) => setNewTask((prev) => ({ ...prev, title: event.target.value }))}
            required
          />
        </label>
        <label>
          Description
          <input
            name="description"
            value={newTask.description}
            onChange={(event) => setNewTask((prev) => ({ ...prev, description: event.target.value }))}
          />
        </label>
        <label>
          Priority
          <select
            name="priority"
            value={newTask.priority}
            onChange={(event) => setNewTask((prev) => ({ ...prev, priority: event.target.value }))}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <button className="btn" type="submit">Add Task</button>
      </form>

      <div className="cards">
        {!loading && tasks.length === 0 && (
          <p className="small">📋 No assigned tasks yet. Create one to get started.</p>
        )}
        {tasks.map((task) => (
          <article className={`card priority-${task.priority} ${task.completed ? "completed" : ""}`} key={task._id}>
            <h4>{task.title}</h4>
            <p>{task.description || "No description"}</p>
            <div style={{ display: "flex", gap: "0.8rem", alignItems: "center", marginTop: "0.5rem" }}>
              <span className="priority-indicator">
                <span className={`priority-dot ${task.priority}`} />
                {task.priority}
              </span>
              <span className="small">·</span>
              <span className="small">{task.completed ? "✓ Completed" : "⏱ Pending"}</span>
            </div>
            <button className="btn tertiary" type="button" onClick={() => toggleTask(task)} style={{ marginTop: "0.6rem" }}>
              {task.completed ? "↺ Reopen" : "✓ Complete"}
            </button>
          </article>
        ))}
      </div>
      <ToastContainer toasts={toasts} onRemove={remove} />
    </section>
  );
}
