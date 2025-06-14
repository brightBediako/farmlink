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

const productsRoute = express.Router();

productsRoute.post(
  "/",
  isLoggedIn,
  upload.array("files"),
  createProductController
);
productsRoute.get("/", getProductController);
productsRoute.get("/:id", getSingleProductController);
productsRoute.put("/:id", isLoggedIn, updateProductController);
productsRoute.delete("/:id", isLoggedIn, deleteProductController);

export default productsRoute;
