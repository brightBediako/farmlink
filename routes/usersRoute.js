import express from "express";
import {
  registerUserController,
  loginUserController,
} from "../controllers/usersController.js";

const userRoutes = express.Router();

userRoutes.post("/api/v1/users/register", registerUserController);
userRoutes.post("/api/v1/users/login", loginUserController);

export default userRoutes;
