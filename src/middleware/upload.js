const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: "secure_drive",
    resource_type: "auto", // auto-detect PDF, image, video
    public_id: `${Date.now()}_${file.originalname}`,
  }),
});

const parser = multer({ storage });

module.exports = parser;
