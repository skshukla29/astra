import DoctorRegistrationPage from "./DoctorRegistrationPage";
import TaskBoard from "../components/TaskBoard";
import DashboardHeader from "../components/DashboardHeader";

export default function DoctorDashboardPage({ user }) {
  return (
    <div className="dashboard-stack">
      <DashboardHeader
        icon="👨‍⚕️"
        title="Doctor Dashboard"
        role="Doctor"
        roleClassName="doctor"
        description={`Welcome Dr. ${user?.name || "User"}. Maintain your profile and manage operational tasks efficiently.`}
      />
      <DoctorRegistrationPage />
      <TaskBoard />
    </div>
  );
}
