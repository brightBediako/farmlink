import express from "express";
import {
  createColorController,
  getAllColorsController,
  getSingleColorController,
  updateColorController,
  deleteColorController,
} from "../controllers/colorsController.js";
// import isAdmin from "../middlewares/isAdmin.js";

import { isLoggedIn } from "../middleware/isLoggedIn.js";
const colorsRoute = express.Router();

colorsRoute.post("/", isLoggedIn, createColorController);
colorsRoute.get("/", getAllColorsController);
colorsRoute.get("/:id", getSingleColorController);
colorsRoute.put("/:id", isLoggedIn, updateColorController);
colorsRoute.delete("/:id", isLoggedIn, deleteColorController);

export default colorsRoute;
