import mongoose from "mongoose";

const locationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    branch: { type: String, required: true },
    address: String,
    phone: String,
    hours: String,
    bays: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Location", locationSchema);