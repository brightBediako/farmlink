import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { createProductController } from "../controllers/productsController.js";

const productsRoute = express.Router();

productsRoute.post("/", isLoggedIn, createProductController);

export default productsRoute;
