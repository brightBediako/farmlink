import mongoose from "mongoose";
const Schema = mongoose.Schema;

const VendorSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    farmName: {
      type: String,
      required: true,
    },
    farmDescription: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    paymentInfo: {
      accountName: String,
      accountNumber: String,
      bankName: String,
      mobileMoneyNumber: String,
      provider: String,
    },
    image: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ["active", "pending", "suspended"],
      default: "pending",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Vendor = mongoose.model("Vendor", VendorSchema);
export default Vendor;
