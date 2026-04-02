const crypto = require("crypto");

function getKey() {
  const key = process.env.LOCATION_ENCRYPTION_KEY || "";
  if (key.length !== 64) {
    throw new Error("LOCATION_ENCRYPTION_KEY must be a 32-byte hex string");
  }
  return Buffer.from(key, "hex");
}

function encryptText(plainText) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(String(plainText), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

module.exports = { encryptText };
