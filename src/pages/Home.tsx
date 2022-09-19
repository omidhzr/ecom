import React, { useEffect } from 'react';
import { MemoProducts } from '../components/Products';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchProducts } from '../redux/features/product/productService';

export const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // use selector to get products from redux store
  const products = useAppSelector((state) => state.productReducer.products);


  return (
    <>
      <br></br>
      {products.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Products</h1>
          <div className="products-box">
            <MemoProducts products={products} />
          </div>
        </div>
      )}
      {products.length < 1 && (
        <div className="container-fluid">
          <br />
          <div className='loading'></div></div>
      )}
    </>
  );
};
