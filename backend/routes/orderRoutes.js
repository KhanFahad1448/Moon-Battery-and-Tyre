import { Router } from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import protect from "../middlewares/auth.js";

const router = Router();

router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);

export default router;