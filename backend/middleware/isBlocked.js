import User from "../models/User.js";
import asyncHandler from "express-async-handler";

const isBlocked = asyncHandler(async (req, res, next) => {
  try {
    //find the login user
    const user = await User.findById(req.userAuthId);
    //check if account is verified
    if (user?.isBlocked) {
      return res.status(401).json({
        message: "Acess denied, Account blocked, please contact support",
      });
    }
    next();
  } catch (error) {
    return res.json(error);
  }
});

export default isBlocked;
