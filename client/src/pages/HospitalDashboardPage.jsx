import HospitalConnectivityPage from "./HospitalConnectivityPage";
import TaskBoard from "../components/TaskBoard";

export default function HospitalDashboardPage({ user }) {
  return (
    <div className="dashboard-stack">
      <section className="panel">
        <div className="dashboard-header">
          <span className="dashboard-header-icon">🏥</span>
          <div>
            <h2 style={{ margin: 0 }}>Hospital Dashboard</h2>
            <span className="role-badge hospital">Hospital</span>
          </div>
        </div>
        <p className="small">Enable secure medical record transfers and coordinate inter-facility workflows.</p>
      </section>
      <HospitalConnectivityPage />
      <TaskBoard />
    </div>
  );
}
