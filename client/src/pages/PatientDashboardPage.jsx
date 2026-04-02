import PatientSearchPage from "./PatientSearchPage";
import TaskBoard from "../components/TaskBoard";
import DashboardHeader from "../components/DashboardHeader";

export default function PatientDashboardPage({ user }) {
  return (
    <div className="dashboard-stack">
      <DashboardHeader
        icon="👤"
        title="Patient Dashboard"
        role="Patient"
        roleClassName="patient"
        description={`Welcome ${user?.name || "there"}. Find specialists, track care activities, and keep your tasks up to date.`}
      />
      <PatientSearchPage />
      <TaskBoard />
    </div>
  );
}
