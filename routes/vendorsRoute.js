import express from "express";
import {
  becomeVendorController,
  getAllVendorsController,
} from "../controllers/VendorsController.js";
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
vendorsRoute.get("/", isLoggedIn, getAllVendorsController);

export default vendorsRoute;
