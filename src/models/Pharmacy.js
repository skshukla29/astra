const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
  {
    shopName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    pinCode: { type: String, required: true, match: /^\d{6}$/ },
    contactInfo: { type: String, required: true, trim: true },
    encryptedLocation: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pharmacy", pharmacySchema);
