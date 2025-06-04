import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import {
  createCategoryController,
  getCategoryController,
  getSingleCategoryController,
  updateCategoryController,
  deleteCategoryController,
} from "../controllers/categoriesController.js";

const categoriesRoute = express.Router();

categoriesRoute.post("/", isLoggedIn, createCategoryController);
categoriesRoute.get("/", getCategoryController);
categoriesRoute.get("/:id", getSingleCategoryController);
categoriesRoute.put("/:id", isLoggedIn, updateCategoryController);
categoriesRoute.delete("/:id", isLoggedIn, deleteCategoryController);

export default categoriesRoute;
