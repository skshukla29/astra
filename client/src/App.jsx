import { useEffect, useState } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DoctorRegistrationPage from "./pages/DoctorRegistrationPage";
import PatientSearchPage from "./pages/PatientSearchPage";
import PharmacyLocatorPage from "./pages/PharmacyLocatorPage";
import HospitalConnectivityPage from "./pages/HospitalConnectivityPage";
import AIDecisionSupportPage from "./pages/AIDecisionSupportPage";
import AuthPage from "./pages/AuthPage";
import PatientDashboardPage from "./pages/PatientDashboardPage";
import DoctorDashboardPage from "./pages/DoctorDashboardPage";
import HospitalDashboardPage from "./pages/HospitalDashboardPage";
import PharmacyDashboardPage from "./pages/PharmacyDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AboutPage from "./pages/AboutPage";
import { apiGet, apiPost } from "./api";

function DashboardHome({ user }) {
  if (!user) return <Navigate to="/auth" replace />;

  if (user.role === "doctor") return <DoctorDashboardPage user={user} />;
  if (user.role === "hospital") return <HospitalDashboardPage user={user} />;
  if (user.role === "pharmacy") return <PharmacyDashboardPage user={user} />;
  if (user.role === "admin") return <AdminDashboardPage user={user} />;
  return <PatientDashboardPage user={user} />;
}

function Layout({ children, currentUser, onLogout, themeMode, onToggleTheme }) {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="navbar">
        <div className="brand-wrap">
          <div className="brand-mark" aria-hidden="true">
            <img src="/astra-logo.png" alt="Astra" />
          </div>
          <div className="brand-copy">
            <p className="brand">Astra</p>
            <p className="brand-sub">AI Healthcare Platform</p>
          </div>
        </div>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/doctors">Doctors</NavLink>
          <NavLink to="/patients">Patients</NavLink>
          <NavLink to="/hospitals">Hospitals</NavLink>
          <NavLink to="/pharmacies">Pharmacies</NavLink>
          {currentUser ? <NavLink to="/dashboard">Dashboard</NavLink> : <NavLink to="/auth">Login</NavLink>}
          <button className="btn secondary nav-theme" type="button" onClick={onToggleTheme}>
            <span className="theme-icon-wrap" aria-hidden="true">
              <span className="theme-icon sun">☀</span>
              <span className="theme-icon moon">☾</span>
            </span>
            <span>{themeMode === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
          {currentUser && (
            <button className="btn nav-logout" type="button" onClick={onLogout}>Logout</button>
          )}
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="logo" aria-hidden="true">
          <img src="/astra-logo.png" alt="Astra" />
        </div>
        <div>
          <p className="footer-title">Astra</p>
          <p className="footer-text">Empowering Healthcare with AI</p>
          <p className="footer-text">support@astra.health</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [themeMode, setThemeMode] = useState(() => localStorage.getItem("astra-theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
    localStorage.setItem("astra-theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const data = await apiGet("/api/auth/me");
        if (mounted) setCurrentUser(data.user);
      } catch (_error) {
        if (mounted) setCurrentUser(null);
      } finally {
        if (mounted) setAuthLoading(false);
      }
    }

    loadUser();
    return () => {
      mounted = false;
    };
  }, []);

  async function onLogout() {
    try {
      await apiPost("/api/auth/logout", {});
    } finally {
      setCurrentUser(null);
    }
  }

  function onToggleTheme() {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  }

  if (authLoading) {
    return (
      <Layout currentUser={null} onLogout={onLogout} themeMode={themeMode} onToggleTheme={onToggleTheme}>
        <section className="panel">
          <h2>Loading...</h2>
          <p className="small">Checking secure session.</p>
        </section>
      </Layout>
    );
  }

  return (
    <Layout currentUser={currentUser} onLogout={onLogout} themeMode={themeMode} onToggleTheme={onToggleTheme}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/doctors" element={<DoctorRegistrationPage />} />
        <Route path="/patients" element={<PatientSearchPage />} />
        <Route path="/pharmacies" element={<PharmacyLocatorPage />} />
        <Route path="/hospitals" element={<HospitalConnectivityPage />} />
        <Route path="/ai-demo" element={<AIDecisionSupportPage />} />
        <Route path="/auth" element={<AuthPage onAuthSuccess={setCurrentUser} />} />
        <Route path="/dashboard" element={<DashboardHome user={currentUser} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
