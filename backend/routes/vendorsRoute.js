import express from "express";
import {
  becomeVendorController,
  getAllVendorsController,
  getSingleVendorController,
  deleteVendorController,
  updateVendorController,
  updateVendorStatusController,
} from "../controllers/vendorsController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import isAdmin from "../middleware/isAdmin.js";
import isBlocked from "../middleware/isBlocked.js";
import isAccountVerified from "../middleware/isAccountVerified.js";
import vendorUpload from "../config/vendorUpload.js";

const vendorsRoute = express.Router();

vendorsRoute.post(
  "/become-vendor",
  vendorUpload.single("file"),
  becomeVendorController
);
vendorsRoute.get("/", isLoggedIn, isAdmin, getAllVendorsController);
vendorsRoute.get("/profile/:id", isLoggedIn, getSingleVendorController);
vendorsRoute.put(
  "/update/:id",
  isLoggedIn,
  isBlocked,
  isAccountVerified,
  updateVendorController
);
vendorsRoute.put(
  "/status/:id",
  isLoggedIn,
  isAdmin,
  updateVendorStatusController
);
vendorsRoute.delete(
  "/delete-vendor/:id",
  isLoggedIn,
  isBlocked,
  isAccountVerified,
  isAdmin,
  deleteVendorController
);

export default vendorsRoute;
