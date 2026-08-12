import { AppError } from "../utils/AppError.js";

export default function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    throw new AppError("Admin access required", 403);
  }
  next();
}