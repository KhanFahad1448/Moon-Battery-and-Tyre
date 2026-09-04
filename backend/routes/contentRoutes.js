import { Router } from "express";
import { getTestimonials, getFaqs, getLocations, submitTestimonial } from "../controllers/contentController.js";
import protect from "../middlewares/auth.js";

const router = Router();

router.get("/testimonials", getTestimonials);
router.get("/faqs", getFaqs);
router.get("/locations", getLocations);
router.post("/testimonials", protect, submitTestimonial);

export default router;