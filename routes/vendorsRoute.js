import express from "express";
import {
  becomeVendorController,
  getAllVendorsController,
  getSingleVendorController,
  deleteVendorController,
  updateVendorController,
} from "../controllers/vendorsController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import isAdmin from "../middleware/isAdmin.js";
import vendorUpload from "../config/vendorUpload.js";

const vendorsRoute = express.Router();

vendorsRoute.post(
  "/becomeVendor",
  isLoggedIn,
  vendorUpload.single("file"),
  becomeVendorController
);
vendorsRoute.get("/", getAllVendorsController);
vendorsRoute.get("/:id", isLoggedIn, getSingleVendorController);
vendorsRoute.put("/update/:id", isLoggedIn, updateVendorController);
vendorsRoute.delete("/delete/:id", isLoggedIn, isAdmin, deleteVendorController);

export default vendorsRoute;
