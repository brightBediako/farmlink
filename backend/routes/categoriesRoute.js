import express from "express";
import {
  createCategoryController,
  getCategoryController,
  getSingleCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoriesController.js";
import categoryUpload from "../config/categoryUpload.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import isAdmin from "../middleware/isAdmin.js";


const categoriesRoute = express.Router();

categoriesRoute.post(
  "/",
  isLoggedIn,
  isAdmin,
  categoryUpload.single("file"),
  createCategoryController
);
categoriesRoute.get("/", getCategoryController);
categoriesRoute.get("/:id", getSingleCategoryController);
categoriesRoute.put("/:id", isLoggedIn, isAdmin, updateCategoryController);
categoriesRoute.delete("/:id", isLoggedIn, isAdmin, deleteCategoryController);

export default categoriesRoute;
