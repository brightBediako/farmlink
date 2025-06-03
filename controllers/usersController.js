import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// desc    register
// route   POST /api/v1/users/register
// access  Private/Admin
export const registerUserController = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  // check if user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("User already Exists");
  }
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // create user
  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    data: user,
  });
});

// desc    register
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
      userFound,
    });
  } else {
    throw new Error("Invalid Login Credentials");
  }
});

