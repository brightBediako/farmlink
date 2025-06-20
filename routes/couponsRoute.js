import express from "express";
import {
  createCouponController,
  getAllCouponsController,
  getSingleCouponController,
  updateCouponController,
  deleteCouponController,
} from "../controllers/couponsController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import isAccountVerified from "../middleware/isAccountVerified.js";
import isBlocked from "../middleware/isBlocked.js";

const couponsRoute = express.Router();

couponsRoute.post("/", isLoggedIn, isBlocked, isAccountVerified, createCouponController);
couponsRoute.get("/", getAllCouponsController);
couponsRoute.get("/:id", isLoggedIn, getSingleCouponController);
couponsRoute.put("/update/:id", isLoggedIn, isBlocked, isAccountVerified, updateCouponController);
couponsRoute.delete("/delete/:id", isLoggedIn, isBlocked, isAccountVerified, deleteCouponController);

export default couponsRoute;
