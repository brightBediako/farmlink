import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productsController.js";

const productsRoute = express.Router();

productsRoute.post("/", isLoggedIn, createProductController);
productsRoute.get("/", getProductController);
productsRoute.get("/:id", getSingleProductController);
productsRoute.put("/:id", isLoggedIn, updateProductController);
productsRoute.delete("/:id", isLoggedIn, deleteProductController);

export default productsRoute;
