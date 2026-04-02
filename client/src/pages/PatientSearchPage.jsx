import { useMemo, useState } from "react";

const mockDoctors = [
  { name: "Dr. Meera Iyer", specialization: "Cardiology", location: "Chennai", fees: 900, contactInfo: "+91-9876543210" },
  { name: "Dr. Arjun Shah", specialization: "Dermatology", location: "Ahmedabad", fees: 700, contactInfo: "+91-9812345678" },
  { name: "Dr. Nisha Rao", specialization: "Neurology", location: "Bengaluru", fees: 1300, contactInfo: "+91-9988776655" }
];

function sanitizeQuery(value) {
  return value.replace(/[^a-zA-Z0-9\s-]/g, "").trim();
}

export default function PatientSearchPage() {
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");

  const filtered = useMemo(() => {
    const safeSpec = sanitizeQuery(specialization).toLowerCase();
    const safeLoc = sanitizeQuery(location).toLowerCase();

    return mockDoctors.filter((doctor) => {
      const specMatch = safeSpec ? doctor.specialization.toLowerCase().includes(safeSpec) : true;
      const locMatch = safeLoc ? doctor.location.toLowerCase().includes(safeLoc) : true;
      return specMatch && locMatch;
    });
  }, [specialization, location]);

  return (
    <section className="panel">
      <h2>Find Doctors</h2>
      <div className="form-grid two">
        <label>Specialization<input value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="e.g. Cardiology" /></label>
        <label>Location<input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Chennai" /></label>
      </div>
      <div className="cards">
        {filtered.map((doctor) => (
          <article className="card" key={`${doctor.name}-${doctor.location}`}>
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>
            <p>Fees: Rs. {doctor.fees}</p>
            <p>{doctor.contactInfo}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
