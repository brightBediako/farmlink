import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import { globalErrhandler, notFound } from "../middleware/globalErrHandler.js";
import usersRoute from "../routes/usersRoute.js";
import productsRoute from "../routes/productsRoute.js";
import categoriesRoute from "../routes/categoriesRoute.js";
import colorsRoute from "../routes/colorsRoute.js";
import brandsRoute from "../routes/brandsRoute.js";
import reviewsRoute from "../routes/reviewsRoute.js";
import couponsRoute from "../routes/couponsRoute.js";
import ordersRoute from "../routes/ordersRoute.js";

//db connect
dbConnect();
const app = express();
// pass incoming data
app.use(express.json());

// routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/colors", colorsRoute);
app.use("/api/v1/brands", brandsRoute);
app.use("/api/v1/reviews/", reviewsRoute);
app.use("/api/v1/coupons/", couponsRoute);
app.use("/api/v1/orders/", ordersRoute);

// error middleware
app.use(notFound);
app.use(globalErrhandler);
export default app;
