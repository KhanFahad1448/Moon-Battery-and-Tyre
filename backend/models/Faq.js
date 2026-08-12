import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    q: { type: String, required: true },
    a: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Faq", faqSchema);