import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";

import uploadRoutes from "./routes/uploadRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import contactFormRoutes from "./routes/contactRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// --- Core middleware ---
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Moon Battery and Tyre API is running" });
});

// --- Routes ---
app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", contentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactFormRoutes);

// --- 404 handler for unknown API routes ---
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// --- Central error handler (must be last) ---
app.use(errorHandler);

// --- Start server ---
// Database connection is optional to start with — see config/db.js.
// The server will still boot and the /api/upload routes will work without it.
connectDB()
  .catch((err) => {
    console.error("MongoDB connection failed. Server will still start.", err.message);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  });
