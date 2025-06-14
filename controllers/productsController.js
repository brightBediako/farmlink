import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Brand from "../models/Brand.js";

// desc     create new product
// route    Post /api/v1/products
// access   Private/admin,users
export const createProductController = asyncHandler(async (req, res) => {
  // check if files are uploaded
  if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
    throw new Error("Please Upload Product Images");
  }
  const convertedImgs = req.files.map((file) => file.path);

  const {
    name,
    description,
    brand,
    category,
    sizes,
    colors,
    price,
    totalQty,
  } = req.body;


  // check if product already exists
  const productExists = await Product.findOne({ name });
  if (productExists) {
    throw new Error("Product Already Exists");
  }
  // find by category
  const categoryFound = await Category.findOne({
    name: category,
  });
  if (!categoryFound) {
    throw new Error("Category Not Found");
  }

  // find by Brand
  const brandFound = await Brand.findOne({
    name: brand?.toLowerCase(),
  });
  if (!brandFound) {
    throw new Error("Brand Not Found");
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
    images: convertedImgs,
  });
  // push product id to category
  categoryFound.products.push(product._id);
  await categoryFound.save();

  //push the product into brand
  brandFound.products.push(product._id);
  await brandFound.save();

  res.json({
    status: "success",
    message: "Product Created Successfully",
    product,
  });
});

// desc     get all product
// route    Post /api/v1/products
// access   Public
export const getProductController = asyncHandler(async (req, res) => {
  let productQuery = Product.find();
  // search by name
  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: "i" },
    });
  }

  // filter by category
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: "i" },
    });
  }

  // filter by brand
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }

  // filter by color
  if (req.query.color) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.color, $options: "i" },
    });
  }

  // filter by size
  if (req.query.size) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.size, $options: "i" },
    });
  }

  // filter by price range
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    productQuery = productQuery.find({
      price: { $gte: priceRange[0], $lte: priceRange[1] },
    });
  }

  // pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Product.countDocuments();
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  productQuery = productQuery.limit(limit).skip(startIndex);

  // await query
  const products = await productQuery.populate("reviews");
  res.json({
    status: "success",
    total,
    results: products.length,
    pagination,
    message: "Products Fetched Successfully",
    products,
  });
});

// desc     get a single product
// route    Post /api/v1/products/:id
// access   Public

export const getSingleProductController = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("reviews");
  if (!product) {
    throw new Error("Product Not Found");
  }
  res.json({
    status: "success",
    message: "Product Fetched Successfully",
    product,
  });
});

// desc     update product
// route    Post /api/v1/products/:id
// access   private
export const updateProductController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    {
      ...req.body,
      user: req.userAuthId,
    },
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new Error("Product Not Found");
  }
  res.json({
    status: "success",
    message: "Product Updated Successfully",
    product,
  });
});

// desc     delete product
// route    Post /api/v1/products/:id
// access   private
export const deleteProductController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new Error("Product Not Found");
  }
  res.json({
    status: "success",
    message: "Product Deleted Successfully",
  });
});
