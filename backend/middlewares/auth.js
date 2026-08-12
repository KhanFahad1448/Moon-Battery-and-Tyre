import User from "../models/User.js";
import { verifyToken } from "../utils/jwt.js";
import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError("Not authorized — no token provided", 401);
  }

  const token = header.split(" ")[1];

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    throw new AppError("Not authorized — invalid or expired token", 401);
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new AppError("Not authorized — user no longer exists", 401);
  }

  req.user = user;
  next();
});

export default protect;