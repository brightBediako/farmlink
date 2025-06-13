import express from "express";
import {
  createCouponController,
  getAllCouponsController,
  getSingleCouponController,
  updateCouponController,
  deleteCouponController,
} from "../controllers/couponsController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const couponsRoute = express.Router();

couponsRoute.post("/", isLoggedIn, createCouponController);
couponsRoute.get("/", getAllCouponsController);
couponsRoute.get("/:id", isLoggedIn, getSingleCouponController);
couponsRoute.put("/update/:id", isLoggedIn, updateCouponController);
couponsRoute.delete("/delete/:id", isLoggedIn, deleteCouponController);

export default couponsRoute;
