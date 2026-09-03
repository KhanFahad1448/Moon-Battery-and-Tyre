import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const getGalleryImages = asyncHandler(async (req, res) => {
  const images = await Gallery.find().sort({ createdAt: -1 });
  res.json(images);
});

export const addGalleryImage = asyncHandler(async (req, res) => {
  const { url, publicId, caption } = req.body;
  if (!url || !publicId) {
    throw new AppError("Image url and publicId are required", 400);
  }
  const image = await Gallery.create({ url, publicId, caption });
  res.status(201).json(image);
});

export const deleteGalleryImage = asyncHandler(async (req, res) => {
  const image = await Gallery.findById(req.params.id);
  if (!image) {
    throw new AppError("Image not found", 404);
  }
  // Remove from Cloudinary too, so storage doesn't fill up with orphaned files
  await cloudinary.uploader.destroy(image.publicId);
  await image.deleteOne();
  res.json({ message: "Image deleted" });
});