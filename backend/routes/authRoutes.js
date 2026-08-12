import { Router } from "express";
import { register, login, getMe, updateCart, updateWishlist } from "../controllers/authController.js";
import protect from "../middlewares/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/cart", protect, updateCart);
router.put("/wishlist", protect, updateWishlist);

export default router;