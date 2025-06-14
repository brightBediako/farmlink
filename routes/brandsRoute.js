import express from "express";
import {
  createBrandController,
  getAllBrandsController,
  getSingleBrandController,
  updateBrandController,
  deleteBrandController,
} from "../controllers/brandsController.js";

import { isLoggedIn } from "../middleware/isLoggedIn.js";

const brandsRoute = express.Router();

brandsRoute.post("/", isLoggedIn, createBrandController);
brandsRoute.get("/", getAllBrandsController);
brandsRoute.get("/:id", getSingleBrandController);
brandsRoute.put("/:id", isLoggedIn, updateBrandController);
brandsRoute.delete("/:id", isLoggedIn, deleteBrandController);

export default brandsRoute;
