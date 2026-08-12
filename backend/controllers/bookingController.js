import Booking from "../models/Booking.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const createBooking = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    throw new AppError("Name and phone are required", 400);
  }
  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
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