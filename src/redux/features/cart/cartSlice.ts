/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import * as cartServices from './cartService';

// type for the slice state
interface CartState {
  cartItems: any;
  isLoading: boolean;
  error: string | undefined | null;
}

// the initial state using that type
const initialState: CartState = {
  cartItems: [],
  isLoading: true,
  error: null,

};

// a slice of the cart state and export it as cartSlice to be used in the store
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {

    // for addToCart
    builder.addCase(cartServices.addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cartServices.addToCart.fulfilled, (state, action) => {
      // replace the old Item with the new cartItem
      const index = state.cartItems.findIndex((item: any) => item.ID === action.payload.ID);
      if (index >= 0) {
        state.cartItems[index] = action.payload;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
      state.isLoading = false;
    });
    builder.addCase(cartServices.addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(cartServices.fetchCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cartServices.fetchCart.fulfilled, (state, action) => {
      state.cartItems = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(cartServices.fetchCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(cartServices.deleteFromCart.pending, (state) => {
      state.isLoading = true;
    }
    );
    builder.addCase(cartServices.deleteFromCart.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.filter((item: any) => item.ID !== action.payload);
      state.isLoading = false;
      state.error = null;
    }
    );
    builder.addCase(cartServices.deleteFromCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    }
    );
    builder.addCase(cartServices.deleteAllFromCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cartServices.deleteAllFromCart.fulfilled, (state, _action) => {
      state.cartItems = [];
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(cartServices.deleteAllFromCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(cartServices.increaseQuantity.pending, (state) => {
      state.isLoading = true;
    }
    );
    builder.addCase(cartServices.increaseQuantity.fulfilled, (state, action) => {
      // update the state with the new cartItem returned from increaseQuantity
      const index = state.cartItems.findIndex((cartItem: any) => cartItem.ID === action.payload.ID);
      // replace the old cartItem with the new one
      state.cartItems[index] = action.payload;
      state.isLoading = false;
      state.error = null;
    }
    );
    builder.addCase(cartServices.increaseQuantity.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    }
    );
    builder.addCase(cartServices.decreaseQuantity.pending, (state) => {
      state.isLoading = true;
    }
    );
    builder.addCase(cartServices.decreaseQuantity.fulfilled, (state, action) => {
      // check if the quantity is 0, if so, remove the item from the cart
      const index = state.cartItems.findIndex((cartItem: any) => cartItem.ID === action.payload.ID);
      if (action.payload.quantity === 0) {
        state.cartItems = state.cartItems.filter((item: any) => item.ID !== action.payload.ID);
      } else {
        state.cartItems[index] = action.payload;
      }
      state.isLoading = false;
      state.error = null;
    }
    );
    builder.addCase(cartServices.decreaseQuantity.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    }
    );

  }
});


// export the reducer
export default cartSlice.reducer;


