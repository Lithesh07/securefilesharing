const express = require("express");
const router = express.Router();
const auth = require("../middleware/authmiddleware");
const multer = require("multer");
const { uploadFile, downloadFile } = require("../controllers/filecontroller");

// Setup multer (store locally before uploading to Cloudinary)
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Upload file (protected route)
router.post("/upload", auth, upload.single("file"), uploadFile);

// Download file (protected route)
router.post("/download", auth, downloadFile);

module.exports = router;
