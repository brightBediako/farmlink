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
import isBlocked from "../middleware/isBlocked.js";
import isAccountVerified from "../middleware/isAccountVerified.js";
import vendorUpload from "../config/vendorUpload.js";

const vendorsRoute = express.Router();

vendorsRoute.post(
  "/become-vendor",
  isLoggedIn,
  isBlocked,
  isAccountVerified,
  vendorUpload.single("file"),
  becomeVendorController
);
vendorsRoute.get("/", isLoggedIn, isAdmin, getAllVendorsController);
vendorsRoute.get("/profile/:id", isLoggedIn, getSingleVendorController);
vendorsRoute.put("/update/:id", isLoggedIn, isBlocked, isAccountVerified, updateVendorController);
vendorsRoute.delete("/delete-vendor/:id", isLoggedIn, isBlocked, isAccountVerified, isAdmin, deleteVendorController);

export default vendorsRoute;
