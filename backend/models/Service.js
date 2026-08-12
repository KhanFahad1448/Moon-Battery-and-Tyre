import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: String,
    duration: String,
    icon: String,
    summary: String,
    details: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);