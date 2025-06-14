import express from "express";
import {
  createColorController,
  getAllColorsController,
  getSingleColorController,
  updateColorController,
  deleteColorController,
} from "../controllers/colorsController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import isAdmin from "../middleware/isAdmin.js";

const colorsRoute = express.Router();

colorsRoute.post("/", isLoggedIn, createColorController);
colorsRoute.get("/", getAllColorsController);
colorsRoute.get("/:id", getSingleColorController);
colorsRoute.put("/:id", isLoggedIn, isAdmin, updateColorController);
colorsRoute.delete("/:id", isLoggedIn, isAdmin, deleteColorController);

export default colorsRoute;
