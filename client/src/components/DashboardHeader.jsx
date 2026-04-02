export default function DashboardHeader({ icon, title, role, roleClassName, description }) {
  return (
    <section className="panel">
      <div className="dashboard-header">
        <span className="dashboard-header-icon">{icon}</span>
        <div>
          <h2 className="dashboard-title">{title}</h2>
          <span className={`role-badge ${roleClassName}`}>{role}</span>
        </div>
      </div>
      <p className="small">{description}</p>
    </section>
  );
}
