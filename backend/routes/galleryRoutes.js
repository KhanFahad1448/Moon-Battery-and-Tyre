import { Router } from "express";
import protect from "../middlewares/auth.js";
import adminOnly from "../middlewares/adminOnly.js";
import { getGalleryImages, addGalleryImage, deleteGalleryImage } from "../controllers/galleryController.js";

const router = Router();

router.get("/", getGalleryImages); // public — visitors on the Gallery page can view
router.post("/", protect, adminOnly, addGalleryImage);
router.delete("/:id", protect, adminOnly, deleteGalleryImage);

export default router;