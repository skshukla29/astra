import PharmacyLocatorPage from "./PharmacyLocatorPage";
import TaskBoard from "../components/TaskBoard";
import DashboardHeader from "../components/DashboardHeader";

export default function PharmacyDashboardPage({ user }) {
  return (
    <div className="dashboard-stack">
      <DashboardHeader
        icon="💊"
        title="Pharmacy Dashboard"
        role="Pharmacy"
        roleClassName="pharmacy"
        description={`Welcome ${user?.name || "Team"}. Keep pharmacy details accurate and support reliable medicine access for patients.`}
      />
      <PharmacyLocatorPage />
      <TaskBoard />
    </div>
  );
}
