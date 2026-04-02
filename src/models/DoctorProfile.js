const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    qualification: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true, index: true },
    experience: { type: Number, required: true, min: 0, max: 60 },
    fees: { type: Number, required: true, min: 0, max: 100000 },
    contactInfo: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true, index: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DoctorProfile", doctorProfileSchema);
