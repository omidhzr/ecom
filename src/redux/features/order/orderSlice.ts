/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import * as orderService from "./orderService";

// type interface for initial state
interface OrderState {
    orders: any[];
    isLoading: boolean;
    error: string | undefined | null;
    success: boolean;
}

// initial state
const initialState: OrderState = {
    orders: [],
    isLoading: false,
    error: null,
    success: false,
};

// create a slice of state for order
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        fetchOrders: (state, action) => {
            state.orders = action.payload;
            state.isLoading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(orderService.fetchOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(orderService.fetchOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(orderService.fetchOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(orderService.createOrder.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(orderService.createOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload);
            state.isLoading = false;
            state.error = null;
            state.success = true;
        });
        builder.addCase(orderService.createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(orderService.deleteOrder.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(orderService.deleteOrder.fulfilled, (state, action) => {
            state.orders = state.orders.filter(order => order.id !== action.payload);
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(orderService.deleteOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

// export the actions
export const { fetchOrders } = orderSlice.actions;

// export the reducer
export default orderSlice.reducer;
