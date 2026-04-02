export default function AboutPage() {
  return (
    <section className="panel about-panel">
      <p className="hero-eyebrow">About Astra</p>
      <h1 className="about-title">Building Safer, Faster, Human-Centered Digital Healthcare</h1>
      <p className="hero-subtext">
        Astra connects patients, doctors, hospitals, pharmacies, and administrators on one secure platform.
        The goal is simple: reduce care delays, improve coordination, and keep every clinical decision transparent.
      </p>

      <div className="about-grid">
        <article className="hero-chip">
          <p className="hero-chip-title">Our Mission</p>
          <p className="small">
            Deliver trusted healthcare workflows with role-based access, clinical clarity, and responsible AI support.
          </p>
        </article>
        <article className="hero-chip">
          <p className="hero-chip-title">What We Improve</p>
          <p className="small">
            Faster specialist discovery, secure inter-hospital record transfer, and reliable pharmacy access for patients.
          </p>
        </article>
        <article className="hero-chip">
          <p className="hero-chip-title">Security First</p>
          <p className="small">
            Protected sessions, CSRF protection, role-based authorization, and production-grade transport security.
          </p>
        </article>
      </div>

      <section className="about-values">
        <h2>Core Values</h2>
        <ul>
          <li>Patient safety and data privacy above all</li>
          <li>Clear accountability for every role</li>
          <li>Interoperability across the care ecosystem</li>
          <li>Practical AI that supports, not replaces, clinicians</li>
        </ul>
      </section>
    </section>
  );
}
