import asyncHandler from "express-async-handler";
import Vendor from "../models/Vendor.js";
import User from "../models/User.js";
import { sendVendorNotificationEmail } from "../services/sendVendorNotification.js";
import Notification from "../models/Notification.js";
import mongoose from "mongoose";

// @desc    Convert user to vendor
// @route   POST /api/v1/vendor/become
// @access  Private
export const becomeVendorController = asyncHandler(async (req, res) => {
  const userId = req.body.userId;

  // Validate userId format
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid or missing userId" });
  }

  // Find user
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Require email verification
  // if (!user.isEmailVerified) {
  //   return res
  //     .status(403)
  //     .json({ message: "Please verify your email before becoming a vendor." });
  // }

  // Prevent blocked users
  if (user.isBlocked) {
    return res
      .status(403)
      .json({ message: "Blocked users cannot become vendors." });
  }

  // Prevent duplicate vendor profiles
  if (user.role === "vendor" || user.vendorProfile) {
    return res.status(400).json({ message: "You are already a vendor." });
  }

  // Validate required vendor fields
  const requiredFields = ["farmName", "location", "address", "country", ];
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res
        .status(400)
        .json({ message: `Missing required field: ${field}` });
    }
  }

  // Manually reconstruct paymentInfo object
  const paymentInfo = {
    accountName: req.body["paymentInfo.accountName"],
    accountNumber: req.body["paymentInfo.accountNumber"],
    bankName: req.body["paymentInfo.bankName"],
    mobileMoneyNumber: req.body["paymentInfo.mobileMoneyNumber"],
    provider: req.body["paymentInfo.provider"],
  };

  // Create vendor profile (status will be 'pending' by default)
  const vendor = await Vendor.create({
    user: userId,
    farmName: req.body.farmName,
    farmDescription: req.body.farmDescription,
    country: req.body.country,
    location: req.body.location,
    address: req.body.address,
    paymentInfo,
    image: req?.file?.path,
    // status: 'pending' // default in schema
  });

  // send notification to user that they are now a vendor
  const notification = await Notification.create({
    userId: userId,
    message: `<p>
  Welcome to <strong>FarmLink</strong> 🌾 – your trusted platform for buying and selling fresh farm produce! 🥕🍅
</p>`,
  });

  user.role = "vendor";
  user.vendorProfile = vendor._id;
  await user.save();
  await sendVendorNotificationEmail(user.email, vendor.farmName);

  res.status(201).json({
    status: "success",
    message:
      "You are now a vendor. Your account is pending verification. Please login to the platform and wait for admin approval before uploading products.",
    vendor,
  });
});

// @desc    Get all vendors
// @route   GET /api/v1/vendor
// @access  Public
export const getAllVendorsController = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find().populate("user");
  res.status(200).json({
    status: "success",
    message: "Vendors fetched successfully",
    vendors,
  });
});

// @desc    Get vendor by ID
// @route   GET /api/v1/vendor/:id
// @access  Public
export const getSingleVendorController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const vendor = await Vendor.findById(id).populate("user");
  if (!vendor) {
    throw new Error("Vendor not found");
  }
  res.status(200).json({
    status: "success",
    message: "Vendor fetched successfully",
    vendor,
  });
});

// @desc    Delete vendor
// @route   DELETE /api/v1/vendor/:id
// @access  Private/Admin
export const deleteVendorController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Vendor.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "Vendor deleted successfully",
  });
});

// @desc    Update vendor profile
// @route   PUT /api/v1/vendor/:id
// @access  Private
export const updateVendorController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userAuthId;

  const vendor = await Vendor.findById(id);
  if (!vendor) {
    throw new Error("Vendor not found");
  }

  // Check if the user is the owner of the vendor profile
  if (vendor.user.toString() !== userId) {
    throw new Error("You are not authorized to update this vendor profile");
  }

  // Manually reconstruct paymentInfo object
  const paymentInfo = {
    accountName: req.body["paymentInfo.accountName"],
    accountNumber: req.body["paymentInfo.accountNumber"],
    bankName: req.body["paymentInfo.bankName"],
    mobileMoneyNumber: req.body["paymentInfo.mobileMoneyNumber"],
    provider: req.body["paymentInfo.provider"],
  };

  // Update vendor profile
  vendor.farmName = req.body.farmName || vendor.farmName;
  vendor.farmDescription = req.body.farmDescription || vendor.farmDescription;
  vendor.location = req.body.location || vendor.location;
  vendor.address = req.body.address || vendor.address;
  vendor.country = req.body.country || vendor.country;
  vendor.paymentInfo = paymentInfo;
  if (req?.file?.path) {
    vendor.image = req.file.path;
  }

  await vendor.save();

  res.status(200).json({
    status: "success",
    message: "Vendor profile updated successfully",
    vendor,
  });
});

// Admin: Update vendor status
export const updateVendorStatusController = asyncHandler(async (req, res) => {
  const { id } = req.params; // Vendor ID
  const { status } = req.body; // "active", "pending", "suspended"

  if (!["active", "pending", "suspended"].includes(status)) {
    throw new Error("Invalid status value");
  }

  const vendor = await Vendor.findByIdAndUpdate(id, { status }, { new: true });
  if (!vendor) {
    throw new Error("Vendor not found");
  }

  res.json({
    status: "success",
    message: `Vendor status updated to ${status}`,
    vendor,
  });
});
