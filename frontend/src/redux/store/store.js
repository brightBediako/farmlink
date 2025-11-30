import { configureStore } from "@reduxjs/toolkit";
// import usersReducer from "../slices/users/usersSlice";
import authReducer from "../slices/auth/authSlice";
import productReducer, {
  fetchProductsAction,
} from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categoriesSlices";
import brandReducer from "../slices/brands/brandsSlices";
import colorReducer from "../slices/colors/colorsSlice";

// export const store = configureStore({
//   reducer: {
//     users: usersReducer,
//   },
// });

export const store = configureStore({
  reducer: {
    users: authReducer,
    productReducer: productReducer,
    categoryReducer: categoryReducer,
    brandReducer: brandReducer,
    colorReducer: colorReducer,
    fetchProductsAction: fetchProductsAction,
  },
});

export default store;
