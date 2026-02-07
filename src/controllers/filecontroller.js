const cloudinary = require("../config/cloudinary");
const db = require("../config/db");
const crypto = require("crypto");
const fs = require("fs");

// Encrypt password
const encrypt = (password) => crypto.createHash("sha256").update(password).digest("hex");
const verifyPassword = (input, hashed) => encrypt(input) === hashed;

// Upload file
exports.uploadFile = (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  cloudinary.uploader.upload(req.file.path, { resource_type: "auto" }, (err, result) => {
    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    if (err) return res.status(500).json({ message: "Upload failed", error: err });

    const password = req.body.password || crypto.randomBytes(4).toString("hex");
    const encryptedPassword = encrypt(password);

    const sql = "INSERT INTO files (user_id, file_url, encrypted_password) VALUES (?,?,?)";
    db.query(sql, [req.user.id, result.secure_url, encryptedPassword], (err, rows) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });

      res.json({
        message: "File uploaded successfully",
        file_url: result.secure_url,
        download_password: password,
      });
    });
  });
};

// Download file
exports.downloadFile = (req, res) => {
  const { id, password } = req.body;
  if (!id || !password) return res.status(400).json({ message: "File ID and password required" });

  const sql = "SELECT * FROM files WHERE id = ?";
  db.query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (rows.length === 0) return res.status(404).json({ message: "File not found" });

    const file = rows[0];
    if (!verifyPassword(password, file.encrypted_password))
      return res.status(401).json({ message: "Wrong password" });

    res.json({ downloadUrl: file.file_url });
  });
};
