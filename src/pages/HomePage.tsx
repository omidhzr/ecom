/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { MemoProducts } from '../components/Products';

interface Props {
  products: any;
}

export const HomePage = ({ products }: Props) => {


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
