import express from "express";
import {
  registerUserController,
  loginUserController,
  getUserProfileController,
} from "../controllers/usersController.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";

const usersRoute = express.Router();

usersRoute.post("/register", registerUserController);
usersRoute.post("/login", loginUserController);
usersRoute.get("/profile",isLoggedIn, getUserProfileController);

export default usersRoute;
