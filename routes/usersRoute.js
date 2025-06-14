import express from "express";
import {
  registerUserController,
  loginUserController,
  getUserProfileController,
  updateUserProfileController,
  updateShippingAddressController,
  deleteUserController,
} from "../controllers/usersController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import isAdmin from "../middleware/isAdmin.js";

const usersRoute = express.Router();

usersRoute.post("/register", registerUserController);
usersRoute.post("/login", loginUserController);
usersRoute.get("/profile/:id", isLoggedIn, getUserProfileController);
usersRoute.put("/profile/:id", isLoggedIn, updateUserProfileController);
usersRoute.put("/update/shipping", isLoggedIn, updateShippingAddressController);
usersRoute.delete("/profile/:id", isLoggedIn, isAdmin, deleteUserController);

export default usersRoute;
