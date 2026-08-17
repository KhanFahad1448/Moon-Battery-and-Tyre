import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
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

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    subtotal: Number,
    gst: Number,
    fitting: Number,
    total: Number,
    method: String,
    paymentStatus: { type: String, enum: ["Paid", "Pending", "Failed"], default: "Pending" },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    name: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pin: String,
    status: { type: String, default: "Placed" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);