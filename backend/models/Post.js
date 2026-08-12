import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: String,
    date: String,
    readTime: String,
    excerpt: String,
    body: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);