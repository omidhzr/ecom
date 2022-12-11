/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/product/productSlice";
import cartReducer from "./features/cart/cartSlice";
import orderReducer from "./features/order/orderSlice";
import adminReducer from "./features/admin/adminSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({
  cartReducer,
  productReducer,
  authReducer,
  orderReducer,
  adminReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // OBS! devTools: process.env.NODE_ENV !== "production",
  // because the firebase user object is not serializable, we need to add this line
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppDispatch = typeof store.dispatch;

// Export a hook that can be reused to resolve types
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;


