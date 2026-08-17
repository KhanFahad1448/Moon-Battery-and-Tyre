import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

// POST /api/payments/create-order  (protected)
// Computes the total from the user's own saved cart (never trusting the
// browser) and creates a matching Razorpay order for that exact amount.
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const items = req.user.cart;
  if (!items || items.length === 0) {
    throw new AppError("Your cart is empty", 400);
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const gst = Math.round(subtotal * 0.18);
  const fitting = items.reduce((sum, i) => sum + (i.kind === "tyre" ? 250 * i.qty : 0), 0);
  const total = subtotal + gst + fitting;

  const razorpayOrder = await razorpay.orders.create({
    amount: Math.round(total * 100), // Razorpay expects the amount in paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      project: "moon-battery-tyre",
      userId: String(req.user._id),
    },
  });

  res.json({
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    keyId: process.env.RAZORPAY_KEY_ID,
  });
});

// POST /api/payments/verify  (protected)
// Verifies the payment signature Razorpay's checkout returns, and only if
// it's genuinely valid, creates the real Order record and clears the cart.
export const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name,
    phone,
    email,
    address,
    city,
    state,
    pin,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new AppError("Missing payment details", 400);
  }
  if (!name || !phone || !email || !address || !city || !state || !pin) {
    throw new AppError("All delivery details are required", 400);
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    throw new AppError("Payment verification failed", 400);
  }

  const items = req.user.cart;
  if (!items || items.length === 0) {
    throw new AppError("Your cart is empty", 400);
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const gst = Math.round(subtotal * 0.18);
  const fitting = items.reduce((sum, i) => sum + (i.kind === "tyre" ? 250 * i.qty : 0), 0);
  const total = subtotal + gst + fitting;

  const orderId = "MBT" + Math.floor(100000 + Math.random() * 900000);

  const order = await Order.create({
    orderId,
    user: req.user._id,
    items,
    subtotal,
    gst,
    fitting,
    total,
    method: "online",
    razorpayOrderId: razorpay_order_id,
    razorpayPaymentId: razorpay_payment_id,
    name,
    phone,
    email,
    address,
    city,
    state,
    pin,
    status: "Confirmed",
  });

  req.user.cart = [];
  await req.user.save();

  res.status(201).json(order);
});