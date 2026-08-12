import Order from "../models/Order.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { name, phone, email, address, city, state, pin, method } = req.body;

  if (!name || !phone || !email || !address || !city || !state || !pin) {
    throw new AppError("All delivery details are required", 400);
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
    method,
    name,
    phone,
    email,
    address,
    city,
    state,
    pin,
  });

  req.user.cart = [];
  await req.user.save();

  res.status(201).json(order);
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ["Placed", "Confirmed", "Fitted", "Completed", "Cancelled"];
  if (!allowed.includes(status)) {
    throw new AppError(`Status must be one of: ${allowed.join(", ")}`, 400);
  }

  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) {
    throw new AppError("Order not found", 404);
  }
  res.json(order);
});