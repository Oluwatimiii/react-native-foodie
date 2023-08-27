import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartReducer";
import ProductReducer from "./ProductReducer";
import UserReducer from "./UserSlice";

export default configureStore({
  reducer: {
    cart: CartReducer,
    product: ProductReducer,
    user: UserReducer,
  },
});
