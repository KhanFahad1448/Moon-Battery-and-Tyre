import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";
import { signToken } from "../utils/jwt.js";

function toProfile(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    cart: user.cart,
    wishlist: user.wishlist,
  };
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    throw new AppError("Name, email and password are required", 400);
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    throw new AppError("An account with this email already exists", 409);
  }

  const user = await User.create({ name, email, password, phone });
  const token = signToken(user._id);

  res.status(201).json({ token, user: toProfile(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = signToken(user._id);
  res.json({ token, user: toProfile(user) });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json(toProfile(req.user));
});

export const updateCart = asyncHandler(async (req, res) => {
  req.user.cart = req.body.cart || [];
  await req.user.save();
  res.json({ cart: req.user.cart });
});

export const updateWishlist = asyncHandler(async (req, res) => {
  req.user.wishlist = req.body.wishlist || [];
  await req.user.save();
  res.json({ wishlist: req.user.wishlist });
});