import cloudinary from "../config/cloudinary.js";

/**
 * Streams a file buffer (from multer's memory storage) up to Cloudinary.
 * Returns a promise that resolves with Cloudinary's upload result, which
 * includes `secure_url` and `public_id`.
 */
export function streamUpload(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "moon-battery-tyre", ...options },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}
