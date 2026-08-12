import cloudinary from "../config/cloudinary.js";
import { streamUpload } from "../utils/streamUpload.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("No image file provided", 400);
  }

  const result = await streamUpload(req.file.buffer);

  res.status(201).json({
    message: "Image uploaded successfully",
    url: result.secure_url,
    publicId: result.public_id,
  });
});

export const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new AppError("No image files provided", 400);
  }

  const results = await Promise.all(req.files.map((file) => streamUpload(file.buffer)));
  const images = results.map((r) => ({ url: r.secure_url, publicId: r.public_id }));

  res.status(201).json({ message: "Images uploaded successfully", images });
});

export const deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.params;
  const result = await cloudinary.uploader.destroy(publicId);
  res.json({ message: "Delete processed", result });
});