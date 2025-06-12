import express from "express";
import {
  createOrdersController,
  getAllOrdersController,
  getSingleOrderController,
  updateOrderController,
} from "../controllers/ordersController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const ordersRoute = express.Router();

ordersRoute.post("/", isLoggedIn, createOrdersController);
ordersRoute.get("/", isLoggedIn, getAllOrdersController);
ordersRoute.get("/:id", isLoggedIn, getSingleOrderController);
ordersRoute.put("/update/:id", isLoggedIn, updateOrderController);

export default ordersRoute;
