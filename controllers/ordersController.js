import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import User from "../models/User.js";

// @desc       create orders
// @route      POST /api/v1/orders
// @Access     Public

export const createOrdersController = asyncHandler(async (req, res) => {
  // get payload
  const { orderItems, shippingAddress, totalPrice } = req.body;
  // find user
  const user = await User.findById(req.userAuthId);
// check if has a shipping address
  if (!user?.hasShippingAddress) {
    throw new Error("Shipping address is required");
  }

  if (orderItems?.length <= 0) {
    throw new Error("No order items found");
  }

  // create order
  const order = await Order.create({
    user: user?._id,
    orderItems,
    shippingAddress,
    totalPrice,
  });

  // update product qty
  const products = await Product.find({ _id: { $in: orderItems } });

  orderItems?.map(async (order) => {
    const product = products?.find((product) => {
      return product?._id?.toString() === order?._id?.toString();
    });
    if (product) {
      product.totalSold += order?.qty;
    }
    await product.save();
  });
  // push order id to user orders array
  user.orders.push(order?._id);
  await user.save();
  res.json({
    success: true,
    message: "Order created successfully",
    order,
    user,
  });
});
