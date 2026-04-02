import { useState } from "react";
import { apiPost, apiPut } from "../api";

const initialForm = {
  qualification: "",
  specialization: "",
  experience: "",
  fees: "",
  contactInfo: "",
  location: ""
};

export default function DoctorRegistrationPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  function onChange(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function onRegister(event) {
    event.preventDefault();
    setStatus("Saving profile...");
    try {
      await apiPost("/api/doctors/profile", {
        ...form,
        experience: Number(form.experience),
        fees: Number(form.fees)
      });
      setStatus("Doctor profile created securely.");
    } catch (error) {
      setStatus(error.message);
    }
  }

  async function onUpdate(event) {
    event.preventDefault();
    setStatus("Updating profile...");
    try {
      await apiPut("/api/doctors/profile", {
        ...form,
        experience: Number(form.experience),
        fees: Number(form.fees)
      });
      setStatus("Doctor profile updated.");
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section className="panel">
      <h2>Doctor Registration</h2>
      <form className="form-grid" onSubmit={onRegister}>
        <label>Name<input name="name" placeholder="Dr. Name (from auth profile)" disabled /></label>
        <label>Qualification<input name="qualification" value={form.qualification} onChange={onChange} required /></label>
        <label>Specialization<input name="specialization" value={form.specialization} onChange={onChange} required /></label>
        <label>Experience (years)<input name="experience" type="number" min="0" value={form.experience} onChange={onChange} required /></label>
        <label>Fees<input name="fees" type="number" min="0" value={form.fees} onChange={onChange} required /></label>
        <label>Contact Info<input name="contactInfo" value={form.contactInfo} onChange={onChange} required /></label>
        <label>Location<input name="location" value={form.location} onChange={onChange} required /></label>
        <div className="button-row">
          <button className="btn" type="submit">Create</button>
          <button className="btn secondary" type="button" onClick={onUpdate}>Update</button>
        </div>
      </form>
      <p className="small">{status}</p>
    </section>
  );
}
