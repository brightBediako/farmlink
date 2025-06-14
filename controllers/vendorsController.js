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
  vendor.country = req.body.country || vendor.country;
  vendor.location = req.body.location || vendor.location;
  vendor.phone = req.body.phone || vendor.phone;
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
