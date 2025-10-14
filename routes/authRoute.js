import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
} from "../controllers/authController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import isAdmin from "../middleware/isAdmin.js";

const authRoute = express.Router();

authRoute.post("/register", registerUserController);
authRoute.post("/login", loginUserController);
authRoute.post("/logout", logoutUserController);

export default authRoute;
