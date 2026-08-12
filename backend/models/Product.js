import mongoose from "mongoose";

// Mirrors the shape of tyres/batteries currently hardcoded in
// frontend/src/lib/data.js — use this as the starting point once you're
// ready to move that data into a real database instead of a static file.
const productSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ["tyre", "battery"], required: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    size: String, // tyres
    season: String, // tyres
    capacity: String, // batteries
    cca: String, // batteries (cold cranking amps)
    price: { type: Number, required: true },
    mrp: Number,
    rating: Number,
    reviews: Number,
    type: String,
    warranty: String,
    stock: { type: Number, default: 0 },
    highlights: [String],
    description: String,
    images: [
      {
        url: String,
        publicId: String, // Cloudinary public_id, needed to delete the image later
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
