import { createSlice } from "@reduxjs/toolkit";
import * as productServices from "./productService";

// type interface for initial state
interface ProductState {
    products: any[];
    isLoading: boolean;
    error: string | undefined | null;
}
// initial state
const initialState: ProductState = {
    products: [],
    isLoading: false,
    error: null,
};

// a slice of state for product
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        fetchProducts: (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(productServices.fetchProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(productServices.fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(productServices.fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});

// export the actions
export const { fetchProducts } = productSlice.actions;

// export the reducer
export default productSlice.reducer;






