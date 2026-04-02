import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <section className="hero">
      <div className="logo-placeholder">
        <img src="/astra-logo.png" alt="Astra logo" />
      </div>
      <p className="hero-eyebrow">Connected Care Network</p>
      <h1>Coordinated Care for Every Role</h1>
      <p className="hero-subtext">Astra helps patients, doctors, hospitals, and pharmacies work on one secure platform with clearer handoffs and faster decisions.</p>
      <div className="button-row">
        <Link to="/doctors" className="btn">Doctors</Link>
        <Link to="/patients" className="btn">Patients</Link>
        <Link to="/hospitals" className="btn">Hospitals</Link>
        <Link to="/pharmacies" className="btn">Pharmacies</Link>
      </div>
      <div className="hero-grid">
        <article className="hero-chip">
          <p className="hero-chip-title">Unified Records</p>
          <p className="small">Shared context across teams for safer transitions of care.</p>
        </article>
        <article className="hero-chip">
          <p className="hero-chip-title">Decision Support</p>
          <p className="small">Built-in tools to support review workflows and reduce delays.</p>
        </article>
        <article className="hero-chip">
          <p className="hero-chip-title">Secure by Default</p>
          <p className="small">Role-based access, secure sessions, and production-ready controls.</p>
        </article>
      </div>
      <p className="small">Designed for real-world operational use with privacy and reliability in mind.</p>
    </section>
  );
}
