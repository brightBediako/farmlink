import express from "express";
import dbConnect from "../config/dbConnect.js";

//db connect
dbConnect();
const app = express();

export default app;
