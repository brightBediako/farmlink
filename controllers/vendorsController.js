import asyncHandler from "express-async-handler";
import Vendor from "../models/Vendor.js";
import User from "../models/User.js";

// @desc    Convert user to vendor
// @route   POST /api/v1/vendor/become
// @access  Private
export const becomeVendorController = asyncHandler(async (req, res) => {
  const userId = req.userAuthId;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // Check if already a vendor
  const vendorExists = await Vendor.findOne({ user: userId });
  if (vendorExists) {
    throw new Error("You are already a vendor");
  }

  // Manually reconstruct paymentInfo object
  const paymentInfo = {
    accountName: req.body["paymentInfo.accountName"],
    accountNumber: req.body["paymentInfo.accountNumber"],
    bankName: req.body["paymentInfo.bankName"],
    mobileMoneyNumber: req.body["paymentInfo.mobileMoneyNumber"],
    provider: req.body["paymentInfo.provider"],
  };

  // Create vendor profile
  const vendor = await Vendor.create({
    user: userId,
    farmName: req.body.farmName,
    farmDescription: req.body.farmDescription,
    country: req.body.country,
    location: req.body.location,
    phone: req.body.phone,
    paymentInfo,
    image: req?.file?.path,
    // image: convertedImg,
  });

  user.isVendor = true;
  await user.save();

  res.status(201).json({
    status: "success",
    message: "You are now a vendor",
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
