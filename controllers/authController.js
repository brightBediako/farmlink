import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { sendRegisterNotificationEmail } from "../services/emailNotification.js";
import Notification from "../models/Notification.js";

// desc    register
// route   POST /api/v1/users/register
// access  Private/Admin
export const registerUserController = asyncHandler(async (req, res) => {
  const { fullname, email, phone, password, role } = req.body;

  // check if user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already Exists");
    return;
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // create user
  const user = await User.create({
    fullname,
    email,
    phone,
    password: hashedPassword,
    role: role || "buyer",
  });

  // create notification
  const notification = await Notification.create({
    userId: user._id,
    message: `<p>
  Welcome to <strong>FarmLink</strong> – your trusted platform for buying and selling fresh farm produce!
</p>`,
  });
  if (user && user.email) {
    await sendRegisterNotificationEmail(user.email, user.fullname);
  }

  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    data: user,
  });
});

// desc    login
// route   POST /api/v1/users/login
// access  Public

export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exist in db
  const userFound = await User.findOne({
    email,
  });
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: "success",
      message: "Login Successfully",
      user: {
        _id: userFound._id,
        fullname: userFound.fullname,
        email: userFound.email,
        phone: userFound.phone,
        role: userFound.role,
        // add other fields as needed
      },
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error("Invalid Login Credentials");
  }
});

// logout user
// route   POST /api/v1/users/logout
// access  Private

export const logoutUserController = asyncHandler(async (req, res) => {
  const token = getTokenFromHeader(req);
  if (token) {
    res.json({
      status: "success",
      message: "Logout Successfully",
    });
  } else {
    throw new Error("Not Authorized, No Token");
  }
});
