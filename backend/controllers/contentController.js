import Testimonial from "../models/Testimonial.js";
import Faq from "../models/Faq.js";
import Location from "../models/Location.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { sendAdminReviewNotification } from "../utils/sendEmail.js";

export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ approved: true }).sort({ createdAt: 1 });
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

// Admin adding a review directly — auto-approved, shows immediately
export const createTestimonial = asyncHandler(async (req, res) => {
  const { name, quote } = req.body;
  if (!name || !quote) {
    throw new AppError("Name and quote are required", 400);
  }
  const testimonial = await Testimonial.create({ ...req.body, approved: true });
  res.status(201).json(testimonial);
});

// Customer submitting their own review — needs admin approval first
export const submitTestimonial = asyncHandler(async (req, res) => {
  const { quote, rating } = req.body;
  if (!quote || !rating) {
    throw new AppError("A review quote and rating are required", 400);
  }
  const testimonial = await Testimonial.create({
    name: req.user.name,
    city: req.body.city,
    car: req.body.car,
    quote,
    rating,
    user: req.user._id,
    approved: false,
  });
  res.status(201).json({ message: "Thanks! Your review will appear once approved." });
  await sendAdminReviewNotification(testimonial);
});

export const getPendingTestimonials = asyncHandler(async (req, res) => {
  const pending = await Testimonial.find({ approved: false }).sort({ createdAt: -1 });
  res.json(pending);
});

export const approveTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
  if (!testimonial) {
    throw new AppError("Testimonial not found", 404);
  }
  res.json(testimonial);
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    throw new AppError("Testimonial not found", 404);
  }
  res.json({ message: "Testimonial deleted" });
});