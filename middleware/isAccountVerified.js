import User from "../models/User.js";
import asyncHandler from "express-async-handler";

const isAccountVerified = asyncHandler(async (req, res, next) => {
  try {
    //find the login user
    const user = await User.findById(req.userAuthId);
    //check if account is verified
    if (!user?.isEmailVerified) {
      return res.status(401).json({
        message: "Action denied, account not verified",
      });
    }
    next();
  } catch (error) {
    return res.json(error);
  }
});

export default isAccountVerified;
