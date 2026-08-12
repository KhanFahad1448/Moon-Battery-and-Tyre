import Testimonial from "../models/Testimonial.js";
import Faq from "../models/Faq.js";
import Location from "../models/Location.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: 1 });
  res.json(testimonials);
});

export const getFaqs = asyncHandler(async (req, res) => {
  const faqs = await Faq.find().sort({ createdAt: 1 });
  res.json(faqs);
});

export const getLocations = asyncHandler(async (req, res) => {
  const locations = await Location.find().sort({ createdAt: 1 });
  res.json(locations);
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const { name, quote } = req.body;
  if (!name || !quote) {
    throw new AppError("Name and quote are required", 400);
  }
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json(testimonial);
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    throw new AppError("Testimonial not found", 404);
  }
  res.json({ message: "Testimonial deleted" });
});