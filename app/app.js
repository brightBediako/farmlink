import dotenv from "dotenv";
dotenv.config();
import express from "express";
import dbConnect from "../config/dbConnect.js";
import { globalErrhandler, notFound } from "../middleware/globalErrHandler.js";
import usersRoute from "../routes/usersRoute.js";
import productsRoute from "../routes/productsRoute.js";


//db connect
dbConnect();
const app = express();
// pass incoming data
app.use(express.json());

// routes
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/products", productsRoute);


// err middleware
app.use(notFound);
app.use(globalErrhandler);
export default app;
