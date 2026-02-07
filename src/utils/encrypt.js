const crypto = require("crypto");

const encrypt = (text) => {
  const cipher = crypto.createCipher("aes-256-ctr", process.env.JWT_SECRET);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipher("aes-256-ctr", process.env.JWT_SECRET);
  let decrypted = decipher.update(hash, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encrypt, decrypt };
