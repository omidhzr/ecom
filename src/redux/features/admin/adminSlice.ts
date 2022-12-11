/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import * as adminServices from './adminService';

// type interface for initial state
interface AdminState {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | undefined | null;
    showPassword: boolean;
    progress: number;
    message: string;
    orders: any[];
}

// the initial state
const initialState: AdminState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    showPassword: false,
    progress: 0,
    message: '',
    orders: [],
};

// a slice of state for auth
export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(adminServices.signUp.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(adminServices.signUp.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(adminServices.signUp.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(adminServices.signIn.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(adminServices.signIn.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(adminServices.signIn.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(adminServices.logOut.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(adminServices.logOut.fulfilled, (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(adminServices.logOut.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        // addProduct
        builder.addCase(adminServices.addProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(adminServices.addProduct.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(adminServices.addProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        // editProduct
        builder.addCase(adminServices.editProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(adminServices.editProduct.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(adminServices.editProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        // deleteProduct
        builder.addCase(adminServices.deleteProduct.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(adminServices.deleteProduct.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(adminServices.deleteProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
         // fetchAllOrders
         builder.addCase(adminServices.fetchAllOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(adminServices.fetchAllOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(adminServices.fetchAllOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });



    }
});

export const { setUser, clearError, setError, setProgress, setMessage } = adminSlice.actions;

export default adminSlice.reducer;



