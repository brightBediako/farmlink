import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
