/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo } from 'react';
import { Product } from './Product';

export const Products = ({ products }: { products: any }) => {

  return products.map((produkt: { ID: React.Key | null | undefined; }) => (
    <Product key={produkt.ID} product={produkt} />
  ));
};

export const MemoProducts = memo(Products);

