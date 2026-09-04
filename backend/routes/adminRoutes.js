
import { Router } from "express";
import {
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from "../controllers/orderController.js";

import {
  getAllBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

import {
  createTestimonial,
  deleteTestimonial,
  getPendingTestimonials,
  approveTestimonial,
} from "../controllers/contentController.js";

import protect from "../middlewares/auth.js";
import adminOnly from "../middlewares/adminOnly.js";

const router = Router();

router.use(protect, adminOnly);

// Orders
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);
router.put("/orders/:id/payment-status", updatePaymentStatus);

// Bookings
router.get("/bookings", getAllBookings);
router.put("/bookings/:id/status", updateBookingStatus);

// Testimonials
router.post("/testimonials", createTestimonial);
router.delete("/testimonials/:id", deleteTestimonial);

router.get("/testimonials/pending", getPendingTestimonials);
router.put("/testimonials/:id/approve", approveTestimonial);

export default router;

