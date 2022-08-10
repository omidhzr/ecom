import React from 'react';
import { Icon } from 'react-icons-kit';
// import { ecommerce_basket_plus } from 'react-icons-kit/linea/ecommerce_basket_plus'
import { cartPlus } from 'react-icons-kit/fa/cartPlus';

export const Product = ({ product, addToCart }: { product: any, addToCart: any }) => {
  const handleAddToCart = async () => {
    try {
      await addToCart(product);
    } catch (error: any) {
      console.log(error.message);
      window.location.href = '/login';
    }
    // console.log(
    //   product?.title + " with price: " + product?.price + " added to your cart!"
    // );
  };
  return (
    <div className="product">
      <div className="product-img">
        <img src={product.url} alt="product-img" />
      </div>
      <div className="product-text title">{product.title}</div>
      <div className="product-text description">{product.description}</div>
      <div className="product-text price">$ {product.price}</div>
      <div className="btn btn-dark btn-md cart-btn" onClick={handleAddToCart}>
        ADD TO <Icon className="cart-btn cart-icon" icon={cartPlus} size={30}></Icon>
      </div>
    </div>
  );
};
