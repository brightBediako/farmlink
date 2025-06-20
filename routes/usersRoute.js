import express from "express";
import {
  registerUserController,
  loginUserController,
  getUserProfileController,
  getAllUsersController,
  updateUserProfileController,
  updateShippingAddressController,
  deleteUserController,
  blockUserController,
  unblockUserController,
  verifyEmailTokenController,
  verifyEmailAccountController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/usersController.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import isAdmin from "../middleware/isAdmin.js";

const usersRoute = express.Router();

usersRoute.post("/register", registerUserController);
usersRoute.post("/login", loginUserController);
usersRoute.get("/profile/:id", isLoggedIn, getUserProfileController);
usersRoute.get("/all-users", isLoggedIn, isAdmin, getAllUsersController);
usersRoute.put("/profile/:id", isLoggedIn, updateUserProfileController);
usersRoute.put("/update/shipping", isLoggedIn, updateShippingAddressController);
usersRoute.delete("/profile/:id", isLoggedIn, isAdmin, deleteUserController);
usersRoute.put("/block-user/:userId", isLoggedIn, isAdmin, blockUserController);
usersRoute.put("/unblock-user/:userId", isLoggedIn, isAdmin, unblockUserController);
usersRoute.put("/verify-email", isLoggedIn, verifyEmailTokenController);
usersRoute.put(
  "/verify-email/:verifyToken",
  isLoggedIn,
  verifyEmailAccountController
);
usersRoute.post("/forgot-password", forgotPasswordController);
usersRoute.post("/reset-password/:resetToken", resetPasswordController);
export default usersRoute;
