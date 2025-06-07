import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import User from "../models/User.js";

// @desc       create orders
// @route      POST /api/v1/orders
// @Access     Public

export const createOrderController = asyncHandler(async (req, res) => {
  // get payload
  const { orderItems, shippingAddress, totalPrice } = req.body;
  // find user
  const user = await User.findById(req.userAuthId);
});
