/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import * as authServices from './authService';

// type interface for initial state
interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | undefined | null;
    showPassword: boolean;
}

// the initial state
const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    showPassword: false,
};

// a slice of state for auth
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        clearError: (state) => {
            state.error = null;
        },
        setShowPassword: (state, action) => {
            state.showPassword = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authServices.signUp.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(authServices.signUp.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(authServices.signUp.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(authServices.signIn.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(authServices.signIn.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(authServices.signIn.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(authServices.logOut.pending, (state)=> {
            state.isLoading = true;
        })
        builder.addCase(authServices.logOut.fulfilled, (state) => {
            state.user = null;
            state.isLoggedIn = false;
        });
        builder.addCase(authServices.logOut.rejected, (state, action) => {
            state.user = null;
            state.isLoggedIn = false;
            state.error = action.error.message;
        });
        builder.addCase(authServices.updateProfilee.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(authServices.updateProfilee.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(authServices.updateProfilee.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(authServices.updateEmaill.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(authServices.updateEmaill.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(authServices.updateEmaill.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(authServices.updatePass.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(authServices.updatePass.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(authServices.updatePass.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(authServices.sendResetEmail.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(authServices.sendResetEmail.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(authServices.sendResetEmail.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
        builder.addCase(authServices.deleteUserr.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(authServices.deleteUserr.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(authServices.deleteUserr.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

        builder.addCase(authServices.sendMessage.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(authServices.sendMessage.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(authServices.sendMessage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });

    }
});


// export the actions
export const { setUser, clearError, setShowPassword } = authSlice.actions;


// export currentUser from the state as a selector using proper types
export const currentUser = (state: any) => state.auth.user;

// export the reducer
export default authSlice.reducer;
