import React from 'react';
import { CartProduct } from './CartProduct';

export const CartProducts = ({ cartProducts, cartProductIncrease, cartProductDecrease }: {
  cartProducts: any;
  cartProductIncrease: any;
  cartProductDecrease: any;
}) => {
  return cartProducts.map((cartProduct: any) => (
    <CartProduct
      key={cartProduct.ID}
      cartProduct={cartProduct}
      cartProductIncrease={cartProductIncrease}
      cartProductDecrease={cartProductDecrease}
    />
  ));
};
