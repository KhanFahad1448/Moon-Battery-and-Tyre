import "dotenv/config";
import mongoose from "mongoose";
import User from "../models/User.js";

const email = process.argv[2];

if (!email) {
  console.error("Usage: node scripts/makeAdmin.js you@example.com");
  process.exit(1);
}

async function run() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set in backend/.env");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role: "admin" },
    { new: true }
  );

  if (!user) {
    console.error(`No account found with email "${email}". Register first, then run this again.`);
    process.exit(1);
  }

  console.log(`✅ ${user.email} is now an admin`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Failed:", err.message);
  process.exit(1);
});