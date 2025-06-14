import express from "express";
import {
  createOrdersController,
  getAllOrdersController,
  getSingleOrderController,
  updateOrderController,
  getOrderStatisticsController,
} from "../controllers/ordersController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import isAdmin from "../middleware/isAdmin.js";

const ordersRoute = express.Router();

ordersRoute.post("/", isLoggedIn, createOrdersController);
ordersRoute.get("/", isLoggedIn, getAllOrdersController);
ordersRoute.get("/:id", isLoggedIn, getSingleOrderController);
ordersRoute.put("/update/:id", isLoggedIn, isAdmin, updateOrderController);
ordersRoute.get("/sales/stats", isLoggedIn, isAdmin, getOrderStatisticsController);

export default ordersRoute;
