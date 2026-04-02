import PatientSearchPage from "./PatientSearchPage";
import TaskBoard from "../components/TaskBoard";

export default function PatientDashboardPage({ user }) {
  return (
    <div className="dashboard-stack">
      <section className="panel">
        <div className="dashboard-header">
          <span className="dashboard-header-icon">👤</span>
          <div>
            <h2 style={{ margin: 0 }}>Patient Dashboard</h2>
            <span className="role-badge patient">Patient</span>
          </div>
        </div>
        <p className="small">Manage your healthcare journey. Search specialists and review assigned care tasks.</p>
      </section>
      <PatientSearchPage />
      <TaskBoard />
    </div>
  );
}
