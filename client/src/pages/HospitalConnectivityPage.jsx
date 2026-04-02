import { useState } from "react";
import { apiPost } from "../api";

export default function HospitalConnectivityPage() {
  const [status, setStatus] = useState("Waiting to transfer record...");

  async function transfer() {
    setStatus("Transferring securely...");
    try {
      const result = await apiPost("/api/hospitals/transfer-record", {
        fromHospital: "Hospital A",
        toHospital: "Hospital B",
        patientName: "Rahul Verma",
        age: 42,
        diagnosis: "Hypertension",
        reportName: "Blood Report"
      });
      setStatus(result.status);
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section className="panel">
      <h2>Hospital Connectivity Demo</h2>
      <div className="card transfer-card">
        <p><strong>From:</strong> Hospital A</p>
        <p><strong>To:</strong> Hospital B</p>
        <p><strong>Patient:</strong> Rahul Verma (42)</p>
        <p><strong>Diagnosis:</strong> Hypertension</p>
        <p><strong>Report:</strong> Blood Report</p>
      </div>
      <button className="btn" onClick={transfer}>Transfer Record</button>
      <p className="status-pill">{status}</p>
    </section>
  );
}
