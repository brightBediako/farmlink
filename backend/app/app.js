import dotenv from "dotenv";
import cors from "cors";
import Stripe from "stripe";
dotenv.config();
import express from "express";
import path from "path";
import dbConnect from "../config/dbConnect.js";
import { globalErrhandler, notFound } from "../middleware/globalErrHandler.js";
import authRoute from "../routes/authRoute.js";
import usersRoute from "../routes/usersRoute.js";
import productsRoute from "../routes/productsRoute.js";
import categoriesRoute from "../routes/categoriesRoute.js";
import colorsRoute from "../routes/colorsRoute.js";
import reviewsRoute from "../routes/reviewsRoute.js";
import couponsRoute from "../routes/couponsRoute.js";
import ordersRoute from "../routes/ordersRoute.js";
import vendorsRoute from "../routes/vendorsRoute.js";
import Order from "../models/Order.js";
import { sendOrderNotificationEmail } from "../services/emailNotification.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

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
      // Send order details to customer
      if (order) {
        const user = await User.findById(order.user);
        if (user && user.email) {
          const messageText = `
            <h3>Order Confirmation</h3>
            <p>Thank you for your purchase! Here are your order details:</p>
            <table style="border-collapse: collapse; width: 100%;">
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>Order Number</td>
                <td>${order.orderNumber}</td>
              </tr>
              <tr>
                <td>Payment Status</td>
                <td>${order.paymentStatus}</td>
              </tr>
              <tr>
                <td>Payment Method</td>
                <td>${order.paymentMethod}</td>
              </tr>
              <tr>
                <td>Total Price</td>
                <td>${order.totalPrice} ${order.currency}</td>
              </tr>
              <tr>
                <td>Order Date</td>
                <td>${order.createdAt.toLocaleDateString()}</td>
              </tr>
            </table>
            <p>You can view your order details in your account.</p>
          `;
          await sendOrderNotificationEmail(user.email, order._id, messageText);
        }
      }

      if (order && order.orderItems && order.orderItems.length > 0) {
        // Get all product IDs from the order
        const productIds = order.orderItems.map(
          (item) => item._id || item.product || item
        ); // adjust as per your schema

        // Fetch all products in the order
        const products = await Product.find({ _id: { $in: productIds } });

        // Map vendor user IDs to their products
        const vendorMap = {};
        products.forEach((product) => {
          const vendorId = product.user.toString();
          if (!vendorMap[vendorId]) vendorMap[vendorId] = [];
          vendorMap[vendorId].push(product);
        });

        // Notify each vendor
        for (const [vendorId, vendorProducts] of Object.entries(vendorMap)) {
          const vendorUser = await User.findById(vendorId);
          if (vendorUser && vendorUser.email) {
            const productList = vendorProducts
              .map((p) => `<li>${p.name}</li>`)
              .join("");
            const messageText = `
              <h3>New Order for Your Products</h3>
              <p>The following products have been ordered:</p>
              <ul>${productList}</ul>
              <p>Order Number: <strong>${order.orderNumber}</strong></p>
              <p>Payment Status: <strong>${order.paymentStatus}</strong></p>
              <p>Payment Method: <strong>${order.paymentMethod}</strong></p>
              <p>Total Price: <strong>${order.totalPrice} ${order.currency}</strong></p>
            `;
            await sendOrderNotificationEmail(
              vendorUser.email,
              order._id,
              messageText
            );
          }
        }
      }
    } else {
      return;
    }
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

// custom routes
app.use("/api/v1/auth", authRoute);
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
