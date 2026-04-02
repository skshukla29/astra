import HospitalConnectivityPage from "./HospitalConnectivityPage";
import TaskBoard from "../components/TaskBoard";
import DashboardHeader from "../components/DashboardHeader";

export default function HospitalDashboardPage({ user }) {
  return (
    <div className="dashboard-stack">
      <DashboardHeader
        icon="🏥"
        title="Hospital Dashboard"
        role="Hospital"
        roleClassName="hospital"
        description={`Welcome ${user?.name || "Team"}. Coordinate secure record transfers and inter-facility workflows.`}
      />
      <HospitalConnectivityPage />
      <TaskBoard />
    </div>
  );
}
