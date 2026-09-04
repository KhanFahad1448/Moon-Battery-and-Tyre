import Booking from "../models/Booking.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { sendBookingConfirmationEmail, sendAdminBookingNotification } from "../utils/sendEmail.js";

// POST /api/bookings  (protected — tied to the logged-in customer's account)
export const createBooking = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    throw new AppError("Name and phone are required", 400);
  }
  const booking = await Booking.create({ ...req.body, user: req.user._id });
  res.status(201).json(booking);
  await sendBookingConfirmationEmail(booking, req.user.email);
  await sendAdminBookingNotification(booking);
});

// GET /api/bookings/mine  (protected) — the logged-in customer's own bookings
export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(bookings);
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ["Requested", "Confirmed", "Completed", "Cancelled"];
  if (!allowed.includes(status)) {
    throw new AppError(`Status must be one of: ${allowed.join(", ")}`, 400);
  }
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!booking) {
    throw new AppError("Booking not found", 404);
  }
  res.json(booking);
});