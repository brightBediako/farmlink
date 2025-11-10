import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import authReducer from "../slices/auth/authSlice";


// export const store = configureStore({
//   reducer: {
//     users: usersReducer,
//   },
// });

export const store = configureStore({
  reducer: {
    users: authReducer,
  },
});


export default store;