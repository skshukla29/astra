import PharmacyLocatorPage from "./PharmacyLocatorPage";
import TaskBoard from "../components/TaskBoard";

export default function PharmacyDashboardPage({ user }) {
  return (
    <div className="dashboard-stack">
      <section className="panel">
        <div className="dashboard-header">
          <span className="dashboard-header-icon">💊</span>
          <div>
            <h2 style={{ margin: 0 }}>Pharmacy Dashboard</h2>
            <span className="role-badge pharmacy">Pharmacy</span>
          </div>
        </div>
        <p className="small">Manage your pharmacy profile and deliver medicine discovery services to patients.</p>
      </section>
      <PharmacyLocatorPage />
      <TaskBoard />
    </div>
  );
}
