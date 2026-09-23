// Run this ONCE from your backend folder to replace the placeholder
// locations (Bengaluru, Chennai, Gurugram, Mumbai, Hyderabad, Pune) with
// your real branches.
//
// Usage (from the backend folder):
//   node scripts/reseedLocations.js
//
// Make sure this file sits somewhere that can resolve your .env
// (adjust the dotenv path below if this script isn't at backend/scripts/).

import mongoose from "mongoose";
import dotenv from "dotenv";
import Location from "../models/Location.js"; // adjust path if your model lives elsewhere

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ No MONGO_URI / MONGODB_URI found in your .env file.");
  process.exit(1);
}

const realLocations = [
  {
    city: "Ranchi",
    branch: "Bariatu, Ranchi Service Hub",
    address: "Golden Chowk, Bariatu Road, Ranchi 834009",
    phone: "+91 89695 53746",
    hours: "8:00 AM – 10:00 PM, all days",
    bays: 1,
  },
  {
    city: "Kolkata (Coming Soon)",
    branch: "Newtown, Kolkata Service Hub",
    address: "Plot 12, Action Area II, Newtown, Kolkata 700156",
    phone: "+91 89695 53746",
    hours: "8:30 AM – 9:30 PM, all days",
    bays: 6,
  },
  {
    city: "Jamshedpur (Coming Soon)",
    branch: "Karim City, Jamshedpur Service Hub",
    address: "Plot 5, Karim City, Bistupur, Jamshedpur 831001",
    phone: "+91 89695 53746",
    hours: "8:00 AM – 10:00 PM, all days",
    bays: 7,
  },
  {
    city: "Dhanbad (Coming Soon)",
    branch: "Dhanbad Service Hub",
    address: "Plot 10, Dhanbad Industrial Area, Dhanbad 826001",
    phone: "+91 89695 53746",
    hours: "8:00 AM – 10:00 PM, all days",
    bays: 5,
  },
];

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const deleted = await Location.deleteMany({});
    console.log(`🗑️  Removed ${deleted.deletedCount} old location(s)`);

    const inserted = await Location.insertMany(realLocations);
    console.log(`✅ Inserted ${inserted.length} real location(s):`);
    inserted.forEach((l) => console.log(`   - ${l.city}: ${l.branch}`));

    await mongoose.disconnect();
    console.log("🔌 Disconnected. Done.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Reseed failed:", err.message);
    process.exit(1);
  }
}

run();