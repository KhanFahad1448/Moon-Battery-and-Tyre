import { Router } from "express";
import { createBooking, getMyBookings } from "../controllers/bookingController.js";
import protect from "../middlewares/auth.js";

const router = Router();

router.post("/", protect, createBooking);
router.get("/mine", protect, getMyBookings);

export default router;