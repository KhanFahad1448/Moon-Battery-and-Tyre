import { Router } from "express";
import { createRazorpayOrder, verifyPayment } from "../controllers/paymentController.js";
import protect from "../middlewares/auth.js";

const router = Router();

router.post("/create-order", protect, createRazorpayOrder);
router.post("/verify", protect, verifyPayment);

export default router;