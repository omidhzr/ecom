/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import CartPage from '../pages/CartPage';
// import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../redux/features/cart/cartService';
import { useAppDispatch, useAppSelector } from '../redux/store';

const Cart = () => {
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const userEmail = useAppSelector((state) => state.authReducer.user?.email);
    // console.log('userEmail: ' + userEmail);

    useEffect(() => {
        if (userEmail !== null && userEmail !== undefined && userEmail !== '') {
            dispatch(fetchCart(userEmail));
        }
    }, [dispatch, userEmail]);


    const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
    // console.log(cartItems.length);

    return (
        <CartPage cartItems={cartItems} navigate={navigate} />
    )
}

export default Cart