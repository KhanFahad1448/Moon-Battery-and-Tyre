import Service from "../models/Service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ createdAt: 1 });
  res.json(services);
});

export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await Service.findOne({ slug: req.params.slug });
  if (!service) {
    throw new AppError("Service not found", 404);
  }
  res.json(service);
});