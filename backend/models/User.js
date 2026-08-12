import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const cartItemSchema = new mongoose.Schema(
  {
    id: String,
    kind: String,
    slug: String,
    name: String,
    spec: String,
    price: Number,
    qty: Number,
  },
  { _id: false }
);

const wishlistItemSchema = new mongoose.Schema(
  {
    id: String,
    kind: String,
    slug: String,
    name: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    phone: String,
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    cart: [cartItemSchema],
    wishlist: [wishlistItemSchema],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model("User", userSchema);