import { Router } from "express";
import { getTestimonials, getFaqs, getLocations } from "../controllers/contentController.js";

const router = Router();

router.get("/testimonials", getTestimonials);
router.get("/faqs", getFaqs);
router.get("/locations", getLocations);

export default router;