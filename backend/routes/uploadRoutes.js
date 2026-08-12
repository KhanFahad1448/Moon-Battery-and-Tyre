import { Router } from "express";
import upload from "../middlewares/upload.js";
import { uploadImage, uploadImages, deleteImage } from "../controllers/uploadController.js";
import protect from "../middlewares/auth.js";
import adminOnly from "../middlewares/adminOnly.js";

const router = Router();

router.post("/", protect, adminOnly, upload.single("image"), uploadImage);
router.post("/multiple", protect, adminOnly, upload.array("images", 5), uploadImages);
router.delete("/:publicId", protect, adminOnly, deleteImage);

export default router;