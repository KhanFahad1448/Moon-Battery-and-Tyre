// One-time script to copy your existing tyres + batteries data (currently
// hardcoded in frontend/src/lib/data.js) into MongoDB.
//
// Run from the backend/ folder:
//   node scripts/seed.js
//
// Safe to run more than once — it clears out any previously-seeded products
// before inserting, so you won't end up with duplicates.

import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import Post from "../models/Post.js";
import Testimonial from "../models/Testimonial.js";
import Faq from "../models/Faq.js";
import Location from "../models/Location.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.resolve(__dirname, "../../frontend/src/lib/data.js");

function extractArrayLiteral(source, exportName) {
  const marker = `export const ${exportName} = [`;
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Could not find "${exportName}" in data.js`);

  const arrayStart = start + marker.length - 1;
  let depth = 0;
  let i = arrayStart;
  for (; i < source.length; i++) {
    if (source[i] === "[") depth++;
    else if (source[i] === "]") {
      depth--;
      if (depth === 0) break;
    }
  }
  return source.slice(arrayStart, i + 1);
}

function parseArrayLiteral(literalText) {
  // eslint-disable-next-line no-new-func
  return new Function(`"use strict"; return (${literalText});`)();
}

async function seed() {
  console.log("Reading", DATA_FILE);
  const source = fs.readFileSync(DATA_FILE, "utf-8");

  const tyres = parseArrayLiteral(extractArrayLiteral(source, "tyres")).map((t) => ({
    ...t,
    kind: "tyre",
  }));
  const batteries = parseArrayLiteral(extractArrayLiteral(source, "batteries")).map((b) => ({
    ...b,
    kind: "battery",
  }));

  console.log(`Found ${tyres.length} tyres and ${batteries.length} batteries`);

  const services = parseArrayLiteral(extractArrayLiteral(source, "services"));
  const posts = parseArrayLiteral(extractArrayLiteral(source, "posts"));
  console.log(`Found ${services.length} services and ${posts.length} posts`);

  const testimonials = parseArrayLiteral(extractArrayLiteral(source, "testimonials"));
  const faqs = parseArrayLiteral(extractArrayLiteral(source, "faqs"));
  const locations = parseArrayLiteral(extractArrayLiteral(source, "locations"));
  console.log(
    `Found ${testimonials.length} testimonials, ${faqs.length} faqs, ${locations.length} locations`
  );

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set in backend/.env — set it before seeding.");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const allProducts = [...tyres, ...batteries];
  const productSlugs = allProducts.map((p) => p.slug);
  await Product.deleteMany({ slug: { $in: productSlugs } });
  const insertedProducts = await Product.insertMany(allProducts);
  console.log(`✅ Seeded ${insertedProducts.length} products into MongoDB`);

  const serviceSlugs = services.map((s) => s.slug);
  await Service.deleteMany({ slug: { $in: serviceSlugs } });
  const insertedServices = await Service.insertMany(services);
  console.log(`✅ Seeded ${insertedServices.length} services into MongoDB`);

  const postSlugs = posts.map((p) => p.slug);
  await Post.deleteMany({ slug: { $in: postSlugs } });
  const insertedPosts = await Post.insertMany(posts);
  console.log(`✅ Seeded ${insertedPosts.length} posts into MongoDB`);

  // Testimonials, FAQs and locations have no natural unique key, so we just
  // replace the whole collection each time this script runs.
  await Testimonial.deleteMany({});
  const insertedTestimonials = await Testimonial.insertMany(testimonials);
  console.log(`✅ Seeded ${insertedTestimonials.length} testimonials into MongoDB`);

  await Faq.deleteMany({});
  const insertedFaqs = await Faq.insertMany(faqs);
  console.log(`✅ Seeded ${insertedFaqs.length} faqs into MongoDB`);

  await Location.deleteMany({});
  const insertedLocations = await Location.insertMany(locations);
  console.log(`✅ Seeded ${insertedLocations.length} locations into MongoDB`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});