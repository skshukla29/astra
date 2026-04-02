import { useState } from "react";

const AI_URL = import.meta.env.VITE_AI_BASE || "http://localhost:8000";

export default function AIDecisionSupportPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${AI_URL}/analyze-xray`, {
      method: "POST",
      body: formData
    });
    const data = await response.json();
    setResult(data.result || data.error || "No response");
  }

  return (
    <section className="panel">
      <h2>Clinical Decision Support (AI Demo)</h2>
      <form onSubmit={onSubmit} className="form-grid">
        <label>Upload X-ray<input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} /></label>
        <button className="btn" type="submit">Analyze</button>
      </form>
      <p className="small">{result}</p>
    </section>
  );
}
