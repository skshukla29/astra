const DoctorProfile = require("../models/DoctorProfile");

async function registerDoctorProfile(req, res) {
  const { qualification, specialization, experience, fees, contactInfo, location } = req.body;

  const existing = await DoctorProfile.findOne({ userId: req.user.sub });
  if (existing) {
    return res.status(409).json({ error: "Doctor profile already exists" });
  }

  const profile = await DoctorProfile.create({
    userId: req.user.sub,
    qualification,
    specialization,
    experience,
    fees,
    contactInfo,
    location
  });

  return res.status(201).json(profile);
}

async function updateDoctorProfile(req, res) {
  const { qualification, specialization, experience, fees, contactInfo, location } = req.body;
  const profile = await DoctorProfile.findOneAndUpdate(
    { userId: req.user.sub },
    { qualification, specialization, experience, fees, contactInfo, location },
    { new: true }
  );

  if (!profile) {
    return res.status(404).json({ error: "Doctor profile not found" });
  }

  return res.json(profile);
}

// Backend-safe query path if later moved from mock data search.
async function searchDoctors(req, res) {
  const specialization = String(req.query.specialization || "").trim();
  const location = String(req.query.location || "").trim();

  const query = {};
  if (specialization) query.specialization = new RegExp(specialization.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  if (location) query.location = new RegExp(location.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

  const doctors = await DoctorProfile.find(query).limit(50).select("specialization fees contactInfo experience location");
  return res.json(doctors);
}

module.exports = { registerDoctorProfile, updateDoctorProfile, searchDoctors };
