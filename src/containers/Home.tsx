/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchProducts } from '../redux/features/product/productService';
import { HomePage } from '../pages/HomePage';

export const Home = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    // use selector to get products from redux store
    const products = useAppSelector((state) => state.productReducer.products);


    return (
        <HomePage products={products} />
    );
};
