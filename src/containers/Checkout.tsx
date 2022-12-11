/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import CheckoutPage from '../pages/CheckoutPage'
import { useAppDispatch, useAppSelector } from '../redux/store';
import { createSelector } from '@reduxjs/toolkit';
// import StripeCheckout from 'react-stripe-checkout';
import { createOrder } from '../redux/features/order/orderService';
import moment from 'moment';
import { deleteAllFromCart } from '../redux/features/cart/cartService';

const Checkout = () => {
    const dispatch = useAppDispatch();

    const userEmail = useAppSelector((state) => state.authReducer.user?.email);
    // console.debug('userEmail: ' + userEmail);

    // use createselector to get total price
    const total = createSelector(
        (state: any) => state.cartReducer.cartItems,
        (cartItems) => cartItems.reduce((acc: any, item: any) => acc + item.totalPrice, 0)
    )

    const totalPrice = useAppSelector(total);

    // use createselector to get cart items
    const cartItems = createSelector(
        (state: any) => state.cartReducer.cartItems,
        (cartItems) => cartItems
    )

    const cartItemsList = useAppSelector(cartItems);

    // console.debug('cartItemsList: ' + cartItemsList.length);


    const pay = () => {

        // dispatch(deleteAllFromCart(userEmail));
    }

    const addOrder = (values: any) => {
        // make an orderID using the current date and time in nanoseconds
        const orderID = moment().format('YYYYMMDDHHmmssSSS');
        // console.debug('orderID: ' + orderID);
        dispatch(createOrder({ order: { id: orderID, cartItemsList, totalPrice, ...values }, userEmail }));

        dispatch(deleteAllFromCart(userEmail));

    }
    return (
        <CheckoutPage totalPrice={totalPrice} cartItems={cartItemsList} pay={pay} userEmail={userEmail} addOrder={addOrder} />

    )
}

export default Checkout