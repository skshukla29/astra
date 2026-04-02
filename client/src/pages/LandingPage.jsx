import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <section className="hero">
      <div className="logo-placeholder">
        <img src="/astra-logo.png" alt="Astra logo" />
      </div>
      <p className="hero-eyebrow">Connected Care Network</p>
      <h1>Empowering Healthcare with AI</h1>
      <p className="hero-subtext">Secure workflows for doctors, patients, hospitals, and pharmacies with fast decisions and transparent records.</p>
      <div className="button-row">
        <Link to="/doctors" className="btn">Doctors</Link>
        <Link to="/patients" className="btn">Patients</Link>
        <Link to="/hospitals" className="btn">Hospitals</Link>
        <Link to="/pharmacies" className="btn">Pharmacies</Link>
      </div>
      <div className="hero-grid">
        <article className="hero-chip">
          <p className="hero-chip-title">Unified Records</p>
          <p className="small">A single timeline view for faster diagnosis and safer handoffs.</p>
        </article>
        <article className="hero-chip">
          <p className="hero-chip-title">AI Support</p>
          <p className="small">Clinical assistance for imaging review and second-opinion summaries.</p>
        </article>
        <article className="hero-chip">
          <p className="hero-chip-title">Secure by Default</p>
          <p className="small">HTTPS-first delivery, protected sessions, role-based access control.</p>
        </article>
      </div>
      <p className="small">HTTPS is enforced in production and session cookies are secured.</p>
    </section>
  );
}
