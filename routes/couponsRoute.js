import express from "express";
import {
  createCouponController,
  getAllCouponsController,
  getCouponController,
  updateCouponController,
  deleteCouponController,
} from "../controllers/couponsController.js";
import isAdmin from "../middleware/isAdmin.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const couponsRoute = express.Router();

couponsRoute.post("/", isLoggedIn, createCouponController);
couponsRoute.get("/", getAllCouponsController);
couponsRoute.get("/single", getCouponController);
couponsRoute.put("/update/:id", isLoggedIn, isAdmin, updateCouponController);
couponsRoute.delete("/delete/:id", isLoggedIn, isAdmin, deleteCouponController);


export default couponsRoute;
