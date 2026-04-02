import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, isFirebaseConfigured } from "../firebase";
import { apiPost } from "../api";

export default function AuthPage({ onAuthSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "patient", doctorOtp: "", adminCode: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function onInput(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function onSignup(event) {
    event.preventDefault();
    try {
      let firebaseUid = null;
      if (isFirebaseConfigured && firebaseAuth) {
        const credential = await createUserWithEmailAndPassword(firebaseAuth, form.email, form.password);
        firebaseUid = credential.user.uid;
      }

      const result = await apiPost("/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        firebaseUid,
        adminCode: form.role === "admin" ? form.adminCode : undefined
      });

      if (onAuthSuccess) onAuthSuccess(result.user);
      setMessage(
        form.role === "doctor"
          ? "Account created successfully. Doctor verification is required at login."
          : "Account created successfully."
      );
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function onLogin(event) {
    event.preventDefault();
    try {
      if (isFirebaseConfigured && firebaseAuth) {
        await signInWithEmailAndPassword(firebaseAuth, form.email, form.password);
      }

      const result = await apiPost("/api/auth/login", {
        email: form.email,
        password: form.password,
        doctorOtp: form.doctorOtp || undefined
      });
      if (onAuthSuccess) onAuthSuccess(result.user);
      setMessage("Login successful.");
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="panel">
      <h2>Account Access</h2>
      <form className="form-grid" onSubmit={onSignup}>
        <label>Name<input name="name" value={form.name} onChange={onInput} required /></label>
        <label>Email<input name="email" type="email" value={form.email} onChange={onInput} required /></label>
        <label>Password<input name="password" type="password" value={form.password} onChange={onInput} required /></label>
        <label>Role
          <select name="role" value={form.role} onChange={onInput}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="hospital">Hospital</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        {form.role === "doctor" && (
          <label>Doctor Verification Code
            <input name="doctorOtp" value={form.doctorOtp} onChange={onInput} placeholder="6-digit code" />
          </label>
        )}
        {form.role === "admin" && (
          <label>Admin Registration Code
            <input name="adminCode" value={form.adminCode} onChange={onInput} placeholder="Enter admin code" required />
          </label>
        )}
        <div className="button-row">
          <button className="btn" type="submit">Create Account</button>
          <button className="btn secondary" type="button" onClick={onLogin}>Login</button>
        </div>
      </form>
      {!isFirebaseConfigured && (
        <p className="small">Firebase is not configured in this environment. Authentication currently runs through backend session APIs.</p>
      )}
      <p className="small">{message}</p>
    </section>
  );
}
