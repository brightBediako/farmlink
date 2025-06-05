import express from "express";
import { createReviewController } from "../controllers/reviewsController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const reviewsRoute = express.Router();

reviewsRoute.post("/:productID", isLoggedIn, createReviewController);

export default reviewsRoute;
