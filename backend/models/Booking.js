import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    vehicle: String,
    regNumber: String,
    service: String,
    branch: String,
    date: String,
    time: String,
    notes: String,
    status: {
      type: String,
      enum: ["Requested", "Confirmed", "Completed", "Cancelled"],
      default: "Requested",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);