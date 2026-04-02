import DoctorRegistrationPage from "./DoctorRegistrationPage";
import TaskBoard from "../components/TaskBoard";

export default function DoctorDashboardPage({ user }) {
  return (
    <div className="dashboard-stack">
      <section className="panel">
        <div className="dashboard-header">
          <span className="dashboard-header-icon">👨‍⚕️</span>
          <div>
            <h2 style={{ margin: 0 }}>Doctor Dashboard</h2>
            <span className="role-badge doctor">Doctor</span>
          </div>
        </div>
        <p className="small">Manage your professional profile and stay on top of operational responsibilities.</p>
      </section>
      <DoctorRegistrationPage />
      <TaskBoard />
    </div>
  );
}
