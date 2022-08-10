import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productReducer from "../features/productSlice";
import userReducer from "../features/userSlice";
import offerReducer from "../features/offerSlice";
import notificationReducer from "../features/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    user: userReducer,
    offer: offerReducer,
    notification: notificationReducer,
  },
});
