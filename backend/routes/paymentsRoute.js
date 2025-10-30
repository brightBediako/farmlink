import express from "express";
import {
  initializePaymentController,
  verifyPaymentController,
  webhookController,
  getPaymentStatusController,
  getAllPaymentsController,
} from "../controllers/paymentsController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";

const paymentsRouter = express.Router();

// Initialize payment
paymentsRouter.post("/initialize", isLoggedIn, initializePaymentController);

// Verify payment (public endpoint for webhook and frontend verification)
paymentsRouter.get("/verify/:reference", verifyPaymentController);

// Paystack webhook endpoint (public)
paymentsRouter.post("/webhook", webhookController);

// Get payment status for a specific order
paymentsRouter.get("/status/:orderId", isLoggedIn, getPaymentStatusController);

// Get all payments (admin only)
paymentsRouter.get("/admin", isLoggedIn, isAdmin, getAllPaymentsController);

export default paymentsRouter;
