import express from "express";
import upload from "../config/fileUpload.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
  
} from "../controllers/productsController.js";
import isAccountVerified from "../middleware/isAccountVerified.js";
import isBlocked from "../middleware/isBlocked.js";

const productsRoute = express.Router();

productsRoute.post(
  "/add-product",
  isLoggedIn,
  isBlocked,
  isAccountVerified,
  upload.array("files"),
  createProductController
);
productsRoute.get("/", getProductController);
productsRoute.get("/:id", getSingleProductController);
productsRoute.put("/update-product/:id", isLoggedIn, isBlocked, isAccountVerified, updateProductController);
productsRoute.delete("/:id", isLoggedIn, isBlocked, isAccountVerified, deleteProductController);

export default productsRoute;
