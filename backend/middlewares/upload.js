import multer from "multer";

// Store the uploaded file in memory as a buffer, then stream it to Cloudinary
// in the controller. This avoids depending on multer-storage-cloudinary,
// which hasn't been updated to support the Cloudinary v2 SDK.
const storage = multer.memoryStorage();

// Reject anything that isn't an image, and cap file size at 5MB
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload;

