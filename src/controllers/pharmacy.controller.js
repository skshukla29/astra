const Pharmacy = require("../models/Pharmacy");
const { encryptText } = require("../config/crypto");

async function registerPharmacy(req, res) {
  const { shopName, address, pinCode, contactInfo, latitude, longitude } = req.body;
  const encryptedLocation = encryptText(`${latitude},${longitude}`);

  const pharmacy = await Pharmacy.create({
    shopName,
    address,
    pinCode,
    contactInfo,
    encryptedLocation
  });

  return res.status(201).json({
    id: pharmacy._id,
    shopName: pharmacy.shopName,
    address: pharmacy.address,
    pinCode: pharmacy.pinCode,
    contactInfo: pharmacy.contactInfo
  });
}

module.exports = { registerPharmacy };
