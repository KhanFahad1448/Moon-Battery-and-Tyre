import mongoose from "mongoose";

/**
 * Connects to MongoDB using MONGO_URI from .env.
 *
 * This is set up for MongoDB + Mongoose since it pairs naturally with this
 * stack, but it's entirely optional to get started — if MONGO_URI isn't set,
 * this simply skips connecting and the server boots anyway (useful while you
 * wire up Cloudinary uploads first and decide on your database later).
 *
 * If you'd rather use PostgreSQL/MySQL, swap this file for a Prisma or
 * Sequelize client instead — the rest of the backend doesn't depend on
 * Mongoose directly.
 */
export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn("⚠️  No MONGO_URI set in .env — skipping database connection.");
    return;
  }

  await mongoose.connect(uri);
  console.log("✅ MongoDB connected");
}
