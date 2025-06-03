import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// desc     create new product
// route    Post /api/v1/products
// access   Private/admin,users
export const createProductController = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
  } = req.body;
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product Already Exists");
  }
  const product = await Product.create({
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
  });
  res.json({
    status: "success",
    message: "Product Created Successfully",
    product,
  });
});
