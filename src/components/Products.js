import React from "react";
import { Product } from "./Product";

export const Products = ({ products, addToCart }) => {
  // console.log(products);

  return products.map((produkt) => (
    <Product key={produkt.ID} product={produkt} addToCart={addToCart} />
  ));
};
