import React from 'react';
import { Product } from './Product';

export const Products = ({ products, addToCart }: { products: any, addToCart: any }) => {
  // console.log(products);

  return products.map((produkt: { ID: React.Key | null | undefined; }) => (
    <Product key={produkt.ID} product={produkt} addToCart={addToCart} />
  ));
};
