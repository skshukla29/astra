import { useState } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { apiPost } from "../api";

const mockPharmacies = [
  { shopName: "CityMed", pinCode: "560001", lat: 12.9763, lng: 77.6033 },
  { shopName: "HealthPlus", pinCode: "560001", lat: 12.9725, lng: 77.5988 },
  { shopName: "Care Drugs", pinCode: "110001", lat: 28.6328, lng: 77.2197 }
];

export default function PharmacyLocatorPage() {
  const [pinCode, setPinCode] = useState("560001");
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    shopName: "",
    address: "",
    pinCode: "",
    contactInfo: "",
    latitude: "",
    longitude: ""
  });

  const { isLoaded } = useLoadScript({ googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "" });

  const visiblePharmacies = mockPharmacies.filter((p) => p.pinCode === pinCode.trim());

  function onInput(event) {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  async function onRegister(event) {
    event.preventDefault();
    try {
      await apiPost("/api/pharmacies/register", {
        ...form,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude)
      });
      setStatus("Pharmacy saved securely with encrypted location data.");
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <section className="panel">
      <h2>Pharmacy Locator</h2>
      <label>Pin Code<input value={pinCode} onChange={(e) => setPinCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))} /></label>
      <div className="map-wrap">
        {isLoaded ? (
          <GoogleMap zoom={12} center={{ lat: 12.9716, lng: 77.5946 }} mapContainerClassName="map-canvas">
            {visiblePharmacies.map((p) => (
              <MarkerF key={`${p.shopName}-${p.lat}`} position={{ lat: p.lat, lng: p.lng }} title={p.shopName} />
            ))}
          </GoogleMap>
        ) : (
          <p className="small">Add a Google Maps API key in client `.env` to enable map rendering.</p>
        )}
      </div>

      <h3>Pharmacy Registration</h3>
      <form className="form-grid two" onSubmit={onRegister}>
        <label>Shop Name<input name="shopName" value={form.shopName} onChange={onInput} required /></label>
        <label>Address<input name="address" value={form.address} onChange={onInput} required /></label>
        <label>Pin Code<input name="pinCode" value={form.pinCode} onChange={onInput} pattern="[0-9]{6}" required /></label>
        <label>Contact Info<input name="contactInfo" value={form.contactInfo} onChange={onInput} required /></label>
        <label>Latitude<input name="latitude" type="number" step="any" value={form.latitude} onChange={onInput} required /></label>
        <label>Longitude<input name="longitude" type="number" step="any" value={form.longitude} onChange={onInput} required /></label>
        <button className="btn" type="submit">Save Pharmacy</button>
      </form>
      <p className="small">{status}</p>
    </section>
  );
}
