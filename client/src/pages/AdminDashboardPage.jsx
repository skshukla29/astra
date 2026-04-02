import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";
import TaskBoard from "../components/TaskBoard";
import ToastContainer, { useToast } from "../components/Toast";

export default function AdminDashboardPage({ user }) {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ userId: "", title: "", description: "", priority: "medium" });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toasts, show, remove } = useToast();

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      try {
        setLoading(true);
        const usersData = await apiGet("/api/tasks/admin/users");
        const tasksData = await apiGet("/api/tasks/my");
        if (mounted) {
          setUsers(usersData);
          setTasks(tasksData);
          if (usersData[0]) {
            setForm((prev) => ({ ...prev, userId: usersData[0]._id }));
          }
        }
      } catch (error) {
        if (mounted) show(error.message, "error");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, [show]);

  async function onAssign(event) {
    event.preventDefault();
    const toastId = show("Assigning task...", "loading", 0);
    try {
      await apiPost("/api/tasks/admin/assign", form);
      setForm((prev) => ({ ...prev, title: "", description: "", priority: "medium" }));
      remove(toastId);
      show("Task assigned successfully.", "success");
      const tasksData = await apiGet("/api/tasks/my");
      setTasks(tasksData);
    } catch (error) {
      remove(toastId);
      show(error.message, "error");
    }
  }

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const roleStats = {
    patient: users.filter((u) => u.role === "patient").length,
    doctor: users.filter((u) => u.role === "doctor").length,
    hospital: users.filter((u) => u.role === "hospital").length,
    pharmacy: users.filter((u) => u.role === "pharmacy").length
  };

  return (
    <div className="dashboard-stack">
      <section className="panel">
        <div className="dashboard-header">
          <span className="dashboard-header-icon">⚙️</span>
          <div>
            <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
            <span className="role-badge admin">Admin</span>
          </div>
        </div>
        <p className="small">Oversee workflows and assign work across all operational roles.</p>
      </section>

      {!loading && (
        <section className="panel">
          <h3>Platform Metrics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-label">Total Users</div>
              <div className="stat-card-value">{users.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Patients</div>
              <div className="stat-card-value">{roleStats.patient}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Doctors</div>
              <div className="stat-card-value">{roleStats.doctor}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Hospitals</div>
              <div className="stat-card-value">{roleStats.hospital}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Pharmacies</div>
              <div className="stat-card-value">{roleStats.pharmacy}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Pending Tasks</div>
              <div className="stat-card-value" style={{ color: "#f39c12" }}>{pendingCount}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-label">Completed Tasks</div>
              <div className="stat-card-value" style={{ color: "#16a085" }}>{completedCount}</div>
            </div>
          </div>
        </section>
      )}

      <section className="panel">
        <h3>Assign Task to User</h3>
        <form className="form-grid two" onSubmit={onAssign}>
          <label>
            Target User
            <select
              name="userId"
              value={form.userId}
              onChange={(event) => setForm((prev) => ({ ...prev, userId: event.target.value }))}
              required
            >
              {users.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name} ({item.role}) · {item.email}
                </option>
              ))}
            </select>
          </label>
          <label>
            Priority
            <select
              name="priority"
              value={form.priority}
              onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <label>
            Task Title
            <input
              name="title"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              required
              placeholder="e.g., Complete profile setup"
            />
          </label>
          <label>
            Description
            <input
              name="description"
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="Optional details..."
            />
          </label>
          <button className="btn" type="submit">Assign Task</button>
        </form>
      </section>

      <TaskBoard />
      <ToastContainer toasts={toasts} onRemove={remove} />
    </div>
  );
}
