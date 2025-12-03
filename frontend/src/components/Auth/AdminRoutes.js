import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../redux/slices/users/usersSlice";
import AdminOnly from "../NotAuthorised/AdminOnly";

const AdminRoutes = ({ children }) => {
  console.log("ddd");
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);
  //get user from store
  const { userAuth, profile } = useSelector((state) => state?.users);
  const isAdmin =
    userAuth?.userInfo?.isAdmin || profile?.isAdmin ? true : false;
  if (!isAdmin) return <AdminOnly />;
  return <>{children}</>;
};

export default AdminRoutes;
