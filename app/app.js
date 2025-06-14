import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";
dotenv.config();
import express from "express";
import path from "path";
import dbConnect from "../config/dbConnect.js";
import { globalErrhandler, notFound } from "../middleware/globalErrHandler.js";
import usersRoute from "../routes/usersRoute.js";
import productsRoute from "../routes/productsRoute.js";
import categoriesRoute from "../routes/categoriesRoute.js";
import colorsRoute from "../routes/colorsRoute.js";
import reviewsRoute from "../routes/reviewsRoute.js";
import couponsRoute from "../routes/couponsRoute.js";
import ordersRoute from "../routes/ordersRoute.js";
import vendorsRoute from "../routes/vendorsRoute.js";
import Order from "../models/Order.js";

//db connect
dbConnect();
const app = express();
//cors
app.use(cors());

// stripe webhook
const stripe = new Stripe(process.env.STRIPE_KEY);
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_cc75531859f9812e64edae4fc1039d7b9fdd66069536bee4f7732cf4c0521aff";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      // updating order status to paid
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;

      const order = await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          totalPrice: totalAmount / 100,
          currency,
          paymentStatus,
          paymentMethod,
        },
        {
          new: true,
        }
      );
    } else {
      return;
    }
    // Handle the event
    console.log(`Unhandled event type ${event.type}`);

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// pass incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve static files
app.use(express.static("public"));
// home route
app.get("/", (req, res) => {
  res.sendFile(path.join("public", "index.html"));
});

// routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/colors", colorsRoute);
app.use("/api/v1/reviews/", reviewsRoute);
app.use("/api/v1/orders/", ordersRoute);
app.use("/api/v1/coupons/", couponsRoute);
app.use("/api/v1/vendors", vendorsRoute);

// error middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;
