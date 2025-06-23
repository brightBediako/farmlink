import User from "../models/User.js";

const isAdmin = async (req, res, next) => {
  //find the login user
  const user = await User.findById(req.userAuthId);
  //check if admin
  if (user?.role === "admin") {
    next();
  } else {
    next(new Error("Access denied, admin only"));
  }
};

export default isAdmin;
