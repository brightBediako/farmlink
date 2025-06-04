import asyncHandler from "express-async-handler";
import Color from "../models/Color.js";

// @desc    Create new Color
// @route   POST /api/v1/colors
// @access  Private/Admin

export const createColorController = asyncHandler(async (req, res) => {
  const { name } = req.body;
  //color exists
  const colorFound = await Color.findOne({ name });
  if (colorFound) {
    throw new Error("Color already exists");
  }
  //create
  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "color created successfully",
    color,
  });
});

// @desc    Get all colors
// @route   GET /api/colors
// @access  Public

export const getAllColorsController = asyncHandler(async (req, res) => {
  const colors = await Color.find();
  res.json({
    status: "success",
    message: "colors fetched successfully",
    colors,
  });
});

// @desc    Get single color
// @route   GET /api/colors/:id
// @access  Public
export const getSingleColorController = asyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  res.json({
    status: "success",
    message: "color fetched successfully",
    color,
  });
});

// @desc    Update color
// @route   PUT /api/colors/:id
// @access  Private/Admin
export const updateColorController = asyncHandler(async (req, res) => {
  const { name } = req.body;

  //update
  const color = await Color.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "Color updated successfully",
    color,
  });
});

// @desc    delete color
// @route   DELETE /api/colors/:id
// @access  Private/Admin
export const deleteColorController = asyncHandler(async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Color deleted successfully",
  });
});
