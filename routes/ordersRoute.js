import express from "express";
import {
  createOrderController,
  getAllOrdersController,
  getSingleOrderController,
  updateOrderController,
  getOrderStatsController,
} from "../controllers/orderCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const ordersRoute = express.Router();

ordersRoute.post("/", isLoggedIn, createOrderController);
ordersRoute.get("/", isLoggedIn, getAllOrdersController);
ordersRoute.get("/sales/stats", isLoggedIn, getOrderStatsController);
ordersRoute.get("/:id", isLoggedIn, getSingleOrderController);
ordersRoute.put("/update/:id", isLoggedIn, updateOrderController);
export default ordersRoute;
