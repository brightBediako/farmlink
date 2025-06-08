import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";

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
      userFound,
      token: generateToken(userFound?._id),
    });
  } else {
    throw new Error("Invalid Login Credentials");
  }
});

// desc    get user
// route   POST /api/v1/users/profile
// access  Private
export const getUserProfileController = asyncHandler(async (req, res) => {
  //find the user
  const user = await User.findById(req.userAuthId).populate("orders");
  res.json({
    status: "success",
    message: "User profile fetched successfully",
    user,
  });
});

// desc    update user
// route   POST /api/v1/users/profile/:id
// access  Private
export const updateUserProfileController = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  // find user
  const user = await User.findById(req.userAuthId);
  if (!user) {
    throw new Error("User not found");
  } else {
    user.fullname = fullname;
    user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    await user.save();
    res.json({
      status: "success",
      message: "User profile updated successfully",
      user,
    });
  }
});

// @desc    Update user shipping address
// @route   PUT /api/v1/users/update/shipping
// @access  Private

export const updateShippingAddressController = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    address,
    city,
    postalCode,
    province,
    phone,
    country,
  } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userAuthId,
    {
      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        postalCode,
        province,
        phone,
        country,
      },
      hasShippingAddress: true,
    },
    {
      new: true,
    }
  );
  //send response
  res.json({
    status: "success",
    message: "User shipping address updated successfully",
    user,
  });
});

// desc    delete user
// route   POST /api/v1/users/profile/;id
// access  Private/Admin
export const deleteUserController = asyncHandler(async (req, res) => {
  // find user
  const user = await User.findById(req.userAuthId);
  if (!user) {
    throw new Error("User not found");
  } else {
    await user.deleteOne();
    res.json({
      status: "success",
      message: "User deleted successfully",
    });
  }
});

// desc    block user
// route   POST /api/v1/users/profile/:id/block
// access  Private/Admin
export const blockUserController = asyncHandler(async (req, res) => {
  // find user
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new Error("User not found");
  } else {
    user.isBlocked = true;
    await user.save();
    res.json({
      status: "success",
      message: "User blocked successfully",
      user,
    });
  }
});